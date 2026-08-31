import type { Metadata } from "next";
import { getProjects } from "@/data/projects";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectsClient } from "@/components/projects/projects-client";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Student projects and portfolios by ${siteConfig.name} members.`,
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        badge="STUDENT SHOWCASE"
        title="Built by our community."
        description={`A page to showcase the projects of IT students at ${siteConfig.school}.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectsClient projects={projects} />
      </section>
    </>
  );
}
