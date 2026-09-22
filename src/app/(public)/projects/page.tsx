import type { Metadata } from "next";
import { getProjects } from "@/data/projects";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectsClient } from "@/components/projects/projects-client";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Student Projects & Portfolios",
  description: `Explore student projects, games, web applications, and innovations built by ${siteConfig.fullName} (${siteConfig.name}) members at ${siteConfig.school}.`,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Student Projects — ${siteConfig.name}`,
    description: `Software, games, and web apps built by IT students at ${siteConfig.school}.`,
    url: "/projects",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Student Projects — ${siteConfig.name}`,
    description: `Software, games, and web apps built by IT students at ${siteConfig.school}.`,
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        kicker={`${projects.length} student ${projects.length === 1 ? "project" : "projects"}`}
        title="Built by our community."
        description={`A page to showcase the projects of IT students at ${siteConfig.school}.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectsClient projects={projects} />
      </section>
    </>
  );
}
