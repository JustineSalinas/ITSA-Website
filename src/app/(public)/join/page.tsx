import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Compass, Lightbulb, Mail, MapPin, MessageCircle, Rocket, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { CareerPaths } from "@/components/join/career-paths";
import { SectionReveal } from "@/components/join/section-reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Community & Careers",
  description: `Grow your IT career, get advice, and connect with the ${siteConfig.fullName} community at ${siteConfig.school} — starting with our Discord.`,
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: `Community & Careers — ${siteConfig.name}`,
    description: `Career advice, growth resources, and the ${siteConfig.name} Discord community for IT students at ${siteConfig.school}.`,
    url: "/join",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Community & Careers — ${siteConfig.name}`,
    description: `Career advice, growth resources, and the ${siteConfig.name} Discord community.`,
  },
};

const chips = [
  { label: "Find your path", icon: Compass },
  { label: "Grow your skills", icon: TrendingUp },
  { label: "Build a track record", icon: Rocket },
  { label: "Get advice that helps", icon: Lightbulb },
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        title="Grow your IT career with us."
        description="Advice, skills, and a community of IT students figuring it out together — no application required, just show up."
        kicker="8 career tracks, one community"
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* ── Background Grid Pattern ── */}
        <GridBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Community / Discord hero */}
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-sm">
            {/* Subtle brand ambient glow matching original card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-brand-orange/10 blur-3xl"
            />

            {/* Discord Header Content matching Pic 2 */}
            <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <MessageCircle className="size-6" />
                </span>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Join the ITSA Discord
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    This is where ITSA actually happens day to day — announcements, study groups,
                    project collabs, and direct access to officers and fellow IT students.
                    There&apos;s no sign-up form; the server is open the moment you&apos;re an IT
                    student here.
                  </p>
                </div>
              </div>

              {siteConfig.discordInvite ? (
                <Button
                  size="lg"
                  className="group shrink-0 justify-center px-7"
                  render={
                    <a href={siteConfig.discordInvite} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  Join the Discord
                  <ArrowUpRight className="ml-1.5 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              ) : (
                <span
                  role="note"
                  aria-label="Discord invite link not available yet"
                  className="inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-border px-6 py-3 text-sm font-medium text-muted-foreground"
                >
                  Invite link coming soon
                </span>
              )}
            </div>

            {/* Community Photo - 100% UN-FADED, natural studio lighting and faces */}
            <div className="relative z-10 mt-8 sm:mt-10 overflow-hidden rounded-2xl border border-border/70 shadow-sm aspect-[16/9] max-h-[460px] w-full bg-slate-100">
              <Image
                src="/images/itsa-community.png"
                alt="ITSA Community"
                fill
                className="object-cover object-[center_35%]"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          </div>
        </SectionReveal>

        {/* Career paths explorer */}
        <SectionReveal className="mt-16" delay={0.05}>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore IT career paths
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tap a track to see what it actually involves, the skills worth building first, and
            one concrete way to start this week.
          </p>

          <ul className="mt-6 flex list-none flex-wrap items-center gap-2.5">
            {chips.map((chip) => (
              <li
                key={chip.label}
                className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-4 py-2 text-sm font-medium"
              >
                <chip.icon className="size-4 text-brand" aria-hidden="true" />
                {chip.label}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <CareerPaths />
          </div>
        </SectionReveal>

        {/* Community welcome + contact, one confident panel instead of two generic cards */}
        <SectionReveal className="mt-16" delay={0.05}>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-8 py-10 text-brand-foreground sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -right-16 size-80 rounded-full bg-brand-orange/25 blur-3xl"
            />

            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Every IT student here is already in.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-foreground/85 sm:text-base">
                  All Information Technology students at {siteConfig.school} are part of ITSA by
                  default — no membership form, no approval step. The Discord is the front door:
                  come say hello, ask a question, or lurk in the announcements until something
                  catches your interest.
                </p>
              </div>

              <div className="lg:col-span-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-foreground/70">
                  Prefer email?
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none transition-colors hover:bg-white/15 focus-visible:ring-3 focus-visible:ring-white/50"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {siteConfig.contactEmail}
                  </a>
                  <span className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm">
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    {siteConfig.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
        </div>
      </section>
    </>
  );
}
