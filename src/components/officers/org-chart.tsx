"use client";

import { motion } from "framer-motion";
import type { OrgNode } from "@/lib/types";
import { initials } from "@/lib/format";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function OrgChart({ root }: { root: OrgNode }) {
  // Extract key executive nodes from root
  const adviser = root; // Robert A. Aguilar Jr.
  const chairman = root.children?.[0]; // Gabriel Ferrera
  const execMembers = chairman?.children || [];

  // Vice Chairmen & Secretariat
  const viceChairInternal = execMembers.find((m) => m.position.includes("Internal"));
  const viceChairExternal = execMembers.find((m) => m.position.includes("External"));
  const secretaryNode = execMembers.find((m) => m.position === "Secretary");

  // Departments (VPs and their teams)
  const departments = [
    {
      name: "Department of Technology",
      code: "TECH",
      vp: execMembers.find((m) => m.position.includes("Technology")),
    },
    {
      name: "Department of Communications",
      code: "COMMS",
      vp: execMembers.find((m) => m.position.includes("Communications")),
    },
    {
      name: "Department of Operations",
      code: "OPS",
      vp: execMembers.find((m) => m.position.includes("Operations")),
    },
    {
      name: "Department of Finance",
      code: "FINANCE",
      vp: execMembers.find((m) => m.position.includes("Finance")),
    },
  ];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-12"
      >
        {/* Tier 1: Faculty Adviser & Chairman */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
          {/* Adviser Card */}
          <div className="flex-1 min-w-[300px] max-w-lg">
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-card p-7 shadow-md backdrop-blur-md">
              <div className="flex items-center gap-5">
                <span className="grid size-16 place-items-center rounded-xl bg-amber-500/10 font-bold text-amber-600 text-base">
                  {initials(adviser.name)}
                </span>
                <div>
                  <span className="inline-block rounded-full bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-700 uppercase tracking-wider">
                    FACULTY ADVISER
                  </span>
                  <h3 className="mt-1.5 text-xl font-extrabold tracking-tight">{adviser.name}</h3>
                  <p className="text-sm text-muted-foreground">IT Department Adviser</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chairman Card */}
          {chairman && (
            <div className="flex-1 min-w-[300px] max-w-lg">
              <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card/90 to-card p-7 shadow-md backdrop-blur-md">
                <div className="flex items-center gap-5">
                  <span className="grid size-16 place-items-center rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-sm">
                    {initials(chairman.name)}
                  </span>
                  <div>
                    <span className="inline-block rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs font-bold text-primary uppercase tracking-wider">
                      EXECUTIVE CHAIRMAN
                    </span>
                    <h3 className="mt-1.5 text-xl font-extrabold tracking-tight">{chairman.name}</h3>
                    <p className="text-sm text-muted-foreground">Head of Association</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Connecting Vertical Line */}
        <div className="h-8 w-0.5 bg-border/80" />

        {/* Tier 2: Vice Chairmen & Secretariat */}
        <div className="w-full max-w-6xl rounded-2xl border border-border/80 bg-muted/20 p-7 backdrop-blur-md">
          <div className="mb-5 text-center font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Directorate Office & Executive Secretariat
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {viceChairInternal && (
              <div className="rounded-xl border border-border/60 bg-card/70 p-5">
                <span className="font-mono text-xs font-bold text-primary uppercase">INTERNAL AFFAIRS</span>
                <h4 className="mt-1.5 min-h-[3rem] text-base font-bold">{viceChairInternal.name}</h4>
                <p className="text-sm text-muted-foreground">{viceChairInternal.position}</p>
              </div>
            )}
            {viceChairExternal && (
              <div className="rounded-xl border border-border/60 bg-card/70 p-5">
                <span className="font-mono text-xs font-bold text-primary uppercase">EXTERNAL AFFAIRS</span>
                <h4 className="mt-1.5 min-h-[3rem] text-base font-bold">{viceChairExternal.name}</h4>
                <p className="text-sm text-muted-foreground">{viceChairExternal.position}</p>
              </div>
            )}
            {secretaryNode && (
              <div className="rounded-xl border border-border/60 bg-card/70 p-5">
                <span className="font-mono text-xs font-bold text-primary uppercase">SECRETARIAT</span>
                <h4 className="mt-1.5 min-h-[3rem] text-base font-bold">{secretaryNode.name}</h4>
                <p className="text-sm text-muted-foreground">{secretaryNode.position}</p>
              </div>
            )}
          </div>
        </div>

        {/* Connecting Vertical Line */}
        <div className="h-8 w-0.5 bg-border/80" />

        {/* Tier 3: Department Directorate Grid (4 Columns) */}
        <div className="w-full max-w-7xl">
          <div className="mb-7 text-center font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Departmental Directorates & Technical Committees
          </div>

          <div className="grid items-start gap-7 md:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept) => {
              if (!dept.vp) return null;
              return (
                <SpotlightCard key={dept.code} className="flex flex-col p-7">
                  <div>
                    {/* Department Header */}
                    <div className="border-b border-border/60 pb-4">
                      <span className="font-mono text-xs font-bold uppercase text-primary">
                        {dept.code} DIRECTORATE
                      </span>
                      <h4 className="mt-1.5 text-lg font-extrabold tracking-tight">{dept.vp.name}</h4>
                      {/* Two reserved lines keep each card's divider at the same height,
                          even when a longer VP title wraps */}
                      <p className="min-h-[2.5rem] text-sm font-medium text-muted-foreground">
                        {dept.vp.position}
                      </p>
                    </div>

                    {/* Department Leads */}
                    {dept.vp.children && dept.vp.children.length > 0 && (
                      <div className="mt-5 space-y-4">
                        <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                          Committee Leads
                        </span>
                        {dept.vp.children.map((lead) => (
                          <div key={lead.name} className="relative border-l-2 border-primary/30 pl-3.5">
                            <h5 className="text-sm font-bold">{lead.name}</h5>
                            <p className="text-xs text-muted-foreground">{lead.position}</p>

                            {/* Sub-leads if any */}
                            {lead.children?.map((sub) => (
                              <div key={sub.name} className="mt-2 pl-2 border-l border-border text-xs">
                                <span className="font-semibold text-foreground">{sub.name}</span> —{" "}
                                <span className="text-muted-foreground">{sub.position}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
