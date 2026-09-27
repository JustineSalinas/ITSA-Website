"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

import type { NewsItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatNewsDate } from "@/lib/format";
import { NewsMediaGallery } from "@/components/news/news-media-gallery";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LatestNewsProps {
  news: NewsItem[];
}

/**
 * Latest news on the homepage: one lead story beside a short list of the rest.
 *
 * Deliberately not three equal cards. The homepage already runs a row of cards
 * for events and another for officers; a third made the page read as the same
 * block repeated, which is the note the review came back with. An editorial
 * lead-plus-list also says something three equal cards cannot -- which story
 * matters most -- and it drops a card's worth of borders, dividers and the
 * dead space equal-height cards leave behind.
 */
export function LatestNews({ news }: LatestNewsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [lead, ...rest] = news.slice(0, 3);

  if (!lead) return null;

  const lift = prefersReducedMotion ? undefined : { y: -4 };

  return (
    <section className="relative border-b border-border/60 bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Title and "View All News" button */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Latest News
            </h2>
            <p className="mt-3 max-w-lg text-base sm:text-lg text-muted-foreground">
              Official announcements, workshop schedules, and student updates from ITSA.
            </p>
          </div>

          <Button
            variant="outline"
            className="group h-11 border-border/80 px-5 transition-all hover:border-primary/40 hover:bg-muted"
            render={<Link href="/news" />}
          >
            View All News
            <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* Lead story */}
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            whileHover={lift}
            className="group relative overflow-hidden rounded-xl border border-border/80 bg-card transition-colors duration-300 hover:border-primary/40 lg:col-span-3"
          >
            {lead.images && lead.images.length > 0 && (
              <NewsMediaGallery
                images={lead.images}
                alt={lead.title}
                aspectRatio="aspect-[16/9]"
                className="rounded-none"
              />
            )}

            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                  {formatNewsDate(lead.date)}
                </span>
                {lead.category && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                    {lead.category}
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight text-balance sm:text-2xl">
                {/* Stretched link: the whole card is the target, so the lead
                    needs no separate "Read full article" row underneath. */}
                <Link
                  href={`/news#${lead.slug}`}
                  className="outline-none after:absolute after:inset-0 focus-visible:underline group-hover:text-primary"
                >
                  {lead.title}
                </Link>
              </h3>

              <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {lead.excerpt}
              </p>
            </div>
          </motion.article>

          {/* The rest, as a list rather than more cards */}
          {rest.length > 0 && (
            <motion.ul
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="divide-y divide-border/60 rounded-xl border border-border/80 bg-card lg:col-span-2"
            >
              {rest.map((item) => (
                <li key={item.id} className="group/item relative">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                        <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                        {formatNewsDate(item.date)}
                      </span>
                      {item.category && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2.5 font-heading text-base font-bold leading-snug tracking-tight">
                      <Link
                        href={`/news#${item.slug}`}
                        className="outline-none after:absolute after:inset-0 focus-visible:underline group-hover/item:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt}
                    </p>
                  </div>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </section>
  );
}
