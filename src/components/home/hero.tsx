"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";

const focusAreas = [
  "Software Engineering",
  "Cybersecurity",
  "Cloud & DevOps",
  "AI & Data Science",
  "UI/UX Design",
  "IoT & Systems",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-white py-16 sm:py-20 lg:py-28 flex items-center">
      {/* ── Centered Hero Content Container ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Institutional Seal & Association Lockup */}
          <div className="flex max-w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <Image
              src="/usa.png"
              alt={`${siteConfig.school} logo`}
              width={56}
              height={56}
              priority
              className="size-10 sm:size-12 object-contain drop-shadow-xs shrink-0"
            />
            <span className="hidden h-7 w-px bg-slate-300 sm:inline" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <LogoMark className="size-7 sm:size-8 shrink-0" />
              <Badge
                variant="outline"
                className="rounded-full border-slate-300 bg-white/95 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-xs"
              >
                <span className="font-mono text-muted-foreground hidden sm:inline">{siteConfig.school}</span>
                <span className="mx-1.5 hidden h-2.5 w-px bg-slate-200 sm:inline" />
                <span className="font-semibold text-slate-900">Official Association</span>
              </Badge>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 sm:mt-7 font-sans text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] sm:leading-[1.08] tracking-tight text-slate-900">
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Information
            </span>{" "}
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Technology
            </span>
            <br />
            <span>Association.</span>
          </h1>

          {/* University Tagline & Subtitle */}
          <p className="mt-3 font-mono text-xs sm:text-sm font-semibold tracking-tight text-slate-600">
            {siteConfig.school}
          </p>

          <p className="mt-3 sm:mt-4 max-w-lg text-sm leading-relaxed text-slate-700 sm:text-base text-pretty">
            The official academic association cultivates technical excellence, software craft,
            and a vibrant student developer network ready to lead.
          </p>

          {/* Action Buttons with Neo-Brutalist Hard Drop Shadows */}
          <div className="mt-7 sm:mt-8 flex w-full flex-col sm:flex-row sm:w-auto items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="group relative rounded-xl border-2 border-slate-800 bg-[#1e3a8a] px-6 text-white shadow-[3px_3px_0px_#0f172a] transition-all hover:-translate-y-0.5 hover:bg-[#172554] hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a] justify-center"
              render={<Link href="/join" />}
            >
              Become a member
              <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group rounded-xl border-2 border-slate-800 bg-white px-6 text-slate-900 shadow-[3px_3px_0px_#0f172a] transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a] justify-center"
              render={<Link href="/events" />}
            >
              Explore events
              <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Focus Area Tags */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center rounded-full border border-slate-300 bg-white/90 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-800 shadow-2xs backdrop-blur-xs transition-colors hover:border-blue-500 hover:text-blue-700"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
