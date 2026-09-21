import { Suspense } from "react";
import type { Metadata } from "next";
import { getEvents } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { EventsClient } from "@/components/events/events-client";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Events",
  description: `Upcoming and past events hosted by ${siteConfig.name} — workshops, competitions, hackathons, and community gatherings.`,
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        kicker={`${events.length} ${events.length === 1 ? "event" : "events"} · AY 2026`}
        title="Workshops, CTFs, and tech summits."
        description="From beginner-friendly coding labs to campus-wide hackathons — explore everything ITSA is planning and hosting."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* EventsClient reads the URL (?when=&q=), so it needs a Suspense
            boundary for the static build to succeed. */}
        <Suspense fallback={null}>
          <EventsClient events={events} />
        </Suspense>
      </section>
    </>
  );
}
