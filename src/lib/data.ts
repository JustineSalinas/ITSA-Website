import "server-only";
import { realOfficers } from "@/data/officers";
import { localNews } from "@/data/news";
import { localEvents } from "@/data/events";
import type { EventItem, Officer, NewsItem } from "@/lib/types";

// Officers, events, and news are all local, real content now (no CMS) --
// src/data/officers.ts, src/data/events.ts, src/data/news.ts respectively.
// The org chart tree in officers.ts in particular has no flat-list
// equivalent; src/app/(public)/officers/page.tsx imports it directly.
export async function getOfficers(): Promise<Officer[]> {
  return realOfficers;
}

export async function getEvents(): Promise<EventItem[]> {
  return localEvents;
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
  return localNews;
}
