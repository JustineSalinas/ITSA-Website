"use client";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDb, getFirebaseAuth } from "@/lib/firebase/client";
import type { EventItem, Officer, SocialLinks } from "@/lib/types";
import type { EventInput, OfficerInput } from "@/lib/validations";

/**
 * Every write records who made it and when.
 *
 * Deletes are soft: `deletedAt` retires a record and all reads filter it out,
 * so a mistaken removal is recoverable and there is always a trail of who
 * changed what. firestore.rules denies hard deletes outright.
 */
function actor() {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("You are signed out. Please sign in again.");
  return { uid: user.uid, email: user.email ?? "" };
}

function createdStamp() {
  const { uid, email } = actor();
  return {
    createdAt: serverTimestamp(),
    createdBy: uid,
    createdByEmail: email,
    updatedAt: serverTimestamp(),
    updatedBy: uid,
    deletedAt: null,
  };
}

function updatedStamp() {
  const { uid, email } = actor();
  return {
    updatedAt: serverTimestamp(),
    updatedBy: uid,
    updatedByEmail: email,
  };
}

/**
 * Retired records are filtered in code rather than with a `where` clause.
 *
 * A Firestore equality filter on null does NOT match documents that lack the
 * field, so `where("deletedAt", "==", null)` would silently hide every record
 * written before soft deletes existed. Filtering after the read is correct for
 * data of this size and needs no composite index or backfill.
 */
function isLive(data: { deletedAt?: unknown }): boolean {
  return data.deletedAt == null;
}

// ── Officers ────────────────────────────────────────────────────────────────

function socialsFromInput(input: OfficerInput): SocialLinks {
  const s: SocialLinks = {};
  if (input.facebook) s.facebook = input.facebook;
  if (input.instagram) s.instagram = input.instagram;
  if (input.linkedin) s.linkedin = input.linkedin;
  if (input.github) s.github = input.github;
  return s;
}

export async function fetchOfficers(): Promise<Officer[]> {
  const snap = await getDocs(
    query(collection(getDb(), "officers"), orderBy("sortOrder", "asc")),
  );
  return snap.docs
    .filter((d) => isLive(d.data()))
    .map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name ?? "",
        position: data.position ?? "",
        bio: data.bio ?? "",
        photoUrl: data.photoUrl ?? "",
        socials: (data.socials as SocialLinks) ?? {},
        sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
      };
    });
}

function officerPayload(input: OfficerInput) {
  return {
    name: input.name,
    position: input.position,
    bio: input.bio ?? "",
    photoUrl: input.photoUrl ?? "",
    sortOrder: input.sortOrder,
    socials: socialsFromInput(input),
  };
}

export async function createOfficer(input: OfficerInput): Promise<void> {
  await addDoc(collection(getDb(), "officers"), {
    ...officerPayload(input),
    ...createdStamp(),
  });
}

export async function updateOfficer(id: string, input: OfficerInput): Promise<void> {
  await updateDoc(doc(getDb(), "officers", id), {
    ...officerPayload(input),
    ...updatedStamp(),
  });
}

export async function deleteOfficer(id: string): Promise<void> {
  await updateDoc(doc(getDb(), "officers", id), {
    deletedAt: Timestamp.now(),
    ...updatedStamp(),
  });
}

// ── Events ──────────────────────────────────────────────────────────────────

export async function fetchEvents(): Promise<EventItem[]> {
  const snap = await getDocs(
    query(collection(getDb(), "events"), orderBy("eventDate", "desc")),
  );
  return snap.docs
    .filter((d) => isLive(d.data()))
    .map((d) => {
      const data = d.data();
      const date = data.eventDate;
      const iso =
        date instanceof Timestamp
          ? date.toDate().toISOString()
          : typeof date === "string"
            ? date
            : new Date().toISOString();
      return {
        id: d.id,
        title: data.title ?? "",
        slug: data.slug ?? d.id,
        description: data.description ?? "",
        eventDate: iso,
        location: data.location ?? "",
        imageUrl: data.imageUrl ?? "",
      };
    });
}

function eventPayload(input: EventInput) {
  return {
    title: input.title,
    slug: input.slug,
    description: input.description,
    eventDate: Timestamp.fromDate(new Date(input.eventDate)),
    location: input.location,
    imageUrl: input.imageUrl ?? "",
  };
}

export async function createEvent(input: EventInput): Promise<void> {
  await addDoc(collection(getDb(), "events"), {
    ...eventPayload(input),
    ...createdStamp(),
  });
}

export async function updateEvent(id: string, input: EventInput): Promise<void> {
  await updateDoc(doc(getDb(), "events", id), {
    ...eventPayload(input),
    ...updatedStamp(),
  });
}

export async function deleteEvent(id: string): Promise<void> {
  await updateDoc(doc(getDb(), "events", id), {
    deletedAt: Timestamp.now(),
    ...updatedStamp(),
  });
}
