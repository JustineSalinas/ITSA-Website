import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
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
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights
            reserved.
          </p>
          <p>
            {siteConfig.school} &middot;{" "}
            <Link href="/admin" className="transition-colors hover:text-primary">
              Officer login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
