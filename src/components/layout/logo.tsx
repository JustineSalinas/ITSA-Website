import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={`${siteConfig.name} logo`}
      width={120}
      height={120}
      priority={priority}
      className={cn("size-full object-contain select-none", className)}
    />
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
        <LogoMark priority />
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

