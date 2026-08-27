import Link from "next/link";
import { Mail, MapPin, Building2, Shield, Clock, ArrowUp, Sparkles, CheckCircle2 } from "lucide-react";
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

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-slate-950 text-slate-100">

      {/* Main 4-Column Corporate Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <Logo subtitleClassName="text-slate-400" />
            <p className="text-xs leading-relaxed text-slate-400">
              {siteConfig.fullName} — empowering Information Technology students through technical excellence, leadership, and community support.
            </p>
            <div className="flex gap-2 pt-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-lg border border-white/10 bg-slate-900/80 text-slate-400 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
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
              <li>
                <Link href="/events" className="transition-colors hover:text-white">
                  Technical Workshops & CTFs
                </Link>
              </li>
              <li>
                <Link href="/officers" className="transition-colors hover:text-white">
                  Executive Hierarchy & Org Chart
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  Mission, Vision & Values
                </Link>
              </li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-white">
                  Student Projects & Portfolios
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition-colors hover:text-white">
                  Executive Officer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Headquarters */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Headquarters & Contact
            </h3>
            <ul className="mt-4.5 space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Building2 className="mt-0.5 size-4 shrink-0 text-white" />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-white" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-white" />
                <span>Mon – Fri, 8:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.fullName} ({siteConfig.name}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-500">{siteConfig.school}</span>
            <span>&middot;</span>
            <Link href="/admin" className="flex items-center gap-1 font-mono text-[11px] text-slate-400 hover:text-white">
              <Shield className="size-3 text-white" /> Officer Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
