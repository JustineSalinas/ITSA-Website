"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  Cloud,
  Code2,
  type LucideIcon,
  Palette,
  Server,
  Shield,
  Smartphone,
  TestTube2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CareerPath = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  skills: string[];
  firstStep: string;
};

/**
 * Roles named here are broad, real IT career tracks — not ITSA-specific
 * titles or claims about placement/outcomes. The "first step" is advice,
 * not a promise of a program ITSA runs, since no such curriculum exists yet.
 */
const paths: CareerPath[] = [
  {
    id: "web",
    label: "Web & Software Dev",
    icon: Code2,
    title: "Web & Software Development",
    blurb:
      "Building the applications people use every day — from browser-based tools to backend services that keep them running.",
    skills: ["JavaScript/TypeScript", "Git & version control", "REST/HTTP basics", "A framework (React, Next.js, etc.)"],
    firstStep: "Pick one small idea and ship it end to end — a finished toy project teaches more than a half-finished big one.",
  },
  {
    id: "mobile",
    label: "Mobile Dev",
    icon: Smartphone,
    title: "Mobile App Development",
    blurb:
      "Designing and building for the device most people actually reach for first — with its own constraints around performance and offline use.",
    skills: ["Kotlin/Swift or Flutter/React Native", "UI state management", "App store release basics", "Working with device APIs"],
    firstStep: "Rebuild a simple app you already use daily — cloning a familiar UI forces you to think through real interaction details.",
  },
  {
    id: "data",
    label: "Data & AI",
    icon: Boxes,
    title: "Data Analytics & AI",
    blurb:
      "Turning raw data into decisions — from dashboards and reports to the models behind today's AI-driven products.",
    skills: ["Python & SQL", "Statistics fundamentals", "Data visualization", "ML basics (once fundamentals are solid)"],
    firstStep: "Find a public dataset you're curious about and ask it one real question — the analysis process matters more than the topic.",
  },
  {
    id: "security",
    label: "Cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    blurb:
      "Thinking like an attacker to defend like one — network security, secure coding, and incident response all fall under this track.",
    skills: ["Networking fundamentals", "Linux command line", "OWASP top 10", "Capture-the-flag practice"],
    firstStep: "Try a beginner CTF (capture-the-flag) challenge online — it's the fastest way to see if the offense/defense mindset clicks for you.",
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: Cloud,
    title: "Cloud & DevOps",
    blurb:
      "Keeping applications deployed, scalable, and running smoothly — the infrastructure layer most other tracks quietly depend on.",
    skills: ["Linux & shell scripting", "A cloud provider (AWS/GCP/Azure)", "CI/CD basics", "Containers (Docker)"],
    firstStep: "Deploy something you've already built to a real cloud host — the friction you hit is the actual syllabus.",
  },
  {
    id: "design",
    label: "UI/UX Design",
    icon: Palette,
    title: "UI/UX Design",
    blurb:
      "Making software make sense — research, wireframes, and interfaces that people can use without a manual.",
    skills: ["Figma or similar tools", "Basic usability heuristics", "Wireframing & prototyping", "Reading feedback critically"],
    firstStep: "Redesign one screen of an app that frustrates you, and be able to explain why your version is better.",
  },
  {
    id: "support",
    label: "IT Support & Networking",
    icon: Server,
    title: "IT Support & Networking",
    blurb:
      "The hands-on backbone of every organization's tech — hardware, networks, and the systems that keep people working.",
    skills: ["Networking fundamentals", "Windows/Linux administration", "Troubleshooting method", "Certifications (CompTIA A+/Network+)"],
    firstStep: "Set up and break your own small home network or lab — troubleshooting your own mess is the fastest teacher.",
  },
  {
    id: "qa",
    label: "QA & Testing",
    icon: TestTube2,
    title: "Quality Assurance & Testing",
    blurb:
      "The discipline of finding what's broken before users do — manual testing, automation, and a sharp eye for edge cases.",
    skills: ["Test-case design", "Bug reporting clarity", "Basic automation scripting", "Reading a codebase you didn't write"],
    firstStep: "Pick an app you use often and try to genuinely break it — then write up what you found like a real bug report.",
  },
];

export function CareerPaths() {
  const [activeId, setActiveId] = useState(paths[0].id);
  const active = paths.find((p) => p.id === activeId) ?? paths[0];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-4 sm:p-6">
      {/* Role picker */}
      <div className="flex snap-x gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {paths.map((path) => {
          const Icon = path.icon;
          const isActive = path.id === activeId;
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setActiveId(path.id)}
              aria-current={isActive}
              className={cn(
                "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border/80 bg-secondary/40 text-muted-foreground hover:border-brand/40 hover:text-foreground"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {path.label}
            </button>
          );
        })}
      </div>

      {/* Active path detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-6 grid gap-6 sm:grid-cols-5"
        >
          <div className="sm:col-span-3">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <active.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {active.title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {active.blurb}
            </p>

            <div className="mt-6 rounded-xl border border-brand-orange/25 bg-brand-orange/5 p-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-orange">
                First step
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{active.firstStep}</p>
            </div>
          </div>

          <div className="sm:col-span-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Skills to build
            </p>
            <ul className="mt-3 flex list-none flex-col gap-2">
              {active.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-border/80 bg-muted/30 px-3 py-2 text-sm text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
