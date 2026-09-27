"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface PhotoLightboxProps {
  images: string[];
  /** Article title -- doubles as the caption and the dialog's accessible name. */
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Photo the visitor opened; the lightbox tracks its own index from here. */
  startIndex: number;
  /** Focus goes back here on close, so the visitor keeps their place. */
  finalFocus?: React.RefObject<HTMLElement | null>;
}

/** Distance in px a touch must travel before it counts as a swipe, not a tap. */
const SWIPE_THRESHOLD = 50;

export function PhotoLightbox({
  images,
  alt,
  open,
  onOpenChange,
  startIndex,
  finalFocus,
}: PhotoLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const total = images.length;

  // Re-enter at whichever photo was on screen, not wherever we left off.
  // Adjusted during render rather than in an effect: React re-runs this pass
  // before painting, so the viewer never flashes the previous photo.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setIndex(startIndex);
      setStatus("loading");
    }
  }

  const go = useCallback(
    (delta: number) => {
      setStatus("loading");
      setIndex((prev) => (prev + delta + total) % total);
    },
    [total],
  );

  // Arrow keys are handled on the popup itself; Base UI already traps focus
  // there, so the listener cannot leak to the page behind.
  function handleKeyDown(event: React.KeyboardEvent) {
    if (total < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || total < 2) return;
    const deltaX = event.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    go(deltaX < 0 ? 1 : -1);
  }

  if (total === 0) return null;

  const current = images[index];
  // Hint the browser at the next photo so the arrows feel instant.
  const nextImage = total > 1 ? images[(index + 1) % total] : null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={`fixed inset-0 z-50 bg-black/90 ${
            prefersReducedMotion
              ? ""
              : "duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          }`}
        />
        <DialogPrimitive.Popup
          finalFocus={finalFocus}
          onKeyDown={handleKeyDown}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
          className={`fixed inset-0 z-50 flex flex-col outline-none ${
            prefersReducedMotion
              ? ""
              : "duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          }`}
        >
          {/* Close -- first in the DOM so it is the first thing focus lands on */}
          <DialogPrimitive.Close
            aria-label="Close photo viewer"
            className="absolute top-[calc(0.75rem+env(safe-area-inset-top,0px))] right-3 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white outline-none backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/60"
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          {/* The photo, fitted whole -- never cropped */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-12">
            {status === "error" ? (
              <div className="text-center text-white/80">
                <ImageOff className="mx-auto size-10" aria-hidden="true" />
                <p className="mt-3 text-sm">This photo could not be loaded.</p>
              </div>
            ) : (
              <>
                {status === "loading" && (
                  <div
                    className="absolute inset-4 animate-pulse rounded-xl bg-white/10 sm:inset-12"
                    aria-hidden="true"
                  />
                )}
                <Image
                  key={current}
                  src={current}
                  alt={`${alt} — Photo ${index + 1} of ${total}`}
                  fill
                  sizes="100vw"
                  priority
                  onLoad={() => setStatus("ready")}
                  onError={() => setStatus("error")}
                  /* Always visible: it paints over the skeleton as it arrives.
                     Hiding it until onLoad would leave a blank viewer on any
                     browser that skips the event for a cached image. */
                  className="object-contain p-4 sm:p-12"
                />
              </>
            )}
          </div>

          {/* Caption bar */}
          <div className="flex items-center justify-between gap-4 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:px-12">
            <DialogPrimitive.Title className="font-heading text-sm font-semibold text-white sm:text-base">
              {alt}
            </DialogPrimitive.Title>
            {total > 1 && (
              <p
                role="status"
                aria-live="polite"
                className="shrink-0 font-mono text-xs text-white/70"
              >
                {index + 1} / {total}
              </p>
            )}
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white outline-none backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/60 sm:left-4"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white outline-none backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/60 sm:right-4"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Preloads the next photo without showing it */}
          {nextImage && (
            <Image
              src={nextImage}
              alt=""
              aria-hidden="true"
              width={1}
              height={1}
              priority
              className="pointer-events-none absolute opacity-0"
            />
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
