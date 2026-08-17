import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminAuth, getAdminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/constants";

const bodySchema = z.object({ idToken: z.string().min(20).max(4096) });

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/**
 * Exchanges a freshly minted Firebase ID token for an httpOnly session cookie.
 *
 * The ID token lives in JavaScript and is therefore reachable by any XSS on the
 * page; the session cookie is not. Admin status is decided here, on the server,
 * and never trusted from the client.
 */
export async function POST(req: Request) {
  if (!isAdminConfigured) {
    return NextResponse.json(
      { ok: false, error: "Server auth is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  try {
    const auth = getAdminAuth();
    const decoded = await auth.verifyIdToken(parsed.data.idToken, true);

    // Gate 1: the custom claim minted by scripts/grant-admin.mjs.
    // Gate 2: the revocation document. Both must hold, as in firestore.rules.
    const adminDoc = await getAdminDb().collection("admins").doc(decoded.uid).get();
    if (decoded.admin !== true || !adminDoc.exists) {
      // Deliberately identical to the wrong-password message on the client:
      // this must not reveal which accounts hold officer access.
      return NextResponse.json(
        { ok: false, error: "This account does not have officer access." },
        { status: 403 },
      );
    }

    const sessionCookie = await auth.createSessionCookie(parsed.data.idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, sessionCookie, {
      ...cookieOptions,
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not start your session. Please sign in again." },
      { status: 401 },
    );
  }
}

/** Signs the officer out by clearing the cookie and revoking refresh tokens. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });

  if (isAdminConfigured) {
    try {
      const { cookies } = await import("next/headers");
      const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
      if (cookie) {
        const auth = getAdminAuth();
        const decoded = await auth.verifySessionCookie(cookie, false);
        // Ends every other session for this officer too — the right default on
        // shared campus machines.
        await auth.revokeRefreshTokens(decoded.uid);
      }
    } catch {
      // Already invalid; clearing the cookie below is still the correct result.
    }
  }

  res.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
