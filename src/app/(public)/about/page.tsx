"use client";

import { motion } from "framer-motion";
import { Eye, Target, Heart, GraduationCap, Handshake, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
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
      "We grow together — sharing code reviews, mentoring junior students, and co-building projects in a open peer ecosystem.",
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
        badge="ABOUT ITSA"
        title="Building the future of tech, together."
        description={`The ${siteConfig.fullName} is the official student organization for IT builders at ${siteConfig.school}.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Story overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bridging the gap between classroom theory and production engineering.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
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
            <SpotlightCard spotlightColor="rgba(52, 169, 224, 0.25)" className="h-full p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-brand/15 text-brand">
                  <Target className="size-6" />
                </span>
                <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To empower Information Technology students by fostering technical mastery, leadership skills, and a collaborative community—creating direct pathways into high-impact tech careers.
              </p>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard spotlightColor="rgba(247, 168, 30, 0.25)" className="h-full p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-orange/15 text-brand-orange">
                  <Eye className="size-6" />
                </span>
                <h2 className="text-2xl font-bold tracking-tight">Our Vision</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To be the premier student technology hub that cultivates innovative, resilient, and socially responsible IT leaders who shape the digital landscape of tomorrow.
              </p>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What drives us</h2>
            <p className="mt-2 text-muted-foreground">The core values that guide our events, workshops, and community culture.</p>
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
                  <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Milestones / Roadmap timeline */}
        <div className="mt-24 rounded-3xl border border-border/80 bg-card/40 p-8 sm:p-12 backdrop-blur-md">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Our Growth & Impact</h2>
            <p className="mt-2 text-sm text-muted-foreground">How we continuously elevate the student IT experience at {siteConfig.school}.</p>
          </div>

          <div className="mt-12 grid gap-x-8 sm:grid-cols-3">
            {milestones.map((m) => (
              <div key={m.year} className="flex flex-col border-t border-border/80 pt-6">
                <span className="font-mono text-xs font-bold text-primary">{m.year}</span>
                <h3 className="mt-2 text-lg font-bold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
