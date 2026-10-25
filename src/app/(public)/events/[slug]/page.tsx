import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, MapPin, CheckCircle2, Ticket, Building2, Users } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data";
import { formatEventDate, formatEventTime, hasExplicitTime, isUpcoming } from "@/lib/format";
import { safeJsonLd } from "@/lib/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  const ogImages = event.imageUrl ? [{ url: event.imageUrl }] : undefined;
  return {
    title: event.title,
    description: event.description.slice(0, 160),
    alternates: {
      canonical: `/events/${slug}`,
    },
    openGraph: {
      title: `${event.title} — ITSA`,
      description: event.description.slice(0, 160),
      url: `/events/${slug}`,
      type: "article",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} — ITSA`,
      description: event.description.slice(0, 160),
      images: event.imageUrl ? [event.imageUrl] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const upcoming = isUpcoming(event.eventDate);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.eventDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: event.imageUrl ? [event.imageUrl] : undefined,
    organizer: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
  };

  return (
    <article className="min-h-screen bg-muted/20 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(eventJsonLd) }}
      />
      {/* Top Breadcrumb & Control Bar */}
      <div className="border-b border-border/60 bg-card py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="group gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            render={<Link href="/events" />}
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Event Calendar
          </Button>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/events" className="hover:underline">Events</Link>
            <span>/</span>
            <span className="font-semibold text-foreground truncate max-w-[200px]">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Executive Banner Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-primary to-blue-950 p-8 sm:p-12 text-white shadow-xl">
          {/* Subtle Grid Background Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-1.5 rounded-full border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-md"
              >
                <LogoMark className="size-3.5 shrink-0" />
                {upcoming ? "UPCOMING EVENT" : "PAST EVENT"}
              </Badge>
              <span className="font-mono text-xs text-white/70">ITSA OFFICIAL ACTIVITY</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>

            {/* Event Quick Meta Chips inside Hero */}
            <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-white/90">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <CalendarDays className="size-4 text-brand-orange" />
                {formatEventDate(event.eventDate)}
              </span>
              {hasExplicitTime(event.eventDate) && (
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Clock className="size-4 text-brand-cyan" />
                  {formatEventTime(event.eventDate)}
                </span>
              )}
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <MapPin className="size-4 text-white" />
                {event.location}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Main Body (8 Columns) */}
          <div className="space-y-8 lg:col-span-8">
            {/* Event Poster / Feature Image */}
            {event.imageUrl && (
              <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card aspect-[16/9]">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Overview Card */}
            <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b border-border/60 pb-4">
                About this Event
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
                {event.description.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Key Highlights & Takeaways -- only ever shown when the event
                actually has real ones; no generic/invented filler. */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8">
                <h3 className="text-xl font-bold tracking-tight text-foreground border-b border-border/60 pb-3">
                  Key Highlights & Takeaways
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {event.highlights.map((h) => (
                    <div key={h.title} className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                      <span className="mt-0.5 shrink-0 text-xl leading-none" aria-hidden="true">{h.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold">{h.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{h.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partners & SDGs */}
            {((event.partners && event.partners.length > 0) || (event.sdgs && event.sdgs.length > 0)) && (
              <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8">
                {event.partners && event.partners.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground border-b border-border/60 pb-3">
                      Partner Organizations
                    </h3>
                    <p className="mt-4 text-sm text-foreground/90">{event.partners.join(", ")}</p>
                  </div>
                )}
                {event.sdgs && event.sdgs.length > 0 && (
                  <div className={event.partners && event.partners.length > 0 ? "mt-6" : ""}>
                    <h3 className="text-xl font-bold tracking-tight text-foreground border-b border-border/60 pb-3">
                      Sustainable Development Goals
                    </h3>
                    <ul className="mt-4 space-y-1.5 text-sm text-foreground/90">
                      {event.sdgs.map((sdg) => (
                        <li key={sdg} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                          {sdg}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky Sidebar Passport Card (4 Columns) */}
          <div className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-border/80 bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  EVENT DETAILS
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                  <Ticket className="size-3" /> FREE ENTRY
                </span>
              </div>

              {/* Detailed Specs List */}
              <div className="mt-6 space-y-5 text-sm font-medium">
                <div className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-xs uppercase text-muted-foreground">Date</span>
                    <span className="text-base font-bold text-foreground">{formatEventDate(event.eventDate)}</span>
                  </div>
                </div>

                {hasExplicitTime(event.eventDate) && (
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Clock className="size-5" />
                    </span>
                    <div>
                      <span className="block font-mono text-xs uppercase text-muted-foreground">Time</span>
                      <span className="text-base font-bold text-foreground">{formatEventTime(event.eventDate)}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-orange/15 text-brand-orange">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-xs uppercase text-muted-foreground">Venue / Location</span>
                    <span className="text-base font-bold text-foreground">{event.location}</span>
                  </div>
                </div>

                {event.attendees && (
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Users className="size-5" />
                    </span>
                    <div>
                      <span className="block font-mono text-xs uppercase text-muted-foreground">Participants</span>
                      <span className="text-base font-bold text-foreground">{event.attendees}</span>
                    </div>
                  </div>
                )}

                {event.projectLead && (
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Building2 className="size-5" />
                    </span>
                    <div>
                      <span className="block font-mono text-xs uppercase text-muted-foreground">Project Lead</span>
                      <span className="text-base font-bold text-foreground">{event.projectLead}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-xs uppercase text-muted-foreground">ITSA Role</span>
                    <span className="text-base font-bold text-foreground">{event.itsaRole ?? "Organizer"}</span>
                  </div>
                </div>
              </div>

              {/* CTA Action Button */}
              {upcoming ? (
                <Button size="lg" className="mt-8 w-full justify-center group" render={<Link href="/join" />}>
                  Register Interest / RSVP Now
                  <ArrowUpRight className="ml-1.5 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              ) : (
                <div className="mt-8 rounded-xl border border-border bg-muted/40 p-4 text-center font-mono text-xs text-muted-foreground">
                  This event has concluded.
                </div>
              )}
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
