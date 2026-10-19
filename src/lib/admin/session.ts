import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "@/lib/firebase/admin";
import { isAllowedAdminEmail } from "@/lib/admin/allowlist";

const SESSION_COOKIE = "__session";
// Firebase session cookies cap out at 14 days; match that so the cookie
// never outlives what Firebase will actually still honor.
const SESSION_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

/**
 * Exchanges a short-lived Firebase ID token (from client-side sign-in) for
 * a long-lived, HttpOnly session cookie. Only an allowlisted email gets a
 * cookie at all -- everyone else's token is rejected here, before a
 * session ever exists, not just hidden from the UI later.
 */
export async function createAdminSession(idToken: string): Promise<void> {
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (!isAllowedAdminEmail(decoded.email)) {
    throw new Error("This account is not authorized to edit site content.");
  }

  const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });

  (await cookies()).set(SESSION_COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_MS / 1000,
    path: "/",
  });
}

export async function clearAdminSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export type AdminSession = { email: string; uid: string };

/**
 * The DAL's verifySession(): the one place that actually trusts a request
 * is from a signed-in, allowlisted officer. Every admin page and Server
 * Action calls this (or requireAdminSession()) rather than re-implementing
 * the check -- see Next.js's authentication guide on why that centralization
 * matters more than the check itself.
 */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(cookie, true);
    if (!isAllowedAdminEmail(decoded.email)) return null;
    return { email: decoded.email!, uid: decoded.uid };
  } catch {
    return null;
  }
});

/** For Server Components: redirects to /admin/login if there's no valid session. */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
