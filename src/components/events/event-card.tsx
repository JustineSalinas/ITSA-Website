import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime, isUpcoming } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function EventCard({ event }: { event: EventItem }) {
  const upcoming = isUpcoming(event.eventDate);

  return (
    <Card className="group flex h-full flex-col overflow-hidden pt-0 transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary/80 to-primary">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center">
            <CalendarDays className="size-10 text-primary-foreground/70" />
          </div>
        )}
        <Badge
          className="absolute left-3 top-3"
          variant={upcoming ? "default" : "secondary"}
        >
          {upcoming ? "Upcoming" : "Past"}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatEventDate(event.eventDate)} · {formatEventTime(event.eventDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {event.location}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-bold leading-snug">
          <Link href={`/events/${event.slug}`} className="hover:text-primary">
            {event.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {event.description}
        </p>

        <Link
          href={`/events/${event.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          View details
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
