import type { Metadata } from "next";
import { getProjects } from "@/data/projects";
import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { ProjectsClient } from "@/components/projects/projects-client";
import { FeaturedPortfolioCard } from "@/components/projects/featured-portfolio";
import { FeaturedProjectCard } from "@/components/projects/featured-project";
import { siteConfig } from "@/data/site";
import { currentFeaturedPortfolio } from "@/data/featured-portfolio";
import { currentFeaturedProject } from "@/data/featured-project";
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
  const spotlight = currentFeaturedPortfolio;
  const projectOfTheMonth = currentFeaturedProject;

  return (
    <>
      <PageHeader
        kicker={
          projects.length > 0
            ? `${projects.length} student ${projects.length === 1 ? "project" : "projects"}`
            : undefined
        }
        title="Built by our community."
        description={`A page to showcase the projects of IT students at ${siteConfig.school}.`}
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* ── Background Grid Pattern ── */}
        <GridBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {spotlight && (
            <div className="mb-16 sm:mb-24">
              <FeaturedPortfolioCard data={spotlight} />
            </div>
          )}
          {projectOfTheMonth && (
            <div className="mb-16 sm:mb-24">
              <FeaturedProjectCard data={projectOfTheMonth} />
            </div>
          )}
          <ProjectsClient projects={projects} />
        </div>
      </section>
    </>
  );
}
