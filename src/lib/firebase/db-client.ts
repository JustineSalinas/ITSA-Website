"use client";

import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import type { Application } from "@/lib/types";

export async function fetchApplications(): Promise<Application[]> {
  const snap = await getDocs(
    query(collection(getDb(), "applications"), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => {
    const data = d.data();
    const createdAt = data.createdAt;
    return {
      id: d.id,
      name: data.name,
      email: data.email,
      studentId: data.studentId ?? null,
      yearLevel: data.yearLevel ?? null,
      interest: data.interest,
      message: data.message,
      status: data.status ?? "new",
      createdAt:
        createdAt instanceof Timestamp
          ? createdAt.toDate().toISOString()
          : new Date().toISOString(),
    };
  });
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"],
): Promise<void> {
  const res = await fetch(`/api/admin/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to update status.");
  }
}
