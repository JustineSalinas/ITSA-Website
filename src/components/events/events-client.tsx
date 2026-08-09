"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Filter, Sparkles, Terminal, Trophy, Code2 } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { EventCard } from "./event-card";
import { splitEvents } from "@/lib/format";

export function EventsClient({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const { upcoming, past } = splitEvents(events);

  const displayedEvents =
    filter === "upcoming" ? upcoming : filter === "past" ? past : events;

  return (
    <div className="mt-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="flex items-center gap-2">
          {(["all", "upcoming", "past"] as const).map((tab) => {
            const isActive = filter === tab;
            const count =
              tab === "upcoming"
                ? upcoming.length
                : tab === "past"
                ? past.length
                : events.length;

            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold capitalize transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/60 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span>{tab} Events</span>
                <span className="ml-2 font-mono text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Filter className="size-3.5 text-primary" /> Filtered by date & relevance
        </div>
      </div>

      {/* Events Cards Grid */}
      {displayedEvents.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border/80 bg-card/40 p-16 text-center backdrop-blur-md">
          <CalendarDays className="mx-auto size-10 text-muted-foreground/60" />
          <h3 className="mt-4 font-heading text-lg font-semibold">No {filter} events found</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            We are currently scheduling new activities. Join ITSA to be notified when the next event drops!
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {displayedEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
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
