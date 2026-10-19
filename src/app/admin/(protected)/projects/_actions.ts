"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/session";
import { saveProjectDoc, deleteProjectDoc } from "@/lib/admin/content";
import { uploadContentImage, UploadError } from "@/lib/admin/upload-image";
import type { ProjectItem, ProjectFeature, TeamMember } from "@/data/projects";

export type ProjectFormState = { error?: string } | undefined;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitLines(input: string): string[] {
  return String(input ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitCommas(input: string): string[] {
  return String(input ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// "Title | Description" per line
function parseFeatures(input: string): ProjectFeature[] {
  return splitLines(input)
    .map((line) => {
      const [title, ...rest] = line.split("|");
      const description = rest.join("|").trim();
      return title?.trim() && description ? { title: title.trim(), description } : null;
    })
    .filter((f): f is ProjectFeature => f !== null);
}

// "Name | Role" per line
function parseTeamMembers(input: string): TeamMember[] {
  return splitLines(input)
    .map((line) => {
      const [name, ...rest] = line.split("|");
      const role = rest.join("|").trim();
      return name?.trim() && role ? { name: name.trim(), role } : null;
    })
    .filter((m): m is TeamMember => m !== null);
}

export async function saveProject(
  originalSlug: string | null,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdminSession();

  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const description = String(formData.get("description") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const tags = splitCommas(String(formData.get("tags") ?? ""));

  if (!title || !slug || !description || !author || !content || tags.length === 0) {
    return { error: "Title, slug, description, author, content, and at least one tag are required." };
  }

  const existingImageUrl = String(formData.get("existingImageUrl") ?? "") || undefined;
  const imageFile = formData.get("image");
  let imageUrl = existingImageUrl;
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imageUrl = await uploadContentImage(imageFile, "projects");
    } catch (error) {
      return { error: error instanceof UploadError ? error.message : "Image upload failed." };
    }
  }

  const techStack = splitCommas(String(formData.get("techStack") ?? ""));
  const features = parseFeatures(String(formData.get("features") ?? ""));
  const impact = splitLines(String(formData.get("impact") ?? ""));
  const teamMembers = parseTeamMembers(String(formData.get("teamMembers") ?? ""));

  const optional = (name: string) => String(formData.get(name) ?? "").trim() || undefined;

  const doc: ProjectItem = {
    id: slug,
    slug,
    title,
    description,
    author,
    role: optional("role"),
    teamName: optional("teamName"),
    teamSize: teamMembers.length || undefined,
    teamMembers: teamMembers.length ? teamMembers : undefined,
    awardName: optional("awardName"),
    awardDate: optional("awardDate"),
    awardHost: optional("awardHost"),
    tags,
    techStack: techStack.length ? techStack : undefined,
    githubUrl: optional("githubUrl"),
    liveUrl: optional("liveUrl"),
    imageUrl,
    content,
    features: features.length ? features : undefined,
    impact: impact.length ? impact : undefined,
    sections: [],
  };

  if (originalSlug && originalSlug !== slug) {
    await deleteProjectDoc(originalSlug);
  }
  await saveProjectDoc(slug, doc);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/projects/awards");
  revalidatePath(`/projects/${slug}`);
  redirect("/admin/projects");
}

export async function deleteProjectAction(slug: string): Promise<void> {
  await requireAdminSession();
  await deleteProjectDoc(slug);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
