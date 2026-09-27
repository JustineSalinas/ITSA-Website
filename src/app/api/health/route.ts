import "server-only";
import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase/admin";
import { getSanityClient } from "@/sanity/lib/client";

/**
 * Health check for external uptime monitoring (H1).
 *
 * Point a free service -- UptimeRobot, Better Stack, etc. -- at this route
 * on a few-minute interval. It returns 200 only when every configured
 * backend actually answers, not just when env vars are present, so a
 * monitor alerts on a real outage rather than a misconfiguration it can't
 * tell apart from one.
 *
 * force-dynamic: a health check that Next.js served from a cache would defeat
 * the entire point of it.
 */
export const dynamic = "force-dynamic";

type CheckResult = { ok: boolean; detail?: string };

async function checkFirestore(): Promise<CheckResult> {
  if (!isAdminConfigured) {
    // Not wired up yet is a known, expected state (see the ITSA-WEB-PMP-001
    // billing blocker) -- not itself a fault worth waking someone up over.
    return { ok: true, detail: "not configured" };
  }
  try {
    // Cheapest real round-trip: list one document ID from one collection.
    // Reads nothing sensitive and costs one Firestore read.
    await getAdminDb().collection("officers").limit(1).get();
    return { ok: true };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : "unknown error" };
  }
}

async function checkSanity(): Promise<CheckResult> {
  const client = getSanityClient();
  if (!client) {
    return { ok: true, detail: "not configured" };
  }
  try {
    await client.fetch('*[_type == "news"][0]._id');
    return { ok: true };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : "unknown error" };
  }
}

export async function GET() {
  const [firestore, sanity] = await Promise.all([checkFirestore(), checkSanity()]);
  const healthy = firestore.ok && sanity.ok;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      checks: { firestore, sanity },
    },
    { status: healthy ? 200 : 503 },
  );
}
