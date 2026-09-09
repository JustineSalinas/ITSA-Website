import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/**
 * Read-only Sanity client for published content.
 *
 * Returns undefined rather than throwing when Sanity is unconfigured, so
 * callers can fall back to bundled content the way src/lib/data.ts already
 * does for Firestore. No token: this reads published documents only, which is
 * exactly what the public site needs and nothing more.
 */
let cached: SanityClient | undefined;

export function getSanityClient(): SanityClient | undefined {
  if (!isSanityConfigured || !projectId) return undefined;
  cached ??= createClient({
    projectId,
    dataset,
    apiVersion,
    // Served from Sanity's CDN. Content is public, and the CDN is both faster
    // and far cheaper against the free plan's API quota.
    useCdn: true,
  });
  return cached;
}
