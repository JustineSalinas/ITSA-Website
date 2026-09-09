/**
 * Sanity environment, with the same graceful-degradation contract the Firebase
 * client uses: the site must build and run with no Sanity credentials at all.
 *
 * That is not a convenience. CI builds without secrets, and a build that dies
 * because an optional CMS is unconfigured turns every contributor's pull
 * request red for a reason that has nothing to do with their change.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Pinned, not floating. Sanity's API is dated: a fixed date guarantees the
 * shape of responses never changes underneath us. Bump it deliberately, after
 * reading the changelog -- never to "get the latest".
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-09";

/** True when Sanity is wired up. Everything else in src/sanity/ checks this. */
export const isSanityConfigured = Boolean(projectId);
