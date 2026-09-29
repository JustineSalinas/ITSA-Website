"use client";

import { useCallback, useId, useRef, useState } from "react";
import { ImageIcon, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { UploadFolder } from "@/lib/validations";

// ── Types ────────────────────────────────────────────────────────────────────

interface ImageUploadFieldProps {
  /** Which Firebase Storage sub-folder to place the file in. */
  folder: UploadFolder;
  /** Current hosted image URL (controlled). */
  value?: string;
  /** Called with the newly-hosted URL after a successful upload. */
  onChange: (url: string) => void;
  /** Optional visible label rendered above the drop zone. */
  label?: string;
}

interface UploadSuccess {
  ok: true;
  url: string;
  width: number;
  height: number;
  bytes: number;
}

interface UploadError {
  error: string;
}

type UploadResponse = UploadSuccess | UploadError;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Largest file the picker/drop zone accepts (10 MiB). */
const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Compression target, kept safely under the server's 4 MiB cap (itself kept
 * under Vercel's ~4.5 MB function body limit -- a platform limit, not one
 * the app can raise). Anything selected between this and MAX_BYTES gets
 * shrunk client-side before it ever hits the network, so "up to 10 MB" in
 * the UI stays true without the request ever risking a platform-level
 * rejection the app can't explain to the user.
 */
const TARGET_BYTES = 3.5 * 1024 * 1024;

/** Long edge cap for the pre-upload resize. The server re-encodes down to
 *  2000px anyway; this just gets multi-megapixel phone photos into range
 *  fast without relying on quality reduction alone. */
const MAX_DIMENSION = 2400;

/** Quick client-side pre-flight. Returns an error string or null. */
function validateFile(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return `"${file.name}" is not an image file.`;
  }
  if (file.size > MAX_BYTES) {
    return `"${file.name}" is ${(file.size / 1024 / 1024).toFixed(1)} MB — please keep images under 10 MB.`;
  }
  return null;
}

/**
 * Resizes/re-encodes the file in-browser when it's over TARGET_BYTES, so a
 * large photo a user picks actually fits the server's cap. Animated GIFs are
 * left untouched -- canvas only captures the first frame, which would
 * silently kill the animation -- and the server's own cap is still the
 * source of truth if compression can't get small enough or fails outright.
 */
async function compressImage(file: File): Promise<File> {
  if (file.size <= TARGET_BYTES || file.type === "image/gif") return file;

  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;
  if (Math.max(width, height) > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  // Step quality down until it fits, or give up after a few tries -- the
  // server enforces its own cap regardless, this just avoids a guaranteed
  // rejection for the common "12 MP phone photo" case.
  let quality = 0.85;
  let blob: Blob | null = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality),
    );
    if (!blob || blob.size <= TARGET_BYTES) break;
    quality -= 0.15;
  }

  if (!blob) return file;
  return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Controlled image upload field for admin forms.
 *
 * Wire it into react-hook-form with `<Controller>` and pass the field's
 * `value` / `onChange` straight through:
 *
 * ```tsx
 * <Controller
 *   control={control}
 *   name="photoUrl"
 *   render={({ field }) => (
 *     <ImageUploadField
 *       folder="officers"
 *       value={field.value}
 *       onChange={field.onChange}
 *       label="Photo"
 *     />
 *   )}
 * />
 * ```
 */
export function ImageUploadField({
  folder,
  value,
  onChange,
  label,
}: ImageUploadFieldProps) {
  // A stable ID so the hidden input is reachable by keyboard without a ref.
  const inputId = useId();

  // Local blob URL shown while the XHR is in flight.
  const [preview, setPreview] = useState<string | null>(null);

  // 0–100 while uploading, null when idle or done.
  const [progress, setProgress] = useState<number | null>(null);

  // Exact server error message, or null.
  const [error, setError] = useState<string | null>(null);

  // Whether the user is dragging a file over the zone.
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // The displayed image: use the committed hosted URL unless we're in the
  // middle of an upload, in which case show the local preview instead.
  const displaySrc = preview ?? value ?? null;
  const isUploading = progress !== null;

  // ── Upload logic ────────────────────────────────────────────────────────

  const upload = useCallback(
    (file: File) => {
      // Client-side pre-check — gives instant feedback without a round-trip.
      const clientError = validateFile(file);
      if (clientError) {
        setError(clientError);
        return;
      }

      setError(null);

      // Show an immediate local preview so the user can see their file right
      // away while compression and the network request run.
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setProgress(0);

      void (async () => {
        let toSend: File;
        try {
          toSend = await compressImage(file);
        } catch {
          // Compression is a best-effort shrink, not a requirement — if it
          // throws for any reason, fall back to the original file and let
          // the server's own cap be the final word.
          toSend = file;
        }

        const formData = new FormData();
        formData.append("file", toSend);
        formData.append("folder", folder);

        const xhr = new XMLHttpRequest();

        // Drive the progress bar off real XHR upload events.
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          // Always clean up the blob URL — hosted URL or not.
          URL.revokeObjectURL(objectUrl);
          setPreview(null);
          setProgress(null);

          let body: UploadResponse;
          try {
            body = JSON.parse(xhr.responseText) as UploadResponse;
          } catch {
            setError("Unexpected server response. Please try again.");
            return;
          }

          if ("error" in body) {
            // Surface the exact server message (oversized, wrong type, rate
            // limit, etc.) so the user knows exactly what went wrong.
            setError(body.error);
            return;
          }

          onChange(body.url);
        };

        xhr.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          setPreview(null);
          setProgress(null);
          setError("Network error — check your connection and try again.");
        };

        xhr.open("POST", "/api/admin/upload");
        // Include the session cookie so the route handler can authenticate.
        xhr.withCredentials = true;
        xhr.send(formData);
      })();
    },
    [folder, onChange],
  );

  // ── Event handlers ──────────────────────────────────────────────────────

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      upload(files[0]);
    },
    [upload],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset so the same file can be re-selected after a failed upload.
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (!isUploading) handleFiles(e.dataTransfer.files);
  };

  const handleZoneClick = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isUploading && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleRemove = () => {
    setError(null);
    onChange("");
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={inputId}>{label}</Label>}

      {/* Hidden native file input — gives mobile users their camera/gallery
          picker without any JS-only drop zone library. */}
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {displaySrc ? (
        /* ── Preview state ─────────────────────────────────────────────── */
        <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displaySrc}
            alt="Upload preview"
            className="aspect-video w-full object-cover"
          />

          {isUploading ? (
            /* Progress overlay */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 backdrop-blur-sm">
              <Loader2 className="size-5 animate-spin text-primary" />
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-150"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress ?? 0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Upload progress"
                />
              </div>
              <p className="text-xs text-muted-foreground">{progress}%</p>
            </div>
          ) : (
            /* Remove + replace controls */
            <div className="absolute right-2 top-2 flex gap-1.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleZoneClick}
                className="h-7 gap-1 px-2 text-xs shadow-sm"
              >
                <ImageIcon className="size-3.5" />
                Replace
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                onClick={handleRemove}
                aria-label="Remove image"
                className="shadow-sm"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* ── Drop zone (empty state) ───────────────────────────────────── */
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload image — click to browse or drag and drop"
          onClick={handleZoneClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            // Base: dashed-border empty-state card treatment matching the
            // design system (DESIGN.md §5 Cards — "dashed-border variant for
            // empty states").
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-10 text-center transition-colors",
            // Drag-over: shift border to the brand ring color per the
            // existing focus-ring convention.
            dragOver && "border-ring bg-primary/5",
            // Keyboard / hover highlight without pointer events while uploading.
            !dragOver &&
              "hover:border-ring/60 hover:bg-muted/30 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          )}
        >
          <div className="grid size-10 place-items-center rounded-lg bg-muted text-muted-foreground">
            <ImageIcon className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Drag an image here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, WebP, GIF · up to 10 MB
            </p>
          </div>
        </div>
      )}

      {/* Inline error message — exact text from the server or client pre-check */}
      {error && (
        <p role="alert" className="flex items-start gap-1.5 text-xs text-destructive">
          <span aria-hidden="true" className="mt-px shrink-0 leading-none">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
