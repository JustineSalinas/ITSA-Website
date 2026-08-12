import "server-only";
import { createHash } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";

/**
 * Fixed-window rate limiting backed by Firestore.
 *
 * An in-memory counter would be per-instance, and serverless gives you a fresh
 * instance whenever it feels like one — so an attacker just needs to be spread
 * across a few cold starts to bypass it. A transactional Firestore counter is
 * shared by every instance, which is what makes the limit real.
 */

const COLLECTION = "rate_limits";

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

/**
 * Identifies the caller without storing their IP address in plaintext.
 * The salt makes the stored digest useless for reversing back to an IP.
 */
function identity(ip: string, bucket: string): string {
  const salt =
    process.env.RATE_LIMIT_SALT ?? process.env.FIREBASE_PROJECT_ID ?? "itsa-local";
  return createHash("sha256").update(`${salt}:${bucket}:${ip}`).digest("hex").slice(0, 40);
}

/** Best-effort client IP from the proxy headers Vercel and most hosts set. */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // Left-most entry is the original client; the rest are proxies.
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function checkRateLimit(opts: {
  ip: string;
  bucket: string;
  limit: number;
  windowSeconds: number;
}): Promise<RateLimitResult> {
  const { ip, bucket, limit, windowSeconds } = opts;
  const windowMs = windowSeconds * 1000;
  const db = getAdminDb();
  const ref = db.collection(COLLECTION).doc(identity(ip, bucket));

  return db.runTransaction(async (tx): Promise<RateLimitResult> => {
    const snap = await tx.get(ref);
    const now = Date.now();
    const data = snap.data();

    const previousStart = data?.windowStart?.toMillis?.() ?? 0;
    const expired = now - previousStart >= windowMs;
    const windowStart = expired ? now : previousStart;
    const count = expired ? 0 : ((data?.count as number | undefined) ?? 0);

    if (count >= limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000)),
      };
    }

    tx.set(ref, {
      count: count + 1,
      windowStart: Timestamp.fromMillis(windowStart),
      // Set a Firestore TTL policy on this field so spent counters are swept
      // up automatically: Firestore console → TTL → collection `rate_limits`.
      expiresAt: Timestamp.fromMillis(windowStart + windowMs),
    });

    return { allowed: true, remaining: limit - count - 1 };
  });
}
