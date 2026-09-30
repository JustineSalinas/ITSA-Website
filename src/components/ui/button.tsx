import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Neo-brutalist: hard offset shadow, thick ink border, pill shape -- the
// hero's original CTA treatment, promoted to every button on the site.
// Colors are tokens, not the literal hex this style shipped with in the
// hero: border/shadow use --foreground (the ink token), fills use the
// existing brand/secondary/destructive tokens, so light/dark and any future
// palette change still flow through here instead of drifting from it.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border-2 border-foreground text-sm font-semibold whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[3px_3px_0_var(--foreground)] hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[5px_5px_0_var(--foreground)] active:translate-y-0 active:shadow-[1px_1px_0_var(--foreground)]",
        outline:
          "bg-background text-foreground shadow-[3px_3px_0_var(--foreground)] hover:-translate-y-0.5 hover:bg-muted hover:shadow-[5px_5px_0_var(--foreground)] active:translate-y-0 active:shadow-[1px_1px_0_var(--foreground)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[3px_3px_0_var(--foreground)] hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_8%)] hover:shadow-[5px_5px_0_var(--foreground)] active:translate-y-0 active:shadow-[1px_1px_0_var(--foreground)]",
        destructive:
          "bg-destructive text-brand-foreground shadow-[3px_3px_0_var(--foreground)] hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-[5px_5px_0_var(--foreground)] active:translate-y-0 active:shadow-[1px_1px_0_var(--foreground)]",
        ghost:
          "border-transparent shadow-none hover:bg-muted/70 hover:text-foreground active:translate-y-0",
        link: "border-0 text-primary underline-offset-4 shadow-none hover:underline active:translate-y-0",
      },
      size: {
        default: "h-10 gap-2 px-5 text-sm",
        xs: "h-7 gap-1 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 px-4 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 sm:h-12 gap-2 px-6 sm:px-7 text-sm sm:text-base",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8.5",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={nativeButton ?? (props.render ? false : undefined)}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
