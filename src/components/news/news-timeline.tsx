"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, ChevronDown, Newspaper, User } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsMediaGallery } from "@/components/news/news-media-gallery";
import { formatNewsDate } from "@/lib/format";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Entries shown before the visitor asks for more. */
const PAGE_SIZE = 10;

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
}

function monthLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function NewsTimeline({ news }: { news: NewsItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const found = new Set<string>();
    news.forEach((item) => item.category && found.add(item.category));
    return Array.from(found).sort();
  }, [news]);

  const sorted = useMemo(
    () => [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [news],
  );

  // An article linked from elsewhere (/news#slug) has to be on screen and
  // already open, however deep in the list it sits.
  //
  // This runs after mount, not during render: location.hash exists only in the
  // browser, so opening the entry while hydrating would make the client's first
  // render disagree with the server HTML. The eslint rule below guards against
  // cascading renders, which is not what this is -- it fires once, from a value
  // that cannot be read on the server.
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    const position = sorted.findIndex((item) => item.slug === slug);
    if (position < 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenIds(new Set([sorted[position].id]));
    if (position >= PAGE_SIZE) setVisibleCount(position + 1);
    // The browser jumps to the anchor before the entry exists, so re-aim once
    // it is on screen.
    document.getElementById(slug)?.scrollIntoView({ block: "start" });
  }, [sorted]);

  const filtered = category === "all" ? sorted : sorted.filter((i) => i.category === category);
  const visible = filtered.slice(0, visibleCount);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function chooseCategory(next: string) {
    setCategory(next);
    setVisibleCount(PAGE_SIZE);
  }

  if (news.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-16 text-center backdrop-blur-md">
        <Newspaper className="mx-auto size-10 text-muted-foreground/60" aria-hidden="true" />
        <h2 className="mt-4 font-heading text-lg font-semibold">No news yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Check back soon for announcements, workshop updates, and student milestones.
        </p>
      </div>
    );
  }

  // Month headings are worked out up front rather than tracked while
  // rendering: an entry shows one when its month differs from the entry above.
  // They stay inside the single list so a screen reader hears every article in
  // date order.
  const entries = visible.map((item, i) => ({
    item,
    showHeading: i === 0 || monthKey(item.date) !== monthKey(visible[i - 1].date),
  }));

  return (
    <div>
      {categories.length > 1 && (
        <div
          className="mb-10 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter news by category"
        >
          {["all", ...categories].map((option) => {
            const isActive = category === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => chooseCategory(option)}
                aria-pressed={isActive}
                className={`min-h-11 rounded-full px-4 py-2 text-xs font-semibold outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/60 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {option === "all" ? "All news" : option}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
          <p className="text-sm text-muted-foreground">No news in this category yet.</p>
        </div>
      ) : (
        <ol className="relative space-y-4 border-l border-border/70 pl-6 sm:pl-8">
          {entries.map(({ item, showHeading }) => {
            const isOpen = openIds.has(item.id);
            const panelId = `news-panel-${item.id}`;

            return (
              <li key={item.id} id={item.slug} className="scroll-mt-24">
                {showHeading && (
                  <h2 className="-ml-6 mb-4 pt-6 font-heading text-lg font-bold tracking-tight sm:-ml-8 sm:text-xl">
                    {monthLabel(item.date)}
                  </h2>
                )}

                <div className="relative">
                  {/* Date dot sitting on the line */}
                  <span
                    aria-hidden="true"
                    className="absolute top-6 -left-[1.85rem] size-3 rounded-full border-2 border-background bg-primary sm:-left-[2.35rem]"
                  />

                  <div className="overflow-hidden rounded-xl border border-border/80 bg-card/85 shadow-sm backdrop-blur-md transition-colors hover:border-primary/40">
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="flex w-full items-start gap-4 p-5 text-left outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 sm:p-6"
                      >
                        {item.images && item.images.length > 0 && (
                          <span className="relative hidden size-20 shrink-0 overflow-hidden rounded-lg bg-muted/50 sm:block">
                            <Image
                              src={item.images[0]}
                              alt=""
                              aria-hidden="true"
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </span>
                        )}

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                            <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                            {dayLabel(item.date)}
                            {item.category && (
                              <Badge
                                variant="outline"
                                className="border-primary/20 bg-primary/10 font-mono text-xs font-semibold text-primary"
                              >
                                {item.category}
                              </Badge>
                            )}
                          </span>

                          <span className="mt-2 block font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                            {item.title}
                          </span>

                          {!isOpen && (
                            <span className="mt-1.5 line-clamp-2 block text-sm text-muted-foreground">
                              {item.excerpt}
                            </span>
                          )}
                        </span>

                        <ChevronDown
                          aria-hidden="true"
                          className={`mt-1 size-5 shrink-0 text-muted-foreground ${
                            prefersReducedMotion ? "" : "transition-transform duration-200"
                          } ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </h3>

                    {/* Mounted only while open: a hidden gallery would still
                        run its slideshow timer in the background. */}
                    {isOpen && (
                      <div id={panelId} className="border-t border-border/60 px-5 pt-5 pb-6 sm:px-6">
                        {item.author && (
                          <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                            <User className="size-3.5 text-primary" aria-hidden="true" />
                            Posted by <strong className="text-foreground">{item.author.name}</strong>{" "}
                            ({item.author.role})
                          </p>
                        )}

                        {item.images && item.images.length > 0 && (
                          <div className="mt-5">
                            <NewsMediaGallery
                              images={item.images}
                              alt={item.title}
                              aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
                            />
                          </div>
                        )}

                        <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/90">
                          {item.content.split("\n\n").map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                        </div>

                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-2 border-t border-border/40 pt-4">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-secondary/80 px-2.5 py-1 font-mono text-xs font-medium text-secondary-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="mt-4 font-mono text-xs text-muted-foreground">
                          {formatNewsDate(item.date)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {visibleCount < filtered.length && (
        <div className="mt-10 text-center">
          <Button
            type="button"
            variant="outline"
            className="h-11 px-5"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Show more news ({filtered.length - visibleCount} left)
          </Button>
        </div>
      )}
    </div>
  );
}
