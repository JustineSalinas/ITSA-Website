"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function AboutItsa() {
  return (
    <section className="w-full border-t border-black bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          projects, and real careers through workshops, competitions, mentorship, and
          a community that lasts beyond graduation.
        </p>
      </motion.div>

      {/* Mission and vision, quoted from the About page. */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {[
          {
            icon: Compass,
            title: "Our Mission",
            body: "To empower Information Technology students by fostering technical mastery, leadership skills, and a collaborative community, creating direct pathways into high-impact tech careers.",
          },
          {
            icon: Telescope,
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

      <div className="mt-10 sm:mt-12 flex justify-center">
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
      </div>
    </section>
  );
}
