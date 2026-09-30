"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToBeginning } from "@/components/providers/smooth-scroll";

/**
 * Floating back-to-top button following ITSA's neo-brutalist button design.
 * Appears once the user has scrolled down and smoothly returns to the beginning.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 350px
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      setVisible(currentScroll > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToBeginning(false)}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          aria-label="Back to beginning"
          title="Back to beginning"
          className="fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border-2 border-foreground bg-background text-foreground shadow-[3px_3px_0_var(--foreground)] outline-none transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-[5px_5px_0_var(--foreground)] active:translate-y-0 active:shadow-[1px_1px_0_var(--foreground)] focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowUp className="size-4.5 stroke-[2.5]" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
