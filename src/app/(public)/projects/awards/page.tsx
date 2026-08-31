import type { Metadata } from "next";
import { getProjects } from "@/data/projects";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectsClient } from "@/components/projects/projects-client";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Award-Winning Projects",
  description: `Exceptional, award-winning student projects from ${siteConfig.name}.`,
};

export default async function AwardsPage() {
  const projects = await getProjects();
  
  // Filter for award winners
  const awardProjects = projects.filter(project => 
    project.tags.some(tag => 
      tag.toLowerCase().includes('winner') || 
      tag.toLowerCase().includes('award') ||
      tag.toLowerCase().includes('prize')
    )
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 size-4" />
          Back to all projects
        </Link>
      </div>

      <PageHeader
        badge="TOP PROJECTS"
        title="Award-Winning Projects."
        description={`Celebrating the most exceptional and recognized work by IT students at ${siteConfig.school}.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProjectsClient projects={awardProjects} hideAwardsButton={true} />
      </section>
    </>
  );
}
