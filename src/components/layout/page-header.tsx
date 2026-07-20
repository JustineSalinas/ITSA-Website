import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-b border-border/60 bg-gradient-to-b from-primary/[0.06] to-transparent",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Lead with the headline — no uppercase eyebrow (One-Kicker Rule). */}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
