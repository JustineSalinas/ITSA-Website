import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEvents, getOfficers, splitEvents } from "@/lib/data";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { EventCard } from "@/components/events/event-card";
import { OfficerCard } from "@/components/officers/officer-card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export default async function HomePage() {
  const [events, officers] = await Promise.all([getEvents(), getOfficers()]);
  const { upcoming } = splitEvents(events);
  const featuredEvents = (upcoming.length ? upcoming : events).slice(0, 3);
  const featuredOfficers = officers.slice(0, 4);

  return (
    <>
      <Hero />
      <Highlights />

      {/* Upcoming events */}
      <section className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                What&apos;s coming up
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Workshops, competitions, and gatherings you won&apos;t want to miss.
              </p>
            </div>
            <Button
              variant="outline"
              render={<Link href="/events" />}
            >
              All events
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {featuredEvents.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-semibold">
                No events scheduled yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                We&apos;re planning the next lineup. Join ITSA to be the first to
                know when it drops.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Officers preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              The people behind it
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Real students leading ITSA this year — approachable, and happy to
              help you find your place.
            </p>
          </div>
          <Button
            variant="outline"
            render={<Link href="/officers" />}
          >
            Full team
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOfficers.map((officer) => (
            <OfficerCard key={officer.id} officer={officer} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand px-6 py-16 text-brand-foreground sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(90% 120% at 100% 0%, black 0%, transparent 60%)",
              WebkitMaskImage:
                "radial-gradient(90% 120% at 100% 0%, black 0%, transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-10 -z-10 size-64 rounded-full bg-brand-orange/40 blur-3xl"
          />
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-[2.75rem] sm:leading-[1.05]">
              Your people are already here.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-brand-foreground/80 text-pretty">
              Join {siteConfig.name} and connect with IT students who are
              building, learning, and growing together.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" render={<Link href="/join" />}>
                Join ITSA today
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
                render={<Link href="/about" />}
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
