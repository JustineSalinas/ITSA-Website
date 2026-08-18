"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, Terminal } from "lucide-react";
import type { ProjectItem } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectsClient({ projects }: { projects: ProjectItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects by search query
  const displayedProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [projects, searchQuery]);

  return (
    <div className="mt-8">
      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Project Directory</h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/60 bg-card/40 py-2 pl-9 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-card/80 focus:ring-1 focus:ring-primary/50"
          />
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
            We couldn't find any projects matching your current filters and search query.
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
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
