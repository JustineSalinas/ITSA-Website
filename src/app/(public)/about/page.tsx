"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Telescope,
  Heart,
  GraduationCap,
  Handshake,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";

const values = [
  {
    Icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace curiosity and creativity, encouraging every member to explore cutting-edge tools, frameworks, and AI advancements.",
  },
  {
    Icon: Handshake,
    title: "Collaboration",
    description:
      "We grow together by sharing code reviews, mentoring junior students, and co-building projects in an open peer ecosystem.",
  },
  {
    Icon: GraduationCap,
    title: "Excellence",
    description:
      "We strive for high standards in our hackathons, practical workshops, and student-led software solutions.",
  },
  {
    Icon: Heart,
    title: "Community",
    description:
      "We foster an inclusive, welcoming space where every IT student finds belonging, encouragement, and lifelong tech peers.",
  },
];

const milestones = [
  {
    year: "Phase 01",
    title: "Foundation & Community Launch",
    description: `Established at ${siteConfig.school} to unite IT students under a shared passion for software development, systems administration, and tech innovation.`,
  },
  {
    year: "Phase 02",
    title: "Hands-on Labs & CTF Series",
    description:
      "Launched weekly peer-led workshops covering full-stack web engineering, cybersecurity CTFs, and cloud infrastructure.",
  },
  {
    year: "Phase 03",
    title: "Industry Alliances & Career Track",
    description:
      "Partnered with tech leaders to bring direct internships, mentorship programs, and annual tech summits to our members.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        variant="about"
        kicker="Official Student Organization · Est. 2026"
        title="Building the future of tech, together."
        description={`The ${siteConfig.fullName} is the official student organization for IT builders at ${siteConfig.school}.`}
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* ── Background Grid Pattern ── */}
        <GridBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Story overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary shadow-[2px_2px_0_0_var(--foreground)]">
              Our Origins & Purpose
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground text-balance">
              Bridging the gap between classroom theory and production engineering.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty max-w-2xl mx-auto">
              ITSA exists to turn classroom fundamentals into real project portfolios, hackathon trophies, and lasting industry networks. From your first hello world to your senior capstone project, ITSA is your home.
            </p>
          </motion.div>

          {/* Association Photo Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 sm:mt-16"
          >
            <div className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-slate-900 shadow-[6px_6px_0_0_var(--foreground)] aspect-[16/9] max-h-[460px] w-full group">
              <Image
                src="/images/itsa-community.png"
                alt="ITSA Community at University of San Agustin"
                fill
                className="object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 rounded-full border-2 border-foreground bg-card/95 px-3 sm:px-4 py-1.5 backdrop-blur-md text-xs font-bold text-foreground shadow-[2px_2px_0_0_var(--foreground)]">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ITSA Executive Board & Student Community</span>
              </div>

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 hidden sm:flex items-center gap-2 rounded-full border-2 border-foreground bg-card/95 px-3 py-1 backdrop-blur-md text-xs font-mono font-medium text-muted-foreground shadow-[2px_2px_0_0_var(--foreground)]">
                <span>{siteConfig.school}</span>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="mt-16 sm:mt-20 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl border-2 border-foreground bg-card p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0_0_var(--foreground)] transition-all duration-300 hover:shadow-[8px_8px_0_0_var(--foreground)] hover:-translate-y-1">
                {/* Subtle ambient glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-14 place-items-center rounded-2xl border-2 border-foreground bg-primary/10 text-primary shadow-[3px_3px_0_0_var(--foreground)]">
                      <Compass className="size-7" />
                    </span>
                    <span className="rounded-full border border-foreground/30 bg-secondary px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground shadow-[1px_1px_0_0_var(--foreground)]">
                      Core Mission
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    To empower Information Technology students by fostering technical mastery, leadership skills, and a collaborative community, creating direct pathways into high-impact tech careers.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl border-2 border-foreground bg-card p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0_0_var(--foreground)] transition-all duration-300 hover:shadow-[8px_8px_0_0_var(--foreground)] hover:-translate-y-1">
                {/* Subtle ambient glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand-orange/15 blur-3xl"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-14 place-items-center rounded-2xl border-2 border-foreground bg-brand-orange/15 text-brand-orange shadow-[3px_3px_0_0_var(--foreground)]">
                      <Telescope className="size-7" />
                    </span>
                    <span className="rounded-full border border-foreground/30 bg-secondary px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground shadow-[1px_1px_0_0_var(--foreground)]">
                      Strategic Vision
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    To be the premier student technology hub that cultivates innovative, resilient, and socially responsible IT leaders who shape the digital landscape of tomorrow.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="mt-24 sm:mt-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary shadow-[2px_2px_0_0_var(--foreground)]">
                Core Values
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                What drives us
              </h2>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                The foundational principles that guide our events, workshops, student mentorship, and community culture.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ Icon, title, description }, idx) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-foreground bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)] transition-all duration-300 hover:shadow-[6px_6px_0_0_var(--foreground)] hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid size-12 place-items-center rounded-xl border-2 border-foreground bg-primary/10 text-primary shadow-[2px_2px_0_0_var(--foreground)] group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="size-6" />
                        </span>
                        <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 font-mono text-xs font-bold text-foreground">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Milestones / Roadmap timeline */}
          <div className="mt-24 sm:mt-32">
            <div className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-card p-8 sm:p-12 shadow-[6px_6px_0_0_var(--foreground)]">
              {/* Subtle ambient glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl"
              />

              <div className="relative z-10">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-secondary/50 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary shadow-[2px_2px_0_0_var(--foreground)]">
                    Strategic Roadmap
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                    Our Growth & Impact
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                    How we continuously elevate the student IT experience at {siteConfig.school}.
                  </p>
                </div>

                <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-3">
                  {milestones.map((m) => (
                    <div
                      key={m.year}
                      className="group flex flex-col justify-between rounded-2xl border-2 border-foreground bg-secondary/30 p-6 shadow-[3px_3px_0_0_var(--foreground)] transition-all duration-300 hover:shadow-[5px_5px_0_0_var(--foreground)] hover:-translate-y-1 hover:bg-card"
                    >
                      <div>
                        <span className="inline-flex items-center rounded-full border-2 border-foreground bg-card px-3 py-1 font-mono text-xs font-bold text-primary shadow-[2px_2px_0_0_var(--foreground)]">
                          {m.year}
                        </span>
                        <h3 className="mt-4 font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Closing Community CTA Banner */}
          <div className="mt-20 sm:mt-28">
            <div className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-card p-8 sm:p-10 lg:p-12 shadow-[6px_6px_0_0_var(--foreground)]">
              {/* Ambient Glows */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-brand-orange/10 blur-3xl"
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
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
                    Ready to build the future of tech with us?
                  </h2>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                    Connect with student leaders, collaborate on real software projects, and participate in practical workshops at {siteConfig.school}.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row shrink-0 items-stretch sm:items-center gap-3.5">
                  <Button
                    size="lg"
                    className="group justify-center px-7"
                    render={<Link href="/join" />}
                  >
                    Join the Community
                    <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group justify-center px-7"
                    render={<Link href="/officers" />}
                  >
                    Meet the Officers
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
