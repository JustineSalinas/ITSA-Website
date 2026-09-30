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
    { name: "Department of Communications", code: "COMMS", vp: execMembers.find((m) => m.position.includes("Communication")) },
    { name: "Department of Documentation", code: "DOCS", vp: execMembers.find((m) => m.position.includes("Documentation")) },
    { name: "Department of Operations", code: "OPS", vp: execMembers.find((m) => m.position.includes("Operation")) },
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

  function renderDepartmentCard(dept: (typeof departments)[number]) {
    if (!dept.vp) {
      return (
        <li key={dept.code}>
          <VacantCard label={`${dept.code} Directorate`} />
        </li>
      );
    }

    const isOpen = openDepts.has(dept.code);
    const panelId = `dept-${dept.code}`;
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
            className="flex w-full items-center justify-between gap-3 p-5 sm:p-6 text-left outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 md:hidden"
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

          <div id={panelId} className={`p-5 sm:p-7 md:block ${isOpen ? "block" : "hidden"}`}>
            {/* Desktop header -- the phone version lives in the button */}
            <div className="hidden border-b border-border/60 pb-5 md:block">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  {dept.code} Directorate
                </span>
                {dept.vp.children && (
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground">
                    {1 + dept.vp.children.reduce((acc, c) => acc + 1 + (c.children?.length ?? 0), 0)} members
                  </span>
                )}
              </div>
              <PersonButton
                node={dept.vp}
                group={dept.name}
                onSelect={setSelected}
                className="mt-3 flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-muted/50"
              >
                <PersonAvatar node={dept.vp} className="size-12 shadow-xs" textClassName="text-sm font-bold" />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-lg font-bold tracking-tight text-foreground hover:text-primary">
                    {dept.vp.name}
                  </span>
                  <span className="block text-sm font-medium text-muted-foreground">
                    {dept.vp.position}
                  </span>
                </span>
              </PersonButton>
            </div>

            <p className="text-sm font-medium text-muted-foreground md:hidden">{dept.vp.position}</p>

            {dept.vp.children && dept.vp.children.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Committee Leads
                  </span>
                  <div className="h-px flex-1 bg-border/60" />
                </div>

                <ul className="list-none space-y-4">
                  {dept.vp.children.map((lead) => (
                    <li
                      key={lead.name}
                      className="rounded-xl border border-border/60 bg-muted/20 p-3.5 sm:p-4 transition-colors hover:border-border"
                    >
                      <PersonButton
                        node={lead}
                        group={dept.name}
                        onSelect={setSelected}
                        className="flex items-center gap-3 rounded-lg"
                      >
                        <PersonAvatar node={lead} className="size-10" textClassName="text-xs font-bold" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-foreground hover:text-primary">
                            {lead.name}
                          </span>
                          <span className="block text-xs font-medium text-muted-foreground">
                            {lead.position}
                          </span>
                        </span>
                      </PersonButton>

                      {lead.children && lead.children.length > 0 && (
                        <div className="mt-3 border-t border-border/50 pt-3">
                          <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Team Members
                          </span>
                          <ul
                            className={`grid gap-2 ${
                              lead.children.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                            }`}
                          >
                            {lead.children.map((sub) => (
                              <li key={sub.name}>
                                <PersonButton
                                  node={sub}
                                  group={dept.name}
                                  onSelect={setSelected}
                                  className="flex items-center gap-2.5 rounded-md border border-border/40 bg-card/60 p-2.5 transition-all hover:border-primary/30 hover:bg-card"
                                >
                                  <PersonAvatar
                                    node={sub}
                                    className="size-7 shrink-0"
                                    textClassName="text-[10px] font-bold"
                                    fallbackClassName="bg-primary/10 text-primary"
                                  />
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-xs font-bold text-foreground hover:text-primary leading-snug">
                                      {sub.name}
                                    </span>
                                    <span className="block text-[11px] text-muted-foreground leading-snug">
                                      {sub.position}
                                    </span>
                                  </span>
                                </PersonButton>
                              </li>
                            ))}
                          </ul>
                        </div>
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
              className="block rounded-xl"
            >
              {/* Only spans inside: a button may not legally contain block
                  elements such as div, h3 or p. */}
              <span className="relative flex items-center gap-5 overflow-hidden rounded-xl border border-border/80 bg-card p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                <PersonAvatar node={adviser} className="size-16" textClassName="text-base font-bold" />
                <span className="min-w-0">
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Faculty Adviser
                  </span>
                  <span className="mt-1.5 block font-heading text-xl font-extrabold tracking-tight text-foreground">
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
                className="block rounded-xl"
              >
                <span className="relative flex items-center gap-5 overflow-hidden rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card p-7 transition-all duration-300 hover:border-primary/60 hover:shadow-md">
                  <PersonAvatar
                    node={chairman}
                    className="size-16 shadow-xs"
                    textClassName="text-base font-bold"
                    fallbackClassName="bg-primary text-primary-foreground"
                  />
                  <span className="min-w-0">
                    <span className="inline-block rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      Executive Chairman
                    </span>
                    <span className="mt-1.5 block font-heading text-xl font-extrabold tracking-tight text-foreground">
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
        <section className="w-full max-w-6xl rounded-2xl border border-border/80 bg-muted/20 p-7">
          <h3 className="mb-5 text-center font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Directorate Office & Executive Secretariat
          </h3>
          <ul className="grid list-none items-start gap-5 sm:grid-cols-3">
            {directorate.map(({ label, node }) => {
              if (!node) {
                return (
                  <li key={label}>
                    <VacantCard label={label} />
                  </li>
                );
              }

              const hasChildren = Boolean(node.children && node.children.length > 0);

              return (
                <li key={label}>
                  <div className="flex flex-col rounded-xl border border-border/80 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                    <div>
                      <span className="font-mono text-xs font-bold uppercase text-primary">{label}</span>
                      <PersonButton
                        node={node}
                        group={label}
                        onSelect={setSelected}
                        className="-mx-1.5 mt-3 flex items-center gap-3.5 rounded-lg p-1.5 transition-colors hover:bg-muted/50"
                      >
                        <PersonAvatar node={node} className="size-11" textClassName="text-xs font-bold" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-bold text-foreground hover:text-primary">
                            {node.name}
                          </span>
                          <span className="block text-sm text-muted-foreground">{node.position}</span>
                        </span>
                      </PersonButton>
                    </div>

                    {hasChildren && (
                      <div className="mt-3 border-t border-border/60 pt-3">
                        <span className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Assistant
                        </span>
                        {node.children!.map((child) => (
                          <PersonButton
                            key={child.name}
                            node={child}
                            group={label}
                            onSelect={setSelected}
                            className="-mx-1.5 flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-muted/50"
                          >
                            <PersonAvatar node={child} className="size-9" textClassName="text-[11px] font-bold" />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold text-foreground hover:text-primary">
                                {child.name}
                              </span>
                              <span className="block text-xs text-muted-foreground">{child.position}</span>
                            </span>
                          </PersonButton>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div aria-hidden="true" className="h-8 w-0.5 bg-border/80" />

        {/* Tier 3: Departments, split into two columns so five cards of very
            different lengths don't force a single long alternating column. */}
        <section className="w-full max-w-7xl">
          <h3 className="mb-7 text-center font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Departmental Directorates & Technical Committees
          </h3>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            {/* Left Column: Technology & Communications */}
            <ul className="flex list-none flex-col gap-8">
              {departments.slice(0, 2).map(renderDepartmentCard)}
            </ul>

            {/* Right Column: Documentation, Operations & Finance */}
            <ul className="flex list-none flex-col gap-8">
              {departments.slice(2).map(renderDepartmentCard)}
            </ul>
          </div>
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
