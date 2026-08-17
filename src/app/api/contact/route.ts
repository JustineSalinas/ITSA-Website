import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { contactSchema } from "@/lib/validations";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { siteConfig } from "@/data/site";

const interestLabels: Record<string, string> = {
  membership: "Become a member",
  volunteer: "Volunteer / join a committee",
  partnership: "Partnership / sponsorship",
  general: "General inquiry",
};

// Two windows, because they stop different things: the burst limit stops a
// script hammering the endpoint, the daily limit stops a slow drip that would
// still fill the inbox overnight.
const BURST = { limit: 3, windowSeconds: 10 * 60 };
const DAILY = { limit: 10, windowSeconds: 24 * 60 * 60 };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function tooMany(retryAfterSeconds: number) {
  return NextResponse.json(
    {
      ok: false,
      error: "You've sent a few messages already. Please try again a little later.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
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

  // Honeypot: the field is hidden from people and empty for them. Bots that
  // fill every input give themselves away. Report success so the bot has no
  // signal to adapt to, and send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const to = process.env.CONTACT_EMAIL ?? siteConfig.contactEmail;
  const interestLabel = interestLabels[data.interest] ?? data.interest;

  const html = `
    <h2>New ${escapeHtml(interestLabel)} — ${escapeHtml(siteConfig.name)}</h2>
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
    console.info("[contact] (dev, Firebase not configured) submission:", { to, ...data });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const ip = clientIp(req);
  try {
    const burst = await checkRateLimit({ ip, bucket: "contact-burst", ...BURST });
    if (!burst.allowed) return tooMany(burst.retryAfterSeconds);

    const daily = await checkRateLimit({ ip, bucket: "contact-daily", ...DAILY });
    if (!daily.allowed) return tooMany(daily.retryAfterSeconds);
  } catch (err) {
    // Fail closed. A limiter that opens up when the database is unhappy is not
    // a limiter, and this endpoint costs real money per request.
    console.error("[contact] rate limit check failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again later." },
      { status: 503 },
    );
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
