"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";


interface NewsMediaGalleryProps {
  images?: string[];
  alt: string;
  className?: string;
  aspectRatio?: string;
  autoPlayInterval?: number;
}

export function NewsMediaGallery({
  images,
  alt,
  className = "",
  aspectRatio = "aspect-[16/10]",
  autoPlayInterval = 4500,
}: NewsMediaGalleryProps) {
  const validImages = images && images.length > 0 ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const prefersReducedMotion = useReducedMotion();

  const total = validImages.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Hover only pauses on devices that have a pointer, so the explicit pause
  // control below is the mechanism touch and keyboard visitors rely on.
  // Reduced motion stops the slideshow outright -- a setInterval is not a CSS
  // animation, so the global prefers-reduced-motion rules cannot reach it.
  const isPlaying =
    total > 1 && !isHovered && !isPaused && !prefersReducedMotion;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPlaying, autoPlayInterval, nextSlide]);

  if (total === 0) return null;

  // Single Image Display
  if (total === 1) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-muted/40 ${aspectRatio} ${className}`}
      >
        <Image
          src={validImages[0]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    );
  }

  // Controls stay visible by default and only fade behind hover on pointer
  // screens, so nothing is unreachable on a phone.
  const controlVisibility =
    "opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 focus-visible:opacity-100";

  // Slideshow with simple smooth slide animation
  return (
    <div
      className={`group/slider relative overflow-hidden rounded-xl bg-muted/50 ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Active Slide Image */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 size-full"
        >
          <Image
            src={validImages[currentIndex]}
            alt={`${alt} - Photo ${currentIndex + 1} of ${total}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      {/* Photo count, and the pause control when the slideshow can run */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsPaused((prev) => !prev);
            }}
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={isPaused}
            className="grid size-6 place-items-center rounded-full bg-black/60 text-white/90 backdrop-blur-md transition-all duration-200 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPaused ? (
              <Play className="size-3" />
            ) : (
              <Pause className="size-3" />
            )}
          </button>
        )}
        <div className="flex items-center rounded-full bg-black/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-white/90 backdrop-blur-md">
          <span>
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>


      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Previous photo"
        className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 grid size-7 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/80 hover:scale-110 ${controlVisibility}`}
      >
        <ChevronLeft className="size-4" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next photo"
        className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 grid size-7 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/80 hover:scale-110 ${controlVisibility}`}
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-2.5 inset-x-0 z-10 flex items-center justify-center gap-1.5">
        {validImages.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDirection(dotIdx > currentIndex ? 1 : -1);
              setCurrentIndex(dotIdx);
            }}
            aria-label={`Go to slide ${dotIdx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIdx === currentIndex
                ? "w-5 bg-white shadow-xs"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
