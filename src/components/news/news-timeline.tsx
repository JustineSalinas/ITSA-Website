"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Globe, Link2, Newspaper } from "lucide-react";
import { toast } from "sonner";
import type { NewsItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
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

async function copyLink(slug: string) {
  const url = `${window.location.origin}/news/${slug}`;
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
  } catch {
    toast.error("Couldn't copy the link");
  }
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
      <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-16 text-center backdrop-blur-md">
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
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
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
                    className="absolute top-8 -left-[1.85rem] size-3 rounded-full border-2 border-background bg-primary sm:-left-[2.35rem]"
                  />

                  {/* Styled as a social post: page header, caption, media, actions. */}
                  <article className="overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-[4px_4px_0_0_var(--foreground)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--foreground)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0">
                    {/* Post header */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 pt-4 sm:flex-nowrap sm:px-5">
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-foreground bg-white">
                        <Image src="/logo.png" alt="" aria-hidden="true" fill sizes="44px" className="object-contain p-1" />
                      </span>
                      <div className="min-w-0 flex-1 basis-40">
                        <p className="text-sm font-bold leading-tight text-foreground sm:truncate">
                          {siteConfig.fullName}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-muted-foreground">
                          <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
                          <span aria-hidden="true">·</span>
                          <Globe className="size-3" aria-label="Public" />
                        </p>
                      </div>
                      {item.category && (
                        <Badge
                          variant="outline"
                          className="shrink-0 border-primary/20 bg-primary/10 font-mono text-xs font-semibold text-primary"
                        >
                          {item.category}
                        </Badge>
                      )}
                    </div>

                    {/* Caption */}
                    <div className="px-4 pt-4 sm:px-5">
                      <h3 className="font-heading text-xl font-extrabold leading-snug tracking-tight text-foreground sm:text-2xl">
                        <Link href={`/news/${item.slug}`} className="hover:text-brand">
                          {item.title}
                        </Link>
                      </h3>
                      {isOpen ? (
                        <div id={panelId} className="mt-3 space-y-3 text-base leading-relaxed text-foreground/90">
                          {item.content.split("\n\n").map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                          {item.tags && item.tags.length > 0 && (
                            <p className="flex flex-wrap gap-x-3 font-semibold text-brand">
                              {item.tags.map((tag) => (
                                <span key={tag}>#{tag}</span>
                              ))}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p id={panelId} className="mt-2 line-clamp-3 text-base leading-relaxed text-foreground/80">
                          {item.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Media: up to two tiles, "+N" on the last when there are more */}
                    {item.images && item.images.length > 0 && (
                      <div
                        className={`mt-4 grid gap-0.5 border-y-2 border-foreground bg-foreground ${
                          item.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                        }`}
                      >
                        {item.images.slice(0, 2).map((src, imgIdx, shown) => (
                          <Link
                            key={src}
                            href={`/news/${item.slug}`}
                            className={`group/media relative block overflow-hidden bg-muted ${
                              shown.length === 1 ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-square"
                            }`}
                            tabIndex={imgIdx === 0 ? 0 : -1}
                            aria-label={imgIdx === 0 ? `Open article: ${item.title}` : undefined}
                            aria-hidden={imgIdx === 0 ? undefined : true}
                          >
                            <Image
                              src={src}
                              alt={imgIdx === 0 ? item.title : ""}
                              fill
                              sizes="(max-width: 768px) 100vw, 480px"
                              className="object-cover transition-transform duration-500 group-hover/media:scale-[1.03]"
                            />
                            {imgIdx === 1 && item.images!.length > 2 && (
                              <span className="absolute inset-0 grid place-items-center bg-foreground/55 text-3xl font-bold text-white">
                                +{item.images!.length - 2}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-1 px-2 py-2 sm:px-3">
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-4 ${prefersReducedMotion ? "" : "transition-transform duration-200"} ${isOpen ? "rotate-180" : ""}`}
                        />
                        {isOpen ? "Show less" : "Read more"}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyLink(item.slug)}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <Link2 aria-hidden="true" className="size-4" />
                        Copy link
                      </button>
                      <Link
                        href={`/news/${item.slug}`}
                        className="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-foreground transition-all hover:gap-2.5 hover:text-brand"
                      >
                        Full article
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
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
            className="px-7"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Show more news ({filtered.length - visibleCount} left)
          </Button>
        </div>
      )}
    </div>
  );
}
