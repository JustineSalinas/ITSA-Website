import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

const focusAreas = [
  "Web Development",
  "Cybersecurity",
  "Cloud",
  "Competitions",
  "Community",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Atmosphere: soft brand glow + a faint network field */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, var(--brand) 0.9px, transparent 0.9px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(120% 90% at 80% 0%, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(120% 90% at 80% 0%, black 0%, transparent 65%)",
          }}
        />
        <div className="absolute -left-32 -top-24 size-96 rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute right-0 top-24 size-80 rounded-full bg-brand-orange/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-28">
        {/* Copy */}
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 py-1.5 pl-1.5 pr-3.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span className="grid size-5 place-items-center rounded-full bg-brand/10">
              <span className="size-2 rounded-full bg-brand" />
            </span>
            <span className="font-mono tracking-tight">{siteConfig.school}</span>
          </span>

          <h1 className="mt-6 text-[clamp(2.5rem,7vw,4.25rem)] font-extrabold leading-[1.02] tracking-tight text-balance">
            Where IT students build what&apos;s next.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {siteConfig.fullName} — the home for IT students at{" "}
            {siteConfig.school}. We turn classroom fundamentals into real skills,
            real projects, and a community that has your back.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/join" />}>
              Become a member
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/events" />}>
              Explore events
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Network visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroNetwork />
        </div>
      </div>
    </section>
  );
}

/** Decorative constellation echoing the ITSA molecular mark: nodes = students & skills, links = community. */
function HeroNetwork() {
  const nodes = [
    { cx: 190, cy: 40, r: 13, grad: "hb", delay: 0 },
    { cx: 60, cy: 90, r: 16, grad: "hb", delay: 0.6 },
    { cx: 250, cy: 120, r: 18, grad: "ho", delay: 1.1 },
    { cx: 150, cy: 150, r: 24, grad: "hd", delay: 0.3 },
    { cx: 70, cy: 220, r: 14, grad: "hb", delay: 1.4 },
    { cx: 220, cy: 240, r: 20, grad: "ho", delay: 0.9 },
    { cx: 300, cy: 200, r: 11, grad: "hb", delay: 1.7 },
  ];
  const links: [number, number][] = [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [3, 5],
    [2, 6],
    [2, 5],
    [1, 4],
  ];

  return (
    <svg
      viewBox="0 0 340 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A network of connected nodes representing the ITSA community"
      className="h-auto w-full drop-shadow-[0_20px_40px_rgba(47,86,214,0.18)]"
    >
      <defs>
        <linearGradient id="hb" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#34a9e0" />
          <stop offset="1" stopColor="#2f56d6" />
        </linearGradient>
        <linearGradient id="hd" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2f56d6" />
          <stop offset="1" stopColor="#223fa8" />
        </linearGradient>
        <linearGradient id="ho" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f7a81e" />
          <stop offset="1" stopColor="#e0451f" />
        </linearGradient>
      </defs>

      <g className="animate-float">
        <g stroke="url(#hb)" strokeWidth="1.75" strokeLinecap="round" opacity="0.45">
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].cx}
              y1={nodes[a].cy}
              x2={nodes[b].cx}
              y2={nodes[b].cy}
            />
          ))}
        </g>
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r + 6}
              fill={`url(#${n.grad})`}
              opacity="0.14"
              className="animate-node"
              style={{ animationDelay: `${n.delay}s` }}
            />
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={`url(#${n.grad})`} />
          </g>
        ))}
      </g>
    </svg>
  );
}
