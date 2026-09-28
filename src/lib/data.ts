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

