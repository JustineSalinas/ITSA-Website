import type { Metadata } from "next";
import { getProjects } from "@/data/projects";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectsClient } from "@/components/projects/projects-client";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Award-Winning Projects",
  description: `Exceptional, award-winning student projects from ${siteConfig.name} at ${siteConfig.school}.`,
  alternates: {
    canonical: "/projects/awards",
  },
  openGraph: {
    title: `Award-Winning Projects — ${siteConfig.name}`,
    description: `Award-winning engineering, game development, and open-source projects built by ITSA members.`,
    url: "/projects/awards",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Award-Winning Projects — ${siteConfig.name}`,
    description: `Award-winning engineering and games built by ITSA members.`,
  },
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
      <PageHeader
        kicker={`${awardProjects.length} awarded ${awardProjects.length === 1 ? "project" : "projects"}`}
        title="Award-Winning Projects"
        description={`Celebrating the most exceptional and recognized work by IT students at ${siteConfig.school}.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="group gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            render={<Link href="/projects" />}
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to all projects
          </Button>
        </div>

        <ProjectsClient projects={awardProjects} hideAwardsButton={true} />
      </section>
    </>
  );
}
