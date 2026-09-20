"use client";

import Image from "next/image";
import Link from "next/link";
import { partners } from "@/data/partners";

/**
 * Technical blueprint grid partner and sponsor carousel with a
 * neo-brutalist kicker chip straddling the top border line.
 *
 * Features:
 * - Neo-brutalist blue-ish chip with hard 2px black border and 3px offset drop shadow
 * - Continuous smooth CSS marquee track with monochrome logos
 * - Hover reveal to 100% full vibrant color and pause on hover
 * - Balanced vertical padding and subtle 24px blueprint grid texture
 *
 * Pauses on hover and keyboard focus; respects prefers-reduced-motion.
 */
export function PartnersCarousel() {
  if (partners.length === 0) return null;

  // Duplicated so the second copy scrolls in seamlessly as the first scrolls out.
  const track = [...partners, ...partners];

  return (
    <section
      className="partner-strip"
      aria-label="Partners and Sponsors"
    >
      {/* Neo-brutalist kicker chip centered directly on the top border line */}
      <div className="partner-strip-label">
        <span className="neo-kicker">
          PARTNERS &amp; SPONSORS
        </span>
      </div>

      {/* Edge-fade marquee container with balanced vertical spacing */}
      <div
        className="group relative overflow-hidden py-7 sm:py-8"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="flex w-max animate-marquee items-center gap-12 sm:gap-16 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          {track.map((partner, i) => {
            const logo = (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width || 210}
                height={partner.height || 60}
                className="h-8 w-auto max-w-[150px] object-contain opacity-60 grayscale contrast-75 transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 hover:contrast-100 select-none sm:h-9 sm:max-w-[180px]"
              />
            );
            return (
              <li
                key={`${partner.name}-${i}`}
                className="flex shrink-0 items-center justify-center px-2"
                aria-hidden={i >= partners.length ? "true" : undefined}
              >
                {partner.href ? (
                  <Link
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    tabIndex={i >= partners.length ? -1 : undefined}
                  >
                    {logo}
                  </Link>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
