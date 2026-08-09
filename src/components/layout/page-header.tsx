"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
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
          {badge && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 font-mono text-xs font-semibold text-primary">
              {badge}
            </div>
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
