import "server-only";
import { realOfficers } from "@/data/officers";
import { getSanityNews } from "@/sanity/lib/news";
import { getSanityOfficers } from "@/sanity/lib/officers";
import { getSanityEvents } from "@/sanity/lib/events";
import type { EventItem, Officer, NewsItem } from "@/lib/types";

// Officers still fall back to the real, reconciled org chart in
// src/data/officers.ts -- that isn't placeholder content, it's the actual
// roster, and the org chart tree itself has no Sanity equivalent (see
// CLAUDE.md). Events, news, and projects (src/data/projects.ts) have no
// bundled fallback: Sanity is their only source, and an empty result is the
// honest answer until officers publish something there.
export async function getOfficers(): Promise<Officer[]> {
  const sanityOfficers = await getSanityOfficers();
  if (sanityOfficers && sanityOfficers.length) return sanityOfficers;
  return realOfficers;
}

export async function getEvents(): Promise<EventItem[]> {
  const sanityEvents = await getSanityEvents();
  if (sanityEvents) return sanityEvents;

  if (process.env.NODE_ENV === "production") {
    console.error(
      "[data] Sanity returned no events. Check the Sanity connection and that events are published.",
    );
  }
  return [];
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
  return sanityNews ?? [];
}


