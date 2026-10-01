"use client";

import { motion } from "framer-motion";
import { Compass, Telescope, Heart, GraduationCap, Handshake, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { GridBackground } from "@/components/layout/grid-background";
import { SpotlightCard } from "@/components/ui/spotlight-card";
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
    description: "Launched weekly peer-led workshops covering full-stack web engineering, cybersecurity CTFs, and cloud infrastructure.",
  },
  {
    year: "Phase 03",
    title: "Industry Alliances & Career Track",
    description: "Partnered with tech leaders to bring direct internships, mentorship programs, and annual tech summits to our members.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
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
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Bridging the gap between classroom theory and production engineering.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            ITSA exists to turn classroom fundamentals into real project portfolios, hackathon trophies, and lasting industry networks. From your first hello world to your senior capstone project, ITSA is your home.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard spotlightColor="rgba(47, 86, 214, 0.18)" className="h-full p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Compass className="size-6" />
                </span>
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">Our Mission</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                To empower Information Technology students by fostering technical mastery, leadership skills, and a collaborative community, creating direct pathways into high-impact tech careers.
              </p>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard spotlightColor="rgba(247, 168, 30, 0.18)" className="h-full p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-orange/15 text-brand-orange">
                  <Telescope className="size-6" />
                </span>
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">Our Vision</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                To be the premier student technology hub that cultivates innovative, resilient, and socially responsible IT leaders who shape the digital landscape of tomorrow.
              </p>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">What drives us</h2>
            <p className="mt-2 text-base text-muted-foreground">The core values that guide our events, workshops, and community culture.</p>
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
                <SpotlightCard className="h-full p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Milestones / Roadmap timeline */}
        <div className="mt-24 rounded-3xl border border-border/80 bg-card p-8 sm:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Growth & Impact</h2>
            <p className="mt-2 text-sm text-muted-foreground">How we continuously elevate the student IT experience at {siteConfig.school}.</p>
          </div>

          <div className="mt-12 grid gap-x-8 sm:grid-cols-3">
            {milestones.map((m) => (
              <div key={m.year} className="flex flex-col border-t border-border/80 pt-6">
                <span className="font-mono text-xs font-bold text-primary">{m.year}</span>
                <h3 className="mt-2 font-heading text-base font-bold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
