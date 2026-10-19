import "server-only";
import { getAdminDb } from "@/lib/firebase/admin";
import type { NewsItem, EventItem } from "@/lib/types";
import type { ProjectItem } from "@/data/projects";

/**
 * Firestore-backed content for the /admin CMS. The document ID *is* the
 * slug -- one less field to keep in sync, and it makes a duplicate slug
 * structurally impossible instead of something a form has to check for.
 *
 * Always called from Server Components or Server Actions via the Admin
 * SDK, which bypasses firestore.rules entirely -- the rules stay "deny
 * everything" and are still the truth, because the client never talks to
 * Firestore directly for this content.
 */

const COLLECTIONS = {
  news: "cms_news",
  events: "cms_events",
  projects: "cms_projects",
} as const;

type WithTimestamps<T> = T & { updatedAt?: string };

async function listCollection<T>(collection: string): Promise<(T & { slug: string })[]> {
  const snapshot = await getAdminDb().collection(collection).get();
  return snapshot.docs.map((doc) => ({ ...(doc.data() as T), slug: doc.id }));
}

async function getDoc<T>(collection: string, slug: string): Promise<(T & { slug: string }) | null> {
  const doc = await getAdminDb().collection(collection).doc(slug).get();
  if (!doc.exists) return null;
  return { ...(doc.data() as T), slug: doc.id };
}

async function setDoc<T extends object>(collection: string, slug: string, data: T): Promise<void> {
  await getAdminDb()
    .collection(collection)
    .doc(slug)
    .set({ ...data, updatedAt: new Date().toISOString() } satisfies WithTimestamps<T>);
}

async function deleteDoc(collection: string, slug: string): Promise<void> {
  await getAdminDb().collection(collection).doc(slug).delete();
}

// ---- News ------------------------------------------------------------

export async function listNews() {
  const items = await listCollection<NewsItem>(COLLECTIONS.news);
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
export const getNewsDoc = (slug: string) => getDoc<NewsItem>(COLLECTIONS.news, slug);
export const saveNewsDoc = (slug: string, data: NewsItem) => setDoc(COLLECTIONS.news, slug, data);
export const deleteNewsDoc = (slug: string) => deleteDoc(COLLECTIONS.news, slug);

// ---- Events ------------------------------------------------------------

export async function listEvents() {
  const items = await listCollection<EventItem>(COLLECTIONS.events);
  return items.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
}
export const getEventDoc = (slug: string) => getDoc<EventItem>(COLLECTIONS.events, slug);
export const saveEventDoc = (slug: string, data: EventItem) => setDoc(COLLECTIONS.events, slug, data);
export const deleteEventDoc = (slug: string) => deleteDoc(COLLECTIONS.events, slug);

// ---- Projects ------------------------------------------------------------

export async function listProjectDocs() {
  return listCollection<ProjectItem>(COLLECTIONS.projects);
}
export const getProjectDoc = (slug: string) => getDoc<ProjectItem>(COLLECTIONS.projects, slug);
export const saveProjectDoc = (slug: string, data: ProjectItem) => setDoc(COLLECTIONS.projects, slug, data);
export const deleteProjectDoc = (slug: string) => deleteDoc(COLLECTIONS.projects, slug);
