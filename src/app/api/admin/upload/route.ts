import "server-only";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { getAdminBucket, isStorageConfigured } from "@/lib/firebase/admin";
import { ImageError, processImage } from "@/lib/images/process";
import { checkRateLimit } from "@/lib/rate-limit";
import { uploadFolderSchema } from "@/lib/validations";

// sharp is a native module; it cannot run on the Edge runtime.
export const runtime = "nodejs";

// Vercel rejects request bodies over ~4.5 MB before they reach this handler, so
// the cap sits just under it. storage.rules allows up to 5 MiB; that stays as
// the outer bound for anything written by other means.
const MAX_FILE_BYTES = 4 * 1024 * 1024;
// Multipart framing (boundaries, field headers, the `folder` field) on top of the file.
const MULTIPART_OVERHEAD_BYTES = 64 * 1024;

// Keyed on the admin's uid, not IP -- same reasoning as admin/applications: a
// stolen session stays capped wherever the attacker connects from, and admins
// sharing a network don't throttle each other.
const LIMIT = { limit: 30, windowSeconds: 10 * 60 };

const noStore = { "Cache-Control": "no-store" };

function fail(error: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ error }, { status, headers: { ...noStore, ...headers } });
}

/**
 * The session cookie is SameSite=Lax, and unlike Server Actions, route handlers
 * get no automatic Origin check. Browsers always send `Origin` (or at least
 * `Sec-Fetch-Site`) on a cross-site POST, so a mismatch means a foreign page is
 * driving the admin's browser. Requests carrying neither header come from
 * non-browser clients, which have no ambient cookies to abuse.
 */
function isCrossSite(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host !== new URL(req.url).host;
    } catch {
      return true;
    }
  }
  const site = req.headers.get("sec-fetch-site");
  return site !== null && site !== "same-origin" && site !== "none";
}

/**
 * Accepts one image, re-encodes it as a size-capped WebP, stores it under
 * media/{folder}/, and returns a public Firebase download URL.
 *
 * This is the only intended write path into Storage. The Admin SDK bypasses
 * storage.rules, so every check the rules would make (admin, type, size) is
 * repeated here in code -- the route and the rules are two independent gates
 * that must agree.
 */
export async function POST(req: Request) {
  if (isCrossSite(req)) {
    return fail("Forbidden.", 403);
  }

  const session = await getAdminSession();
  if (!session) {
    return fail("Not signed in.", 401);
  }

  // Unlike the read paths in data.ts there is no offline fallback to fall back
  // on: pretending an upload succeeded would lose the officer's photo.
  if (!isStorageConfigured) {
    return fail("Uploads are unavailable.", 503);
  }

  try {
    const limit = await checkRateLimit({ ip: session.uid, bucket: "admin-upload", ...LIMIT });
    if (!limit.allowed) {
      return fail("Too many uploads. Please slow down.", 429, {
        "Retry-After": String(limit.retryAfterSeconds),
      });
    }
  } catch (err) {
    // Fail closed, same policy as the contact form's limiter.
    console.error("[admin/upload] rate limit check failed:", err);
    return fail("Upload failed.", 503);
  }

  // formData() buffers the entire body in memory, so refuse oversized requests
  // on the declared length first. Requiring the header also rules out chunked
  // bodies, whose size can't be known up front; browsers always send it.
  const declared = Number(req.headers.get("content-length"));
  if (!Number.isFinite(declared) || declared <= 0) {
    return fail("Content-Length is required.", 411);
  }
  if (declared > MAX_FILE_BYTES + MULTIPART_OVERHEAD_BYTES) {
    return fail("Image is too large (max 4 MB).", 413);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid request.", 400);
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return fail("Attach an image in the `file` field.", 422);
  }
  // The header can lie; the parsed file can't.
  if (file.size > MAX_FILE_BYTES) {
    return fail("Image is too large (max 4 MB).", 413);
  }

  const folder = uploadFolderSchema.safeParse(form.get("folder") ?? undefined);
  if (!folder.success) {
    return fail("Unknown upload folder.", 422);
  }

  let image;
  try {
    image = await processImage(Buffer.from(await file.arrayBuffer()));
  } catch (err) {
    if (err instanceof ImageError) {
      return fail(err.message, err.code === "unsupported" ? 415 : 422);
    }
    console.error("[admin/upload] image processing failed:", err);
    return fail("Upload failed.", 500);
  }

  // The object name is generated here; nothing user-supplied reaches the path.
  const path = `media/${folder.data}/${randomUUID()}.webp`;
  const token = randomUUID();

  try {
    const bucket = getAdminBucket();
    await bucket.file(path).save(image.data, {
      resumable: false,
      contentType: image.contentType,
      metadata: {
        cacheControl: "public, max-age=31536000, immutable",
        // Makes the object addressable at a firebasestorage.googleapis.com URL,
        // the host the imageUrl schema, remotePatterns and CSP already allow.
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });

    const url =
      `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/` +
      `${encodeURIComponent(path)}?alt=media&token=${token}`;

    return NextResponse.json(
      { ok: true, url, width: image.width, height: image.height, bytes: image.data.length },
      { headers: noStore },
    );
  } catch (err) {
    console.error("[admin/upload] failed to store image:", err);
    return fail("Upload failed.", 500);
  }
}
