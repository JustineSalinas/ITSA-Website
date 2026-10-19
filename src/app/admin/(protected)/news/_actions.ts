"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/session";
import { saveNewsDoc, deleteNewsDoc } from "@/lib/admin/content";
import { uploadContentImage, UploadError } from "@/lib/admin/upload-image";
import type { NewsItem } from "@/lib/types";

export type NewsFormState = { error?: string } | undefined;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveNews(
  originalSlug: string | null,
  _prevState: NewsFormState,
  formData: FormData,
): Promise<NewsFormState> {
  await requireAdminSession();

  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const category = String(formData.get("category") ?? "") || undefined;
  const existingImageUrl = String(formData.get("existingImageUrl") ?? "") || undefined;
  const imageFile = formData.get("image");

  if (!title || !slug || !excerpt || !content || !date) {
    return { error: "Title, slug, excerpt, content, and date are all required." };
  }

  let imageUrl = existingImageUrl;
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imageUrl = await uploadContentImage(imageFile, "news");
    } catch (error) {
      return { error: error instanceof UploadError ? error.message : "Image upload failed." };
    }
  }

  const doc: NewsItem = {
    id: slug,
    slug,
    title,
    excerpt,
    content,
    date,
    category,
    imageUrl,
    images: imageUrl ? [imageUrl] : undefined,
  };

  // Slug changed on an edit: write the new doc, remove the old one so it
  // doesn't linger as an orphaned duplicate.
  if (originalSlug && originalSlug !== slug) {
    await deleteNewsDoc(originalSlug);
  }
  await saveNewsDoc(slug, doc);

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  redirect("/admin/news");
}

export async function deleteNewsAction(slug: string): Promise<void> {
  await requireAdminSession();
  await deleteNewsDoc(slug);
  revalidatePath("/admin/news");
  revalidatePath("/news");
}
