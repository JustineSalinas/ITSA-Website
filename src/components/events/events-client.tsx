"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Search, X } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { EventCard } from "./event-card";
import { splitEvents } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Filter = "all" | "upcoming" | "past";

const FILTERS: readonly Filter[] = ["all", "upcoming", "past"];
const FILTER_LABELS: Record<Filter, string> = {
  all: "All events",
  upcoming: "Upcoming",
  past: "Past",
};

function isFilter(value: string | null): value is Filter {
  return FILTERS.includes(value as Filter);
}

export function EventsClient({ events }: { events: EventItem[] }) {
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const { upcoming, past } = useMemo(() => splitEvents(events), [events]);

  // Upcoming is the most useful first view, but an empty tab is a dead end,
  // so fall back to everything when nothing is scheduled.
  const defaultFilter: Filter = upcoming.length > 0 ? "upcoming" : "all";

  const [filter, setFilter] = useState<Filter>(() => {
    const fromUrl = searchParams.get("when");
    return isFilter(fromUrl) ? fromUrl : defaultFilter;
  });
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  // Keep the address bar in step so a filtered view can be shared and the
  // back button lands somewhere sensible. Defaults are left out of the URL.
  // replaceState (not router.push) avoids a history entry per keystroke.
  function syncUrl(nextFilter: Filter, nextQuery: string) {
    const params = new URLSearchParams();
    if (nextFilter !== defaultFilter) params.set("when", nextFilter);
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
  }

  function updateFilter(next: Filter) {
    setFilter(next);
    syncUrl(next, query);
  }

  function updateQuery(next: string) {
    setQuery(next);
    syncUrl(filter, next);
  }

  function clearFilters() {
    setFilter(defaultFilter);
    setQuery("");
    syncUrl(defaultFilter, "");
  }

  const counts: Record<Filter, number> = {
    all: events.length,
    upcoming: upcoming.length,
    past: past.length,
  };

  // Upcoming soonest first, then past most recent first (splitEvents order).
  const inTab =
    filter === "upcoming" ? upcoming : filter === "past" ? past : [...upcoming, ...past];

  const needle = query.trim().toLowerCase();
  const displayedEvents = needle
    ? inTab.filter((event) =>
        [event.title, event.description, event.location].some((field) =>
          field.toLowerCase().includes(needle),
        ),
      )
    : inTab;

  const hasActiveFilters = filter !== defaultFilter || needle !== "";
  const resultLabel = `${displayedEvents.length} ${displayedEvents.length === 1 ? "event" : "events"}`;

  return (
    <div className="mt-8">
      {/* Filter Bar */}
      <div className="flex flex-col gap-4 border-b border-border/40 pb-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter events by date">
          {FILTERS.map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => updateFilter(tab)}
                aria-pressed={isActive}
                className={`relative min-h-11 rounded-full px-4 py-2 text-xs font-semibold outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/60 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span>{FILTER_LABELS[tab]}</span>
                <span className="ml-2 font-mono text-[10px] opacity-75">({counts[tab]})</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search events"
              aria-label="Search events"
              className="h-11 pl-9"
            />
          </div>

          {hasActiveFilters && (
            <Button type="button" variant="outline" className="h-11 gap-1.5" onClick={clearFilters}>
              <X className="size-3.5" aria-hidden="true" />
              Clear filters
            </Button>
          )}

          <p
            role="status"
            aria-live="polite"
            className="font-mono text-xs text-muted-foreground sm:ml-auto"
          >
            {resultLabel}
          </p>
        </div>
      </div>

      {/* Events Cards Grid */}
      {displayedEvents.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border/80 bg-card/40 p-16 text-center backdrop-blur-md">
          <CalendarDays className="mx-auto size-10 text-muted-foreground/60" aria-hidden="true" />
          {events.length === 0 ? (
            <>
              <h3 className="mt-4 font-heading text-lg font-semibold">No events yet</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                We are currently scheduling new activities. Join ITSA to be notified when the next event drops!
              </p>
            </>
          ) : (
            <>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {needle ? `No events match “${query.trim()}”` : `No ${filter} events found`}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Try a different search or date range.
              </p>
              {hasActiveFilters && (
                <Button type="button" variant="outline" className="mt-6 h-11 px-5" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </>
          )}
        </div>
      ) : (
        <motion.div layout={!prefersReducedMotion} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {displayedEvents.map((event) => (
              <motion.div
                key={event.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
