"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Globe,
  Heart,
  MessageCircle,
  Newspaper,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { toast } from "sonner";
import type { NewsItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { formatNewsDate } from "@/lib/format";

/** Entries shown before the visitor asks for more. */
const PAGE_SIZE = 10;

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
}

function monthLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

type ReactionType = "like" | "love" | "care" | "haha" | "wow" | "sad" | "angry";

interface ReactionDef {
  id: ReactionType;
  label: string;
  emoji: string;
  renderIcon: () => React.ReactNode;
}

const REACTIONS: ReactionDef[] = [
  {
    id: "like",
    label: "Like",
    emoji: "👍",
    renderIcon: () => (
      <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#1877F2] text-white shadow-md">
        <ThumbsUp className="size-4 sm:size-4.5 fill-white text-white" />
      </span>
    ),
  },
  {
    id: "love",
    label: "Love",
    emoji: "❤️",
    renderIcon: () => (
      <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#FA3E3E] text-white shadow-md">
        <Heart className="size-4 sm:size-4.5 fill-white text-white" />
      </span>
    ),
  },
  {
    id: "care",
    label: "Care",
    emoji: "🥰",
    renderIcon: () => (
      <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#F7B125] text-xl sm:text-2xl leading-none select-none shadow-md">
        🥰
      </span>
    ),
  },
  {
    id: "haha",
    label: "Haha",
    emoji: "😆",
    renderIcon: () => (
      <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#F7B125] text-xl sm:text-2xl leading-none select-none shadow-md">
        😆
      </span>
    ),
  },
  {
    id: "wow",
    label: "Wow",
    emoji: "😮",
    renderIcon: () => (
      <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#F7B125] text-xl sm:text-2xl leading-none select-none shadow-md">
        😮
      </span>
    ),
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    renderIcon: () => (
      <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#F7B125] text-xl sm:text-2xl leading-none select-none shadow-md">
        😢
      </span>
    ),
  },
  {
    id: "angry",
    label: "Angry",
    emoji: "😡",
    renderIcon: () => (
      <span className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#E9710F] text-xl sm:text-2xl leading-none select-none shadow-md">
        😡
      </span>
    ),
  },
];

function renderActiveReactionIcon(reaction?: ReactionType) {
  switch (reaction) {
    case "like":
      return <ThumbsUp className="size-4 sm:size-[18px] fill-[#1877F2] text-[#1877F2] scale-110 transition-transform" />;
    case "love":
      return <Heart className="size-4 sm:size-[18px] fill-[#FA3E3E] text-[#FA3E3E] scale-110 transition-transform" />;
    case "care":
      return <span className="text-base sm:text-lg leading-none scale-110 transition-transform select-none">🥰</span>;
    case "haha":
      return <span className="text-base sm:text-lg leading-none scale-110 transition-transform select-none">😆</span>;
    case "wow":
      return <span className="text-base sm:text-lg leading-none scale-110 transition-transform select-none">😮</span>;
    case "sad":
      return <span className="text-base sm:text-lg leading-none scale-110 transition-transform select-none">😢</span>;
    case "angry":
      return <span className="text-base sm:text-lg leading-none scale-110 transition-transform select-none">😡</span>;
    default:
      return <ThumbsUp className="size-4 sm:size-[18px] text-muted-foreground transition-transform" />;
  }
}

async function copyLink(slug: string) {
  const url = `${window.location.origin}/news/${slug}`;
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  } catch {
    toast.error("Couldn't copy the link");
  }
}

export function NewsTimeline({ news }: { news: NewsItem[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [userReactions, setUserReactions] = useState<Record<string, ReactionType>>({});
  const [hoveredPickerId, setHoveredPickerId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    const position = sorted.findIndex((item) => item.slug === slug);
    if (position < 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenIds(new Set([sorted[position].id]));
    if (position >= PAGE_SIZE) setVisibleCount(position + 1);
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

  const showPicker = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredPickerId(id);
  };

  const hidePicker = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPickerId(null);
    }, 350);
  };

  function selectReaction(id: string, reaction: ReactionType) {
    setUserReactions((prev) => ({ ...prev, [id]: reaction }));
    setHoveredPickerId(null);
  }

  function toggleReaction(id: string) {
    setUserReactions((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = "like";
      }
      return next;
    });
  }

  async function handleShare(item: NewsItem) {
    await copyLink(item.slug);
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
            const currentReaction = userReactions[item.id];
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

                  {/* Styled as a social post: profile, date, caption, pic, reacts, comments, share, and emoji */}
                  <article className="overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-[4px_4px_0_0_var(--foreground)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--foreground)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0">
                    {/* Post header: Profile avatar, name, verified badge, date */}
                    <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="relative size-10 sm:size-11 shrink-0 overflow-hidden rounded-full border-2 border-foreground bg-white shadow-[1px_1px_0_0_var(--foreground)]">
                          <Image
                            src="/logo.png"
                            alt=""
                            aria-hidden="true"
                            fill
                            sizes="44px"
                            className="object-contain p-1"
                          />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 leading-tight">
                            <span className="text-sm sm:text-[15px] font-bold text-foreground truncate">
                              {siteConfig.fullName}
                            </span>
                            <span className="inline-flex items-center text-[#1877F2]" title="Verified Page">
                              <CheckCircle2 className="size-3.5 fill-[#1877F2] text-white" />
                            </span>
                          </div>
                          <p className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-muted-foreground">
                            <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
                            <span aria-hidden="true">·</span>
                            <Globe className="size-3" aria-label="Public" />
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Caption: Title, body text, see more */}
                    <div className="px-4 pt-3.5 pb-2 sm:px-5">
                      <h3 className="font-heading text-xl font-extrabold leading-snug tracking-tight text-foreground sm:text-2xl">
                        <Link href={`/news/${item.slug}`} className="transition-colors hover:text-brand">
                          {item.title}
                        </Link>
                      </h3>

                      {isOpen ? (
                        <div id={panelId} className="mt-2.5 space-y-3 text-sm sm:text-base leading-relaxed text-foreground/90">
                          {item.content.split("\n\n").map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                          {item.tags && item.tags.length > 0 && (
                            <p className="flex flex-wrap gap-x-2.5 gap-y-1 font-semibold text-brand text-xs sm:text-sm">
                              {item.tags.map((tag) => (
                                <span key={tag}>#{tag}</span>
                              ))}
                            </p>
                          )}
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => toggle(item.id)}
                              className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
                            >
                              See less
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p id={panelId} className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/80">
                          {item.excerpt}{" "}
                          <button
                            type="button"
                            onClick={() => toggle(item.id)}
                            className="font-semibold text-foreground hover:underline cursor-pointer"
                          >
                            ... See more
                          </button>
                        </p>
                      )}
                    </div>

                    {/* Media: Image / gallery full width across card */}
                    {item.images && item.images.length > 0 && (
                      <div
                        className={`mt-2.5 grid gap-0.5 border-y-2 border-foreground bg-foreground ${
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
                              sizes="(max-width: 768px) 100vw, 680px"
                              className="object-cover transition-transform duration-500 group-hover/media:scale-[1.02]"
                            />
                            {imgIdx === 1 && item.images!.length > 2 && (
                              <span className="absolute inset-0 grid place-items-center bg-foreground/60 text-3xl font-bold text-white backdrop-blur-[2px]">
                                +{item.images!.length - 2}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Engagement bar: reacts with floating emoji picker, comments, share, and emoji cluster on right */}
                    <div className="flex items-center justify-between border-t border-border/70 bg-card px-3 py-2 sm:px-4">
                      {/* Left: Reacts (with Floating Picker), Comments, Share */}
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        {/* React Container with Floating Picker */}
                        <div
                          className="relative"
                          onMouseEnter={() => showPicker(item.id)}
                          onMouseLeave={hidePicker}
                        >
                          {/* Floating Reaction Picker Bar */}
                          {hoveredPickerId === item.id && (
                            <div
                              className="absolute bottom-full left-0 mb-2 z-50 flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#18191a] p-1.5 shadow-2xl border border-white/10 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
                              role="toolbar"
                              aria-label="Choose a reaction"
                            >
                              {REACTIONS.map((r) => (
                                <button
                                  key={r.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    selectReaction(item.id, r.id);
                                  }}
                                  className="group/emoji relative grid place-items-center p-0.5 transition-transform duration-150 hover:scale-130 hover:-translate-y-1.5 active:scale-110 cursor-pointer"
                                >
                                  {/* Tooltip badge */}
                                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-black/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity duration-150 group-hover/emoji:opacity-100 shadow-md whitespace-nowrap">
                                    {r.label}
                                  </span>
                                  {r.renderIcon()}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* React Button */}
                          <button
                            type="button"
                            onClick={() => toggleReaction(item.id)}
                            aria-label="React"
                            title={currentReaction ? `Reacted: ${currentReaction}` : "React"}
                            className={`inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer ${
                              currentReaction ? "bg-secondary/60" : ""
                            }`}
                          >
                            {renderActiveReactionIcon(currentReaction)}
                          </button>
                        </div>

                        {/* Comments (clickable button without function) */}
                        <button
                          type="button"
                          aria-label="Comments"
                          title="Comments"
                          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
                        >
                          <MessageCircle className="size-4 sm:size-[18px]" />
                        </button>

                        {/* Share */}
                        <button
                          type="button"
                          onClick={() => handleShare(item)}
                          aria-label="Share"
                          title="Share"
                          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
                        >
                          <Share2 className="size-4 sm:size-[18px]" />
                        </button>
                      </div>

                      {/* Right: Emoji reactions cluster (clicking also opens picker) */}
                      <button
                        type="button"
                        onClick={() => showPicker(item.id)}
                        className="flex items-center -space-x-1 sm:-space-x-1.5 cursor-pointer py-1 transition-transform hover:scale-105 active:scale-95"
                        title="Choose reaction"
                        aria-label="Reactions: Love, Like, Wow"
                      >
                        <span
                          className="relative z-30 flex size-5.5 sm:size-6 items-center justify-center rounded-full bg-[#FA3E3E] text-white shadow-xs ring-2 ring-card text-[11px] sm:text-[12px] leading-none transition-transform hover:scale-125"
                          title="Love"
                        >
                          <Heart className="size-2.5 sm:size-3 fill-white text-white" />
                        </span>
                        <span
                          className="relative z-20 flex size-5.5 sm:size-6 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-xs ring-2 ring-card text-[11px] sm:text-[12px] leading-none transition-transform hover:scale-125"
                          title="Like"
                        >
                          <ThumbsUp className="size-2.5 sm:size-3 fill-white text-white" />
                        </span>
                        <span
                          className="relative z-10 flex size-5.5 sm:size-6 items-center justify-center rounded-full bg-[#F7B125] text-white shadow-xs ring-2 ring-card text-[12px] sm:text-[13px] leading-none transition-transform hover:scale-125"
                          title="Wow"
                        >
                          😮
                        </span>
                      </button>
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
