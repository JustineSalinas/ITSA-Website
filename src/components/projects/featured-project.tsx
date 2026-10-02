"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/social";
import { Button } from "@/components/ui/button";
import type { FeaturedProject } from "@/data/featured-project";

// Shares its visual treatment with FeaturedPortfolioCard so the two spotlights
// read as one family on /projects.
export function FeaturedProjectCard({ data }: { data: FeaturedProject }) {
  const reduceMotion = useReducedMotion();
  const previewLabel = data.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full overflow-hidden rounded-3xl border-2 border-foreground bg-card p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0_0_var(--foreground)]"
    >
      {/* Top Badge */}
      <div className="relative z-10 flex justify-center sm:justify-start">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-brand/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand shadow-[2px_2px_0_0_var(--foreground)]">
          <span className="size-2 rounded-full bg-brand" />
          Project of the Month — {data.month}
        </span>
      </div>

      <div className="relative z-10 mt-6 flex flex-col gap-8 lg:flex-row-reverse lg:items-center lg:gap-10">
        {/* Info (sits right of the preview on desktop) */}
        <div className="flex-1 space-y-6 text-center sm:text-left">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {data.title}
            </h2>
            <p className="mt-2 text-base font-medium text-foreground sm:text-lg">
              {data.tagline}
            </p>
            {data.org && (
              <p className="mt-1 text-sm text-muted-foreground">{data.org}</p>
            )}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty max-w-2xl mx-auto sm:mx-0">
            {data.description}
          </p>

          {data.techStack && data.techStack.length > 0 && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {data.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-lg border border-border/80 bg-secondary/50 px-3 py-1 font-mono text-xs font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {(data.liveUrl || data.githubUrl) && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              {data.liveUrl && (
                <Button
                  size="lg"
                  className="group rounded-xl border-2 border-transparent shadow-[4px_4px_0_0_var(--foreground)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
                  render={
                    <a
                      href={data.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  Visit Live Site
                  <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Button>
              )}

              {data.githubUrl && (
                <Button
                  size="lg"
                  variant="outline"
                  className="group rounded-xl border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
                  render={
                    <a
                      href={data.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <GithubIcon className="mr-2 size-4" />
                  View GitHub
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Preview */}
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -5 }}
          className="relative w-full max-w-2xl lg:w-[50%] shrink-0 mx-auto"
        >
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border-2 border-foreground bg-foreground shadow-[6px_6px_0_0_var(--foreground)]">
            {/* Browser Header */}
            <div className="flex items-center gap-2 border-b-2 border-foreground bg-muted px-4 py-3">
              <div className="size-3 shrink-0 rounded-full border border-foreground bg-brand-red" />
              <div className="size-3 shrink-0 rounded-full border border-foreground bg-brand-orange" />
              <div className="size-3 shrink-0 rounded-full border border-foreground bg-brand-cyan" />
              {previewLabel && (
                <div className="ml-2 sm:ml-4 flex h-6 w-full max-w-[240px] items-center rounded-md border border-foreground/20 bg-background/60 px-2 shadow-inner">
                  <span className="text-xs text-muted-foreground truncate">
                    {previewLabel}
                  </span>
                </div>
              )}
            </div>
            {/* Browser Content / Image */}
            <div className="relative aspect-[16/10] w-full bg-card">
              <Image
                src={data.screenshotUrl}
                alt={`Screenshot of ${data.title}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
