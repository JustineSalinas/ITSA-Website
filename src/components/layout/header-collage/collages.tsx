"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { orgChart } from "@/data/officers";
import { localNews } from "@/data/news";
import type { OrgNode } from "@/lib/types";
import { Doodle, INK_DROP, INK_SHADOW, Note, Piece, Polaroid, Tape, hand } from "./pieces";

/*
 * One collage per page (#121). Only real ITSA material goes in: the
 * recognition-day photo, the officer photoshoot, officer portraits, the
 * latest real news post, a real student project. Everything else is paper
 * ephemera (tickets, a name tag, sticky notes) that makes no claims.
 */

/** Rounded so server and browser render identical numbers (no hydration mismatch). */
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [Math.round((cx + r * Math.cos(rad)) * 100) / 100, Math.round((cy + r * Math.sin(rad)) * 100) / 100];
}

function Sticker({ src, className }: { src: string; className?: string }) {
  return (
    <div
      className={cn("relative aspect-square rounded-full border-2 border-foreground bg-white p-[15%]", INK_SHADOW, className)}
    >
      <div className="relative size-full">
        <Image src={src} alt="" fill sizes="120px" className="object-contain" />
      </div>
    </div>
  );
}

/* ── About ─────────────────────────────────────────────────────────── */

function AboutCollage() {
  return (
    <>
      <Piece x={3} y={5} w={58} rotate={-4} order={0}>
        <Polaroid src="/images/news/itsa-recognized.webp" aspect="aspect-[4/3]" caption="made it official · aug 28, 2026">
          <Tape tone="gold" />
        </Polaroid>
      </Piece>
      <Piece x={67} y={4} w={22} rotate={8} order={1}>
        <Sticker src="/itsa-logo.svg" />
      </Piece>
      <Piece x={75} y={47} w={17} rotate={-7} order={2}>
        <Sticker src="/usa.png" />
      </Piece>
      <Note className="absolute left-[66%] top-[83%] -rotate-3">that&apos;s us!</Note>
      <Doodle kind="arrow" x={57} y={70} w={10} flip rotate={-8} order={0} />
      <Doodle kind="spark" x={91} y={30} w={6} tone="blue" order={1} />
    </>
  );
}

/* ── Officers ──────────────────────────────────────────────────────── */

const PORTRAIT_SPOTS = [
  { x: 3, y: 15, w: 29, rotate: -6, tape: "cyan" },
  { x: 35, y: 3, w: 30, rotate: 2, tape: "gold" },
  { x: 68, y: 17, w: 29, rotate: 7, tape: "white" },
] as const;

function OfficersCollage() {
  // Chairman in the middle, flanked by the two Vice Chairmen, straight from the org chart.
  const chair = orgChart.children?.[0];
  const people = [chair?.children?.[0], chair, chair?.children?.[1]].filter(
    (p): p is OrgNode & { photoUrl: string } => Boolean(p?.photoUrl)
  );

  return (
    <>
      {people.map((person, i) => {
        const { tape, ...spot } = PORTRAIT_SPOTS[i];
        return (
          <Piece key={person.name} {...spot} order={i}>
            <Polaroid src={person.photoUrl} caption={person.name.split(" ")[0]} sizes="(min-width: 1024px) 160px, 30vw">
              <Tape tone={tape} />
            </Polaroid>
          </Piece>
        );
      })}
      <Note className="absolute left-[33%] top-[80%] -rotate-2">the AY 2026 team</Note>
      <Doodle kind="squiggle" x={33} y={90} w={30} order={0} />
    </>
  );
}

/* ── Events ────────────────────────────────────────────────────────── */

/** Half-circle notches bitten out of both sides, like a real ticket stub. */
const TICKET_NOTCH = [
  "radial-gradient(circle at 0 50%, transparent 0 2cqw, black calc(2cqw + 0.5px)) left / 51% 100% no-repeat",
  "radial-gradient(circle at 100% 50%, transparent 0 2cqw, black calc(2cqw + 0.5px)) right / 51% 100% no-repeat",
].join(", ");

function Ticket({ label, sub, tone }: { label: string; sub: string; tone: "blue" | "gold" }) {
  return (
    <div className={INK_DROP}>
      <div
        className={cn(
          "flex border-2 border-foreground",
          tone === "blue" ? "bg-brand text-brand-foreground" : "bg-gold text-foreground"
        )}
        style={{ mask: TICKET_NOTCH, WebkitMask: TICKET_NOTCH }}
      >
        <div className="flex-1 py-[5%] pl-[8%] pr-[4%]">
          <p className="font-mono text-[1.8cqw] font-semibold uppercase tracking-[0.2em] opacity-80">Admit one</p>
          <p className="mt-[0.6cqw] text-[6cqw] font-extrabold uppercase leading-none tracking-tight">{label}</p>
          <p className={cn(hand.className, "mt-[1cqw] text-[3cqw] font-bold leading-none")}>{sub}</p>
        </div>
        <div className="flex w-[20%] items-center justify-center border-l-2 border-dashed border-current/50">
          <span className="-rotate-90 whitespace-nowrap font-mono text-[1.8cqw] font-bold tracking-[0.25em]">ITSA</span>
        </div>
      </div>
    </div>
  );
}

function CalendarPage() {
  return (
    <div className={cn("relative border-2 border-foreground bg-white", INK_SHADOW)}>
      <span className="absolute left-[24%] top-0 z-10 size-[2.2cqw] -translate-y-1/2 rounded-full border-2 border-foreground bg-background" />
      <span className="absolute right-[24%] top-0 z-10 size-[2.2cqw] -translate-y-1/2 rounded-full border-2 border-foreground bg-background" />
      <div className="bg-foreground py-[9%] text-center font-mono text-[1.9cqw] font-semibold uppercase tracking-[0.3em] text-background">
        ITSA
      </div>
      <div className="px-[8%] pb-[12%] pt-[8%] text-center">
        <p className="text-[7.6cqw] font-extrabold leading-none tracking-tight text-foreground">2026</p>
        <p className={cn(hand.className, "mt-[1cqw] text-[3.2cqw] font-medium leading-none text-muted-foreground")}>
          academic year
        </p>
      </div>
    </div>
  );
}

function EventsCollage() {
  return (
    <>
      <Piece x={3} y={12} w={52} rotate={-6} order={0}>
        <Ticket label="Workshop" sub="all levels welcome" tone="blue" />
      </Piece>
      <Piece x={22} y={54} w={44} rotate={4} order={1}>
        <Ticket label="CTF" sub="bring a laptop" tone="gold" />
      </Piece>
      <Piece x={70} y={6} w={26} rotate={6} order={2}>
        <CalendarPage />
      </Piece>
      <Doodle kind="circle" x={67} y={15} w={32} rotate={4} order={0} />
      <Note className="absolute left-[71%] top-[76%] -rotate-6">see you there!</Note>
      <Doodle kind="spark" x={59} y={1} w={6} order={1} />
    </>
  );
}

/* ── News ──────────────────────────────────────────────────────────── */

/** Uneven torn bottom edge, by hand rather than a regular zigzag. */
const TORN_BOTTOM =
  "polygon(0 0, 100% 0, 100% 95%, 96% 98%, 92% 94%, 87% 99%, 81% 95%, 76% 97%, 70% 93%, 64% 98%, 59% 95%, 52% 99%, 47% 94%, 41% 97%, 35% 94%, 29% 99%, 23% 95%, 17% 98%, 12% 94%, 6% 98%, 0 95%)";

/** 14-point burst, as a percentage polygon. */
const BURST = `polygon(${Array.from({ length: 28 }, (_, i) => {
  const [x, y] = polar(50, 50, i % 2 ? 40 : 50, (360 / 28) * i);
  return `${x}% ${y}%`;
}).join(", ")})`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-08-29" -> "Aug 29, 2026", without Date (no timezone drift between server and browser). */
function formatIsoDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function NewsCollage() {
  const latest = localNews[0];

  return (
    <>
      <Piece x={3} y={6} w={66} rotate={-2} order={0}>
        <div className="relative">
          <Tape tone="white" className="left-[10%] w-[24%] -rotate-[24deg]" />
          <div className={INK_DROP}>
            <div className="border-2 border-foreground bg-white px-[6%] pb-[9%] pt-[5%]" style={{ clipPath: TORN_BOTTOM }}>
              <p className="border-y-2 border-foreground py-[0.9cqw] text-center font-mono text-[2cqw] font-bold uppercase tracking-[0.3em] text-foreground">
                The ITSA Dispatch
              </p>
              {latest && (
                <>
                  <p className="mt-[1.4cqw] font-mono text-[1.7cqw] uppercase tracking-[0.15em] text-muted-foreground">
                    {formatIsoDay(latest.date)} · {latest.category}
                  </p>
                  <div className="mt-[1.2cqw] flex gap-[4%]">
                    {latest.imageUrl && (
                      <div className="relative aspect-[4/3] w-[42%] shrink-0 overflow-hidden border border-foreground">
                        <Image
                          src={latest.imageUrl}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 130px, 25vw"
                          className="object-cover grayscale contrast-125"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[4.4cqw] font-extrabold leading-[0.95] tracking-tight text-foreground">
                        {latest.title}
                      </p>
                      <p className="mt-[1cqw] line-clamp-3 text-[1.8cqw] leading-snug text-muted-foreground">
                        {latest.excerpt}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Piece>
      <Piece x={63} y={0} w={19} rotate={12} order={1}>
        <div className={INK_DROP}>
          <div
            className="flex aspect-square items-center justify-center bg-brand-orange font-mono text-[2.3cqw] font-bold uppercase tracking-[0.12em] text-foreground"
            style={{ clipPath: BURST }}
          >
            Latest
          </div>
        </div>
      </Piece>
      <Note className="absolute left-[73%] top-[66%] -rotate-6">hot off
        <br />
        the press
      </Note>
      <Doodle kind="arrow" x={64} y={74} w={10} flip rotate={-14} order={0} />
      <Doodle kind="spark" x={90} y={34} w={6} tone="blue" order={1} />
    </>
  );
}

/* ── Projects ──────────────────────────────────────────────────────── */

function BrowserWindow({ src, url }: { src: string; url: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[1.2cqw] border-2 border-foreground bg-white", INK_SHADOW)}>
      <div className="flex items-center gap-[1.1cqw] border-b-2 border-foreground bg-muted px-[3%] py-[1.3cqw]">
        {["bg-brand-red", "bg-gold", "bg-brand-cyan"].map((c) => (
          <span key={c} className={cn("size-[1.6cqw] rounded-full border border-foreground", c)} />
        ))}
        <span className="ml-[2%] truncate rounded-full border border-foreground/30 bg-white px-[3%] font-mono text-[1.6cqw] text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt="" fill sizes="(min-width: 1024px) 320px, 60vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

function Sticky({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div className={cn("aspect-square p-[11%] shadow-[2px_3px_0_0_rgb(0_0_0/0.14)]", className)}>
      <p className={cn(hand.className, "text-[3.8cqw] font-bold leading-[1.05] text-foreground")}>{children}</p>
    </div>
  );
}

function ProjectsCollage() {
  return (
    <>
      <Piece x={2} y={8} w={64} rotate={-2} order={0}>
        <div className="relative">
          <Tape tone="gold" className="left-[8%] w-[22%] -rotate-12" />
          <BrowserWindow src="/images/projects/pharmatrack.png" url="pharmatrack" />
        </div>
      </Piece>
      <Piece x={71} y={2} w={24} rotate={6} order={1}>
        <Sticky className="bg-gold/35">ship it!</Sticky>
      </Piece>
      <Piece x={74} y={48} w={23} rotate={-5} order={2}>
        <Sticky className="bg-brand-cyan/30">works on my machine ✓</Sticky>
      </Piece>
      <Doodle kind="arrow" x={61} y={70} w={10} flip rotate={-6} order={0} />
      <Doodle kind="spark" x={93} y={34} w={5} tone="blue" order={1} />
    </>
  );
}

/* ── Awards ────────────────────────────────────────────────────────── */

/** Scalloped rosette edge: 18 outward bumps around (100, 100). */
const ROSETTE_EDGE = (() => {
  const points = Array.from({ length: 18 }, (_, i) => polar(100, 100, 80, 20 * i));
  return (
    `M${points[0].join(",")} ` +
    points.map((_, i) => `A15,15 0 0 1 ${points[(i + 1) % points.length].join(",")}`).join(" ") +
    " Z"
  );
})();

const ROSETTE_STAR = `M${Array.from({ length: 10 }, (_, i) => polar(100, 102, i % 2 ? 15 : 34, -90 + 36 * i).join(",")).join(" L")} Z`;

function Rosette() {
  return (
    <svg viewBox="0 0 200 262" className={cn("h-auto w-full", INK_DROP)}>
      <g className="stroke-foreground" strokeWidth={4} strokeLinejoin="round">
        <path d="M74,150 L44,252 L64,238 L80,258 L102,162 Z" className="fill-brand-orange" />
        <path d="M126,150 L156,252 L136,238 L120,258 L98,162 Z" className="fill-brand-red" />
        <path d={ROSETTE_EDGE} className="fill-brand" />
        <circle cx={100} cy={100} r={54} className="fill-white" />
        <path d={ROSETTE_STAR} className="fill-gold" strokeWidth={3.5} />
      </g>
    </svg>
  );
}

function AwardsCollage() {
  return (
    <>
      <Piece x={4} y={10} w={46} rotate={-4} order={0}>
        <div className="border-2 border-dashed border-foreground bg-white/80 p-[5%] pb-[13%]">
          <div className="flex aspect-[4/3] items-center justify-center border-2 border-dashed border-foreground/30">
            <p className={cn(hand.className, "-rotate-3 text-center text-[4.6cqw] font-bold leading-none text-brand")}>
              your project
              <br />
              here?
            </p>
          </div>
        </div>
      </Piece>
      <Piece x={60} y={2} w={30} rotate={10} order={1}>
        <Rosette />
      </Piece>
      <Doodle kind="arrow" x={48} y={56} w={12} flip rotate={-4} order={0} />
      <Doodle kind="spark" x={91} y={68} w={6} order={1} />
      <Doodle kind="spark" x={55} y={4} w={4} tone="blue" order={2} />
    </>
  );
}

/* ── Join ──────────────────────────────────────────────────────────── */

function NameTag() {
  return (
    <div className={cn("overflow-hidden rounded-[1.6cqw] border-2 border-foreground bg-white", INK_SHADOW)}>
      <div className="bg-brand px-[6%] pb-[4%] pt-[6%] text-center text-brand-foreground">
        <p className="text-[4.4cqw] font-extrabold leading-none tracking-wide">HELLO</p>
        <p className="mt-[0.5cqw] font-mono text-[1.5cqw] uppercase tracking-[0.2em]">my name is</p>
      </div>
      <div className="flex items-center justify-center px-[6%] py-[9%]">
        <p className={cn(hand.className, "-rotate-3 text-[6.4cqw] font-bold leading-none text-foreground")}>you?</p>
      </div>
      <div className="h-[1.6cqw] bg-brand" />
    </div>
  );
}

function JoinCollage() {
  return (
    <>
      <Piece x={3} y={6} w={62} rotate={-3} order={0}>
        <Polaroid src="/images/itsa-community.webp" aspect="aspect-[16/10]" caption="the crew (peace signs mandatory)">
          <Tape tone="gold" />
        </Polaroid>
      </Piece>
      <Piece x={67} y={30} w={30} rotate={6} order={1}>
        <NameTag />
      </Piece>
      <Doodle kind="arrow" x={59} y={72} w={10} flip rotate={-12} order={0} />
      <Doodle kind="spark" x={89} y={4} w={6} order={1} />
    </>
  );
}

/* ── Map ───────────────────────────────────────────────────────────── */

const COLLAGES = {
  about: AboutCollage,
  officers: OfficersCollage,
  events: EventsCollage,
  news: NewsCollage,
  projects: ProjectsCollage,
  awards: AwardsCollage,
  join: JoinCollage,
};

export type PageHeaderVariant = keyof typeof COLLAGES;

/** A 16:9 board the collage pieces are laid out on, in % and cqw units. */
export function HeaderCollage({ variant }: { variant: PageHeaderVariant }) {
  const Collage = COLLAGES[variant];
  return (
    <div aria-hidden="true" className="@container relative aspect-[16/9] w-full select-none">
      <Collage />
    </div>
  );
}
