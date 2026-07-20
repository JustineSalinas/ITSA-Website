"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Render both; swap by theme once mounted to avoid hydration mismatch. */}
      <Sun
        className={`size-5 transition-all ${
          mounted && isDark ? "hidden" : "block"
        }`}
      />
      <Moon
        className={`size-5 transition-all ${
          mounted && isDark ? "block" : "hidden"
        }`}
      />
    </Button>
  );
}
