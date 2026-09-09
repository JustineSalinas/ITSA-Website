import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { NewsItem } from "@/lib/types";
import { dataset, projectId } from "../env";
import { getSanityClient } from "./client";

/**
 * Reading news out of Sanity, shaped into the NewsItem the pages already use.
 *
 * Keeping the public type unchanged is deliberate: the news pages should not
 * know or care which store their content came from, so the CMS can be adopted
 * one type at a time without a rewrite.
 */

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : undefined;

/**
 * Sanity serves resized, reformatted images from its CDN, so we ask for the
 * size we actually render rather than shipping the original. This is what
 * makes "upload the full-size photo" safe advice for officers.
 */
export function urlForImage(source: SanityImageSource, width = 1200): string | undefined {
  return builder?.image(source).width(width).auto("format").fit("max").url();
}

const newsQuery = defineQuery(`
  *[_type == "news" && defined(slug.current)] | order(date desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    category,
    coverImage,
    content
  }
`);

type SanityNews = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category?: string;
  coverImage?: SanityImageSource;
  content?: PortableTextBlock[];
};

/**
 * Published news, newest first. Returns null -- not an empty array -- when
 * Sanity is unconfigured or unreachable, so the caller can tell "the CMS said
 * there is no news" apart from "there is no CMS" and fall back accordingly.
 */
export async function getSanityNews(): Promise<NewsItem[] | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const docs = await client.fetch<SanityNews[]>(newsQuery);
    return docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      // Portable Text is a block array, not a string. Rendering it properly
      // needs @portabletext/react on the article page; the listing only shows
      // the excerpt, so the spike leaves this empty rather than pretending.
      content: "",
      date: doc.date,
      category: doc.category,
      imageUrl: doc.coverImage ? urlForImage(doc.coverImage) : undefined,
    }));
  } catch (error) {
    // A CMS outage must not take the site down. Log and let the caller fall
    // back to bundled content.
    console.error("[sanity] news fetch failed:", error);
    return null;
  }
}
