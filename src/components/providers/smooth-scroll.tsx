"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * The site's single smooth-scroll root. Mounted once in the root layout -- a
 * second instance anywhere below it makes both fight for the same scroller.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  // Lenis drives the viewport from its own animation loop, so the global
  // prefers-reduced-motion CSS cannot neutralise it. Honouring the setting
  // means not running it at all and leaving the browser to scroll natively.
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
