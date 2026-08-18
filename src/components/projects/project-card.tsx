"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, ExternalLink, User } from "lucide-react";
import { GithubIcon } from "@/components/icons/social";
import type { ProjectItem } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group relative flex h-full flex-col overflow-hidden pt-0 border-border/80 bg-card/70 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0">
          <span className="sr-only">View project {project.title}</span>
        </Link>
        
        <div className="relative z-10 aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary/80 to-primary pointer-events-none">
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={project.title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-items-center bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30">
              <Code2 className="size-10 text-primary-foreground/70" />
            </div>
          )}
        </div>

        <CardContent className="relative z-10 flex flex-1 flex-col p-6 pointer-events-none">
          <div className="flex items-center gap-1.5 font-mono text-xs text-brand-cyan">
            <User className="size-3.5" />
            {project.author}
          </div>

          <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight">
            <span className="transition-colors group-hover:text-primary">
              {project.title}
            </span>
          </h3>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map(tag => (
              <Badge key={tag} variant="secondary" className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 border-none font-medium">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2">
              View project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
            
            <div className="flex gap-2 relative z-20">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="pointer-events-auto text-muted-foreground hover:text-foreground transition-colors p-1">
                  <GithubIcon className="size-4" />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pointer-events-auto text-muted-foreground hover:text-foreground transition-colors p-1">
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
