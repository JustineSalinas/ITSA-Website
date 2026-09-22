"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Calendar, User, Newspaper, Tag } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsMediaGallery } from "@/components/news/news-media-gallery";
import { formatNewsDate } from "@/lib/format";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function NewsClient({ news }: { news: NewsItem[] }) {
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get("category") ?? "all"
  );

  // Collect unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    news.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [news]);

  // Sync state to URL parameters without extra history entries
  function syncUrl(nextQuery: string, nextCategory: string) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategory !== "all") params.set("category", nextCategory);

    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
  }

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery);
    syncUrl(nextQuery, selectedCategory);
  }

  function handleCategoryChange(nextCategory: string) {
    setSelectedCategory(nextCategory);
    syncUrl(query, nextCategory);
  }

  function handleClear() {
    setQuery("");
    setSelectedCategory("all");
    syncUrl("", "all");
  }

  // Filter news
  const filteredNews = useMemo(() => {
    const q = query.trim().toLowerCase();
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const excerptMatch = item.excerpt?.toLowerCase().includes(q);
      const contentMatch = item.content?.toLowerCase().includes(q);
      const authorMatch = item.author?.name.toLowerCase().includes(q);
      const tagsMatch = item.tags?.some((t) => t.toLowerCase().includes(q));

      return titleMatch || excerptMatch || contentMatch || authorMatch || tagsMatch;
    });
  }, [news, query, selectedCategory]);

  const hasActiveFilters = query.trim().length > 0 || selectedCategory !== "all";

  return (
    <div className="space-y-8">
      {/* Search Engine & Filter Controls Bar */}
      <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-6 shadow-sm backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Live search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="news-search-input" className="sr-only">
              Search news dispatches
            </label>
            <Input
              id="news-search-input"
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search dispatches by title, keyword, author, or topic..."
              className="h-11 rounded-xl border-border/70 bg-background/80 pl-10 pr-9 text-sm transition-colors focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                aria-label="Clear search input"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Reset button if filters are active */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="h-11 shrink-0 rounded-xl px-4 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1.5 size-3.5" />
              Reset search
            </Button>
          )}
        </div>

        {/* Category Filter Chips & Status Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="News categories">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => handleCategoryChange("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              All Dispatches
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live announcement for screen readers & visual count */}
          <div
            aria-live="polite"
            className="font-mono text-xs text-muted-foreground"
          >
            {filteredNews.length} {filteredNews.length === 1 ? "article" : "articles"}{" "}
            {hasActiveFilters && `found`}
          </div>
        </div>
      </div>

      {/* Zero State */}
      {filteredNews.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card/30 p-12 text-center backdrop-blur-sm">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground">
            <Newspaper className="size-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-foreground">
            No dispatches match your search
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {query ? (
              <>We couldn&apos;t find any articles matching &ldquo;<strong>{query}</strong>&rdquo;.</>
            ) : (
              <>No articles in the &ldquo;{selectedCategory}&rdquo; category.</>
            )}
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="rounded-full px-5"
            >
              Clear filters and view all
            </Button>
          </div>
        </div>
      )}

      {/* News Articles List */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredNews.map((item, idx) => (
            <motion.div
              key={item.id}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, delay: prefersReducedMotion ? 0 : idx * 0.04 }}
            >
              <Card
                id={item.slug}
                className="scroll-mt-24 overflow-hidden border-border/80 bg-card/85 p-6 sm:p-10 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:shadow-md"
              >
                {/* Header: Category & Date */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2">
                    {item.category && (
                      <Badge
                        variant="outline"
                        className="border-primary/20 bg-primary/10 font-mono text-xs font-semibold text-primary"
                      >
                        {item.category}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Calendar className="size-3.5 text-primary" />
                    <span className="font-medium text-foreground">
                      {formatNewsDate(item.date)}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="mt-6 font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {item.title}
                </h2>

                {/* Author attribution */}
                {item.author && (
                  <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <User className="size-3.5 text-primary" />
                    <span>
                      Posted by{" "}
                      <strong className="text-foreground">{item.author.name}</strong>{" "}
                      ({item.author.role})
                    </span>
                  </div>
                )}

                {/* Photos & Slideshow Gallery */}
                {item.images && item.images.length > 0 && (
                  <div className="mt-6">
                    <NewsMediaGallery
                      images={item.images}
                      alt={item.title}
                      aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
                    />
                  </div>
                )}

                {/* Full Text / Description */}
                <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {item.content.split("\n\n").map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags if present */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border/40 pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                      <Tag className="size-3" /> Tags:
                    </span>
                    {item.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleQueryChange(tag)}
                        className="rounded-md bg-secondary/80 px-2.5 py-1 font-mono text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                        title={`Search for #${tag}`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
