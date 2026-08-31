"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";

import { ParticleCanvas } from "@/components/ui/particle-canvas";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-background to-muted/20 pb-20 pt-14 sm:pb-28 sm:pt-24">
      {/* Particle Canvas Motion Mesh */}
      <ParticleCanvas />

      {/* Atmosphere Background Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 80%)",
          }}
        />
      </div>

      {/* Single centred column. Narrower than the page so the headline keeps a
          comfortable reading measure instead of stretching edge to edge. */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Institutional lockup: the university mark beside ours, which is
              the fastest signal that this is an official organisation. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <Image
              src="/usa.png"
              alt={`${siteConfig.school} logo`}
              width={72}
              height={72}
              priority
              className="size-14 object-contain sm:size-16"
            />
            <span className="h-10 w-px bg-border" aria-hidden="true" />
            <LogoMark className="size-14 sm:size-16" />
          </motion.div>

          {/* Official Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-7"
          >
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2.5 rounded-full border-primary/20 bg-card px-3.5 py-1.5 text-xs font-medium shadow-xs"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-muted-foreground">{siteConfig.school}</span>
              <span className="h-3 w-px bg-border" />
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <LogoMark className="size-3.5 shrink-0" />
                Official Student Association
              </span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[1.04] tracking-tight text-balance text-foreground"
          >
            Empowering IT students to{" "}
            <span className="bg-gradient-to-r from-primary via-blue-900 to-amber-700 bg-clip-text text-transparent">
              lead &amp; innovate.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            <strong className="text-foreground">{siteConfig.fullName}</strong> is the
            official academic association at {siteConfig.school}. We cultivate technical
            excellence, career opportunities, and a strong professional community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              className="group relative w-full overflow-hidden bg-primary px-6 text-primary-foreground shadow-md transition-all hover:bg-primary/90 sm:w-auto"
              render={<Link href="/join" />}
            >
              Become a member
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-border/80 bg-card transition-all hover:border-primary/40 hover:bg-accent sm:w-auto"
              render={<Link href="/events" />}
            >
              Explore events &amp; workshops
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
