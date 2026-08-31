"use client";

import { motion } from "framer-motion";
import type { Officer } from "@/lib/types";
import { initials } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social";

const socialMeta = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "github", label: "GitHub", Icon: GithubIcon },
] as const;

export function OfficerCard({ officer }: { officer: Officer }) {
  const socials = socialMeta.filter(({ key }) => officer.socials?.[key]);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden border-border/80 bg-card/60 text-center backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:bg-card/40">
        {/* Top accent glow */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardContent className="flex flex-1 flex-col items-center p-6">
          <div className="relative mt-2">
            <div className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-brand to-brand-orange opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
            <Avatar className="relative size-24 ring-2 ring-primary/20 ring-offset-2 ring-offset-card transition-transform duration-300 group-hover:scale-105">
              {officer.photoUrl ? (
                <AvatarImage src={officer.photoUrl} alt={officer.name} />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-xl font-extrabold text-primary">
                {initials(officer.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Reserve two lines so the position pill sits at the same height on every card */}
          <h3 className="mt-4 flex min-h-[3.5rem] items-center text-xl font-bold tracking-tight text-balance">
            {officer.name}
          </h3>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 font-mono text-xs font-semibold text-primary">
            {officer.position}
          </span>

          {officer.bio && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {officer.bio}
            </p>
          )}

          {socials.length > 0 && (
            <div className="mt-auto flex w-full items-center justify-center gap-2 border-t border-border/40 pt-4">
              {socials.map(({ key, label, Icon }) => (
                <motion.a
                  key={key}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  href={officer.socials?.[key]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${officer.name} on ${label}`}
                  className="grid size-9 place-items-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </motion.a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
