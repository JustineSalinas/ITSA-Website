"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";

import type { NewsItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatNewsDate } from "@/lib/format";
import { NewsMediaGallery } from "@/components/news/news-media-gallery";

interface LatestNewsProps {
  news: NewsItem[];
}

export function LatestNews({ news }: LatestNewsProps) {
  // Show precisely the 3 most recent news items
  const recentNews = news.slice(0, 3);

  return (
    <section className="relative border-b border-border/60 bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Title and "View All News" button */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
            >
              <Newspaper className="size-3.5 shrink-0" /> WHAT&apos;S NEW
            </Badge>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Latest News
            </h2>
            <p className="mt-3 max-w-lg text-lg text-muted-foreground">
              Official announcements, workshop schedules, and student updates from ITSA.
            </p>
          </div>

          <Button
            variant="outline"
            className="group rounded-full border-border/80 px-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-accent"
            render={<Link href="/news" />}
          >
            View All News
            <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* 3 Most Recent News Items Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Card className="group flex h-full flex-col justify-between overflow-hidden border-border/80 bg-card/80 p-5 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                <div>
                  {/* Photo / Slideshow Media */}
                  {item.images && item.images.length > 0 && (
                    <div className="mb-4">
                      <NewsMediaGallery
                        images={item.images}
                        alt={item.title}
                        aspectRatio="aspect-[16/10]"
                      />
                    </div>
                  )}

                  {/* Date & Category Kicker */}
                  <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <Calendar className="size-3.5 text-primary" />
                      {formatNewsDate(item.date)}
                    </span>
                    {item.category && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-3.5 font-heading text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    <Link href={`/news#${item.slug}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>

                  {/* Short Excerpt */}
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                </div>


                {/* Card Action Link */}
                <div className="mt-6 border-t border-border/40 pt-4">
                  <Link
                    href={`/news#${item.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary transition-all group-hover:gap-2"
                  >
                    <span>Read full article</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
