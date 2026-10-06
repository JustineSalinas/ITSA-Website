"use client";

import Image from "next/image";
import { Caveat } from "next/font/google";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Building blocks for the PageHeader collages (#121): real photos and paper
 * ephemera, pinned down slightly crooked with tape, in the site's own
 * neo-brutalist vocabulary (2px ink border + hard offset shadow, as on the
 * About intro card and officer cards).
 *
 * Sizes use container-query units (cqw) of the collage box, so a collage
 * keeps its composition from a phone up to desktop.
 */

/** Handwriting, reserved for short notes and captions -- never body text. */
export const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });

export const INK_SHADOW = "shadow-[4px_4px_0_0_var(--foreground)]";
/** For shapes cut with clip-path/mask, where box-shadow would be clipped away. */
export const INK_DROP = "drop-shadow-[4px_4px_0_var(--foreground)]";

interface PieceProps {
  /** Position and width, in % of the collage box. */
  x: number;
  y: number;
  w: number;
  rotate?: number;
  /** Order in which pieces land on the board. */
  order?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * One item on the board. Lands once, like it was tossed down, then stays put:
 * no endless floating, so nothing ever drifts past the header's edge.
 */
export function Piece({ x, y, w, rotate = 0, order = 0, className, children }: PieceProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%` }}
      initial={{ opacity: 0, y: -14, rotate: rotate - 7, scale: 1.05 }}
      animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
      transition={
        reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 19, delay: 0.15 + order * 0.12 }
      }
    >
      {/* Hover nudge is CSS so it never waits on the landing animation's delay */}
      <div className="transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-2">{children}</div>
    </motion.div>
  );
}

const TAPE_TONES = {
  cyan: "bg-brand-cyan/40",
  gold: "bg-gold/45",
  white: "bg-white/75 ring-1 ring-foreground/10",
};

/** Torn ends, cut with a zigzag clip-path. */
const TAPE_EDGE =
  "polygon(0% 12%, 3% 0%, 97% 0%, 100% 14%, 97% 28%, 100% 42%, 97% 56%, 100% 70%, 97% 84%, 100% 100%, 3% 100%, 0% 88%, 3% 74%, 0% 60%, 3% 46%, 0% 32%, 3% 18%)";

interface TapeProps {
  tone?: keyof typeof TAPE_TONES;
  /** Tailwind classes for where the strip sits on its piece. */
  className?: string;
}

/** A strip of masking tape holding a piece down. */
export function Tape({ tone = "cyan", className }: TapeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 top-0 z-10 h-[3.4cqw] w-[38%] -translate-x-1/2 -translate-y-1/2 -rotate-3",
        TAPE_TONES[tone],
        className
      )}
      style={{ clipPath: TAPE_EDGE }}
    />
  );
}

interface PolaroidProps {
  src: string;
  caption?: string;
  /** Tailwind aspect class for the photo window. */
  aspect?: string;
  imageClassName?: string;
  sizes?: string;
  children?: React.ReactNode;
}

/** Instant-film print: thick white border, handwritten caption. */
export function Polaroid({ src, caption, aspect = "aspect-square", imageClassName, sizes, children }: PolaroidProps) {
  return (
    <figure className={cn("relative border-2 border-foreground bg-white p-[5%] pb-0", INK_SHADOW)}>
      {children}
      <div className={cn("relative w-full overflow-hidden border border-foreground/20 bg-muted", aspect)}>
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes ?? "(min-width: 1024px) 280px, 50vw"}
          className={cn("object-cover", imageClassName)}
        />
      </div>
      <figcaption
        className={cn(
          hand.className,
          "truncate py-[0.9cqw] text-center text-[3.6cqw] font-medium leading-snug text-foreground"
        )}
      >
        {caption ?? " "}
      </figcaption>
    </figure>
  );
}

interface NoteProps {
  className?: string;
  children: React.ReactNode;
}

/** A short handwritten note, written straight onto the page. */
export function Note({ className, children }: NoteProps) {
  return (
    <p className={cn(hand.className, "text-[4.2cqw] font-bold leading-none text-brand", className)}>{children}</p>
  );
}

/** Marker doodles, drawn in a few loose, slightly uneven strokes. */
const DOODLES = {
  /** Curvy arrow pointing up-right. */
  arrow: {
    viewBox: "0 0 120 80",
    paths: ["M8,64 C30,72 58,64 74,44 C84,31 88,21 99,12", "M84,10 L100,10 L96,26"],
  },
  /** Loose circle that overshoots where it started, like a quick pen loop. */
  circle: {
    viewBox: "0 0 200 120",
    paths: ["M150,16 C108,0 38,8 16,42 C0,68 38,106 106,108 C170,110 198,82 188,52 C180,30 150,18 112,22"],
  },
  squiggle: {
    viewBox: "0 0 200 30",
    paths: ["M4,18 C24,6 34,28 54,16 C74,4 84,28 104,16 C124,4 134,28 154,16 C170,7 182,20 196,12"],
  },
  /** Hand-drawn asterisk/sparkle. */
  spark: {
    viewBox: "0 0 60 60",
    paths: ["M30,5 L31,55", "M6,29 L54,32", "M13,12 L47,47", "M47,13 L12,46"],
  },
};

const DOODLE_TONES = {
  orange: "text-brand-orange",
  blue: "text-brand",
  ink: "text-foreground",
};

interface DoodleProps {
  kind: keyof typeof DOODLES;
  tone?: keyof typeof DOODLE_TONES;
  /** Position and width, in % of the collage box. */
  x: number;
  y: number;
  w: number;
  rotate?: number;
  flip?: boolean;
  /** Drawn after the pieces have landed. */
  order?: number;
}

export function Doodle({ kind, tone = "orange", x, y, w, rotate = 0, flip, order = 0 }: DoodleProps) {
  const reduce = useReducedMotion();
  const { viewBox, paths } = DOODLES[kind];
  // Marker width as a share of the collage (~0.75%), converted into this
  // doodle's own viewBox units, so every doodle has the same pen thickness.
  const viewBoxWidth = Number(viewBox.split(" ")[2]);
  const strokeWidth = (0.75 * viewBoxWidth) / w;

  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      className={cn("pointer-events-none absolute h-auto overflow-visible", DOODLE_TONES[tone])}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        transform: `rotate(${rotate}deg)${flip ? " scaleX(-1)" : ""}`,
      }}
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.55, ease: "easeInOut", delay: 0.9 + order * 0.15 + i * 0.22 }
          }
        />
      ))}
    </svg>
  );
}
