import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth, getAdminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { SESSION_COOKIE } from "@/lib/auth/constants";

export type AdminSession = {
  uid: string;
  email: string;
  name: string;
};

/**
 * Verifies that the caller holds a valid officer session.
 *
 * Three checks, all required — mirroring firestore.rules so the server and the
 * database agree on who an admin is:
 *   1. the session cookie is a genuine, unexpired, unrevoked Firebase cookie,
 *   2. it carries the `admin` custom claim, and
 *   3. an /admins/{uid} document still exists (the instant-revocation switch).
 *
 * Returns null rather than throwing; callers decide how to respond.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isAdminConfigured) return null;

  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;

  try {
    // checkRevoked: true costs a lookup but means `grant-admin.mjs revoke`
    // ends live sessions immediately instead of at token expiry.
    const decoded = await getAdminAuth().verifySessionCookie(cookie, true);
    if (decoded.admin !== true) return null;

    const doc = await getAdminDb().collection("admins").doc(decoded.uid).get();
    if (!doc.exists) return null;

    return {
      uid: decoded.uid,
      email: decoded.email ?? "",
      name: (doc.data()?.name as string | undefined) ?? "",
    };
  } catch {
    // Expired, revoked, malformed, or forged — all equally "not signed in".
    return null;
  }
}

/** True when the request carries a verified officer session. */
export async function isAdminRequest(): Promise<boolean> {
  return (await getAdminSession()) !== null;
}
