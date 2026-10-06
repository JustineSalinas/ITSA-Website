import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Compass, Lightbulb, Mail, Rocket, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { CareerPaths } from "@/components/join/career-paths";
import { SectionReveal } from "@/components/join/section-reveal";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Community & Careers",
  description: `Grow your IT career, get advice, and connect with the ${siteConfig.fullName} community at ${siteConfig.school}, starting with our Discord.`,
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: `Community & Careers | ${siteConfig.name}`,
    description: `Career advice, growth resources, and the ${siteConfig.name} Discord community for IT students at ${siteConfig.school}.`,
    url: "/join",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Community & Careers | ${siteConfig.name}`,
    description: `Career advice, growth resources, and the ${siteConfig.name} Discord community.`,
  },
};

const chips = [
  { label: "Find your path", icon: Compass },
  { label: "Grow your skills", icon: TrendingUp },
  { label: "Build a track record", icon: Rocket },
  { label: "Get advice that helps", icon: Lightbulb },
];

export default async function JoinPage() {

  return (
    <>
      <PageHeader
        variant="join"
        title="Grow your IT career with us."
        description="Advice, skills, and a community of IT students figuring it out together: no application required, just show up."
        kicker="9 career tracks, one community"
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* ── Background Grid Pattern ── */}
        <GridBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Community / Discord hero */}
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-card p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0_0_var(--foreground)]">
            {/* Subtle brand ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#5865F2]/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-brand/10 blur-3xl"
            />

            {/* Discord Header Content */}
            <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-foreground bg-[#5865F2] text-white shadow-[3px_3px_0_0_var(--foreground)]">
                  <svg className="size-6 sm:size-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </span>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#5865F2]">
                    Digital Community Space
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-pretty">
                    Join the ITSA Discord
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                    This is where ITSA happens day to day: announcements, study groups,
                    project collabs, and direct access to officers and fellow IT students.
                    The server is open to every Augustinian IT student.
                  </p>
                </div>
              </div>

              {/* Action / Status */}
              <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
                {siteConfig.discordInvite ? (
                  <Button
                    size="lg"
                    className="group justify-center px-7 bg-[#5865F2] hover:bg-[#4752C4] text-white"
                    render={
                      <a href={siteConfig.discordInvite} target="_blank" rel="noopener noreferrer" />
                    }
                  >
                    Join the Discord
                    <ArrowUpRight className="ml-1.5 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Button>
                ) : (
                  <div className="flex flex-col sm:items-end gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-muted/60 px-3.5 py-1.5 font-mono text-xs font-semibold text-foreground shadow-[2px_2px_0_0_var(--foreground)]">
                      <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                      Discord invite opening soon
                    </span>
                    {siteConfig.socials.facebook && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="group justify-center"
                        render={
                          <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" />
                        }
                      >
                        Follow on Facebook
                        <ArrowUpRight className="ml-1 size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Channels Feature Bar */}
            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4 text-xs">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                Channels:
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-medium text-foreground">
                💬 #general-chat
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-medium text-foreground">
                📢 #announcements
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-medium text-foreground">
                💻 #dev-collab
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-medium text-foreground">
                📚 #study-groups
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-medium text-foreground">
                🎮 #game-nights
              </span>
            </div>

            {/* Community Photo with Neo-Brutalist Frame & Badges */}
            <div className="relative z-10 mt-6 sm:mt-8 overflow-hidden rounded-2xl border-2 border-foreground bg-slate-900 shadow-[4px_4px_0_0_var(--foreground)] aspect-[16/9] max-h-[460px] w-full group">
              <Image
                src="/images/itsa-community.webp"
                alt="ITSA Student Officers and Community Members"
                fill
                className="object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 rounded-full border-2 border-foreground bg-card/95 px-3 sm:px-4 py-1.5 backdrop-blur-md text-xs font-bold text-foreground shadow-[2px_2px_0_0_var(--foreground)]">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ITSA Executive Board & Student Leads</span>
              </div>

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 hidden sm:flex items-center gap-2 rounded-full border-2 border-foreground bg-card/95 px-3 py-1 backdrop-blur-md text-xs font-mono font-medium text-muted-foreground shadow-[2px_2px_0_0_var(--foreground)]">
                <span>A.Y. 2025–2026</span>
              </div>
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

        {/* Community closing banner -- formatted identically to homepage footer banner */}
        <SectionReveal className="mt-16 sm:mt-20" delay={0.05}>
          <div className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-card p-8 sm:p-10 lg:p-12 shadow-[6px_6px_0_0_var(--foreground)]">
            {/* Subtle ambient glow for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-brand-orange/10 blur-3xl"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
              {/* Left Content Column */}
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="size-9 shrink-0 transition-transform duration-300 hover:scale-105">
                    <LogoMark priority />
                  </div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {siteConfig.fullName}
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-pretty">
                  Connect with the ITSA Community.
                </h2>

                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                  The ITSA Community is open to all IT students: join our Discord to collaborate, share projects, and learn with peers. For official ITSA Organization Membership and officer inquiries, connect with our team directly.
                </p>
              </div>

              {/* Right Action Button & Contact Meta */}
              <div className="flex flex-col shrink-0 gap-3.5 sm:w-auto">
                <Button
                  size="lg"
                  className="group justify-center px-7"
                  render={
                    siteConfig.discordInvite ? (
                      <a href={siteConfig.discordInvite} target="_blank" rel="noopener noreferrer" />
                    ) : (
                      <a href={`mailto:${siteConfig.contactEmail}`} />
                    )
                  }
                >
                  {siteConfig.discordInvite ? "Join the Discord" : "Contact officers"}
                  <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>

                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Mail className="size-3.5 text-brand" />
                    <span>{siteConfig.contactEmail}</span>
                  </a>
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
