"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";
import { GridBackground } from "@/components/layout/grid-background";

export function JoinCta() {
  return (
    <section className="relative overflow-hidden border-t border-black bg-white py-14 sm:py-20">
      {/* Background Grid Pattern */}
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-card p-8 sm:p-10 lg:p-12 shadow-[6px_6px_0_0_var(--foreground)]"
        >
          {/* Subtle ambient glow for depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-brand-orange/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left Content Column */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="size-9 shrink-0 transition-transform duration-300 hover:scale-105">
                  <LogoMark priority />
                </div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {siteConfig.fullName}
                </p>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-pretty">
                Build your craft with the Augustinian developer community.
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                Practical workshops, real student projects, hackathons, and direct access to mentors. Open to all IT students at {siteConfig.school}.
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row shrink-0 items-stretch sm:items-center gap-3.5">
              <Button
                size="lg"
                className="group justify-center px-7"
                render={<Link href="/join" />}
              >
                Join the community
                <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group justify-center px-7"
                render={<Link href="/events" />}
              >
                Explore events
                <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
