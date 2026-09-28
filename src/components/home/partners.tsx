import Image from "next/image";
import Link from "next/link";
import { partners } from "@/data/partners";

/**
 * Static, centered partner logo row. Previously a scrolling marquee
 * ("Partner & Sponsor"); simplified to a plain centered strip once there
 * were only two real logos to show, which read as sparse and oddly paced
 * as a continuous scroll.
 */
export function Partners() {
  if (partners.length === 0) return null;

  return (
    <section
      className="border-b border-border/60 bg-muted/20 py-10 sm:py-12"
      aria-label="Partners"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Partners
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {partners.map((partner) => {
            const logo = (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width || 210}
                height={partner.height || 60}
                className="h-10 w-auto max-w-[160px] object-contain opacity-80 grayscale contrast-75 transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:contrast-100 sm:h-12"
              />
            );
            return partner.href ? (
              <Link
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {logo}
              </Link>
            ) : (
              <div key={partner.name}>{logo}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
