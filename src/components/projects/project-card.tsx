"use client";

import Link from "next/link";
import { ArrowRight, Code2, ExternalLink, User, Users, Trophy } from "lucide-react";
import { GithubIcon } from "@/components/icons/social";
import type { ProjectItem } from "@/data/projects";

const MAX_CHIPS = 3;

// Same visual family as the Project/Portfolio of the Month spotlights (ink
// borders, hard offset shadow, browser-framed preview), deliberately scaled
// down -- smaller radius, shorter shadow, no glow blobs -- so the spotlight
// stays the loudest thing on /projects.
export function ProjectCard({ project, isFeatured }: { project: ProjectItem; isFeatured?: boolean }) {
  const awardTag = isFeatured ? project.tags.find(tag =>
    tag.toLowerCase().includes('winner') ||
    tag.toLowerCase().includes('award') ||
    tag.toLowerCase().includes('prize')
  ) : null;

  const chips = project.techStack?.length ? project.techStack : project.tags;
  const previewLabel = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border-2 border-foreground bg-card p-4 shadow-[3px_3px_0_0_var(--foreground)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--foreground)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0">
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0 rounded-2xl">
        <span className="sr-only">View project {project.title}</span>
      </Link>

      {/* Browser-framed preview */}
      <div className="pointer-events-none relative z-10 overflow-hidden rounded-xl border-2 border-foreground bg-foreground">
        <div className="flex items-center gap-1.5 border-b-2 border-foreground bg-muted px-3 py-2">
          <span className="size-2 shrink-0 rounded-full border border-foreground bg-brand-red" />
          <span className="size-2 shrink-0 rounded-full border border-foreground bg-brand-orange" />
          <span className="size-2 shrink-0 rounded-full border border-foreground bg-brand-cyan" />
          {previewLabel && (
            <span className="ml-1.5 truncate rounded border border-foreground/20 bg-background/60 px-1.5 py-px text-[10px] leading-4 text-muted-foreground">
              {previewLabel}
            </span>
          )}
        </div>
        <div className="relative aspect-[16/10] w-full bg-card">
          {isFeatured && (
            <div className="group/trophy pointer-events-auto absolute right-2.5 top-2.5 z-20 flex cursor-default items-center justify-center rounded-full bg-gold p-2 text-slate-950 shadow-sm">
              <Trophy className="size-4 fill-slate-950" />

              <div className="pointer-events-none invisible absolute right-0 top-full mt-2.5 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-md transition-all duration-200 group-hover/trophy:visible group-hover/trophy:opacity-100">
                {awardTag || "Award Winner"}
                <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 border-l border-t border-border bg-card"></div>
              </div>
            </div>
          )}
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-top"
            />
          ) : (
            <div className="grid size-full place-items-center bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30">
              <Code2 className="size-10 text-primary-foreground/70" />
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col pt-5">
        <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-brand">
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

        <h3 className="mt-2 font-heading text-xl font-extrabold leading-snug tracking-tight text-foreground">
          {project.title}
        </h3>

        {isFeatured && project.awardName && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
            <Trophy className="size-3" />
            {project.awardName}
          </div>
        )}

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {chips.slice(0, MAX_CHIPS).map(chip => (
              <span
                key={chip}
                className="inline-flex items-center rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-0.5 font-mono text-xs font-medium text-foreground"
              >
                {chip}
              </span>
            ))}
            {chips.length > MAX_CHIPS && (
              <span className="inline-flex items-center px-1 font-mono text-xs text-muted-foreground">
                +{chips.length - MAX_CHIPS}
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t-2 border-foreground/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground transition-all group-hover:gap-2.5 group-hover:text-brand">
            View project
            <ArrowRight className="size-4" />
          </span>

          <div className="relative z-20 flex gap-1">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="pointer-events-auto rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <span className="sr-only">View source on GitHub</span>
                <GithubIcon className="size-4" />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pointer-events-auto rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <span className="sr-only">Visit live site</span>
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
