import type { Metadata } from "next";
import { getOfficers } from "@/lib/data";
import { orgChart } from "@/data/officers";
import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { OfficerCard } from "@/components/officers/officer-card";
import { OrgChart } from "@/components/officers/org-chart";
import { siteConfig } from "@/data/site";
import { getDepartmentTheme } from "@/lib/departments";

export const metadata: Metadata = {
  title: "Executive Officers & Leadership",
  description: `Meet the student leaders, developers, and designers guiding ${siteConfig.fullName} (${siteConfig.name}) at ${siteConfig.school}.`,
  alternates: {
    canonical: "/officers",
  },
  openGraph: {
    title: `Executive Officers | ${siteConfig.name}`,
    description: `Meet the student leaders guiding ${siteConfig.fullName} at ${siteConfig.school}.`,
    url: "/officers",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Executive Officers | ${siteConfig.name}`,
    description: `Meet the student leaders guiding ${siteConfig.fullName} at ${siteConfig.school}.`,
  },
};

const departmentCategories = [
  {
    id: "supervisor",
    title: "Supervisor",
    kicker: "Academic Leadership",
    description: "Guiding ITSA with faculty academic supervision and institutional direction.",
    matcher: (o: { position: string; name: string }) =>
      o.position.includes("Supervisor") || o.name.includes("Aguilar"),
  },
  {
    id: "executives",
    title: "Executives",
    kicker: "Executive Leadership",
    description: "Leading the student association, strategic vision, internal & external affairs, and secretariat records.",
    matcher: (o: { position: string }) =>
      o.position === "Chairman" ||
      o.position === "President" ||
      o.position.includes("Vice Chairman") ||
      o.position.includes("Vice President") ||
      o.position.includes("Secretary"),
  },
  {
    id: "technology",
    title: "Technology",
    kicker: "Engineering & Development",
    description: "Building student software platforms, leading technical workshops, and maintaining IT infrastructure.",
    matcher: (o: { position: string; section?: string }) =>
      o.position.includes("Technology") ||
      o.position.includes("Developer") ||
      o.position.includes("Security") ||
      o.position.includes("Hardware") ||
      o.position.includes("IoT") ||
      o.position.includes("Web") ||
      o.position.includes("Mobile") ||
      o.position.includes("Project") ||
      o.position.includes("Cyber"),
  },
  {
    id: "communications",
    title: "Communications",
    kicker: "Creatives, Documentation & Public Relations",
    description: "Designing visual media, capturing photography archives, maintaining official documentation, and managing social channels.",
    matcher: (o: { position: string; section?: string }) =>
      o.section === "Communications" ||
      o.section === "Creatives" ||
      o.section === "Documentation" ||
      o.position.includes("Communication") ||
      o.position.includes("Creatives") ||
      o.position.includes("Documentation"),
  },
  {
    id: "operations",
    title: "Operations",
    kicker: "Logistics & Events",
    description: "Executing on-the-ground event logistics, venue management, and project execution.",
    matcher: (o: { position: string; section?: string }) =>
      o.section === "Operations" ||
      o.position.includes("Operation") ||
      o.position.includes("Events"),
  },
  {
    id: "finance",
    title: "Finance",
    kicker: "Treasury & Budget",
    description: "Ensuring fiscal responsibility, budget transparency, and sponsorship accounting.",
    matcher: (o: { position: string; section?: string }) =>
      o.section === "Finance" || o.position.includes("Finance"),
  },
];

export default async function OfficersPage() {
  const officers = await getOfficers();

  const categorized = departmentCategories
    .map((cat) => ({
      ...cat,
      officers: officers.filter(cat.matcher),
    }))
    .filter((cat) => cat.officers.length > 0);

  return (
    <>
      <PageHeader
        variant="officers"
        kicker={`${officers.length} student ${officers.length === 1 ? "lead" : "leads"}`}
        title="Meet the ITSA Organization."
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
            <>
              {/* Quick Jump Department Pills */}
              <div className="mb-12 flex flex-wrap items-center gap-2 border-b-2 border-foreground/15 pb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">
                  Jump to:
                </span>
                {categorized
                  .filter((cat) => cat.id !== "supervisor")
                  .map((cat) => {
                    const theme = getDepartmentTheme(cat.id);
                    return (
                      <a
                        key={cat.id}
                        href={`#${cat.id}`}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-3.5 py-1 text-xs font-bold text-foreground transition-all hover:bg-foreground hover:text-white hover:shadow-[2px_2px_0_0_var(--foreground)]"
                      >
                        <span
                          className="size-2.5 rounded-full border border-foreground/30 shrink-0"
                          style={{ backgroundColor: theme.deepHex }}
                        />
                        <span>{cat.title}</span>
                        <span className="font-mono text-[10px] opacity-75">({cat.officers.length})</span>
                      </a>
                    );
                  })}
              </div>

              {/* Categorized Departments */}
              <div className="space-y-16 sm:space-y-20">
                {categorized.map((cat) => {
                  const theme = getDepartmentTheme(cat.id);
                  return (
                    <div key={cat.id} id={cat.id} className="scroll-mt-28">
                      {/* Category Header */}
                      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-foreground/15 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="size-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: theme.deepHex }}
                            />
                            <span
                              className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                              style={{ color: theme.deepHex }}
                            >
                              {cat.kicker}
                            </span>
                          </div>
                          <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
                            {cat.title}
                          </h2>
                          <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-xl">
                            {cat.description}
                          </p>
                        </div>
                        {cat.id !== "supervisor" && (
                          <span
                            className="rounded-full border-2 border-foreground px-3.5 py-1 font-mono text-xs font-bold text-foreground shadow-[2px_2px_0_0_var(--foreground)]"
                            style={{ backgroundColor: theme.pastelHex }}
                          >
                            {cat.officers.length} {cat.officers.length === 1 ? "Officer" : "Officers"}
                          </span>
                        )}
                      </div>

                      {/* Officers Grid */}
                      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {cat.officers.map((officer) => (
                          <OfficerCard
                            key={officer.id}
                            officer={officer}
                            departmentId={cat.id}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section className="relative overflow-hidden border-t-2 border-foreground bg-white py-20 sm:py-28">
        {/* ── Background Grid Pattern ── */}
        <GridBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary shadow-[2px_2px_0_0_var(--foreground)]">
              Chain of Leadership
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
              Organizational Hierarchy
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Structural blueprint of ITSA, from faculty supervision down to committee leads and specialized technical teams.
            </p>
          </div>

          <OrgChart root={orgChart} />
        </div>
      </section>
    </>
  );
}
