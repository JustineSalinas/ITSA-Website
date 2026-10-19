import "server-only";
import { realOfficers } from "@/data/officers";
import { localNews } from "@/data/news";
import { localEvents } from "@/data/events";
import { isAdminConfigured } from "@/lib/firebase/admin";
import { listNews, listEvents } from "@/lib/admin/content";
import type { EventItem, Officer, NewsItem } from "@/lib/types";

// Officers stay local-only -- src/data/officers.ts's org chart has no CMS
// equivalent (see CLAUDE.md) and was never part of the "make our own CMS"
// ask, which was specifically News/Events/Projects/Announcements.
export async function getOfficers(): Promise<Officer[]> {
  return realOfficers;
}

// Events and News now live in the /admin CMS (Firestore, via the Admin
// SDK). The local arrays in src/data/ aren't dead: they're the seed data
// (and what local dev without live Firebase credentials falls back to),
// not a parallel source that needs merging -- there's one CMS now, not two.
export async function getEvents(): Promise<EventItem[]> {
  if (!isAdminConfigured) return localEvents;
  try {
    const items = await listEvents();
    return items.length ? items : localEvents;
  } catch (error) {
    console.error("[data] Firestore events fetch failed:", error);
    return localEvents;
  }
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
  if (!isAdminConfigured) return localNews;
  try {
    const items = await listNews();
    return items.length ? items : localNews;
  } catch (error) {
    console.error("[data] Firestore news fetch failed:", error);
    return localNews;
  }
}
