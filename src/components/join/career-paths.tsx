"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  Cloud,
  Code2,
  FolderKanban,
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
};

/**
 * Roles named here are broad, real IT career tracks: not ITSA-specific
 * titles or claims about placement/outcomes.
 */
const paths: CareerPath[] = [
  {
    id: "web",
    label: "Web & Software Dev",
    icon: Code2,
    title: "Web & Software Development",
    blurb:
      "Building the applications people use every day, from browser-based tools to backend services that keep them running.",
  },
  {
    id: "mobile",
    label: "Mobile Dev",
    icon: Smartphone,
    title: "Mobile App Development",
    blurb:
      "Designing and building for the device most people actually reach for first, with its own constraints around performance and offline use.",
  },
  {
    id: "data",
    label: "Data & AI",
    icon: Boxes,
    title: "Data Analytics & AI",
    blurb:
      "Turning raw data into decisions, from dashboards and reports to the models behind today's AI-driven products.",
  },
  {
    id: "security",
    label: "Cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    blurb:
      "Thinking like an attacker to defend like one: network security, secure coding, and incident response all fall under this track.",
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: Cloud,
    title: "Cloud & DevOps",
    blurb:
      "Keeping applications deployed, scalable, and running smoothly: the infrastructure layer most other tracks quietly depend on.",
  },
  {
    id: "design",
    label: "UI/UX Design",
    icon: Palette,
    title: "UI/UX Design",
    blurb:
      "Making software make sense: research, wireframes, and interfaces that people can use without a manual.",
  },
  {
    id: "support",
    label: "IT Support & Networking",
    icon: Server,
    title: "IT Support & Networking",
    blurb:
      "The hands-on backbone of every organization's tech: hardware, networks, and the systems that keep people working.",
  },
  {
    id: "qa",
    label: "QA & Testing",
    icon: TestTube2,
    title: "Quality Assurance & Testing",
    blurb:
      "The discipline of finding what's broken before users do: manual testing, automation, and a sharp eye for edge cases.",
  },
  {
    id: "pm",
    label: "IT Project Management",
    icon: FolderKanban,
    title: "IT Project Management",
    blurb:
      "Bridging technology, business, and teams to turn complex roadmaps into shipped, high-impact software products.",
  },
];

export function CareerPaths() {
  const [activeId, setActiveId] = useState(paths[0].id);
  const active = paths.find((p) => p.id === activeId) ?? paths[0];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-4 sm:p-6">
      {/* Role picker */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
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
                "flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "border-brand bg-brand text-brand-foreground shadow-xs"
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
          className="mt-6 rounded-2xl border border-border/60 bg-muted/20 p-5 sm:p-6"
        >
          <div className="flex items-center gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
              <active.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
              {active.title}
            </h3>
          </div>
          <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {active.blurb}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
