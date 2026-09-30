"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { answeredFaqs, type FaqEntry } from "@/data/faq";

const categoryOrder = ["Getting Started", "Community & Contact"] as const;

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Homepage FAQ, styled as a code-editor window: explorer sidebar grouped by
 * category, one answer open at a time in a "file" pane with a breadcrumb
 * tab, line-number gutter, markdown-styled heading, and prev/next paging.
 *
 * This mirrors a reference site's editor-chrome FAQ structure and sizing,
 * requested explicitly as structure-only -- rebuilt here in ITSA's own
 * light palette (brand blue in place of the reference's neon green) rather
 * than its dark theme, and with ITSA's own real questions rather than that
 * site's unrelated content. Questions come from src/data/faq.ts. Entries
 * with no written answer stay hidden everywhere.
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
  const active: FaqEntry | undefined = flat[activeIndex];

  if (!active) return null;

  function goTo(delta: number) {
    const next = flat[(activeIndex + delta + flat.length) % flat.length];
    setActiveId(next.id);
  }

  // Decorative gutter only -- not tied to the real answer length, same as
  // the reference's own static line count.
  const gutterLines = Array.from({ length: 22 }, (_, i) => i + 1);

  return (
    <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Questions students ask us
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
          {/* Window chrome bar */}
          <div className="relative flex items-center border-b border-border/70 bg-muted/50 px-4 py-2.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground">
              itsa — faq.md
            </span>
          </div>
          <div className="h-0.5 bg-primary" aria-hidden="true" />

          <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            {/* Explorer / question list */}
            <nav
              aria-label="FAQ categories"
              className="border-b border-border/70 md:max-h-[32rem] md:overflow-y-auto md:border-b-0 md:border-r"
            >
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Explorer
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {flat.length} items
                </span>
              </div>
              {grouped.map((group) => (
                <div key={group.category}>
                  <p className="px-4 pt-3 pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                    <span aria-hidden="true">▸ </span>
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
                            className={`relative flex min-h-11 w-full items-start gap-2 py-3 pl-4 pr-4 text-left text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset ${
                              isActive
                                ? "bg-primary/10 font-semibold text-primary"
                                : "text-foreground hover:bg-accent/60"
                            }`}
                          >
                            {isActive && (
                              <span
                                aria-hidden="true"
                                className="absolute inset-y-0 left-0 w-[3px] bg-primary"
                              />
                            )}
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

            {/* Answer pane */}
            <div className="flex flex-col md:min-h-[32rem]">
              {/* Breadcrumb tab */}
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
                <span className="border-b-2 border-primary pb-2.5 -mb-[11px] font-mono text-xs">
                  <span className="text-muted-foreground">{slugify(active.category)} / </span>
                  <span className="text-foreground">
                    q{String(activeIndex + 1).padStart(2, "0")}.answer
                  </span>
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  MD
                </span>
              </div>

              {/* Line-number gutter + content */}
              <div className="flex flex-1 gap-4 px-4 py-5 sm:px-6">
                <div
                  aria-hidden="true"
                  className="hidden shrink-0 select-none font-mono text-xs leading-7 text-muted-foreground/50 sm:block"
                >
                  {gutterLines.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {active.category}
                  </p>
                  <h3 className="mt-3 text-balance">
                    <span className="font-mono text-muted-foreground/60" aria-hidden="true">
                      #{" "}
                    </span>
                    <span className="font-heading text-lg font-bold tracking-tight sm:text-xl">
                      {active.q}
                    </span>
                  </h3>

                  <div className="mt-5 flex items-center gap-3" aria-hidden="true">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      Answer
                    </span>
                    <span className="h-px flex-1 bg-border/70" />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {active.a}
                  </p>

                  {active.cta && (
                    <div className="mt-6 rounded-lg border border-primary/25 bg-primary/5 p-4">
                      <Link
                        href={active.cta.href}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                      >
                        <span aria-hidden="true">→</span>
                        Next step
                      </Link>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {active.cta.label}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer / pager */}
              <div className="mt-auto flex items-center justify-between border-t border-border/60 px-4 py-3 sm:px-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {activeIndex + 1} / {flat.length}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/80 px-3 font-mono text-xs text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <ArrowRight className="size-3 rotate-180" aria-hidden="true" />
                    prev
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/80 px-3 font-mono text-xs text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    next
                    <ArrowRight className="size-3" aria-hidden="true" />
                  </button>
                </div>
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
