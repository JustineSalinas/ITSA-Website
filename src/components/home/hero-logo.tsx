"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type LetterId = "i" | "t" | "s" | "a";

interface LetterConfig {
  id: LetterId;
  name: string;
  label: string;
  src: string;
  origin: string;
  delay: number;
  /** Nudges the letter away from the shared center, in % of its own box, so
   *  the four quadrants (which tile edge-to-edge in the source artwork)
   *  read as distinct letters with breathing room instead of one dense,
   *  fused blob mass next to the airier hero network beside it. */
  offsetX: number;
  offsetY: number;
}

const LETTERS: LetterConfig[] = [
  {
    id: "i",
    name: "I",
    label: "Information",
    src: "/itsa-letter-i.svg",
    origin: "30% 22%",
    delay: 0.08,
    offsetX: -3,
    offsetY: -3,
  },
  {
    id: "t",
    name: "T",
    label: "Technology",
    src: "/itsa-letter-t.svg",
    origin: "75% 36%",
    delay: 0.18,
    offsetX: 3,
    offsetY: -3,
  },
  {
    id: "s",
    name: "S",
    label: "Students",
    src: "/itsa-letter-s.svg",
    origin: "26% 65%",
    delay: 0.28,
    offsetX: -3,
    offsetY: 3,
  },
  {
    id: "a",
    name: "A",
    label: "Association",
    src: "/itsa-letter-a.svg",
    origin: "71% 77%",
    delay: 0.38,
    offsetX: 3,
    offsetY: 3,
  },
];

interface HeroLogoProps {
  className?: string;
  priority?: boolean;
}

export function HeroLogo({ className, priority = true }: HeroLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const jellyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [hoveredLetter, setHoveredLetter] = useState<LetterId | null>(null);
  const [jellyLetter, setJellyLetter] = useState<LetterId | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Performance-optimized MotionValues for parallax tilt (never causes React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig
  );

  // Clean up jelly timer on unmount
  useEffect(() => {
    return () => {
      if (jellyTimerRef.current) {
        clearTimeout(jellyTimerRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);

      // Determine letter quadrant from normalized coords
      const xNorm = x + 0.5;
      const yNorm = y + 0.5;
      if (xNorm < 0.52 && yNorm < 0.52) {
        setHoveredLetter("i");
      } else if (xNorm >= 0.52 && yNorm < 0.52) {
        setHoveredLetter("t");
      } else if (xNorm < 0.52 && yNorm >= 0.52) {
        setHoveredLetter("s");
      } else if (xNorm >= 0.52 && yNorm >= 0.52) {
        setHoveredLetter("a");
      } else {
        setHoveredLetter(null);
      }
    },
    [shouldReduceMotion, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredLetter(null);
  }, [mouseX, mouseY]);

  const triggerJelly = useCallback(
    (id?: LetterId) => {
      const target = id || hoveredLetter || "a";
      setJellyLetter(target);
      if (jellyTimerRef.current) clearTimeout(jellyTimerRef.current);
      jellyTimerRef.current = setTimeout(() => {
        setJellyLetter(null);
      }, 650);
    },
    [hoveredLetter]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => triggerJelly()}
      style={{
        perspective: 1000,
        aspectRatio: "545 / 580",
      }}
      className={cn(
        "relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[460px] xl:max-w-[520px] 2xl:max-w-[560px] select-none cursor-pointer",
        className
      )}
      role="img"
      aria-label="ITSA animated blob logo"
    >
      {/* ── Parallax 3D Tilt Wrapper ── */}
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full h-full"
      >
        {/* ── Idle Floating / Breathing Wrapper ── */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [-4, 4, -4],
                  scale: [1, 1.012, 1],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full"
        >
          {/* ── 4 Sliced Blob Letters (I, T, S, A) ── */}
          {LETTERS.map((letter) => {
            const isHovered = hoveredLetter === letter.id;
            const isJelly = jellyLetter === letter.id;

            return (
              <motion.div
                key={letter.id}
                style={{ transformOrigin: letter.origin }}
                initial={{
                  opacity: 0,
                  scale: shouldReduceMotion ? 1 : 0.58,
                  x: `${letter.offsetX}%`,
                  y: `${letter.offsetY}%`,
                }}
                animate={
                  shouldReduceMotion
                    ? {
                        opacity: 1,
                        scale: 1,
                        x: `${letter.offsetX}%`,
                        y: `${letter.offsetY}%`,
                        transition: { duration: 0.4, delay: letter.delay },
                      }
                    : isJelly
                    ? {
                        opacity: 1,
                        scaleX: [1, 1.25, 0.82, 1.12, 0.94, 1],
                        scaleY: [1, 0.8, 1.22, 0.9, 1.06, 1],
                        scale: 1,
                        x: `${letter.offsetX}%`,
                        y: `${letter.offsetY}%`,
                        transition: { duration: 0.65, ease: "easeInOut" },
                      }
                    : isHovered
                    ? {
                        opacity: 1,
                        scale: 1.08,
                        scaleX: 1.1,
                        scaleY: 0.92,
                        x: `${letter.offsetX}%`,
                        y: `${letter.offsetY}%`,
                        transition: {
                          type: "spring",
                          stiffness: 420,
                          damping: 14,
                        },
                      }
                    : {
                        opacity: 1,
                        scale: 1,
                        scaleX: 1,
                        scaleY: 1,
                        x: `${letter.offsetX}%`,
                        y: `${letter.offsetY}%`,
                        transition: {
                          type: "spring",
                          stiffness: 340,
                          damping: 18,
                          mass: 0.8,
                          delay: letter.delay,
                        },
                      }
                }
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <Image
                  src={letter.src}
                  alt={`ITSA Blob letter ${letter.name}`}
                  fill
                  unoptimized
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(47,86,214,0.14))",
                  }}
                  priority={priority}
                  className="object-contain"
                />
              </motion.div>
            );
          })}

          {/* ── Quadrant Hit Targets for Direct Pointer & Touch Interaction ── */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 z-10">
            {LETTERS.map((letter) => (
              <button
                key={letter.id}
                type="button"
                onMouseEnter={() => setHoveredLetter(letter.id)}
                onMouseLeave={() => setHoveredLetter(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerJelly(letter.id);
                }}
                className="w-full h-full cursor-pointer rounded-xl bg-transparent outline-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-inset"
                aria-label={`Letter ${letter.name} - ${letter.label}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
