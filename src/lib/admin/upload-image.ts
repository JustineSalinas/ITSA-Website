import "server-only";
import sharp from "sharp";
import { getAdminStorage } from "@/lib/firebase/admin";

// Vercel Functions cap request bodies at 4.5MB; stay comfortably under that
// so a too-large photo fails with a clear message instead of a vague 413.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export class UploadError extends Error {}

/**
 * Accepts whatever an officer actually uploads (a phone photo, often huge
 * and in whatever orientation/format the camera chose) and normalizes it:
 * re-encoded to WebP, capped at 1600px wide, auto-rotated from EXIF. This
 * keeps what actually gets served small and consistent regardless of the
 * source file, the same reasoning Sanity's own image pipeline used to
 * handle for us.
 */
export async function uploadContentImage(
  file: File,
  pathPrefix: "news" | "events" | "projects",
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new UploadError("That file isn't an image.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError("Image is too large -- please upload one under 4MB.");
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const outputBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const objectPath = `${pathPrefix}/${crypto.randomUUID()}.webp`;
  const bucket = getAdminStorage().bucket();
  const fileRef = bucket.file(objectPath);

  await fileRef.save(outputBuffer, {
    contentType: "image/webp",
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
  await fileRef.makePublic();

  const bucketName = bucket.name;
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media`;
}
