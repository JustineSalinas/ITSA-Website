"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

import type { EventItem } from "@/lib/types";
import { formatEventTime } from "@/lib/format";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Upcoming events on the homepage: the next one in full, the rest as a dated
 * list.
 *
 * Deliberately not three equal cards. Those cards lead with a 16:9 image area,
 * and no event has a photo yet, so the section rendered as three identical
 * gradient blocks each holding the same calendar glyph -- decoration standing
 * in for content, which is the note the review came back with.
 *
 * The date does that job instead. It is the one thing every event actually
 * has, it is what a visitor scans an event list for, and it cannot be mistaken
 * for a placeholder.
 */
export function UpcomingEvents({ events }: { events: EventItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [next, ...rest] = events;

  if (!next) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center backdrop-blur-md">
        <p className="font-heading text-xl font-bold">No events scheduled yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          We&apos;re currently cooking up the next schedule. Join ITSA to get notified when
          registration opens!
        </p>
      </div>
    );
  }

  const nextDate = new Date(next.eventDate);

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-5">
      {/* The next event, in full */}
      <motion.article
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
        className="group relative lg:col-span-3 lg:border-r lg:border-border/60 lg:pr-8"
      >
        {/* Only shown when a real photo exists -- no stand-in artwork */}
        {next.imageUrl && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/50">
            <Image
              src={next.imageUrl}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex gap-5 sm:gap-7">
          {/* The date, as the thing that anchors the panel */}
          <div className="shrink-0 text-center">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              {nextDate.toLocaleDateString("en-US", { month: "short" })}
            </div>
            <div className="font-heading text-4xl font-extrabold leading-none tracking-tight sm:text-5xl">
              {nextDate.getDate()}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="font-heading text-xl font-bold leading-snug tracking-tight text-balance sm:text-2xl">
              {/* Stretched link -- the whole panel is the target */}
              <Link
                href={`/events/${next.slug}`}
                className="outline-none after:absolute after:inset-0 focus-visible:underline group-hover:text-primary"
              >
                {next.title}
              </Link>
            </h3>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" aria-hidden="true" />
                {formatEventTime(next.eventDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                {next.location}
              </span>
            </div>

            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {next.description}
            </p>
          </div>
        </div>
      </motion.article>

      {/* The rest, as a dated list */}
      {rest.length > 0 && (
        <motion.ul
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: prefersReducedMotion ? 0 : 0.1,
          }}
          className="divide-y divide-border/60 lg:col-span-2"
        >
          {rest.map((event) => {
            const date = new Date(event.eventDate);
            return (
              <li key={event.id} className="group/item relative">
                <div className="flex items-start gap-4 py-5 lg:pl-2">
                  <div className="shrink-0 text-center">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                      {date.toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="font-heading text-2xl font-extrabold leading-none tracking-tight">
                      {date.getDate()}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-bold leading-snug tracking-tight">
                      <Link
                        href={`/events/${event.slug}`}
                        className="outline-none after:absolute after:inset-0 focus-visible:underline group-hover/item:text-primary"
                      >
                        {event.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatEventTime(event.eventDate)} · {event.location}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}
