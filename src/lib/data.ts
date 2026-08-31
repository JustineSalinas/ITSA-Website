import "server-only";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { placeholderEvents } from "@/data/placeholder";
import { realOfficers } from "@/data/officers";
import { newsData } from "@/data/news";
import type { EventItem, Officer, SocialLinks, NewsItem } from "@/lib/types";

// The public pages read through these helpers. When Firebase Admin credentials
// are absent (e.g. before the project is wired up) they serve placeholder
// content so the site is fully browsable during development.

const isProduction = process.env.NODE_ENV === "production";

/**
 * A Firestore read failed.
 *
 * In development, fall back to bundled content so the site stays browsable.
 * In production, rethrow: an outage, an expired service account, or a botched
 * rules deploy must surface as an error page that monitoring can see, not as a
 * normal-looking site quietly serving months-old content.
 */
function onReadFailure(operation: string, err: unknown): never | void {
  console.error(`[data] ${operation} failed:`, err);
  if (isProduction) throw err;
  console.warn(`[data] ${operation}: serving bundled fallback content (dev only)`);
}

/** Soft-deleted records never reach the public site. */
function isLive(data: FirebaseFirestore.DocumentData): boolean {
  return data.deletedAt == null;
}

function toNewsItem(id: string, data: FirebaseFirestore.DocumentData): NewsItem {
  const d = data.date ?? data.publishedAt;
  const iso =
    typeof d?.toDate === "function"
      ? d.toDate().toISOString()
      : typeof d === "string"
        ? d
        : new Date().toISOString();
  const rawImages = Array.isArray(data.images) ? data.images : data.imageUrl ? [data.imageUrl] : [];
  return {
    id,
    title: data.title ?? "",
    slug: data.slug ?? id,
    excerpt: data.excerpt ?? data.summary ?? "",
    content: data.content ?? "",
    date: iso,
    images: rawImages,
    imageUrl: data.imageUrl ?? (rawImages.length > 0 ? rawImages[0] : ""),
    category: data.category ?? "Announcement",
    author: data.author ?? { name: "ITSA Secretariat", role: "Official Dispatch" },
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
}


function toEvent(id: string, data: FirebaseFirestore.DocumentData): EventItem {
  const date = data.eventDate;
  const iso =
    typeof date?.toDate === "function"
      ? date.toDate().toISOString()
      : typeof date === "string"
        ? date
        : new Date().toISOString();
  return {
    id,
    title: data.title ?? "",
    slug: data.slug ?? id,
    description: data.description ?? "",
    eventDate: iso,
    location: data.location ?? "",
    imageUrl: data.imageUrl ?? "",
  };
}

function toOfficer(id: string, data: FirebaseFirestore.DocumentData): Officer {
  return {
    id,
    name: data.name ?? "",
    position: data.position ?? "",
    bio: data.bio ?? "",
    photoUrl: data.photoUrl ?? "",
    socials: (data.socials as SocialLinks) ?? {},
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
  };
}

export async function getOfficers(): Promise<Officer[]> {
  if (!isAdminConfigured) return realOfficers;
  try {
    const snap = await getAdminDb()
      .collection("officers")
      .orderBy("sortOrder", "asc")
      .get();
    const officers = snap.docs
      .filter((d) => isLive(d.data()))
      .map((d) => toOfficer(d.id, d.data()));
    // An empty collection means "not seeded yet", not "no officers exist".
    return officers.length ? officers : realOfficers;
  } catch (err) {
    onReadFailure("getOfficers", err);
    return realOfficers;
  }
}

export async function getEvents(): Promise<EventItem[]> {
  if (!isAdminConfigured) return placeholderEvents;
  try {
    const snap = await getAdminDb()
      .collection("events")
      .orderBy("eventDate", "desc")
      .get();
    const events = snap.docs
      .filter((d) => isLive(d.data()))
      .map((d) => toEvent(d.id, d.data()));
    return events.length ? events : placeholderEvents;
  } catch (err) {
    onReadFailure("getEvents", err);
    return placeholderEvents;
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
  if (!isAdminConfigured) {
    return [...newsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  try {
    const snap = await getAdminDb()
      .collection("news")
      .orderBy("date", "desc")
      .get();
    const items = snap.docs
      .filter((d) => isLive(d.data()))
      .map((d) => toNewsItem(d.id, d.data()));
    return items.length ? items : newsData;
  } catch (err) {
    onReadFailure("getNews", err);
    return newsData;
  }
}

