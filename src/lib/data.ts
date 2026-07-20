import "server-only";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { placeholderEvents } from "@/data/placeholder";
import { realOfficers } from "@/data/officers";
import type { EventItem, Officer, SocialLinks } from "@/lib/types";

// The public pages read through these helpers. When Firebase Admin credentials
// are absent (e.g. before the project is wired up) they serve placeholder
// content so the site is fully browsable during development.

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
    if (snap.empty) return realOfficers;
    return snap.docs.map((d) => toOfficer(d.id, d.data()));
  } catch (err) {
    console.error("getOfficers failed, using fallback officers:", err);
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
    if (snap.empty) return placeholderEvents;
    return snap.docs.map((d) => toEvent(d.id, d.data()));
  } catch (err) {
    console.error("getEvents failed, using placeholders:", err);
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
