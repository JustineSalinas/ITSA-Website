"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Lightbulb, Users, Award, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { siteConfig } from "@/data/site";

/**
 * A short "About ITSA" block for the homepage.
 *
 * Wording is taken verbatim from the /about page so the two can never drift
 * into saying different things. This is a summary and an entry point, not a
 * replacement: About is no longer in the main navigation, so this is how most
 * visitors will now reach it.
 */

const values = [
  {
    title: "Innovation",
    icon: Lightbulb,
    description:
      "We embrace curiosity and creativity, encouraging every member to explore cutting-edge tools, frameworks, and AI advancements.",
  },
  {
    title: "Collaboration",
    icon: Users,
    description:
      "We grow together — sharing code reviews, mentoring junior students, and co-building projects in an open peer ecosystem.",
  },
  {
    title: "Excellence",
    icon: Award,
    description:
      "We strive for high standards in our hackathons, practical workshops, and student-led software solutions.",
  },
  {
    title: "Community",
    icon: HeartHandshake,
    description:
      "We foster an inclusive, welcoming space where every IT student finds belonging, encouragement, and lifelong tech peers.",
  },
];

export function AboutItsa() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
          <LogoMark className="size-3.5 shrink-0" aria-hidden="true" />
          ABOUT ITSA
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          The official IT student association at {siteConfig.school}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          We bring Information Technology students together to build real skills, real
          projects, and real careers — through workshops, competitions, mentorship, and
          a community that lasts beyond graduation.
        </p>
      </motion.div>

      {/* Mission and vision, quoted from the About page. */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {[
          {
            icon: Target,
            title: "Our Mission",
            body: "To empower Information Technology students by fostering technical mastery, leadership skills, and a collaborative community—creating direct pathways into high-impact tech careers.",
          },
          {
            icon: Eye,
            title: "Our Vision",
            body: "To be the premier student technology hub that cultivates innovative, resilient, and socially responsible IT leaders who shape the digital landscape of tomorrow.",
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* What drives us */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              className="rounded-xl border border-border/60 bg-muted/25 p-5"
            >
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold">{value.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className="group border-border/80 bg-card transition-all hover:border-primary/40 hover:bg-accent"
          render={<Link href="/about" />}
        >
          Read our full story
          <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
