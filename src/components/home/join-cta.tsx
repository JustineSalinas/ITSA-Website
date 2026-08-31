"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

/**
 * Closing call to action.
 *
 * Follows the shape used on the AWS Community Day page the team referenced: a
 * centred brand-coloured headline with a deliberate line break, one short
 * paragraph of supporting copy, and a single prominent button. Restraint is
 * the point — one action, nothing competing with it.
 *
 * This is the last thing on the homepage, so it is the final chance to move a
 * visitor into the Join flow.
 */
export function JoinCta() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/20 to-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary text-balance sm:text-4xl lg:text-5xl">
            Ready to join {siteConfig.name}
            <span className="block">this school year?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[46rem] text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Workshops, hackathons, mentorship, and a community of IT students who build
            real things together. Membership is open to every IT student at{" "}
            {siteConfig.school} — no experience required.
          </p>

          <div className="mt-8">
            <Button
              size="lg"
              className="group px-8 text-base font-semibold shadow-md transition-transform active:scale-95"
              render={<Link href="/join" />}
            >
              Become a member
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
