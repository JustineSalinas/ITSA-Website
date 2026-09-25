"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { OrgNode } from "@/lib/types";
import { initials } from "@/lib/format";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Selected = { name: string; position: string; group: string; photoUrl?: string };

/** A person card that opens the detail panel. */
function PersonButton({
  node,
  group,
  onSelect,
  className = "",
  children,
}: {
  node: OrgNode;
  group: string;
  onSelect: (s: Selected) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect({ name: node.name, position: node.position, group, photoUrl: node.photoUrl })}
      aria-label={`${node.name}, ${node.position}. View details`}
      className={`w-full text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 ${className}`}
    >
      {children}
    </button>
  );
}

/** Photo when the node has one, initials fallback otherwise -- same rule as the /officers cards. */
function PersonAvatar({
  node,
  className,
  textClassName = "text-sm font-bold",
  fallbackClassName = "bg-secondary text-foreground",
}: {
  node: OrgNode;
  className: string;
  textClassName?: string;
  fallbackClassName?: string;
}) {
  if (node.photoUrl) {
    return (
      <span className={`relative shrink-0 overflow-hidden rounded-xl ${className}`}>
        <Image src={node.photoUrl} alt={node.name} fill sizes="64px" className="object-cover" />
      </span>
    );
  }
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl ${fallbackClassName} ${textClassName} ${className}`}
    >
      {initials(node.name)}
    </span>
  );
}

/** Stands in for a role nobody currently fills, so the structure stays whole. */
function VacantCard({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/80 bg-card/40 p-5">
      <span className="font-mono text-xs font-bold uppercase text-muted-foreground">{label}</span>
      <p className="mt-1.5 text-base font-bold text-muted-foreground">Vacant</p>
      <p className="text-sm text-muted-foreground">This role is currently unfilled.</p>
    </div>
  );
}

export function OrgChart({ root }: { root: OrgNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<Selected | null>(null);
  // Departments fold away on phones only. The first stays open so the section
  // never reads as empty; on desktop the toggles are hidden and all four show.
  const [openDepts, setOpenDepts] = useState<Set<string>>(new Set(["TECH"]));

  const adviser = root;
  const chairman = root.children?.[0];
  const execMembers = chairman?.children ?? [];

  const viceChairInternal = execMembers.find((m) => m.position.includes("Internal"));
  const viceChairExternal = execMembers.find((m) => m.position.includes("External"));
  const secretaryNode = execMembers.find((m) => m.position === "Secretary");

  const departments = [
    { name: "Department of Technology", code: "TECH", vp: execMembers.find((m) => m.position.includes("Technology")) },
    { name: "Department of Communications", code: "COMMS", vp: execMembers.find((m) => m.position.includes("Communications")) },
    { name: "Department of Operations", code: "OPS", vp: execMembers.find((m) => m.position.includes("Operations")) },
    { name: "Department of Finance", code: "FINANCE", vp: execMembers.find((m) => m.position.includes("Finance")) },
  ];

  const directorate: Array<{ label: string; node?: OrgNode }> = [
    { label: "Internal Affairs", node: viceChairInternal },
    { label: "External Affairs", node: viceChairExternal },
    { label: "Secretariat", node: secretaryNode },
  ];

  function toggleDept(code: string) {
    setOpenDepts((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  return (
    <div className="w-full">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="flex flex-col items-center space-y-12"
      >
        {/* Tier 1: Faculty Adviser & Chairman */}
        <ul className="flex w-full max-w-5xl list-none flex-wrap justify-center gap-8">
          <li className="min-w-[280px] flex-1 sm:min-w-[300px]">
            <PersonButton
              node={adviser}
              group="Faculty"
              onSelect={setSelected}
              className="block rounded-2xl"
            >
              {/* Only spans inside: a button may not legally contain block
                  elements such as div, h3 or p. */}
              <span className="relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border/80 bg-card p-7 shadow-sm backdrop-blur-md transition-colors hover:border-primary/40">
                <PersonAvatar node={adviser} className="size-16" textClassName="text-base font-bold" />
                <span className="min-w-0">
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Faculty Adviser
                  </span>
                  <span className="mt-1.5 block text-xl font-extrabold tracking-tight">
                    {adviser.name}
                  </span>
                  <span className="block text-sm text-muted-foreground">IT Department Adviser</span>
                </span>
              </span>
            </PersonButton>
          </li>

          {chairman && (
            <li className="min-w-[280px] flex-1 sm:min-w-[300px]">
              <PersonButton
                node={chairman}
                group="Executive"
                onSelect={setSelected}
                className="block rounded-2xl"
              >
                <span className="relative flex items-center gap-5 overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card/90 to-card p-7 shadow-sm backdrop-blur-md transition-colors hover:border-primary/60">
                  <PersonAvatar
                    node={chairman}
                    className="size-16 shadow-sm"
                    textClassName="text-base font-bold"
                    fallbackClassName="bg-primary text-primary-foreground"
                  />
                  <span className="min-w-0">
                    <span className="inline-block rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      Executive Chairman
                    </span>
                    <span className="mt-1.5 block text-xl font-extrabold tracking-tight">
                      {chairman.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">Head of Association</span>
                  </span>
                </span>
              </PersonButton>
            </li>
          )}
        </ul>

        <div aria-hidden="true" className="h-8 w-0.5 bg-border/80" />

        {/* Tier 2: Directorate office & secretariat */}
        <section className="w-full max-w-6xl rounded-2xl border border-border/80 bg-muted/20 p-7 backdrop-blur-md">
          <h3 className="mb-5 text-center font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Directorate Office & Executive Secretariat
          </h3>
          <ul className="grid list-none gap-5 sm:grid-cols-3">
            {directorate.map(({ label, node }) => (
              <li key={label}>
                {node ? (
                  <PersonButton
                    node={node}
                    group={label}
                    onSelect={setSelected}
                    className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/70 p-5 hover:border-primary/40"
                  >
                    <PersonAvatar node={node} className="size-11" textClassName="text-xs font-bold" />
                    <span className="min-w-0">
                      <span className="font-mono text-xs font-bold uppercase text-primary">{label}</span>
                      <span className="mt-1.5 block min-h-[3rem] text-base font-bold">{node.name}</span>
                      <span className="block text-sm text-muted-foreground">{node.position}</span>
                    </span>
                  </PersonButton>
                ) : (
                  <VacantCard label={label} />
                )}
              </li>
            ))}
          </ul>
        </section>

        <div aria-hidden="true" className="h-8 w-0.5 bg-border/80" />

        {/* Tier 3: Departments */}
        <section className="w-full max-w-7xl">
          <h3 className="mb-7 text-center font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Departmental Directorates & Technical Committees
          </h3>

          <ul className="grid list-none items-start gap-7 md:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept) => {
              const isOpen = openDepts.has(dept.code);
              const panelId = `dept-${dept.code}`;

              if (!dept.vp) {
                return (
                  <li key={dept.code}>
                    <VacantCard label={`${dept.code} Directorate`} />
                  </li>
                );
              }

              return (
                <li key={dept.code}>
                  <SpotlightCard className="flex flex-col p-0">
                    {/* The toggle exists on phones only; from md up the panel
                        below is shown by CSS whatever this button's state is. */}
                    <button
                      type="button"
                      onClick={() => toggleDept(dept.code)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-3 p-7 text-left outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 md:hidden"
                    >
                      <span>
                        <span className="font-mono text-xs font-bold uppercase text-primary">
                          {dept.code} Directorate
                        </span>
                        <span className="mt-1.5 block text-lg font-extrabold tracking-tight">
                          {dept.vp.name}
                        </span>
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 shrink-0 text-muted-foreground ${
                          prefersReducedMotion ? "" : "transition-transform duration-200"
                        } ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      id={panelId}
                      className={`px-7 pb-7 md:block md:pt-7 ${isOpen ? "block" : "hidden"}`}
                    >
                      {/* Desktop header -- the phone version lives in the button */}
                      <div className="hidden border-b border-border/60 pb-4 md:block">
                        <span className="font-mono text-xs font-bold uppercase text-primary">
                          {dept.code} Directorate
                        </span>
                        <PersonButton
                          node={dept.vp}
                          group={dept.name}
                          onSelect={setSelected}
                          className="mt-1.5 flex items-center gap-3 rounded-lg"
                        >
                          <PersonAvatar node={dept.vp} className="size-11" textClassName="text-xs font-bold" />
                          <span className="min-w-0">
                            <span className="block text-lg font-extrabold tracking-tight hover:text-primary">
                              {dept.vp.name}
                            </span>
                            <span className="block min-h-[2.5rem] text-sm font-medium text-muted-foreground">
                              {dept.vp.position}
                            </span>
                          </span>
                        </PersonButton>
                      </div>

                      <p className="text-sm font-medium text-muted-foreground md:hidden">
                        {dept.vp.position}
                      </p>

                      {dept.vp.children && dept.vp.children.length > 0 && (
                        <div className="mt-5 space-y-4">
                          <span className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                            Committee Leads
                          </span>
                          <ul className="list-none space-y-4">
                            {dept.vp.children.map((lead) => (
                              <li key={lead.name} className="relative pl-3.5">
                                {/* Decorative connector, not a colour accent */}
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-primary/30"
                                />
                                <PersonButton
                                  node={lead}
                                  group={dept.name}
                                  onSelect={setSelected}
                                  className="flex min-h-11 items-center gap-3 rounded-md"
                                >
                                  <PersonAvatar node={lead} className="size-9" textClassName="text-[10px] font-bold" />
                                  <span className="min-w-0">
                                    <span className="block text-sm font-bold hover:text-primary">
                                      {lead.name}
                                    </span>
                                    <span className="block text-xs text-muted-foreground">
                                      {lead.position}
                                    </span>
                                  </span>
                                </PersonButton>

                                {lead.children && lead.children.length > 0 && (
                                  <ul className="list-none">
                                    {lead.children.map((sub) => (
                                      <li key={sub.name} className="mt-2 border-l border-border pl-2">
                                        <PersonButton
                                          node={sub}
                                          group={dept.name}
                                          onSelect={setSelected}
                                          className="flex min-h-11 flex-col justify-center rounded-md text-xs"
                                        >
                                          <span className="font-semibold text-foreground hover:text-primary">
                                            {sub.name}
                                          </span>{" "}
                                          <span className="text-muted-foreground">{sub.position}</span>
                                        </PersonButton>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>
        </section>
      </motion.div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <PersonAvatar
                    node={selected}
                    className="size-12"
                    textClassName="text-sm font-bold"
                    fallbackClassName="bg-primary text-primary-foreground"
                  />
                  <div className="min-w-0">
                    <DialogTitle className="text-lg">{selected.name}</DialogTitle>
                    <DialogDescription>{selected.position}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {selected.group}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
