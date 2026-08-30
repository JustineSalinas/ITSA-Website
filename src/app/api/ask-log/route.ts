import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { faqs } from "@/data/faq";

/**
 * Records which "Ask ITSA" questions visitors actually tap.
 *
 * The point is to settle a decision with evidence: if visitors keep running out
 * of questions, free-text answering may be worth its cost and risk. If they do
 * not, the guided panel is the whole feature.
 *
 * Two deliberate constraints:
 *
 * 1. It stores a counter per question, not a row per click. Growth is bounded
 *    by the number of questions we have written, so this can never become an
 *    expensive collection no matter how much traffic or abuse it sees.
 * 2. It accepts only question IDs we shipped. Nothing a visitor types can
 *    become a document ID or a stored value.
 *
 * Nothing about a visitor is recorded — no IP, no identifier, no free text.
 */

const KNOWN_IDS = new Set([...faqs.map((f) => f.id), "next-event"]);

const bodySchema = z.object({
  questionId: z.string().min(1).max(64),
});

// Generous, because a curious visitor may legitimately tap every question.
// This exists to cap abuse, not to police real use.
const LIMIT = { limit: 40, windowSeconds: 10 * 60 };

/** Always 204: this endpoint is fire-and-forget and must never be observable. */
function noContent() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: Request) {
  // sendBeacon sends a Blob, so the content type is not always JSON. Parse the
  // text ourselves rather than relying on req.json().
  let body: unknown;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return noContent();
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success || !KNOWN_IDS.has(parsed.data.questionId)) {
    return noContent();
  }

  if (!isAdminConfigured) {
    console.info("[ask-log] (dev) question tapped:", parsed.data.questionId);
    return noContent();
  }

  try {
    const allowed = await checkRateLimit({
      ip: clientIp(req),
      bucket: "ask-log",
      ...LIMIT,
    });
    if (!allowed.allowed) return noContent();

    await getAdminDb()
      .collection("ask_log")
      .doc(parsed.data.questionId)
      .set(
        {
          count: FieldValue.increment(1),
          lastAskedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
  } catch (err) {
    // Analytics failing must never affect a visitor, so this is logged for us
    // and silent for them.
    console.error("[ask-log] failed to record question:", err);
  }

  return noContent();
}
