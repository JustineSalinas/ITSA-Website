import type { Metadata } from "next";
import { getOfficers } from "@/lib/data";
import { orgChart } from "@/data/officers";
import { PageHeader } from "@/components/layout/page-header";
import { OfficerCard } from "@/components/officers/officer-card";
import { OrgChart } from "@/components/officers/org-chart";
import { siteConfig } from "@/data/site";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Officers",
  description: `Meet the student leaders who guide ${siteConfig.name} this academic year.`,
};

export default async function OfficersPage() {
  const officers = await getOfficers();

  return (
    <>
      <PageHeader
        badge="LEADERSHIP TEAM"
        title="Meet the people driving ITSA."
        description="Dedicated student leaders, mentors, and department chairs guiding our association this academic year."
      />

      {/* Officers Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {officers.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Officer profiles are being updated for the new academic year. Check
            back soon!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officers.map((officer) => (
              <OfficerCard key={officer.id} officer={officer} />
            ))}
          </div>
        )}
      </section>

      {/* Organizational Structure Section */}
      <section className="border-t border-border/60 bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand">
              <Sparkles className="size-3.5" /> STRUCTURE & GOVERNANCE
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Organizational Hierarchy
            </h2>
            <p className="mt-2 text-muted-foreground">
              How ITSA is structured from our faculty adviser to department directors and committee leads.
            </p>
          </div>

          <OrgChart root={orgChart} />
        </div>
      </section>
    </>
  );
}
