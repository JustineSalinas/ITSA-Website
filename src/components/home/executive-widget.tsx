"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Users, Award, TrendingUp, Sparkles, Building2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function ExecutiveHeroWidget() {
  return (
    <div className="relative w-full">
      {/* Executive Card Wrapper */}
      <SpotlightCard className="p-6 sm:p-8 bg-card border-border/90 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              EXECUTIVE BULLETIN & METRICS
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-600" />
            </span>
            AY 2026 ACTIVE
          </span>
        </div>

        {/* Corporate Metrics 4-Grid with Animated Counters */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-muted/40 p-4 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2 text-primary">
              <Users className="size-4" />
              <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">Members</span>
            </div>
            <div className="mt-2 font-mono text-2xl font-black text-foreground">
              <AnimatedCounter value={240} suffix="+" />
            </div>
            <div className="text-[11px] text-muted-foreground">Active IT Students</div>
          </div>

          <div className="rounded-xl border border-border/80 bg-muted/40 p-4 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2 text-amber-700">
              <Award className="size-4" />
              <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">Workshops</span>
            </div>
            <div className="mt-2 font-mono text-2xl font-black text-foreground">
              <AnimatedCounter value={15} suffix="+" />
            </div>
            <div className="text-[11px] text-muted-foreground">Annual Technical Labs</div>
          </div>

          <div className="rounded-xl border border-border/80 bg-muted/40 p-4 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2 text-blue-700">
              <Building2 className="size-4" />
              <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">Directorates</span>
            </div>
            <div className="mt-2 font-mono text-2xl font-black text-foreground">
              <AnimatedCounter value={5} />
            </div>
            <div className="text-[11px] text-muted-foreground">Executive Departments</div>
          </div>

          <div className="rounded-xl border border-border/80 bg-muted/40 p-4 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2 text-emerald-700">
              <TrendingUp className="size-4" />
              <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">Mentorship</span>
            </div>
            <div className="mt-2 font-mono text-2xl font-black text-foreground">
              <AnimatedCounter value={100} suffix="%" />
            </div>
            <div className="text-[11px] text-muted-foreground">Peer & Alumni Support</div>
          </div>
        </div>

        {/* Featured Corporate Announcement Card */}
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-primary">
              <Sparkles className="size-3" /> OFFICIAL ANNOUNCEMENT
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">MARCH 2026</span>
          </div>
          <h4 className="mt-2 text-sm font-bold tracking-tight text-foreground">
            ITSA Annual Tech Summit & Hackathon Registration Open
          </h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Join workshops led by student leads & industry partners. Reserve your spot for upcoming events.
          </p>

          <div className="mt-4 border-t border-primary/10 pt-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all hover:gap-2"
            >
              View event schedule & RSVP
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
