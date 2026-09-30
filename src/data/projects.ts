export interface ProjectSection {
  title?: string;
  content?: string;
  galleryCount?: number;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  role?: string;
  teamSize?: number;
  teamName?: string;
  teamMembers?: TeamMember[];
  awardName?: string;
  awardDate?: string;
  awardHost?: string;
  tags: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  content: string;
  sections: ProjectSection[];
}

// Sanity is the only source for projects -- there is no bundled fallback.
// There used to be one, but it was entirely fabricated example content
// (invented team members, "#" placeholder links) with no dev-only gate, so it
// was shown to real visitors whenever Sanity had no projects published.
export async function getProjects(): Promise<ProjectItem[]> {
  const { getSanityProjects } = await import("@/sanity/lib/projects");
  const sanityProjects = await getSanityProjects();
  return sanityProjects ?? [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const allProjects = await getProjects();
  return allProjects.find((p) => p.slug === slug);
}
