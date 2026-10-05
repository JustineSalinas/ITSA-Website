import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/data";
import { formatNewsDate } from "@/lib/format";
import { siteConfig } from "@/data/site";

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getNews()).find((n) => n.slug === slug);
  if (!item) return {};
  const image = item.imageUrl ?? item.images?.[0];
  return {
    title: item.title,
    description: item.excerpt.slice(0, 160),
    openGraph: { title: item.title, description: item.excerpt.slice(0, 160), type: "article", images: image ? [image] : undefined },
    twitter: { card: "summary_large_image", title: item.title, description: item.excerpt.slice(0, 160), images: image ? [image] : undefined },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = [...(await getNews())].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const index = all.findIndex((n) => n.slug === slug);
  if (index === -1) notFound();
  const item = all[index];
  const older = all[index + 1];
  const newer = all[index - 1];

  const paragraphs = item.content.split("\n\n");
  const [lead, ...rest] = item.images ?? [];
  const authorName = item.author?.name ?? siteConfig.fullName;
  const authorRole = item.author?.role;

  return (
    <article className="pb-20">
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <Button variant="outline" size="sm" className="group" render={<Link href="/news" />}>
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          All news
        </Button>

        <header className="mt-8">
          {item.category && (
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/10 font-mono text-xs font-semibold text-primary"
            >
              {item.category}
            </Badge>
          )}
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
            {item.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-foreground bg-white">
              <Image src="/logo.png" alt="" aria-hidden="true" fill sizes="44px" className="object-contain p-1" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight text-foreground">
                {authorName}
                {authorRole && <span className="font-medium text-muted-foreground"> · {authorRole}</span>}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
                <span aria-hidden="true">·</span>
                <Globe className="size-3" aria-label="Public" />
              </p>
            </div>
          </div>
        </header>
      </div>

      {/* Lead image */}
      {lead && (
        <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-foreground bg-muted shadow-[6px_6px_0_0_var(--foreground)] sm:aspect-[16/9]">
            <Image src={lead} alt={item.title} fill priority sizes="(max-width: 1024px) 100vw, 896px" className="object-cover object-center" />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Body */}
        <div className="mt-12 flex flex-col gap-5 text-lg leading-relaxed text-foreground/85">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary/80 px-2.5 py-1 font-mono text-xs font-medium text-secondary-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* More photos */}
        {rest.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {rest.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-foreground bg-muted shadow-[3px_3px_0_0_var(--foreground)] first:sm:col-span-2 first:sm:aspect-[16/9]"
              >
                <Image src={src} alt={`${item.title}, additional photo`} fill sizes="(max-width: 1024px) 100vw, 768px" className="object-cover object-center" />
              </div>
            ))}
          </div>
        )}

        {/* Previous / next */}
        {(newer || older) && (
          <nav
            aria-label="More news"
            className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-10 sm:flex-row"
          >
            {older ? (
              <Button variant="outline" className="w-full justify-start gap-2 font-mono text-xs uppercase sm:w-auto" render={<Link href={`/news/${older.slug}`} />}>
                <ArrowLeft className="size-3.5" />
                <span className="max-w-[220px] truncate">{older.title}</span>
              </Button>
            ) : (
              <span />
            )}
            {newer && (
              <Button variant="outline" className="w-full justify-end gap-2 font-mono text-xs uppercase sm:w-auto" render={<Link href={`/news/${newer.slug}`} />}>
                <span className="max-w-[220px] truncate">{newer.title}</span>
                <ArrowRight className="size-3.5" />
              </Button>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
