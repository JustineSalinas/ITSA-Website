import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Sparkles, CheckCircle2, Ticket, Share2, Building2 } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data";
import { formatEventDate, formatEventTime, isUpcoming } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/layout/logo";

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
    <article className="min-h-screen bg-muted/20 pb-20">
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
                <CalendarDays className="size-4 text-amber-400" />
                {formatEventDate(event.eventDate)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <Clock className="size-4 text-cyan-400" />
                {formatEventTime(event.eventDate)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <MapPin className="size-4 text-emerald-400" />
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
              <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md aspect-[16/9]">
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
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b border-border/60 pb-4">
                About this Event
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
                {event.description.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Event Highlights & Value Delivery Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold tracking-tight text-foreground border-b border-border/60 pb-3">
                Key Highlights & Takeaways
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-bold">Practical Tech Knowledge</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Gain actionable skills taught by student leads and industry speakers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-bold">Networking & Peer Connections</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Connect with fellow IT builders, alumni, and tech mentors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-bold">Certificates & Recognition</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Receive official attendance verification for your academic portfolio.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-bold">Open to All IT Students</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Free admission for all registered Information Technology students.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Passport Card (4 Columns) */}
          <div className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-border/90 bg-card p-6 sm:p-8 shadow-lg">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  EVENT DETAILS
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
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
                    <span className="block font-mono text-[10px] uppercase text-muted-foreground">Date</span>
                    <span className="text-base font-bold text-foreground">{formatEventDate(event.eventDate)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-muted-foreground">Time</span>
                    <span className="text-base font-bold text-foreground">{formatEventTime(event.eventDate)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-700">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-muted-foreground">Venue / Location</span>
                    <span className="text-base font-bold text-foreground">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-700">
                    <Building2 className="size-5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-muted-foreground">Organizer</span>
                    <span className="text-base font-bold text-foreground">ITSA Executive Directorate</span>
                  </div>
                </div>
              </div>

              {/* CTA Action Button */}
              {upcoming ? (
                <Button className="mt-8 w-full bg-primary py-6 text-sm font-bold shadow-md hover:bg-primary/90" render={<Link href="/join" />}>
                  Register Interest / RSVP Now
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
