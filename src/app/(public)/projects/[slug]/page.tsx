import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, User, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/social";
import { getProjectBySlug, getProjects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/layout/fade-in";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Not Found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = await getProjectBySlug(slug);
  const allProjects = await getProjects();

  if (!project) notFound();

  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <FadeIn as="article" className="pb-16 md:pb-24 lg:pb-32 pt-12 md:pt-20">
      {/* Premium Centered Header */}
      <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mb-16 md:mb-24">
        
        <div className="mb-10">
          <Button variant="outline" className="gap-2 rounded-full font-mono text-xs font-semibold transition-colors hover:bg-primary/5" render={<Link href="/projects" />}>
            <ArrowLeft className="size-3.5" /> BACK TO PROJECTS
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-primary/5 hover:bg-primary/10 border-primary/10 text-primary/80">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-[5.5rem] text-foreground text-balance mb-8">
          {project.title}
        </h1>
        
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="size-8 rounded-full bg-brand/10 text-brand grid place-items-center">
            <User className="size-4" />
          </div>
          <span className="font-semibold text-lg text-foreground/80">{project.author}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          {project.liveUrl && (
            <Button 
              size="lg"
              className="gap-2 group rounded-full px-8 w-full sm:w-auto text-base h-12" 
              render={<a href={project.liveUrl} target="_blank" rel="noreferrer" />}
            >
              Live Preview
              <ExternalLink className="size-4 opacity-70 transition-opacity group-hover:opacity-100" />
            </Button>
          )}
          {project.githubUrl && (
            <Button 
              size="lg"
              variant="outline" 
              className="gap-2 group bg-card rounded-full px-8 w-full sm:w-auto border-border/80 shadow-sm text-base h-12" 
              render={<a href={project.githubUrl} target="_blank" rel="noreferrer" />}
            >
              Source Code
              <GithubIcon className="size-4 opacity-70 transition-opacity group-hover:opacity-100" />
            </Button>
          )}
        </div>
      </header>

      {/* Hero Image */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30 border border-border/50 shadow-2xl">
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.imageUrl} alt={project.title} className="size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center">
              <Code2 className="size-20 text-primary-foreground/30" />
            </div>
          )}
        </div>
      </div>

      {/* Article Section */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 pb-12">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground mb-16 text-balance text-center">
          {project.content}
        </p>
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-col gap-6 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground break-words text-center md:text-left">
              Tech Stack
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {project.techStack.map(tech => (
                <Badge key={tech} variant="outline" className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-transparent border-primary/20 text-foreground/70 hover:bg-primary/5 hover:border-primary/40 transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6 text-lg leading-relaxed text-foreground/80">
          {project.sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-6">
              {section.title && (
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-8 break-words">
                  {section.title}
                </h2>
              )}
              
              {section.content && (
                <div className="flex flex-col gap-4">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              )}

              {section.galleryCount === 1 && (
                <div className="my-8 grid gap-4 sm:grid-cols-1">
                  <div className="aspect-video w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30 border border-border/50 grid place-items-center shadow-sm">
                    <Code2 className="size-10 text-primary-foreground/30" />
                  </div>
                </div>
              )}

              {section.galleryCount === 2 && (
                <div className="my-8 grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="col-span-1 aspect-[4/5] sm:aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30 border border-border/50 grid place-items-center shadow-sm">
                    <Code2 className="size-8 text-primary-foreground/30" />
                  </div>
                  <div className="col-span-1 aspect-[4/5] sm:aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30 border border-border/50 grid place-items-center shadow-sm">
                    <Code2 className="size-8 text-primary-foreground/30" />
                  </div>
                </div>
              )}

              {section.galleryCount === 3 && (
                <div className="my-8 grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="col-span-2 aspect-[21/9] w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30 border border-border/50 grid place-items-center shadow-sm">
                    <Code2 className="size-10 text-primary-foreground/30" />
                  </div>
                  <div className="col-span-1 aspect-square sm:aspect-video w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30 border border-border/50 grid place-items-center shadow-sm">
                    <Code2 className="size-8 text-primary-foreground/30" />
                  </div>
                  <div className="col-span-1 aspect-square sm:aspect-video w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30 border border-border/50 grid place-items-center shadow-sm">
                    <Code2 className="size-8 text-primary-foreground/30" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 pt-12 border-t border-border/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Button variant="outline" className="gap-2 rounded-full font-mono text-xs font-semibold uppercase transition-colors hover:bg-primary/5 w-full sm:w-auto justify-start" render={<Link href={`/projects/${prevProject.slug}`} />}>
            <ArrowLeft className="size-3.5" />
            <span className="truncate max-w-[200px]">{prevProject.title}</span>
          </Button>

          <Button variant="outline" className="gap-2 rounded-full font-mono text-xs font-semibold uppercase transition-colors hover:bg-primary/5 w-full sm:w-auto justify-end" render={<Link href={`/projects/${nextProject.slug}`} />}>
            <span className="truncate max-w-[200px]">{nextProject.title}</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
}
