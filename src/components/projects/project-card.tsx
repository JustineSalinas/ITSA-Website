"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, ExternalLink, User, Users, Trophy } from "lucide-react";
import { GithubIcon } from "@/components/icons/social";
import type { ProjectItem } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectCard({ project, isFeatured }: { project: ProjectItem; isFeatured?: boolean }) {
  const awardTag = isFeatured ? project.tags.find(tag => 
    tag.toLowerCase().includes('winner') || 
    tag.toLowerCase().includes('award') ||
    tag.toLowerCase().includes('prize')
  ) : null;

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
          {isFeatured && (
            <div className="group/trophy absolute top-3 right-3 z-20 flex items-center justify-center rounded-full bg-amber-500 text-amber-950 p-2 shadow-md pointer-events-auto cursor-default">
              <Trophy className="size-4 fill-amber-950" />
              
              <div className="absolute right-0 top-full mt-2.5 opacity-0 invisible group-hover/trophy:opacity-100 group-hover/trophy:visible transition-all duration-200 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-50 shadow-xl border border-zinc-800 pointer-events-none">
                {awardTag || "Award Winner"}
                <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-zinc-900 border-l border-t border-zinc-800"></div>
              </div>
            </div>
          )}
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
            {project.teamSize && project.teamSize > 1 ? (
              <>
                <Users className="size-3.5" />
                {project.teamName || `Team of ${project.teamSize}`}
              </>
            ) : (
              <>
                <User className="size-3.5" />
                {project.author}
              </>
            )}
          </div>

          <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight">
            <span className="transition-colors group-hover:text-primary">
              {project.title}
            </span>
          </h3>

          {isFeatured && project.awardName && (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-amber-500">
              <Trophy className="size-3" />
              {project.awardName}
            </div>
          )}

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
                  <span className="sr-only">View source on GitHub</span>
                  <GithubIcon className="size-4" />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pointer-events-auto text-muted-foreground hover:text-foreground transition-colors p-1">
                  <span className="sr-only">Visit live site</span>
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
