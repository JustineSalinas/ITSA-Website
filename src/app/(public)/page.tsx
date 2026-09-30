import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEvents, getOfficers, getNews, splitEvents } from "@/lib/data";
import { Hero } from "@/components/home/hero";
import { AboutItsa } from "@/components/home/about-itsa";
import { HomeFaq } from "@/components/home/home-faq";
import { JoinCta } from "@/components/home/join-cta";
import { LatestNews } from "@/components/home/latest-news";
import { Partners } from "@/components/home/partners";
import { EventCard } from "@/components/events/event-card";
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
      <Partners />
      <AboutItsa />
      <LatestNews news={news} />

      {/* Upcoming events section */}
      <section className="relative border-t border-border/60 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-3 max-w-lg text-base sm:text-lg text-muted-foreground">
                Workshops, competitions, hackathons, and social gatherings designed for real skill growth.
              </p>
            </div>
            <Button
              variant="outline"
              className="group px-6"
              render={<Link href="/events" />}
            >
              View calendar
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {featuredEvents.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center backdrop-blur-md">
              <p className="font-heading text-xl font-bold">
                No events scheduled yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                We&apos;re currently cooking up the next schedule. Join ITSA to get notified when registration opens!
              </p>
            </div>
          )}
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
            className="group px-6"
            render={<Link href="/officers" />}
          >
            Meet the entire team
            <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
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
