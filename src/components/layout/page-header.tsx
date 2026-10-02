"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeaderMetaballs } from "@/components/layout/header-metaballs";

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
   * Whether to display the signature ITSA organic connected nodes artwork
   * pinned to the right side of the header. Defaults to true.
   */
  showArtwork?: boolean;
}

export function PageHeader({
  title,
  description,
  kicker,
  className,
  showArtwork = true,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-24",
        className
      )}
    >
      {/* Atmosphere Background overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 20%, transparent 80%)",
          }}
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-brand/10 blur-[130px]" />
      </div>

      {/* Signature Right-Side Connected Nodes / Metaballs Artwork */}
      {showArtwork && (
        <HeaderMetaballs className="w-[300px] opacity-25 sm:w-[400px] sm:opacity-100 md:w-[480px] lg:w-[580px] xl:w-[680px]" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
}
