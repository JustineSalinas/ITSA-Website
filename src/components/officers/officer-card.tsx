"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import type { Officer } from "@/lib/types";
import { initials } from "@/lib/format";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social";

export function OfficerCard({ officer }: { officer: Officer }) {
  const hasFacebook = Boolean(officer.socials?.facebook);
  const hasLinkedIn = Boolean(officer.socials?.linkedin);
  const hasInstagram = Boolean(officer.socials?.instagram);
  const hasGithub = Boolean(officer.socials?.github);
  const hasPersonalLink = Boolean(officer.socials?.website);

  const hasAnySocial =
    hasFacebook || hasLinkedIn || hasInstagram || hasGithub || hasPersonalLink;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-foreground bg-card p-4 sm:p-5 shadow-[4px_4px_0_0_var(--foreground)] transition-all duration-300 hover:shadow-[6px_6px_0_0_var(--foreground)]">
        {/* Top: Square Portrait Headshot with Reasonable Size */}
        <div className="flex flex-col items-center">
          <div className="relative aspect-square w-full max-w-[160px] sm:max-w-[175px] shrink-0 overflow-hidden rounded-xl border-2 border-foreground/80 bg-muted/20 shadow-[2px_2px_0_0_var(--foreground)]">
            {officer.photoUrl ? (
              <Image
                src={officer.photoUrl}
                alt={officer.name}
                fill
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 160px, 175px"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/10 via-brand-cyan/10 to-brand-orange/10 font-mono text-3xl font-extrabold text-primary select-none">
                {initials(officer.name)}
              </div>
            )}
          </div>

          {/* Details: Section, Name, and Role */}
          <div className="mt-3.5 flex flex-col items-center text-center w-full">
            {/* Section Badge */}
            {officer.section && (
              <span className="inline-block rounded-full border border-foreground/30 bg-secondary px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-foreground shadow-[1px_1px_0_0_var(--foreground)]">
                {officer.section}
              </span>
            )}

            {/* Name */}
            <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {officer.name}
            </h3>

            {/* Role / Position */}
            <p className="mt-0.5 text-xs sm:text-sm font-semibold text-primary/95 line-clamp-1">
              {officer.position}
            </p>

            {officer.bio && (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {officer.bio}
              </p>
            )}
          </div>
        </div>

        {/* Bottom: Social and Personal Profile Links */}
        <div className="mt-3.5 flex min-h-[38px] items-center justify-center gap-1.5 border-t border-border/60 pt-3">
          {/* Facebook */}
          {hasFacebook && (
            <a
              href={officer.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${officer.name} on Facebook`}
              title="Facebook Profile"
              className="grid size-8 place-items-center rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground hover:bg-[#1877F2] hover:text-white hover:shadow-[2px_2px_0_0_var(--foreground)]"
            >
              <FacebookIcon className="size-3.5" />
            </a>
          )}

          {/* LinkedIn */}
          {hasLinkedIn && (
            <a
              href={officer.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${officer.name} on LinkedIn`}
              title="LinkedIn Profile"
              className="grid size-8 place-items-center rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground hover:bg-[#0A66C2] hover:text-white hover:shadow-[2px_2px_0_0_var(--foreground)]"
            >
              <LinkedinIcon className="size-3.5" />
            </a>
          )}

          {/* Instagram */}
          {hasInstagram && (
            <a
              href={officer.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${officer.name} on Instagram`}
              title="Instagram Profile"
              className="grid size-8 place-items-center rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground hover:bg-[#E4405F] hover:text-white hover:shadow-[2px_2px_0_0_var(--foreground)]"
            >
              <InstagramIcon className="size-3.5" />
            </a>
          )}

          {/* GitHub */}
          {hasGithub && (
            <a
              href={officer.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${officer.name} on GitHub`}
              title="GitHub Profile"
              className="grid size-8 place-items-center rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-[2px_2px_0_0_var(--foreground)]"
            >
              <GithubIcon className="size-3.5" />
            </a>
          )}

          {/* Personal Profile Link */}
          {hasPersonalLink && (
            <a
              href={officer.socials.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${officer.name}'s Personal Profile`}
              title="Personal Profile Link"
              className="grid size-8 place-items-center rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[2px_2px_0_0_var(--foreground)]"
            >
              <Globe className="size-3.5" />
            </a>
          )}

          {!hasAnySocial && (
            <>
              <span
                className="grid size-8 place-items-center rounded-lg border border-dashed border-border/50 text-muted-foreground/30 cursor-not-allowed"
                title="LinkedIn not provided"
              >
                <LinkedinIcon className="size-3.5" />
              </span>
              <span
                className="grid size-8 place-items-center rounded-lg border border-dashed border-border/50 text-muted-foreground/30 cursor-not-allowed"
                title="Instagram not provided"
              >
                <InstagramIcon className="size-3.5" />
              </span>
              <span
                className="grid size-8 place-items-center rounded-lg border border-dashed border-border/50 text-muted-foreground/30 cursor-not-allowed"
                title="Personal profile not provided"
              >
                <Globe className="size-3.5" />
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
