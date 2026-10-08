import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import { Logo } from "@/components/layout/logo";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/social";

const socialLinks = [
  { href: siteConfig.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.socials.twitter, label: "Twitter", Icon: TwitterIcon },
  { href: siteConfig.socials.github, label: "GitHub", Icon: GithubIcon },
].filter((s) => s.href);

const resourceLinks = [
  { href: "/news", label: "Latest News & Dispatches" },
  { href: "/events", label: "Technical Workshops & CTFs" },
  { href: "/officers", label: "Executive Hierarchy & Org Chart" },
  { href: "/about", label: "Mission, Vision & Values" },
  { href: "/projects", label: "Student Projects & Portfolios" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/80 bg-slate-950 text-slate-100">
      {/* Shimmering brand-gradient divider, standing in for the reference's
          thin animated top line -- same blue/cyan/orange trio as the node
          network elsewhere on the site, not a generic rainbow. */}
      <div
        aria-hidden="true"
        className="animate-shimmer h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, var(--brand) 20%, var(--brand-cyan) 50%, var(--brand-orange) 80%, transparent 100%)",
        }}
      />

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 lg:pr-8">
            <Logo showSubtitle subtitleClassName="text-slate-400" />
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              {siteConfig.fullName}, empowering Information Technology students through technical excellence, leadership, and community support.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-2 pt-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-lg border border-white/10 bg-slate-900/80 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Association Quick Links */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h3>
            <ul className="mt-4.5 space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Student Resources */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Student Resources
            </h3>
            <ul className="mt-4.5 space-y-2.5 text-xs text-slate-400">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Connect
            </h3>
            <ul className="mt-4.5 space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="leading-relaxed">{siteConfig.location}</li>
              <li>{siteConfig.school}</li>
            </ul>
          </div>
        </div>

        {/* Oversized Wordmark Band -- matching reference:
            Oversized geometric "ITSA" with solid letters that softly fade out
            toward the bottom via a vertical gradient mask. */}
        <div className="relative mt-14 select-none sm:mt-18 lg:mt-24">
          <div
            className="flex w-full items-end justify-center overflow-hidden pb-2"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0) 98%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0) 98%)",
            }}
          >
            <div
              role="img"
              aria-label="ITSA — Information Technology Student Association"
              className="select-none font-heading text-[clamp(7.5rem,26vw,21rem)] font-black leading-[0.88] tracking-tight sm:tracking-normal text-white/35 transition-colors duration-300 hover:text-white/50"
            >
              ITSA
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.fullName} ({siteConfig.name}). All rights reserved.
          </p>
          <span className="font-mono text-xs text-slate-400">{siteConfig.school}</span>
        </div>
      </div>
    </footer>
  );
}
