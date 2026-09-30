import type { Metadata } from "next";
import { getOfficers } from "@/lib/data";
import { orgChart } from "@/data/officers";
import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { OfficerCard } from "@/components/officers/officer-card";
import { OrgChart } from "@/components/officers/org-chart";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Executive Officers & Leadership",
  description: `Meet the student leaders, developers, and designers guiding ${siteConfig.fullName} (${siteConfig.name}) at ${siteConfig.school}.`,
  alternates: {
    canonical: "/officers",
  },
  openGraph: {
    title: `Executive Officers — ${siteConfig.name}`,
    description: `Meet the student leaders guiding ${siteConfig.fullName} at ${siteConfig.school}.`,
    url: "/officers",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Executive Officers — ${siteConfig.name}`,
    description: `Meet the student leaders guiding ${siteConfig.fullName} at ${siteConfig.school}.`,
  },
};

export default async function OfficersPage() {
  const officers = await getOfficers();

  return (
    <>
      <PageHeader
        kicker={`${officers.length} student ${officers.length === 1 ? "lead" : "leads"}`}
        title="Meet the people driving ITSA."
        description="Dedicated student leaders, mentors, and department chairs guiding our association this academic year."
      />

      {/* Officers Grid */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* ── Background Grid Pattern ── */}
        <GridBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {officers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center text-sm text-muted-foreground">
              Officer profiles are being updated for the new academic year. Check back soon!
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {officers.map((officer) => (
                <OfficerCard key={officer.id} officer={officer} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Organizational Hierarchy
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              How ITSA is structured from our faculty adviser to department directors and committee leads.
            </p>
          </div>

          <OrgChart root={orgChart} />
        </div>
      </section>
    </>
  );
}
