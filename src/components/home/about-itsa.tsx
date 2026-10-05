"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { GridBackground } from "@/components/layout/grid-background";
import { siteConfig } from "@/data/site";

export function AboutItsa() {
  return (
    <section className="w-full border-t border-black bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro banner card matching the site's signature neo-brutalist & grid aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-card p-8 sm:p-12 lg:p-14 text-center shadow-[6px_6px_0_0_var(--foreground)]"
        >
          {/* Subtle light grid pattern */}
          <GridBackground />

          {/* Soft ambient brand glows from the ITSA palette (blue + orange spark) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-brand-orange/10 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Institutional Seal & Association Lockup */}
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/usa.png"
                alt={`${siteConfig.school} logo`}
                width={36}
                height={36}
                className="size-8 sm:size-9 object-contain shrink-0"
              />
              <span className="h-5 w-px bg-slate-300" aria-hidden="true" />
              <LogoMark className="size-7 sm:size-8 shrink-0" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {siteConfig.school}
              </span>
            </div>

            {/* Headline with university maroon accent */}
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
              The official IT student association at{" "}
              <span className="text-[#800000]">{siteConfig.school}</span>
            </h2>

            {/* Natural, readable body copy */}
            <p className="mx-auto mt-3.5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              We bring Information Technology students together to build real skills, real
              projects, and real careers through workshops, competitions, mentorship, and
              a community that lasts beyond graduation.
            </p>
          </div>
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
