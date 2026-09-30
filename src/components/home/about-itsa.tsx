"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Lightbulb, Users, Award, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

/**
 * A short "About ITSA" block for the homepage.
 *
 * Wording is taken verbatim from the /about page so the two can never drift
 * into saying different things. This is a summary and an entry point, not a
 * replacement: About is no longer in the main navigation, so this is how most
 * visitors will now reach it.
 */

/**
 * The four values, named only. Each one's full paragraph lives on /about, which
 * the button at the foot of this section leads to -- repeating them here made
 * six boxes on one screen and read as filler.
 *
 * Rendered as chips rather than a fourth row of cards: DESIGN.md rules out
 * "four identical icon-cards in a row" as the generic-template shape.
 */
const values = [
  { title: "Innovation", icon: Lightbulb },
  { title: "Collaboration", icon: Users },
  { title: "Excellence", icon: Award },
  { title: "Community", icon: HeartHandshake },
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
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
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
              className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-md"
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

      {/* What drives us -- named here, explained on /about */}
      <motion.ul
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mt-8 flex list-none flex-wrap items-center justify-center gap-2.5"
      >
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <li
              key={value.title}
              className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-4 py-2 text-sm font-medium"
            >
              <Icon className="size-4 text-primary" aria-hidden="true" />
              {value.title}
            </li>
          );
        })}
      </motion.ul>

      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className="group px-7"
          render={<Link href="/about" />}
        >
          Read our full story
          <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
