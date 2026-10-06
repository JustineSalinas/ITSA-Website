"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GridBackground } from "@/components/layout/grid-background";
import { HeaderCollage, type PageHeaderVariant } from "@/components/layout/header-collage/collages";

export type { PageHeaderVariant };

/** Fine paper grain (SVG fractal noise), so the header reads as a page, not a flat fill. */
const PAPER_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface PageHeaderProps {
  title: string;
  description?: string;
  /**
   * A short fact about the page — a count, a term. Not a restatement of the
   * title: "18 student leads", not "LEADERSHIP TEAM". Pages with nothing
   * factual to say get a plain accent rule instead.
   */
  kicker?: string;
  className?: string;
  /**
   * Which page's collage to pin beside the title (#121) -- real photos and
   * paper ephemera specific to that page. Omit for a text-only header.
   */
  variant?: PageHeaderVariant;
  /** Set false to hide the collage while keeping the variant. Defaults to true. */
  showArtwork?: boolean;
}

export function PageHeader({
  title,
  description,
  kicker,
  className,
  variant,
  showArtwork = true,
}: PageHeaderProps) {
  const collage = showArtwork ? variant : undefined;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b-2 border-foreground bg-background py-14 sm:py-20",
        collage && "lg:py-14",
        className
      )}
    >
      {/* Graph-paper grid (same as the content sections) + paper grain */}
      <GridBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: PAPER_GRAIN }}
      />

      <div
        className={cn(
          "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          collage && "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-center lg:gap-12"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-xl md:max-w-2xl lg:max-w-3xl"
        >
          {kicker && (
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {kicker}
            </p>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </motion.div>

        {/* Collage: beside the title on desktop, below it on phones (never behind the text) */}
        {collage && (
          <div className="mx-auto mt-10 w-full max-w-[440px] lg:mt-0 lg:max-w-none">
            <HeaderCollage variant={collage} />
          </div>
        )}
      </div>
    </section>
  );
}
