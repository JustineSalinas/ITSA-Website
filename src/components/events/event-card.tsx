"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime, isUpcoming } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function EventCard({ event }: { event: EventItem }) {
  const upcoming = isUpcoming(event.eventDate);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden pt-0 border-border/80 bg-card/70 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary/80 to-primary">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.imageUrl}
              alt={event.title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-items-center bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30">
              <CalendarDays className="size-10 text-primary-foreground/70" />
            </div>
          )}
          <Badge
            className="absolute left-3 top-3 backdrop-blur-md"
            variant={upcoming ? "default" : "secondary"}
          >
            {upcoming ? "Upcoming" : "Past"}
          </Badge>
        </div>

        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-brand" />
              {formatEventDate(event.eventDate)} · {formatEventTime(event.eventDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-brand-orange" />
              {event.location}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight">
            <Link href={`/events/${event.slug}`} className="transition-colors group-hover:text-primary">
              {event.title}
            </Link>
          </h3>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>

          <div className="mt-6 border-t border-border/40 pt-4">
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2"
            >
              View details & RSVP
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
