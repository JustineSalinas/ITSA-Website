"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import type { EventItem, Officer, SocialLinks } from "@/lib/types";
import type { EventInput, OfficerInput } from "@/lib/validations";

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
  return snap.docs.map((d) => {
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

export async function createOfficer(input: OfficerInput): Promise<void> {
  await addDoc(collection(getDb(), "officers"), {
    name: input.name,
    position: input.position,
    bio: input.bio ?? "",
    photoUrl: input.photoUrl ?? "",
    sortOrder: input.sortOrder,
    socials: socialsFromInput(input),
    createdAt: serverTimestamp(),
  });
}

export async function updateOfficer(id: string, input: OfficerInput): Promise<void> {
  await updateDoc(doc(getDb(), "officers", id), {
    name: input.name,
    position: input.position,
    bio: input.bio ?? "",
    photoUrl: input.photoUrl ?? "",
    sortOrder: input.sortOrder,
    socials: socialsFromInput(input),
  });
}

export async function deleteOfficer(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), "officers", id));
}

// ── Events ──────────────────────────────────────────────────────────────────

export async function fetchEvents(): Promise<EventItem[]> {
  const snap = await getDocs(
    query(collection(getDb(), "events"), orderBy("eventDate", "desc")),
  );
  return snap.docs.map((d) => {
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
    createdAt: serverTimestamp(),
  });
}

export async function updateEvent(id: string, input: EventInput): Promise<void> {
  await updateDoc(doc(getDb(), "events", id), eventPayload(input));
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), "events", id));
}
