"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { answeredFaqs } from "@/data/faq";

const categoryOrder = ["Getting Started", "Community & Contact"] as const;

/**
 * Homepage FAQ, presented as a categorized explorer: a question list on one
 * side, one answer expanded at a time on the other, with prev/next to step
 * through every question in order. The 01/02-style numbering is already an
 * established label pattern in this design system (see DESIGN.md's
 * Typography hierarchy), just applied here across categories instead of a
 * flat list.
 *
 * Questions come from src/data/faq.ts, the same source as the Join page FAQ
 * and the Ask ITSA panel, so an answer is written once. Entries with no
 * written answer stay hidden everywhere.
 */
export function HomeFaq() {
  const flat = answeredFaqs;
  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: flat.filter((f) => f.category === category),
    }))
    .filter((group) => group.items.length > 0);

  const [activeId, setActiveId] = useState(flat[0]?.id);
  const activeIndex = flat.findIndex((f) => f.id === activeId);
  const active = flat[activeIndex];

  if (!active) return null;

  function goTo(delta: number) {
    const next = flat[(activeIndex + delta + flat.length) % flat.length];
    setActiveId(next.id);
  }

  return (
    <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Questions students ask us
          </h2>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-2xl border border-border/80 bg-card md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Question list, grouped by category */}
          <nav
            aria-label="FAQ categories"
            className="border-b border-border/70 p-2 md:max-h-[28rem] md:overflow-y-auto md:border-b-0 md:border-r"
          >
            <p className="px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {flat.length} questions
            </p>
            {grouped.map((group) => (
              <div key={group.category} className="mt-1 first:mt-0">
                <p className="px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {group.category}
                </p>
                <ul className="list-none">
                  {group.items.map((item) => {
                    const globalIndex = flat.findIndex((f) => f.id === item.id);
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(item.id)}
                          aria-current={isActive}
                          className={`flex w-full min-h-11 items-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 ${
                            isActive
                              ? "bg-primary/10 font-semibold text-primary"
                              : "text-foreground hover:bg-accent/60"
                          }`}
                        >
                          <span className="shrink-0 pt-px font-mono text-xs text-muted-foreground">
                            {String(globalIndex + 1).padStart(2, "0")}
                          </span>
                          <span>{item.q}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Detail panel */}
          <div className="flex flex-col p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {active.category}
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-balance sm:text-2xl">
              {active.q}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {active.a}
            </p>
            {active.cta && (
              <Link
                href={active.cta.href}
                className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                {active.cta.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
              <span className="font-mono text-xs text-muted-foreground">
                {activeIndex + 1} / {flat.length}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Previous question"
                  className="grid size-11 place-items-center rounded-lg border border-border/80 text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Next question"
                  className="grid size-11 place-items-center rounded-lg border border-border/80 text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Still have a question?{" "}
          <Link href="/join" className="font-semibold text-primary hover:underline">
            Send us a message
          </Link>{" "}
          and an officer will reply.
        </p>
      </div>
    </section>
  );
}
