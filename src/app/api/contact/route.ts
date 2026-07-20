import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { contactSchema } from "@/lib/validations";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { siteConfig } from "@/data/site";

const interestLabels: Record<string, string> = {
  membership: "Become a member",
  volunteer: "Volunteer / join a committee",
  partnership: "Partnership / sponsorship",
  general: "General inquiry",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const to = process.env.CONTACT_EMAIL ?? siteConfig.contactEmail;
  const interestLabel = interestLabels[data.interest] ?? data.interest;

  const html = `
    <h2>New ${escapeHtml(interestLabel)} — ${siteConfig.name}</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${data.studentId ? `<p><strong>Student ID:</strong> ${escapeHtml(data.studentId)}</p>` : ""}
    ${data.yearLevel ? `<p><strong>Year & program:</strong> ${escapeHtml(data.yearLevel)}</p>` : ""}
    <p><strong>Topic:</strong> ${escapeHtml(interestLabel)}</p>
    <hr />
    <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
  `.trim();

  // If Firebase Admin isn't configured yet, don't hard-fail in development —
  // log the submission so the flow is testable, and report success.
  if (!isAdminConfigured) {
    console.info("[contact] (dev, Firebase not configured) submission:", {
      to,
      ...data,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    // The `firestore-send-email` (Trigger Email) extension watches this
    // collection and sends the message via the configured SMTP provider.
    await getAdminDb()
      .collection("mail")
      .add({
        to,
        replyTo: data.email,
        message: {
          subject: `[${siteConfig.name}] ${interestLabel} from ${data.name}`,
          html,
        },
        meta: { ...data, source: "website-join-form" },
        createdAt: FieldValue.serverTimestamp(),
      });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] failed to queue email:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again later." },
      { status: 500 },
    );
  }
}
