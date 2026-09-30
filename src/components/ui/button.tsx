import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-2 border-slate-900 bg-[#1e3a8a] text-white shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 hover:bg-[#172554] hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a]",
        outline:
          "border-2 border-slate-900 bg-white text-slate-900 shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a]",
        secondary:
          "border-2 border-slate-900 bg-slate-100 text-slate-900 shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 hover:bg-slate-200 hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a]",
        destructive:
          "border-2 border-slate-900 bg-red-600 text-white shadow-[3px_3px_0px_#0f172a] hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[5px_5px_0px_#0f172a] active:translate-y-0 active:shadow-[1px_1px_0px_#0f172a]",
        ghost:
          "border-2 border-transparent bg-transparent text-foreground shadow-none hover:bg-muted/70 hover:text-foreground active:translate-y-0",
        link:
          "border-0 bg-transparent text-primary underline-offset-4 shadow-none hover:underline active:translate-y-0",
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
