import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data";
import { formatEventDate, formatEventTime, isUpcoming } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const upcoming = isUpcoming(event.eventDate);

  return (
    <article>
      {/* Hero banner */}
      <div className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/85 to-primary">
        {event.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.title}
            className="absolute inset-0 size-full object-cover opacity-30"
          />
        )}
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <Button
            variant="secondary"
            size="sm"
            className="mb-6 bg-white/15 text-white hover:bg-white/25"
            render={<Link href="/events" />}
          >
            <ArrowLeft className="size-4" />
            Back to events
          </Button>
          <Badge variant={upcoming ? "secondary" : "outline"} className="mb-4 border-white/30 text-white">
            {upcoming ? "Upcoming" : "Past event"}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Details sidebar */}
          <aside className="md:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Event details
              </h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{formatEventDate(event.eventDate)}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{formatEventTime(event.eventDate)}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{event.location}</span>
                </li>
              </ul>
              {upcoming && (
                <Button className="mt-6 w-full" render={<Link href="/join" />}>
                  Register interest
                </Button>
              )}
            </div>
          </aside>

          {/* Description */}
          <div className="md:col-span-2">
            <div className="space-y-4 text-pretty leading-relaxed text-foreground/90">
              {event.description.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}
