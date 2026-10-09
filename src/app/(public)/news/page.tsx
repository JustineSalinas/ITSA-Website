import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNews } from "@/lib/data";

import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { NewsTimeline } from "@/components/news/news-timeline";

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
        variant="news"
        kicker={`${news.length} ${news.length === 1 ? "article" : "articles"} published`}
        title="Official News & Dispatches"
        description="Stay informed with all official announcements, workshop registrations, student milestones, and community news from ITSA."
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* ── Background Grid Pattern ── */}
        <GridBackground />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Back to Home button */}
          <div className="mb-8 flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="group"
              render={<Link href="/" />}
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Homepage
            </Button>
          </div>

          <NewsTimeline news={news} />
        </div>
      </section>
    </>
  );
}
