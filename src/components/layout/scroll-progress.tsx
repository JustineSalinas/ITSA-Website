"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Top-of-page scroll progress bar.
 * Smoothly reveals the full-width ITSA brand gradient from left to right.
 * Rendered with razor-sharp edges and zero blur or compression artifacts.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Fast, responsive spring physics: buttery smooth without lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 38,
    restDelta: 0.0005,
  });

  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  // Mask width reveals the gradient across the viewport rather than squishing it
  const width = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  // Completely invisible at scroll position 0 to eliminate initial dot artifacts
  const opacity = useTransform(progress, (v) => (v > 0.002 ? 1 : 0));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden"
    >
      <motion.div
        style={{ width, opacity }}
        className="h-full overflow-hidden will-change-[width]"
      >
        {/* Full-width gradient pinned to viewport width so colors stay in fixed proportion */}
        <div className="h-full w-screen bg-gradient-to-r from-brand via-brand-cyan to-brand-orange" />
      </motion.div>
    </div>
  );
}
