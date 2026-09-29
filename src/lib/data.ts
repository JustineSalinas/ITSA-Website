import "server-only";
import { placeholderEvents } from "@/data/placeholder";
import { realOfficers } from "@/data/officers";
import { newsData } from "@/data/news";
import { getSanityNews } from "@/sanity/lib/news";
import { getSanityOfficers } from "@/sanity/lib/officers";
import { getSanityEvents } from "@/sanity/lib/events";
import type { EventItem, Officer, NewsItem } from "@/lib/types";

export async function getOfficers(): Promise<Officer[]> {
  const sanityOfficers = await getSanityOfficers();
  if (sanityOfficers && sanityOfficers.length) return sanityOfficers;
  return realOfficers;
}

export async function getEvents(): Promise<EventItem[]> {
  const sanityEvents = await getSanityEvents();
  if (sanityEvents && sanityEvents.length) return sanityEvents;

  // The officers and news fallbacks below are real content -- the reconciled
  // roster and actual event recaps -- so serving them when Sanity is quiet is
  // merely stale. placeholderEvents is not: it is invented, and its dates are
  // written as offsets from today, so it always reads as genuinely upcoming.
  // Shipping that to visitors would invite students to workshops that were
  // never scheduled, and nothing on the page would look wrong.
  //
  // So it stays a development convenience. In production an empty list is the
  // honest answer, and the pages already say "No events scheduled yet". The
  // error is logged rather than thrown: an empty events section is a far
  // smaller failure than a homepage that will not render at all.
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[data] Sanity returned no events. Serving an empty list rather than the " +
        "placeholder fixtures. Check the Sanity connection and that events are published.",
    );
    return [];
  }

  return placeholderEvents;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export function splitEvents(events: EventItem[]) {
  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.eventDate).getTime() >= now)
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  const past = events
    .filter((e) => new Date(e.eventDate).getTime() < now)
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  return { upcoming, past };
}

export async function getNews(): Promise<NewsItem[]> {
  const sanityNews = await getSanityNews();
  if (sanityNews && sanityNews.length) return sanityNews;
  return [...newsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

