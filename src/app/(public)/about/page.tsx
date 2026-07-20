import type { Metadata } from "next";
import { Eye, Target, Heart, GraduationCap, Handshake, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about the ${siteConfig.fullName} at ${siteConfig.school} — our mission, vision, and values.`,
};

const values = [
  {
    Icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace curiosity and creativity, always exploring new ideas and technologies.",
  },
  {
    Icon: Handshake,
    title: "Collaboration",
    description:
      "We grow together — sharing knowledge, mentoring peers, and building as a team.",
  },
  {
    Icon: GraduationCap,
    title: "Excellence",
    description:
      "We pursue high standards in everything from our projects to our events.",
  },
  {
    Icon: Heart,
    title: "Community",
    description:
      "We create a welcoming space where every IT student feels they belong.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Building the future of tech, together"
        description={`The ${siteConfig.fullName} is the official student organization for IT students at the ${siteConfig.school}.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="prose-none max-w-3xl space-y-4 text-muted-foreground">
          <p className="text-lg">
            ITSA was founded to unite Information Technology students under a
            shared passion for technology, learning, and service. We serve as a
            bridge between the classroom and the industry — giving students the
            skills, connections, and confidence to thrive.
          </p>
          <p>
            {/* Placeholder history — replace with the real ITSA story. */}
            Throughout the year we organize workshops, seminars, competitions,
            and community-building activities. From beginners writing their first
            line of code to seniors preparing for the industry, ITSA is a home
            for every IT student at {siteConfig.school}.
          </p>
        </div>

        {/* Mission & Vision — flat cards, differentiated by icon tint (no stripes) */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Target className="size-5" />
                </div>
                <h2 className="text-xl font-bold">Our mission</h2>
              </div>
              <p className="mt-4 text-muted-foreground">
                To empower Information Technology students by fostering technical
                excellence, leadership, and a strong sense of community — creating
                opportunities that prepare them for meaningful careers in tech.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Eye className="size-5" />
                </div>
                <h2 className="text-xl font-bold">Our vision</h2>
              </div>
              <p className="mt-4 text-muted-foreground">
                To be the leading student organization that shapes competent,
                innovative, and socially responsible IT professionals who make a
                positive impact on society.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values — one unified panel with hairline dividers, not four floating icon-cards */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">What we value</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <div className="grid sm:grid-cols-2">
              {values.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 border-b border-border p-6 last:border-b-0 sm:border-b-0 sm:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(odd)]:border-r"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
