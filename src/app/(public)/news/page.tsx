import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNews } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { NewsClient } from "@/components/news/news-client";

export const metadata: Metadata = {
  title: "Official News & Dispatches",
  description: `Stay informed with official announcements, workshop registrations, student milestones, and community news from ${siteConfig.fullName} (${siteConfig.name}) at ${siteConfig.school}.`,
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: `Official News & Dispatches — ${siteConfig.name}`,
    description: `Official announcements, hackathon recaps, and student milestones from ${siteConfig.fullName}.`,
    url: "/news",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Official News & Dispatches — ${siteConfig.name}`,
    description: `Official announcements, hackathon recaps, and student milestones from ${siteConfig.fullName} at ${siteConfig.school}.`,
  },
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

        {/* Search Engine & News List */}
        <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-muted/30" />}>
          <NewsClient news={news} />
        </Suspense>
      </section>
    </>
  );
}
