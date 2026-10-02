"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { GithubIcon } from "@/components/icons/social";
import { Button } from "@/components/ui/button";
import type { FeaturedPortfolio } from "@/data/featured-portfolio";

export function FeaturedPortfolioCard({ data }: { data: FeaturedPortfolio }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full overflow-hidden rounded-3xl border-2 border-foreground bg-card p-6 sm:p-8 lg:p-12 shadow-[8px_8px_0_0_var(--foreground)]"
    >
      {/* Background accents */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-orange/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Top Badge */}
      <div className="relative z-10 flex justify-center sm:justify-start">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-brand/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand shadow-[2px_2px_0_0_var(--foreground)]">
          <span className="size-2 rounded-full bg-brand animate-pulse" />
          Portfolio of the Month — {data.month}
        </span>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-10 lg:flex-row lg:items-center">
        {/* Left: Info */}
        <div className="flex-1 space-y-6 text-center sm:text-left">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {data.studentName}
            </h2>
            <p className="mt-2 text-base font-medium text-muted-foreground sm:text-lg">
              {data.role} <span className="mx-2 opacity-50">•</span> {data.section}
            </p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty max-w-2xl mx-auto sm:mx-0">
            "{data.description}"
          </p>

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

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
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
              Visit Live Portfolio
              <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Button>

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

          {data.submissionUrl && (
            <div className="pt-4">
              <a
                href={data.submissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-brand transition-colors"
              >
                <Send className="mr-2 size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                Nominate for next month
              </a>
            </div>
          )}
        </div>

        {/* Right: Browser Mockup */}
        <motion.div
          whileHover={{ y: -5 }}
          className="relative w-full max-w-2xl lg:w-[55%] shrink-0 mx-auto"
        >
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border-2 border-foreground bg-slate-900 shadow-[6px_6px_0_0_var(--foreground)]">
            {/* Browser Header */}
            <div className="flex items-center gap-2 border-b-2 border-foreground bg-muted px-4 py-3">
              <div className="size-3 shrink-0 rounded-full border border-foreground bg-red-400" />
              <div className="size-3 shrink-0 rounded-full border border-foreground bg-amber-400" />
              <div className="size-3 shrink-0 rounded-full border border-foreground bg-emerald-400" />
              <div className="ml-2 sm:ml-4 flex h-6 w-full max-w-[240px] items-center rounded-md border border-foreground/20 bg-background/60 px-2 shadow-inner">
                <span className="text-[10px] text-muted-foreground truncate opacity-70">
                  {data.liveUrl.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </div>
            {/* Browser Content / Image */}
            <div className="relative aspect-[16/10] w-full bg-card">
              <Image
                src={data.screenshotUrl}
                alt={`${data.studentName}'s Portfolio`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
