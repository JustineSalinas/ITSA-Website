"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, GraduationCap, Briefcase, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";
import { ExecutiveHeroWidget } from "./executive-widget";

import { ParticleCanvas } from "@/components/ui/particle-canvas";

const pillars = [
  { title: "Technical Mastery", icon: Code2, desc: "Software, Cloud & CyberSec" },
  { title: "Industry Partnerships", icon: Briefcase, desc: "Internships & Company Network" },
  { title: "Academic Growth", icon: GraduationCap, desc: "Peer Mentorship & Tutoring" },
  { title: "Student Leadership", icon: ShieldCheck, desc: "Committee & Governance Roles" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-background to-muted/20 pb-16 pt-12 sm:pb-24 sm:pt-20">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Official Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
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
                lead & innovate.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
            >
              <strong className="text-foreground">{siteConfig.fullName}</strong> is the official academic association at{" "}
              {siteConfig.school}. We cultivate technical excellence, career opportunities, and a strong professional community.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary px-6 text-primary-foreground shadow-md transition-all hover:bg-primary/90"
                render={<Link href="/join" />}
              >
                Become a member
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/80 bg-card transition-all hover:border-primary/40 hover:bg-accent"
                render={<Link href="/events" />}
              >
                Explore events & workshops
              </Button>
            </motion.div>

            {/* Strategic Pillars Bar (replacing old focus pills) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-border/60"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Association Strategic Pillars
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pillars.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-border/80 bg-card p-3 shadow-xs transition-colors hover:border-primary/40"
                    >
                      <Icon className="size-4 text-primary" />
                      <div className="mt-2 text-xs font-bold text-foreground leading-tight">{item.title}</div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">{item.desc}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Content: Executive Bulletin & Metrics Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <ExecutiveHeroWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
