"use client";

import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Rocket, Trophy, Users, Terminal, Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Highlights() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" /> WHY ITSA MATTERS
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            More than a classroom group chat.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">
            ITSA is built by students, for students. We bridge the gap between textbook concepts and real-world tech careers.
          </p>
        </div>
        <Button
          variant="outline"
          className="group rounded-full border-border/80 px-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-accent"
          render={<Link href="/about" />}
        >
          Discover our story
          <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>

      {/* Modern 3D Bento Box Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Bento 1: Large Featured Card (Spans 2 columns on lg screens) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SpotlightCard
            spotlightColor="rgba(52, 169, 224, 0.2)"
            className="flex h-full flex-col justify-between p-8 bg-gradient-to-br from-card/80 to-card/40 border-primary/20"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand/15 text-brand shadow-inner">
                  <Users className="size-7" />
                </span>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  01 / COMMUNITY
                </span>
              </div>

              <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                A thriving network of student builders & mentors
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Connect with fellow IT peers who share your drive. From late-night coding sessions to collaborative projects, you are never building alone.
              </p>
            </div>

            {/* Interactive Stat pills inside Bento 1 */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-border/60 bg-background/50 p-4 backdrop-blur-sm sm:grid-cols-3">
              <div>
                <div className="font-mono text-2xl font-black text-brand">240+</div>
                <div className="text-xs text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-black text-brand-orange">15+</div>
                <div className="text-xs text-muted-foreground">Annual Workshops</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="font-mono text-2xl font-black text-emerald-500">100%</div>
                <div className="text-xs text-muted-foreground">Peer Driven</div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Bento 2: Hands-on Workshops */}
        <motion.div variants={itemVariants}>
          <SpotlightCard spotlightColor="rgba(247, 168, 30, 0.2)" className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-orange/15 text-brand-orange">
                  <Code2 className="size-7" />
                </span>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  02 / SKILLS
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-bold tracking-tight">
                Hands-on practical labs
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Web development, cybersecurity, cloud architecture, and AI—practical sessions led by experienced peers.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5 font-mono text-[11px]">
              <span className="rounded-md bg-secondary/80 px-2 py-1 text-secondary-foreground">Next.js</span>
              <span className="rounded-md bg-secondary/80 px-2 py-1 text-secondary-foreground">Tailwind</span>
              <span className="rounded-md bg-secondary/80 px-2 py-1 text-secondary-foreground">Linux</span>
              <span className="rounded-md bg-secondary/80 px-2 py-1 text-secondary-foreground">Docker</span>
              <span className="rounded-md bg-secondary/80 px-2 py-1 text-secondary-foreground">Python</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Bento 3: Competitions & Hackathons */}
        <motion.div variants={itemVariants}>
          <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)" className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                  <Trophy className="size-7" />
                </span>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  03 / COMPETITIONS
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-bold tracking-tight">
                Hackathons & CTF events
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Sharpen your problem solving in coding challenges, hackathons, and regional tech competitions.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400">
              <Terminal className="size-4" />
              <span>Real prizes, portfolio projects & glory</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Bento 4: Career Pathways (Spans 2 columns on lg screens) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SpotlightCard
            spotlightColor="rgba(147, 51, 234, 0.2)"
            className="flex h-full flex-col justify-between p-8 bg-gradient-to-br from-card/80 via-card/50 to-purple-950/20"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-purple-500/15 text-purple-400">
                  <Rocket className="size-7" />
                </span>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  04 / CAREERS
                </span>
              </div>

              <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Direct launchpad into tech careers & internships
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Get insider access to tech talks, alumni referral networks, and industry partnerships that help you land your dream internship or graduate role.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border/40 pt-6">
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground">
                <Cpu className="size-4 text-purple-400" /> Industry Partners & Tech Talks
              </span>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
