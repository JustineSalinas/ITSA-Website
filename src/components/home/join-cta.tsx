"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-8 text-center sm:p-14"
        >
          {/* ITSA banner art -- brand blobs + wordmark. The card's height
              (padding + copy) doesn't match the banner's native ~2.7:1
              ratio, so object-cover zooms in further than the source image
              alone would suggest; a center-weighted white scrim keeps the
              headline legible while the art stays visible at the edges. */}
          <Image
            src="/images/itsa-banner.webp"
            alt=""
            fill
            aria-hidden="true"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.93) 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.25) 75%, transparent 100%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary text-balance sm:text-4xl">
              Ready to join {siteConfig.name}
              <span className="block">this school year?</span>
            </h2>

            <p className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Workshops, hackathons, mentorship, and a community of IT students who build
              real things together. Membership is open to every IT student at{" "}
              {siteConfig.school} — no experience required.
            </p>

            <div className="mt-8">
              <Button
                size="lg"
                className="group px-8 text-base font-semibold transition-all"
                render={<Link href="/join" />}
              >
                Become a member
                <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
