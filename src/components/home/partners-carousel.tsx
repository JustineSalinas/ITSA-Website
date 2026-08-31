"use client";

import Image from "next/image";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { partners, partnersArePlaceholders } from "@/data/partners";
import { siteConfig } from "@/data/site";

/**
 * Partner and sponsor logo carousel.
 *
 * A CSS marquee rather than a JavaScript slider: no library, no timers, no
 * state, and it costs nothing on a slow phone. The track holds two copies of
 * the list and translates by exactly -50%, so the loop is seamless.
 *
 * It stops on hover and on keyboard focus, and `motion-reduce` halts it
 * outright — an animation that runs forever with no way to pause is a WCAG
 * 2.2.2 failure, which is the trap the news carousel fell into.
 */
export function PartnersCarousel() {
  if (partners.length === 0) return null;

  // Duplicated so the second copy scrolls in as the first scrolls out.
  const track = [...partners, ...partners];

  return (
    <section className="border-t border-border/60 bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
            <Handshake className="size-3.5" aria-hidden="true" />
            PARTNERS &amp; SPONSORS
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Backed by the industry
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Organisations that support ITSA events, workshops, and competitions.
          </p>
        </div>

        {/* Edge fade so logos dissolve rather than clip at the boundary. */}
        <div
          className="group relative mt-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <ul className="flex w-max animate-marquee items-center gap-10 py-2 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
            {track.map((partner, i) => {
              const logo = (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={220}
                  height={72}
                  className="h-12 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
                />
              );
              return (
                <li
                  key={`${partner.name}-${i}`}
                  className="shrink-0"
                  // The second copy is decorative duplication; hiding it from
                  // assistive tech stops every logo being announced twice.
                  aria-hidden={i >= partners.length ? "true" : undefined}
                >
                  {partner.href ? (
                    <Link
                      href={partner.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {partnersArePlaceholders && (
            <span className="mr-1 font-semibold text-foreground">
              Sample logos shown.
            </span>
          )}
          Interested in partnering with ITSA?{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-primary hover:underline"
          >
            Get in touch
          </a>
          .
        </p>
      </div>
    </section>
  );
}
