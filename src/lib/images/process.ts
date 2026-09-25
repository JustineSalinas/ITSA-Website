import sharp from "sharp";

/** Longest edge of the stored image. Phone photos are far larger than any card needs. */
const MAX_EDGE = 2000;

/**
 * Decompression-bomb guard: a tiny file can declare a gigantic canvas. sharp
 * rejects anything over this many pixels before it allocates for the decode.
 */
const MAX_INPUT_PIXELS = 50_000_000;

/** Formats storage.rules allows. Detected from the bytes, never from the client. */
const ACCEPTED_FORMATS = new Set(["jpeg", "png", "webp", "gif", "heif"]);

export type ImageErrorCode = "unsupported" | "corrupt" | "too-large-dimensions";

export class ImageError extends Error {
  // Declared longhand (no parameter property) so the file stays runnable under
  // Node's built-in type stripping, which is what the pipeline checks use.
  readonly code: ImageErrorCode;

  constructor(code: ImageErrorCode, message: string) {
    super(message);
    this.name = "ImageError";
    this.code = code;
  }
}

export interface ProcessedImage {
  data: Buffer;
  width: number;
  height: number;
  contentType: "image/webp";
}

/**
 * Validates, orients, downsizes and re-encodes an uploaded image as WebP.
 *
 * Re-encoding is the security control, not just an optimisation: the stored
 * bytes are freshly produced by the encoder, so anything smuggled into the
 * original (polyglot payloads, EXIF/GPS metadata, trailing data) is dropped.
 * Animated GIF/WebP input keeps only its first frame.
 */
export async function processImage(input: Buffer): Promise<ProcessedImage> {
  try {
    const image = sharp(input, { limitInputPixels: MAX_INPUT_PIXELS });

    // `heif` is how sharp reports AVIF as well as HEIC. sharp's prebuilt
    // binaries can't decode HEVC, so a HEIC file passes this check but then
    // fails to decode below and is reported as "corrupt".
    const { format } = await image.metadata();
    if (!format || !ACCEPTED_FORMATS.has(format)) {
      throw new ImageError("unsupported", "Unsupported image type.");
    }

    // rotate() with no args applies EXIF orientation, then drops the tag.
    const { data, info } = await image
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true });

    return { data, width: info.width, height: info.height, contentType: "image/webp" };
  } catch (err) {
    if (err instanceof ImageError) throw err;
    // sharp reports these by message only; there is no error code to match on.
    if (err instanceof Error) {
      if (/pixel limit/i.test(err.message)) {
        throw new ImageError("too-large-dimensions", "Image dimensions are too large.");
      }
      if (/unsupported image format/i.test(err.message)) {
        throw new ImageError("unsupported", "Unsupported image type.");
      }
    }
    throw new ImageError("corrupt", "Could not read that image.");
  }
}
