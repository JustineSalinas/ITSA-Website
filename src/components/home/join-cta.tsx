"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { GridBackground } from "@/components/layout/grid-background";

/**
 * Closing banner. Pure ITSA brand art -- the blob network + wordmark -- with
 * no overlaid copy or button; the join CTAs live elsewhere on the page.
 * Sized to the banner's own ~2.7:1 aspect ratio so object-cover never has to
 * crop/zoom past what the source image already shows.
 *
 * The continuous float (.animate-float, the same utility the hero network
 * visual uses) sits on a plain wrapper div rather than the motion.div below:
 * framer-motion drives its own transform via inline style, which would
 * silently override a CSS transform keyframe animation on the same element.
 * Splitting them onto two elements lets both actually run. .animate-float's
 * animation is neutralised globally under prefers-reduced-motion (see the
 * @media block in globals.css); the hover scale is framer-motion-driven, so
 * it needs the explicit prefersReducedMotion check below instead.
 */
export function JoinCta() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-black bg-white py-20 sm:py-28">
      {/* ── Background Grid Pattern ── */}
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="animate-float">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
            className="relative aspect-[2048/758] overflow-hidden rounded-3xl border border-border/80"
          >
            <Image
              src="/images/itsa-banner.webp"
              alt="ITSA — Information Technology Student Association"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
