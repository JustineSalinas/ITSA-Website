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
        badge="CALENDAR & ACTIVITIES"
        title="Workshops, CTFs, and tech summits."
        description="From beginner-friendly coding labs to campus-wide hackathons — explore everything ITSA is planning and hosting."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EventsClient events={events} />
      </section>
    </>
  );
}
