import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import type { Officer } from "@/lib/types";
import { getSanityClient } from "./client";
import { urlForImage } from "./news";

/**
 * Reading officers out of Sanity, shaped into the Officer type the pages
 * already use -- same pattern as getSanityNews.
 */

const officersQuery = defineQuery(`
  *[_type == "officer"] | order(sortOrder asc) {
    "id": _id,
    name,
    position,
    sortOrder,
    bio,
    photo,
    socials
  }
`);

type SanityOfficer = {
  id: string;
  name: string;
  position: string;
  sortOrder: number;
  bio?: string;
  photo?: SanityImageSource;
  socials?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
};

/**
 * Published officers, in display order. Returns null when Sanity is
 * unconfigured or unreachable -- see getSanityNews for why null, not [].
 */
export async function getSanityOfficers(): Promise<Officer[] | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const docs = await client.fetch<SanityOfficer[]>(officersQuery);
    return docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      position: doc.position,
      bio: doc.bio ?? "",
      photoUrl: doc.photo ? (urlForImage(doc.photo, 400) ?? "") : "",
      socials: doc.socials ?? {},
      sortOrder: doc.sortOrder,
    }));
  } catch (error) {
    console.error("[sanity] officers fetch failed:", error);
    return null;
  }
}
