import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
}

/**
 * Reusable crisp square grid background pattern matching the ITSA tech grid aesthetic.
 * Sits at z-0 with pointer-events-none so it stays in the very back without blocking interactions.
 */
export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 select-none",
        className,
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.048) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.048) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
      aria-hidden="true"
    />
  );
}
