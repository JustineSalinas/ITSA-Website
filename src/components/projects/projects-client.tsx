"use client";

import { useState, useMemo, useDeferredValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, Terminal, Trophy } from "lucide-react";
import type { ProjectItem } from "@/data/projects";
import Link from "next/link";
import { ProjectCard } from "./project-card";

export function ProjectsClient({ projects, hideAwardsButton }: { projects: ProjectItem[]; hideAwardsButton?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");

  const deferredSearchQuery = useDeferredValue(searchQuery);


  // Filter projects by search query
  const displayedProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        project.author.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(deferredSearchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [projects, deferredSearchQuery]);

  return (
    <div className="mt-8">
      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Project Directory</h2>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
          {!hideAwardsButton && (
            <Link 
              href="/projects/awards" 
              className="inline-flex w-full sm:w-auto items-center justify-center whitespace-nowrap rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-500/20 hover:text-amber-700"
            >
              <Trophy className="mr-2 size-4" />
              Award Winners
            </Link>
          )}
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
            <label htmlFor="project-search" className="sr-only">Search projects</label>
            <input
              id="project-search"
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border/60 bg-card/40 py-2 pl-9 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-card/80 focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Active Filter Context */}
      <div className="mt-6 flex items-center justify-end gap-2 text-xs text-muted-foreground font-mono">
        <Filter className="size-3.5 text-primary" />
        Showing {displayedProjects.length} {displayedProjects.length === 1 ? 'project' : 'projects'}
      </div>

      {/* Projects Grid */}
      {displayedProjects.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-border/80 bg-card/40 p-16 text-center backdrop-blur-md">
          <Terminal className="mx-auto size-10 text-muted-foreground/60" />
          <h3 className="mt-4 font-heading text-lg font-semibold">No projects found</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            We couldn&apos;t find any projects matching your current filters and search query.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-6 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            Clear search
          </button>
        </div>
      ) : (
        <motion.div
          layout
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.06
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={{
                  hidden: { opacity: 0, scale: 0.92, y: 16 },
                  show: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.4,
                      duration: 0.4
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.92, y: -16 }}
              >
                <ProjectCard 
                  project={project} 
                  isFeatured={project.tags.some(tag => 
                    tag.toLowerCase().includes('winner') || 
                    tag.toLowerCase().includes('award') ||
                    tag.toLowerCase().includes('prize')
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
