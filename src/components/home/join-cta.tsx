"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  Code2,
  Users,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { GridBackground } from "@/components/layout/grid-background";

export function JoinCta() {
  return (
    <section className="relative overflow-hidden border-t border-black bg-white py-16 sm:py-24">
      {/* Background Grid Pattern */}
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl"
        >
          {/* Ambient Brand Glows (Pure CSS, crisp and performant) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 size-80 rounded-full bg-brand-orange/15 blur-3xl"
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headline, Value Prop & Action Buttons */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>The official community at {siteConfig.school}</span>
              </div>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl text-pretty leading-tight">
                Step into the Augustinian developer network.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg text-pretty">
                Collaborate on real-world projects, level up through hands-on technical workshops, and connect with senior peers and alumni. Zero barriers: join our active community today.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  size="lg"
                  className="group justify-center font-bold px-7"
                  render={<Link href="/join" />}
                >
                  Join the community
                  <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group justify-center border-zinc-700 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white px-7"
                  render={<Link href="/events" />}
                >
                  Explore events
                  <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </div>

              {/* Feature Checklist */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-zinc-800/80 pt-6 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>No membership fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-blue-400 shrink-0" />
                  <span>9 tech career tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-brand-orange shrink-0" />
                  <span>Peer study squads</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Live Developer Terminal Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl overflow-hidden backdrop-blur-xs">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-4 py-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-red-500/80" />
                    <span className="size-2.5 rounded-full bg-amber-500/80" />
                    <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                    <Terminal className="size-3 text-zinc-400" />
                    <span>itsa-terminal</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400">ONLINE</span>
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-xs leading-relaxed space-y-3">
                  <div>
                    <span className="text-zinc-500">$ </span>
                    <span className="text-zinc-200">itsa connect --community</span>
                  </div>
                  <div className="text-zinc-400 space-y-1">
                    <p className="text-emerald-400 flex items-center gap-1.5">
                      <span>✓</span> Authenticated: Augustinian IT Student
                    </p>
                    <p className="text-blue-400 flex items-center gap-1.5">
                      <span>✓</span> Connected to Discord Hub
                    </p>
                  </div>

                  <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3 space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      Community Highlights
                    </p>
                    <div className="space-y-1.5 text-zinc-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="size-3.5 text-blue-400" /> Hands-on Workshops
                        </span>
                        <span className="text-emerald-400 text-[11px]">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Rocket className="size-3.5 text-amber-400" /> Hackathon Teams
                        </span>
                        <span className="text-emerald-400 text-[11px]">Enlisting</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Users className="size-3.5 text-purple-400" /> Senior Mentorship
                        </span>
                        <span className="text-emerald-400 text-[11px]">Ongoing</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 text-zinc-400">
                    <span className="text-zinc-500">$ </span>
                    <span className="text-blue-300">echo &quot;Ready to build something real?&quot;</span>
                    <p className="text-white mt-1 font-semibold">Join fellow student developers today.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
