import type { Metadata } from "next";
import { getEvents, splitEvents } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { EventCard } from "@/components/events/event-card";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past ITSA events — workshops, competitions, and gatherings.",
};

export default async function EventsPage() {
  const events = await getEvents();
  const { upcoming, past } = splitEvents(events);

  return (
    <>
      <PageHeader
        title="Events & activities"
        description="From beginner workshops to campus-wide competitions — here's everything ITSA has planned and hosted."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            No upcoming events right now — check back soon!
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 className="mt-16 text-2xl font-bold tracking-tight">Past events</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
