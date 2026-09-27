import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import type { EventItem } from "@/lib/types";
import { getSanityClient } from "./client";
import { urlForImage } from "./news";

const eventsQuery = defineQuery(`
  *[_type == "event" && defined(slug.current)] | order(eventDate desc) {
    "id": _id,
    title,
    "slug": slug.current,
    eventDate,
    location,
    description,
    coverImage
  }
`);

type SanityEvent = {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  location: string;
  description: string;
  coverImage?: SanityImageSource;
};

/**
 * Published events, newest first. Returns null — not [] — when Sanity is
 * unconfigured or unreachable, so the caller can tell "CMS said no events"
 * apart from "there is no CMS" and fall back accordingly.
 */
export async function getSanityEvents(): Promise<EventItem[] | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const docs = await client.fetch<SanityEvent[]>(eventsQuery);
    return docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      eventDate: doc.eventDate,
      location: doc.location,
      description: doc.description,
      imageUrl: doc.coverImage ? (urlForImage(doc.coverImage) ?? "") : "",
    }));
  } catch (error) {
    console.error("[sanity] events fetch failed:", error);
    return null;
  }
}
