import "server-only";
import { NextResponse } from "next/server";
import { createAdminSession, clearAdminSession } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { idToken } = await request.json();
  if (typeof idToken !== "string" || !idToken) {
    return NextResponse.json({ error: "Missing idToken." }, { status: 400 });
  }

  try {
    await createAdminSession(idToken);
    return NextResponse.json({ ok: true });
  } catch {
    // Deliberately generic: don't tell a caller whether the token was
    // invalid vs. the email just isn't on the allowlist.
    return NextResponse.json(
      { error: "Sign-in failed. Contact the web team if this is unexpected." },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
