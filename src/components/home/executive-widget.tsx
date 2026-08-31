"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function ExecutiveHeroWidget() {
  return (
    <div className="relative w-full">
      {/* Executive Card Wrapper */}
      <SpotlightCard className="p-6 sm:p-8 bg-card border-border/90 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
            ITSA this year
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">AY 2026</span>
        </div>

        {/* Three facts about the org, in one brand colour — not a status dashboard */}
        <div className="mt-6 flex divide-x divide-border/80 border-y border-border/80">
          <div className="flex-1 px-3 py-4 text-center">
            <div className="font-mono text-2xl font-black tabular-nums text-primary">
              <AnimatedCounter value={240} suffix="+" />
            </div>
            <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
              Active
              <br />
              members
            </div>
          </div>

          <div className="flex-1 px-3 py-4 text-center">
            <div className="font-mono text-2xl font-black tabular-nums text-primary">
              <AnimatedCounter value={15} suffix="+" />
            </div>
            <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
              Workshops
              <br />
              a year
            </div>
          </div>

          <div className="flex-1 px-3 py-4 text-center">
            <div className="font-mono text-2xl font-black tabular-nums text-primary">
              <AnimatedCounter value={5} />
            </div>
            <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
              Student
              <br />
              departments
            </div>
          </div>
        </div>

        {/* Featured Corporate Announcement Card */}
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-primary">
              <Sparkles className="size-3" /> OFFICIAL ANNOUNCEMENT
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">ACTIVE BULLETIN</span>

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
