"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Globe, Users } from "lucide-react";
import type { OrgNode, SocialLinks } from "@/lib/types";
import { initials } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Selected = {
  name: string;
  position: string;
  group: string;
  photoUrl?: string;
  section?: string;
  socials?: SocialLinks;
};

/** A person button that opens the detail panel */
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
      onClick={() =>
        onSelect({
          name: node.name,
          position: node.position,
          group,
          photoUrl: node.photoUrl,
          section: node.section,
          socials: node.socials,
        })
      }
      aria-label={`${node.name}, ${node.position}. View profile`}
      className={`w-full text-left outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50 ${className}`}
    >
      {children}
    </button>
  );
}

/** Neo-brutalist avatar with clear photo or bold initials fallback */
function PersonAvatar({
  node,
  className,
  textClassName = "text-sm font-bold",
  fallbackClassName,
}: {
  node: { name: string; photoUrl?: string };
  className: string;
  textClassName?: string;
  fallbackClassName?: string;
}) {
  if (node.photoUrl) {
    return (
      <span className={`relative shrink-0 overflow-hidden ${className}`}>
        <Image
          src={node.photoUrl}
          alt={node.name}
          fill
          sizes="(max-width: 640px) 120px, 160px"
          className="object-cover object-center"
        />
      </span>
    );
  }
  return (
    <span
      className={`grid shrink-0 place-items-center bg-gradient-to-br from-primary/15 via-brand-cyan/20 to-brand-orange/15 font-mono font-extrabold text-foreground ${
        fallbackClassName ?? ""
      } ${textClassName} ${className}`}
    >
      {initials(node.name)}
    </span>
  );
}

/** Prominent tree connector with solid stem and circular nodes */
function TreeConnector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center my-3 select-none" aria-hidden="true">
      <div className="size-3.5 rounded-full border-2 border-foreground bg-primary shadow-[1px_1px_0_0_var(--foreground)]" />
      <div className="h-6 sm:h-8 w-1 bg-foreground" />
      {label && (
        <span className="-my-1.5 z-10 rounded-full border-2 border-foreground bg-card px-3.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-foreground shadow-[2px_2px_0_0_var(--foreground)]">
          {label}
        </span>
      )}
      <div className="h-6 sm:h-8 w-1 bg-foreground" />
      <div className="size-3.5 rounded-full border-2 border-foreground bg-primary shadow-[1px_1px_0_0_var(--foreground)]" />
    </div>
  );
}

/** Stands in for a role nobody currently fills */
function VacantCard({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-foreground/30 bg-muted/20 p-6 text-center">
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <p className="mt-1 text-base font-extrabold text-muted-foreground">Vacant Position</p>
      <p className="mt-0.5 text-xs text-muted-foreground">This role is currently awaiting appointment.</p>
    </div>
  );
}

export function OrgChart({ root }: { root: OrgNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<Selected | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [openDepts, setOpenDepts] = useState<Set<string>>(
    new Set(["TECH", "COMMS", "DOCS", "OPS", "FINANCE"])
  );

  const supervisor = root;
  const chairman = root.children?.[0];
  const execMembers = chairman?.children ?? [];

  const viceChairInternal = execMembers.find((m) => m.position.includes("Internal"));
  const viceChairExternal = execMembers.find((m) => m.position.includes("External"));
  const secretaryNode = execMembers.find((m) => m.position === "Secretary");

  const departments = [
    {
      name: "Department of Technology",
      code: "TECH",
      tagColor: "bg-brand-cyan/25 text-foreground border-foreground",
      badgeColor: "border-brand-cyan bg-brand-cyan/15 text-foreground",
      vp: execMembers.find((m) => m.position.includes("Technology")),
    },
    {
      name: "Department of Communications",
      code: "COMMS",
      tagColor: "bg-brand-orange/25 text-foreground border-foreground",
      badgeColor: "border-brand-orange bg-brand-orange/15 text-foreground",
      vp: execMembers.find((m) => m.position.includes("Communication")),
    },
    {
      name: "Department of Operations",
      code: "OPS",
      tagColor: "bg-amber-200/50 text-amber-950 border-foreground",
      badgeColor: "border-amber-500 bg-amber-500/15 text-foreground",
      vp: execMembers.find((m) => m.position.includes("Operation")),
    },
    {
      name: "Department of Finance",
      code: "FINANCE",
      tagColor: "bg-purple-200/50 text-purple-950 border-foreground",
      badgeColor: "border-purple-500 bg-purple-500/15 text-foreground",
      vp: execMembers.find((m) => m.position.includes("Finance")),
    },
  ];

  const directorate = [
    {
      label: "Internal Affairs",
      code: "INTERNAL",
      roleSubtitle: "Student Welfare & Internal Council",
      node: viceChairInternal,
    },
    {
      label: "External Affairs",
      code: "EXTERNAL",
      roleSubtitle: "Campus Partnerships & Outreach",
      node: viceChairExternal,
    },
    {
      label: "Secretariat Office",
      code: "SECRETARIAT",
      roleSubtitle: "Official Records & Minutes",
      node: secretaryNode,
    },
  ];

  function toggleDept(code: string) {
    setOpenDepts((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  const filteredDepartments =
    activeFilter === "ALL"
      ? departments
      : departments.filter((d) => d.code === activeFilter);

  function countMembers(vp?: OrgNode) {
    if (!vp) return 0;
    let count = 1;
    if (vp.children) {
      count += vp.children.length;
      vp.children.forEach((c) => {
        if (c.children) count += c.children.length;
      });
    }
    return count;
  }

  const byCode = (code: string) => departments.find((d) => d.code === code);

  function renderDepartmentCard(dept: (typeof departments)[number] | undefined) {
    if (!dept) return null;
    if (!dept.vp) {
      return (
        <li key={dept.code} className="w-full">
          <VacantCard label={`${dept.code} Directorate`} />
        </li>
      );
    }

    const isOpen = openDepts.has(dept.code);
    const panelId = `dept-panel-${dept.code}`;
    const totalCount = countMembers(dept.vp);

    return (
      <li key={dept.code} className="w-full">
        <div className="flex flex-col rounded-3xl border-2 border-foreground bg-card shadow-[5px_5px_0_0_var(--foreground)] transition-all hover:shadow-[7px_7px_0_0_var(--foreground)]">
          {/* Card Header Banner */}
          <div className="flex items-center justify-between border-b-2 border-foreground/15 p-5 sm:p-6 bg-secondary/20 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full border-2 px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[1.5px_1.5px_0_0_var(--foreground)] ${dept.tagColor}`}
              >
                {dept.code}
              </span>
              <div>
                <h4 className="font-heading text-base sm:text-lg font-extrabold tracking-tight text-foreground">
                  {dept.name}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-foreground bg-card px-2.5 py-0.5 font-mono text-[11px] font-bold text-foreground shadow-[1px_1px_0_0_var(--foreground)]">
                <Users className="size-3" />
                {totalCount} {totalCount === 1 ? "Lead" : "Members"}
              </span>

              {/* Mobile collapse button */}
              <button
                type="button"
                onClick={() => toggleDept(dept.code)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={`Toggle ${dept.name}`}
                className="grid size-8 place-items-center rounded-lg border-2 border-foreground bg-card text-foreground transition-all hover:bg-secondary md:hidden"
              >
                <ChevronDown
                  className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Department Body */}
          <div id={panelId} className={`p-5 sm:p-7 md:block ${isOpen ? "block" : "hidden"}`}>
            {/* Department Officer / Director */}
            <PersonButton
              node={dept.vp}
              group={dept.name}
              onSelect={setSelected}
              className="group -mx-1 block rounded-2xl"
            >
              <div className="flex items-center gap-4 rounded-2xl border-2 border-foreground/30 bg-secondary/40 p-4 transition-all group-hover:border-foreground group-hover:bg-secondary/70 group-hover:shadow-[3px_3px_0_0_var(--foreground)]">
                <PersonAvatar
                  node={dept.vp}
                  className="size-16 sm:size-20 rounded-2xl border-2 border-foreground shadow-[2px_2px_0_0_var(--foreground)]"
                  textClassName="text-base font-bold"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full border border-foreground/40 bg-card px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary shadow-[1px_1px_0_0_var(--foreground)]">
                      Director of {dept.code}
                    </span>
                    {dept.vp.section && (
                      <span className="rounded-full border border-foreground/30 bg-card px-2 py-0.5 font-mono text-[10px] font-bold text-foreground">
                        {dept.vp.section}
                      </span>
                    )}
                  </div>
                  <h5 className="mt-1 text-base sm:text-lg font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {dept.vp.name}
                  </h5>
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
                    {dept.vp.position}
                  </p>
                </div>
              </div>
            </PersonButton>

            {/* Committee Leads & Divisions */}
            {dept.vp.children && dept.vp.children.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-foreground/15 pb-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Divisions & Committee Leads ({dept.vp.children.length})
                  </span>
                </div>

                <ul className="list-none space-y-4">
                  {dept.vp.children.map((lead) => (
                    <li
                      key={lead.name}
                      className="rounded-2xl border-2 border-foreground/40 bg-card p-4 sm:p-5 shadow-[3px_3px_0_0_var(--foreground)] transition-all hover:border-foreground"
                    >
                      <PersonButton
                        node={lead}
                        group={dept.name}
                        onSelect={setSelected}
                        className="group flex items-center gap-3.5 rounded-xl"
                      >
                        <PersonAvatar
                          node={lead}
                          className="size-14 sm:size-16 rounded-xl border-2 border-foreground shadow-[2px_2px_0_0_var(--foreground)]"
                          textClassName="text-sm font-bold"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              {lead.position}
                            </span>
                            {lead.section && (
                              <span className="rounded-full border border-foreground/30 bg-secondary px-1.5 py-0.2 font-mono text-[10px] font-bold text-foreground">
                                {lead.section}
                              </span>
                            )}
                          </div>
                          <h6 className="mt-0.5 block text-sm sm:text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                            {lead.name}
                          </h6>
                        </div>
                      </PersonButton>

                      {/* Team Members */}
                      {lead.children && lead.children.length > 0 && (
                        <div className="mt-4 border-t-2 border-foreground/15 pt-3.5">
                          <span className="mb-2.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Team Members ({lead.children.length})
                          </span>
                          <ul
                            className={`grid gap-2.5 ${
                              lead.children.length === 1
                                ? "grid-cols-1"
                                : "grid-cols-1 sm:grid-cols-2"
                            }`}
                          >
                            {lead.children.map((sub) => (
                              <li key={sub.name}>
                                <PersonButton
                                  node={sub}
                                  group={dept.name}
                                  onSelect={setSelected}
                                  className="group flex items-center gap-3 rounded-xl border-2 border-foreground/30 bg-secondary/30 p-2.5 transition-all hover:border-foreground hover:bg-card hover:shadow-[2px_2px_0_0_var(--foreground)] hover:-translate-y-0.5"
                                >
                                  <PersonAvatar
                                    node={sub}
                                    className="size-11 sm:size-12 rounded-lg border-2 border-foreground shadow-[1px_1px_0_0_var(--foreground)]"
                                    textClassName="text-xs font-bold"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="block text-xs sm:text-sm font-bold text-foreground group-hover:text-primary leading-tight truncate">
                                        {sub.name}
                                      </span>
                                      {sub.section && (
                                        <span className="font-mono text-[9px] font-bold text-muted-foreground shrink-0">
                                          {sub.section}
                                        </span>
                                      )}
                                    </div>
                                    <span className="block text-[11px] font-medium text-muted-foreground leading-tight truncate">
                                      {sub.position}
                                    </span>
                                  </div>
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
        </div>
      </li>
    );
  }

  return (
    <div className="w-full">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="flex flex-col items-center"
      >
        {/* ========================================================
            TIER 1: Academic Supervisor & Executive Chairman
            ======================================================== */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Academic Supervisor */}
            <PersonButton
              node={supervisor}
              group="Faculty Supervision"
              onSelect={setSelected}
              className="group block h-full rounded-2xl"
            >
              <div className="relative flex h-full items-center gap-5 overflow-hidden rounded-2xl border-2 border-foreground bg-card p-6 sm:p-7 shadow-[5px_5px_0_0_var(--foreground)] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[7px_7px_0_0_var(--foreground)]">
                <PersonAvatar
                  node={supervisor}
                  className="size-20 sm:size-24 rounded-2xl border-2 border-foreground shadow-[3px_3px_0_0_var(--foreground)]"
                  textClassName="text-xl font-bold"
                />
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full border border-foreground bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary shadow-[1px_1px_0_0_var(--foreground)]">
                    Faculty Supervision
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {supervisor.name}
                  </h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-muted-foreground">
                    {supervisor.position}
                  </p>
                </div>
              </div>
            </PersonButton>

            {/* Executive Chairman */}
            {chairman && (
              <PersonButton
                node={chairman}
                group="Executive Board"
                onSelect={setSelected}
                className="group block h-full rounded-2xl"
              >
                <div className="relative flex h-full items-center gap-5 overflow-hidden rounded-2xl border-2 border-foreground bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-7 shadow-[5px_5px_0_0_var(--foreground)] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[7px_7px_0_0_var(--foreground)]">
                  <PersonAvatar
                    node={chairman}
                    className="size-20 sm:size-24 rounded-2xl border-2 border-foreground shadow-[3px_3px_0_0_var(--foreground)]"
                    textClassName="text-xl font-bold"
                    fallbackClassName="bg-primary text-primary-foreground"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-full border border-foreground bg-brand-cyan/20 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-foreground shadow-[1px_1px_0_0_var(--foreground)]">
                        Executive Chairman
                      </span>
                      {chairman.section && (
                        <span className="rounded-full border border-foreground/40 bg-secondary px-2 py-0.5 font-mono text-[10px] font-bold text-foreground">
                          {chairman.section}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {chairman.name}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-muted-foreground">
                      Head of Association & Chief Executive
                    </p>
                  </div>
                </div>
              </PersonButton>
            )}
          </div>
        </div>

        {/* Connector 1 -> 2 */}
        <TreeConnector label="Executive Council" />

        {/* ========================================================
            TIER 2: Directorate Office & Executive Secretariat
            ======================================================== */}
        <section className="w-full max-w-6xl rounded-3xl border-2 border-foreground bg-card p-5 sm:p-7 lg:p-8 shadow-[6px_6px_0_0_var(--foreground)]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-foreground/15 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="size-3.5 rounded-full border border-foreground bg-brand-cyan shadow-[1px_1px_0_0_var(--foreground)]" />
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                  Directorate Office & Executive Secretariat
                </h3>
                <p className="text-xs text-muted-foreground">
                  Vice chairmans and secretariat managing internal governance, external relations, and records
                </p>
              </div>
            </div>
            <span className="rounded-full border border-foreground bg-secondary px-3 py-1 font-mono text-xs font-bold text-foreground shadow-[1px_1px_0_0_var(--foreground)]">
              Executive Directorate
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {directorate.map(({ label, roleSubtitle, node }) => {
              if (!node) {
                return <VacantCard key={label} label={label} />;
              }

              const hasChildren = Boolean(node.children && node.children.length > 0);

              return (
                <div
                  key={label}
                  className="flex flex-col justify-between rounded-2xl border-2 border-foreground bg-secondary/30 p-4 sm:p-5 shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:shadow-[6px_6px_0_0_var(--foreground)] hover:-translate-y-0.5"
                >
                  <div>
                    {/* Role Header */}
                    <div className="flex items-center justify-between border-b-2 border-foreground/15 pb-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                        {label}
                      </span>
                      {node.section ? (
                        <span className="rounded-full border border-foreground/60 bg-card px-2.5 py-0.5 font-mono text-[10px] font-bold text-foreground shadow-[1px_1px_0_0_var(--foreground)]">
                          {node.section}
                        </span>
                      ) : (
                        <span className="rounded-full border border-foreground/60 bg-card px-2 py-0.5 font-mono text-[10px] font-bold text-foreground">
                          Officer
                        </span>
                      )}
                    </div>

                    {/* Officer Card */}
                    <PersonButton
                      node={node}
                      group={label}
                      onSelect={setSelected}
                      className="group mt-3 flex items-center gap-3 rounded-xl"
                    >
                      <PersonAvatar
                        node={node}
                        className="size-14 sm:size-16 shrink-0 rounded-2xl border-2 border-foreground shadow-[2px_2px_0_0_var(--foreground)]"
                        textClassName="text-base font-bold"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm sm:text-[15px] xl:text-base font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                          {node.name}
                        </h4>
                        <p className="mt-0.5 text-xs sm:text-sm font-semibold text-primary leading-tight">
                          {node.position}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground leading-tight">
                          {roleSubtitle}
                        </p>
                      </div>
                    </PersonButton>
                  </div>

                  {/* Assistant Officer if present */}
                  {hasChildren && (
                    <div className="mt-4 border-t-2 border-foreground/15 pt-3">
                      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Assistant Officer
                      </span>
                      {node.children!.map((child) => (
                        <PersonButton
                          key={child.name}
                          node={child}
                          group={label}
                          onSelect={setSelected}
                          className="group flex items-center gap-2.5 rounded-xl border-2 border-foreground/40 bg-card p-2.5 transition-all hover:border-foreground hover:shadow-[2px_2px_0_0_var(--foreground)]"
                        >
                          <PersonAvatar
                            node={child}
                            className="size-12 shrink-0 rounded-xl border-2 border-foreground shadow-[1px_1px_0_0_var(--foreground)]"
                            textClassName="text-xs font-bold"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="block text-xs sm:text-sm font-bold text-foreground group-hover:text-primary leading-tight truncate">
                                {child.name}
                              </span>
                              {child.section && (
                                <span className="font-mono text-[9px] font-bold text-muted-foreground shrink-0">
                                  {child.section}
                                </span>
                              )}
                            </div>
                            <span className="block text-[11px] font-semibold text-muted-foreground leading-tight">
                              {child.position}
                            </span>
                          </div>
                        </PersonButton>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Connector 2 -> 3 */}
        <TreeConnector label="Technical Divisions" />

        {/* ========================================================
            TIER 3: Departmental Directorates & Technical Committees
            ======================================================== */}
        <section className="w-full max-w-7xl">
          {/* Header & Quick Department Filter Pills */}
          <div className="mb-8 flex flex-col items-center text-center">
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Departmental Directorates & Committees
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-xl">
              Five specialized departments driving technological development, creative media, operations, archives, and finances.
            </p>

            {/* Quick Filter Pill Selector */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter("ALL")}
                className={`rounded-full border-2 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === "ALL"
                    ? "border-foreground bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--foreground)]"
                    : "border-border bg-card text-foreground hover:border-foreground hover:shadow-[2px_2px_0_0_var(--foreground)]"
                }`}
              >
                All Departments (5)
              </button>
              {departments.map((dept) => (
                <button
                  key={dept.code}
                  type="button"
                  onClick={() => setActiveFilter(dept.code)}
                  className={`rounded-full border-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    activeFilter === dept.code
                      ? "border-foreground bg-foreground text-background shadow-[2px_2px_0_0_var(--foreground)]"
                      : "border-border bg-card text-foreground hover:border-foreground hover:shadow-[2px_2px_0_0_var(--foreground)]"
                  }`}
                >
                  {dept.code}
                </button>
              ))}
            </div>
          </div>

          {/* Departments Display */}
          {activeFilter === "ALL" ? (
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
              {/* Looked up by code, not by index: the columns used to name
                  positions in the array, so removing a department left one
                  column reaching past the end and the page failed to build. */}
              {/* Left Column: Technology & Finance */}
              <ul className="flex list-none flex-col gap-8">
                {renderDepartmentCard(byCode("TECH"))}
                {renderDepartmentCard(byCode("FINANCE"))}
              </ul>

              {/* Right Column: Communications & Operations */}
              <ul className="flex list-none flex-col gap-8">
                {renderDepartmentCard(byCode("COMMS"))}
                {renderDepartmentCard(byCode("OPS"))}
              </ul>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <ul className="list-none space-y-8">
                {filteredDepartments.map(renderDepartmentCard)}
              </ul>
            </div>
          )}
        </section>
      </motion.div>

      {/* Member Details Modal */}
      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-md rounded-2xl border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)] sm:max-w-lg">
          {selected && (
            <div className="space-y-5">
              <DialogHeader className="text-left">
                <div className="flex items-center gap-4">
                  <PersonAvatar
                    node={selected}
                    className="size-20 sm:size-24 rounded-2xl border-2 border-foreground shadow-[3px_3px_0_0_var(--foreground)]"
                    textClassName="text-xl font-bold"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full border border-foreground bg-secondary px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                      {selected.group}
                    </span>
                    <DialogTitle className="mt-1.5 text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                      {selected.name}
                    </DialogTitle>
                    <DialogDescription className="mt-0.5 text-sm font-semibold text-primary">
                      {selected.position}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="rounded-xl border border-foreground/20 bg-secondary/30 p-4">
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-muted-foreground">
                  <span>Affiliation</span>
                  <span className="font-bold text-foreground">IT Students Association</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs font-mono font-semibold text-muted-foreground">
                  <span>Academic Year</span>
                  <span className="font-bold text-foreground">A.Y. 2025-2026</span>
                </div>
                {selected.section && (
                  <div className="mt-2 flex items-center justify-between text-xs font-mono font-semibold text-muted-foreground">
                    <span>Section / Division</span>
                    <span className="font-bold text-foreground">{selected.section}</span>
                  </div>
                )}
              </div>

              {/* Social Links if present */}
              {selected.socials && Object.values(selected.socials).some(Boolean) && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-mono text-xs font-bold uppercase text-muted-foreground mr-1">
                    Connect:
                  </span>
                  {selected.socials.facebook && (
                    <a
                      href={selected.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-9 place-items-center rounded-lg border-2 border-foreground bg-card text-foreground transition-all hover:-translate-y-0.5 hover:bg-[#1877F2] hover:text-white hover:shadow-[2px_2px_0_0_var(--foreground)]"
                      title="Facebook"
                    >
                      <FacebookIcon className="size-4" />
                    </a>
                  )}
                  {selected.socials.linkedin && (
                    <a
                      href={selected.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-9 place-items-center rounded-lg border-2 border-foreground bg-card text-foreground transition-all hover:-translate-y-0.5 hover:bg-[#0A66C2] hover:text-white hover:shadow-[2px_2px_0_0_var(--foreground)]"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="size-4" />
                    </a>
                  )}
                  {selected.socials.instagram && (
                    <a
                      href={selected.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-9 place-items-center rounded-lg border-2 border-foreground bg-card text-foreground transition-all hover:-translate-y-0.5 hover:bg-[#E4405F] hover:text-white hover:shadow-[2px_2px_0_0_var(--foreground)]"
                      title="Instagram"
                    >
                      <InstagramIcon className="size-4" />
                    </a>
                  )}
                  {selected.socials.website && (
                    <a
                      href={selected.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-9 place-items-center rounded-lg border-2 border-foreground bg-card text-foreground transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-[2px_2px_0_0_var(--foreground)]"
                      title="Personal Profile"
                    >
                      <Globe className="size-4" />
                    </a>
                  )}
                  {selected.socials.github && (
                    <a
                      href={selected.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-9 place-items-center rounded-lg border-2 border-foreground bg-card text-foreground transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-[2px_2px_0_0_var(--foreground)]"
                      title="GitHub"
                    >
                      <GithubIcon className="size-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
