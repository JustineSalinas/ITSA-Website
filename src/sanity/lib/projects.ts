import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import type { ProjectItem } from "@/data/projects";
import { getSanityClient } from "./client";
import { portableTextToPlain, urlForImage } from "./news";

/**
 * Reading projects out of Sanity, shaped into the ProjectItem type the pages
 * already use -- same pattern as getSanityNews.
 *
 * `sections` (titled sub-sections with a gallery count) from the old data
 * shape is not reconstructed: the project schema deliberately dropped it in
 * favour of Portable Text's own headings (see src/sanity/schemas/project.ts).
 * Every project gets an empty sections array; the project page already
 * renders fine with none.
 */

const projectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    coverImage,
    author,
    role,
    teamName,
    teamMembers,
    award,
    tags,
    techStack,
    githubUrl,
    liveUrl,
    content
  }
`);

type SanityProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: SanityImageSource;
  author: string;
  role?: string;
  teamName?: string;
  teamMembers?: { name: string; role: string }[];
  award?: { name?: string; date?: string; host?: string };
  tags?: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  content?: PortableTextBlock[];
};

/**
 * Published projects, newest first. Returns null when Sanity is
 * unconfigured or unreachable -- see getSanityNews for why null, not [].
 */
export async function getSanityProjects(): Promise<ProjectItem[] | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const docs = await client.fetch<SanityProject[]>(projectsQuery);
    return docs.map((doc) => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      author: doc.author,
      role: doc.role,
      teamSize: doc.teamMembers?.length,
      teamName: doc.teamName,
      teamMembers: doc.teamMembers,
      awardName: doc.award?.name,
      awardDate: doc.award?.date,
      awardHost: doc.award?.host,
      tags: doc.tags ?? [],
      techStack: doc.techStack,
      githubUrl: doc.githubUrl,
      liveUrl: doc.liveUrl,
      imageUrl: doc.coverImage ? urlForImage(doc.coverImage) : undefined,
      content: portableTextToPlain(doc.content),
      sections: [],
    }));
  } catch (error) {
    console.error("[sanity] projects fetch failed:", error);
    return null;
  }
}
