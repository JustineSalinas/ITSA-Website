"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Scroll to the very beginning (top: 0, left: 0) of the document.
 * Works seamlessly with both Lenis smooth scrolling and native window scroll.
 */
export function scrollToBeginning(immediate = true) {
  if (typeof window === "undefined") return;

  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: { immediate?: boolean }) => void } }).__lenis;

  if (lenis) {
    lenis.scrollTo(0, { immediate });
  }

  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: immediate ? "instant" : "smooth",
    });
  } catch {
    window.scrollTo(0, 0);
  }

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function LenisScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (lenis) {
      (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;
    }
  }, [lenis]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      scrollToBeginning(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("http://") &&
        !href.startsWith("https://") &&
        !href.startsWith("mailto:")
      ) {
        scrollToBeginning(true);
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => document.removeEventListener("click", handleDocumentClick, { capture: true });
  }, []);

  return null;
}

function NativeScrollReset() {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      scrollToBeginning(true);
    }
  }, [pathname]);

  return null;
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
    return (
      <>
        <NativeScrollReset />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <LenisScrollReset />
      {children}
    </ReactLenis>
  );
}
