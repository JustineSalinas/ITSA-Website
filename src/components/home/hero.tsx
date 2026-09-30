"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { HeroLogo } from "@/components/home/hero-logo";
import { HeroMetaballs } from "@/components/home/hero-metaballs";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-white py-8 sm:py-12 lg:py-0 flex items-center min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4.5rem)] 2xl:min-h-[840px]">
      
      {/* ── Left Interactive Metaballs Artwork (Desktop): Covers full height, interactive 3D parallax, and gradient fade so it never blocks text ── */}
      <div 
        className="absolute inset-y-0 left-0 z-0 hidden lg:block w-[46vw] xl:w-[50vw] max-w-[760px] 2xl:max-w-[840px] pointer-events-auto select-none"
      >
        <HeroMetaballs className="w-full h-full" />
      </div>

      {/* ── Ambient Background Glow for Mobile (< lg): soft brand-tinted blur
           instead of the sharp, saturated blob artwork, which read as a
           harsh sticker sheet fighting the headline on small screens.
           A gentle float keeps it feeling alive without needing a pointer. ── */}
      <div className="pointer-events-none absolute inset-0 z-0 block overflow-hidden lg:hidden" aria-hidden="true">
        <div className="animate-float absolute -left-16 -top-16 size-56 rounded-full bg-brand/10 blur-3xl" />
        <div className="animate-float absolute -right-12 top-1/3 size-48 rounded-full bg-brand-orange/10 blur-3xl [animation-delay:-3s]" />
      </div>

      {/* ── Main Hero Grid: 3-column layout matching reference structure ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,380px)_minmax(480px,720px)_minmax(240px,460px)] xl:grid-cols-[minmax(240px,440px)_minmax(540px,760px)_minmax(280px,500px)] items-center justify-between gap-6 lg:gap-4 xl:gap-8 min-h-[580px] lg:min-h-[640px] py-6 lg:py-10">

          {/* Left Column Spacer (holds space matching the left pinned artwork) */}
          <div className="hidden lg:block w-full pointer-events-none" aria-hidden="true" />

          {/* Center Column: Hero Text Content (Centered) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="flex flex-col items-center text-center w-full max-w-xl xl:max-w-2xl mx-auto z-10"
          >
            {/* Institutional Seal & Association Lockup */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <Image
                src="/usa.png"
                alt={`${siteConfig.school} logo`}
                width={56}
                height={56}
                priority
                className="size-10 sm:size-12 object-contain drop-shadow-xs shrink-0"
              />
              <span className="h-7 w-px bg-slate-300" aria-hidden="true" />
              <LogoMark className="size-9 sm:size-10 shrink-0" />
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 sm:mt-6 font-sans text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] 2xl:text-6xl font-black leading-[1.12] sm:leading-[1.08] tracking-tight text-slate-900 text-balance">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                Information
              </span>{" "}
              <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Technology
              </span>
              <br />
              <span>Student Association.</span>
            </h1>

            {/* University Tagline & Subtitle */}
            <p className="mt-3 font-mono text-xs sm:text-sm font-semibold tracking-tight text-slate-600">
              {siteConfig.school}
            </p>

            {/* Interactive Logo for Mobile (< lg) inserted directly in flow */}
            <div className="my-5 flex lg:hidden items-center justify-center w-full">
              <HeroLogo className="w-[240px] sm:w-[280px]" priority={false} />
            </div>

            <p className="mt-2 sm:mt-3 max-w-lg text-sm leading-relaxed text-slate-700 sm:text-base text-pretty">
              The official academic association cultivates technical excellence, software craft,
              and a vibrant student developer network ready to lead.
            </p>

            {/* Action Buttons with Neo-Brutalist Hard Drop Shadows */}
            <div className="mt-6 sm:mt-8 flex w-full flex-col sm:flex-row sm:w-auto items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="group relative rounded-xl border-2 border-slate-800 bg-[#1e3a8a] px-6 text-white shadow-[3px_3px_0px_#0f172a] transition-all hover:-translate-y-0.5 hover:bg-[#172554] hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a] justify-center w-full sm:w-auto"
                render={<Link href="/join" />}
              >
                Become a member
                <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group rounded-xl border-2 border-slate-800 bg-white px-6 text-slate-900 shadow-[3px_3px_0px_#0f172a] transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a] justify-center w-full sm:w-auto"
                render={<Link href="/events" />}
              >
                Explore events
                <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Animated Hero Blob Logo (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-end w-full z-10">
            <HeroLogo className="w-[300px] lg:w-[340px] xl:w-[420px] 2xl:w-[480px]" priority />
          </div>

        </div>
      </div>
    </section>
  );
}
