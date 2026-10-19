"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/session";
import { saveEventDoc, deleteEventDoc } from "@/lib/admin/content";
import { uploadContentImage, UploadError } from "@/lib/admin/upload-image";
import type { EventItem } from "@/lib/types";

export type EventFormState = { error?: string } | undefined;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveEvent(
  originalSlug: string | null,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  await requireAdminSession();

  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const description = String(formData.get("description") ?? "").trim();
  // The <input type="datetime-local"> submits a bare "YYYY-MM-DDTHH:mm" with
  // no timezone, which new Date() would parse as whatever zone the server
  // process happens to run in (UTC on Vercel). Pin it to Philippine time
  // explicitly so an officer entering "2pm" always means 2pm Manila time,
  // regardless of server location.
  const rawEventDate = String(formData.get("eventDate") ?? "");
  const eventDate = rawEventDate ? `${rawEventDate}:00+08:00` : "";
  const location = String(formData.get("location") ?? "").trim();
  const existingImageUrl = String(formData.get("existingImageUrl") ?? "") || undefined;
  const imageFile = formData.get("image");

  if (!title || !slug || !description || !eventDate || !location) {
    return { error: "Title, slug, description, date, and location are all required." };
  }

  let imageUrl = existingImageUrl;
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imageUrl = await uploadContentImage(imageFile, "events");
    } catch (error) {
      return { error: error instanceof UploadError ? error.message : "Image upload failed." };
    }
  }
  if (!imageUrl) {
    return { error: "A cover photo is required." };
  }

  const doc: EventItem = { id: slug, slug, title, description, eventDate, location, imageUrl };

  if (originalSlug && originalSlug !== slug) {
    await deleteEventDoc(originalSlug);
  }
  await saveEventDoc(slug, doc);

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  redirect("/admin/events");
}

export async function deleteEventAction(slug: string): Promise<void> {
  await requireAdminSession();
  await deleteEventDoc(slug);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}
