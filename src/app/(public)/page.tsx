import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEvents, getOfficers, splitEvents } from "@/lib/data";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { EventCard } from "@/components/events/event-card";
import { OfficerCard } from "@/components/officers/officer-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/layout/logo";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default async function HomePage() {
  const [events, officers] = await Promise.all([getEvents(), getOfficers()]);
  const { upcoming } = splitEvents(events);
  const featuredEvents = (upcoming.length ? upcoming : events).slice(0, 3);
  const featuredOfficers = officers.slice(0, 4);

  return (
    <>
      <Hero />
      <Highlights />

      {/* Upcoming events section */}
      <section className="relative border-t border-border/60 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
              >
                <LogoMark className="size-3.5 shrink-0" /> WHAT&apos;S NEXT
              </Badge>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Upcoming Events & Labs
              </h2>
              <p className="mt-3 max-w-lg text-lg text-muted-foreground">
                Workshops, competitions, hackathons, and social gatherings designed for real skill growth.
              </p>
            </div>
            <Button
              variant="outline"
              className="group rounded-full border-border/80 px-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-accent"
              render={<Link href="/events" />}
            >
              View calendar
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {featuredEvents.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center backdrop-blur-md">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/20 bg-amber-600/10 px-3 py-1 font-mono text-xs font-semibold text-amber-700">
              EXECUTIVE BOARD
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Meet your student leads
            </h2>
            <p className="mt-3 max-w-lg text-lg text-muted-foreground">
              Real students leading ITSA this academic year — passionate, accessible, and ready to support your tech journey.
            </p>
          </div>
          <Button
            variant="outline"
            className="group rounded-full border-border/80 px-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-accent"
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

      {/* Join CTA section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-8">
          <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-xs font-bold uppercase text-foreground">
                MEMBERSHIP PASSPORT
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> REGISTRATION OPEN
              </span>
            </div>

            <div className="mt-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-muted-foreground">Target Program:</span>
                <span className="font-bold text-foreground">BS Information Technology</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-muted-foreground">Institution:</span>
                <span className="font-bold text-foreground">Univ. of San Agustin</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-muted-foreground">Membership Status:</span>
                <span className="font-bold text-brand-orange">Official Student Member</span>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <Link
                href="/join"
                className="flex items-center justify-between text-xs font-bold text-foreground hover:text-primary hover:underline"
              >
                <span>Complete membership form</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <Button
            size="lg"
            className="group font-bold shadow-md transition-transform active:scale-95"
            render={<Link href="/join" />}
          >
            Register Now
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </>
  );
}
