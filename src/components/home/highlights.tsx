import Link from "next/link";
import { ArrowUpRight, Code2, Rocket, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    Icon: Users,
    title: "A real community",
    description:
      "Connect with fellow IT students, mentors, and alumni who share your drive to build and to belong.",
  },
  {
    Icon: Code2,
    title: "Hands-on workshops",
    description:
      "Web development, cybersecurity, cloud, and more — practical, beginner-friendly sessions led by peers and pros.",
  },
  {
    Icon: Trophy,
    title: "Competitions & events",
    description:
      "Hackathons, coding challenges, and tech summits that sharpen your skills and grow your portfolio.",
  },
  {
    Icon: Rocket,
    title: "Career opportunities",
    description:
      "Internships, industry talks, and networking that help you launch a career in tech with confidence.",
  },
];

export function Highlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            More than a class group chat.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            ITSA exists to help IT students grow beyond the classroom — through
            skills, community, and real-world opportunities you can point to.
          </p>
          <Button variant="link" className="mt-4 px-0" render={<Link href="/about" />}>
            Learn what we do
            <ArrowUpRight className="size-4" />
          </Button>
        </div>

        <ul className="divide-y divide-border">
          {highlights.map(({ Icon, title, description }, i) => (
            <li
              key={title}
              className="group flex gap-5 py-6 first:pt-0 last:pb-0"
            >
              <span className="mt-0.5 grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                <Icon className="size-5" />
              </span>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold tracking-tight">
                    {title}
                  </h3>
                </div>
                <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
