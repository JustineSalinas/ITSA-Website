import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { getNews } from "@/lib/data";


import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNewsDate, formatRelativeTime } from "@/lib/format";
import { siteConfig } from "@/data/site";
import { NewsMediaGallery } from "@/components/news/news-media-gallery";

export const metadata: Metadata = {
  title: "Latest News",
  description: `Official news, workshop updates, and announcements from ${siteConfig.fullName} (${siteConfig.name}).`,
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <PageHeader
        kicker={`${news.length} ${news.length === 1 ? "article" : "articles"} published`}
        title="Official News & Dispatches"
        description="Stay informed with all official announcements, workshop registrations, student milestones, and community news from ITSA."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back to Home button */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="group gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            render={<Link href="/" />}
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Homepage
          </Button>

          <span className="font-mono text-xs text-muted-foreground">
            {news.length} {news.length === 1 ? "Article" : "Articles"} Published
          </span>
        </div>

        {/* Full News Items List (Newest First) */}
        <div className="space-y-12">
          {news.map((item) => (
            <Card
              key={item.id}
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
                  <span className="font-medium text-foreground">{formatNewsDate(item.date)}</span>
                </div>
              </div>


              {/* Title */}
              <h2 className="mt-6 font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {item.title}
              </h2>

              {/* Author attribution if present */}
              {item.author && (
                <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <User className="size-3.5 text-primary" />
                  <span>
                    Posted by <strong className="text-foreground">{item.author.name}</strong> ({item.author.role})
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
                <div className="mt-8 flex flex-wrap gap-2 border-t border-border/40 pt-4">
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
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
