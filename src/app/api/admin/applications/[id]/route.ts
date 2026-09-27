import "server-only";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { checkRateLimit } from "@/lib/rate-limit";

const VALID_STATUSES = new Set(["new", "contacted", "accepted"]);

// Generous -- this exists to cap a compromised session, not to slow down
// normal review work. Keyed on the admin's uid rather than IP: multiple
// admins on one office network should not rate-limit each other, and a
// stolen session should stay capped even if the attacker's IP changes.
const LIMIT = { limit: 60, windowSeconds: 5 * 60 };

/**
 * Updates an application's review status.
 *
 * A server route, not a client Firestore write, because firestore.rules
 * intentionally sets `allow write: if false` on /applications -- even an
 * authenticated admin cannot write it directly from the browser. Only the
 * Admin SDK, which this route uses, can touch the collection at all. That is
 * deliberate: applicant personal information should have exactly one write
 * path to audit, not "the rules, except when a client claims to be an admin."
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const limit = await checkRateLimit({
      ip: session.uid,
      bucket: "admin-applications-patch",
      ...LIMIT,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many updates. Please slow down." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
      );
    }
  } catch (err) {
    // Fail closed, same policy as the public contact form's limiter.
    console.error("[admin/applications] rate limit check failed:", err);
    return NextResponse.json({ error: "Failed to update." }, { status: 503 });
  }

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const status = (body as { status?: string })?.status;
  if (!status || !VALID_STATUSES.has(status)) {
    return NextResponse.json(
      { error: "status must be one of: new, contacted, accepted" },
      { status: 422 },
    );
  }

  try {
    const ref = getAdminDb().collection("applications").doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }
    await ref.update({ status });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/applications] failed to update status:", err);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}
