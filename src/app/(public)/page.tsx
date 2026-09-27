import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEvents, getOfficers, getNews, splitEvents } from "@/lib/data";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { Hero } from "@/components/home/hero";
import { AboutItsa } from "@/components/home/about-itsa";
import { HomeFaq } from "@/components/home/home-faq";
import { JoinCta } from "@/components/home/join-cta";
import { LatestNews } from "@/components/home/latest-news";
import { PartnersCarousel } from "@/components/home/partners-carousel";
import { OfficerCard } from "@/components/officers/officer-card";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const [events, officers, news] = await Promise.all([
    getEvents(),
    getOfficers(),
    getNews(),
  ]);
  const { upcoming } = splitEvents(events);
  const featuredEvents = (upcoming.length ? upcoming : events).slice(0, 3);
  const featuredOfficers = officers.slice(0, 4);

  return (
    <>
      <Hero />
      <PartnersCarousel />
      <AboutItsa />
      <LatestNews news={news} />

      {/* Upcoming events section */}
      <section className="relative border-t border-border/60 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Upcoming Events & Labs
              </h2>
              <p className="mt-3 max-w-lg text-base sm:text-lg text-muted-foreground">
                Workshops, competitions, hackathons, and social gatherings designed for real skill growth.
              </p>
            </div>
            <Button
              variant="outline"
              className="group border-border/80 px-5 transition-all hover:border-primary/40 hover:bg-muted"
              render={<Link href="/events" />}
            >
              View calendar
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <UpcomingEvents events={featuredEvents} />
        </div>
      </section>

      {/* Officers preview section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Meet your student leads
            </h2>
            <p className="mt-3 max-w-lg text-base sm:text-lg text-muted-foreground">
              Real students leading ITSA this academic year — passionate, accessible, and ready to support your tech journey.
            </p>
          </div>
          <Button
            variant="outline"
            className="group border-border/80 px-5 transition-all hover:border-primary/40 hover:bg-muted"
            render={<Link href="/officers" />}
          >
            Meet the entire team
            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOfficers.map((officer) => (
            <OfficerCard key={officer.id} officer={officer} />
          ))}
        </div>
      </section>

      <HomeFaq />
      <JoinCta />
    </>
  );
}
