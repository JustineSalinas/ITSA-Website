import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <defs>
        <linearGradient
          id="itsa-blue"
          x1="6"
          y1="6"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34a9e0" />
          <stop offset="1" stopColor="#2f56d6" />
        </linearGradient>
        <linearGradient
          id="itsa-deep"
          x1="14"
          y1="14"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2f56d6" />
          <stop offset="1" stopColor="#223fa8" />
        </linearGradient>
        <linearGradient
          id="itsa-orange"
          x1="24"
          y1="8"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f7a81e" />
          <stop offset="1" stopColor="#e0451f" />
        </linearGradient>
      </defs>
      <g strokeLinecap="round">
        <path d="M21 21 L20 9" stroke="url(#itsa-blue)" strokeWidth="3.6" />
        <path d="M21 21 L10 27" stroke="url(#itsa-blue)" strokeWidth="3.6" />
        <path d="M21 21 L31 13" stroke="url(#itsa-orange)" strokeWidth="3.6" />
        <path d="M21 21 L29 31" stroke="url(#itsa-orange)" strokeWidth="3.6" />
      </g>
      <circle cx="20" cy="9" r="5" fill="url(#itsa-blue)" />
      <circle cx="10" cy="27" r="5" fill="url(#itsa-blue)" />
      <circle cx="31" cy="13" r="4.5" fill="url(#itsa-orange)" />
      <circle cx="29" cy="31" r="4" fill="url(#itsa-orange)" />
      <circle cx="21" cy="21" r="6" fill="url(#itsa-deep)" />
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="relative grid size-9 place-items-center transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105">
        <LogoMark />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-base font-extrabold tracking-tight">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {siteConfig.school}
          </span>
        </span>
      )}
    </Link>
  );
}
