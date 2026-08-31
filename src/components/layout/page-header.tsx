"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
}

export function PageHeader({
  title,
  description,
  kicker,
  className,
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
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 20%, transparent 80%)",
          }}
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-brand/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {kicker ? (
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {kicker}
            </p>
          ) : (
            <div className="mb-5 h-0.5 w-8 rounded-full bg-brand-orange" />
          )}

          <h1 className="text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty sm:text-xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
