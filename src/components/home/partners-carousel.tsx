"use client";

import Image from "next/image";
import Link from "next/link";
import { partners } from "@/data/partners";

/**
 * Technical blueprint grid partner and sponsor carousel.
 *
 * Features a continuous, seamless CSS marquee track framed by 2px ink borders,
 * subtle graph paper grid background, and a centered "Partners and Sponsors"
 * boundary badge.
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
      <div className="partner-strip-label">
        <span className="partner-eyebrow">
          Partners and Sponsors
        </span>
      </div>

      <div
        className="group relative overflow-hidden py-1"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
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
                className="h-9 sm:h-11 w-auto max-w-[170px] sm:max-w-[210px] object-contain transition-transform duration-300 hover:scale-105"
              />
            );
            return (
              <li
                key={`${partner.name}-${i}`}
                className="shrink-0 flex items-center justify-center px-2"
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
