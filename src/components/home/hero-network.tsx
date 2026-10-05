"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HeroNetworkProps {
  className?: string;
  orientation?: "left" | "right" | "full";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

/**
 * An interactive particle network -- adapted from a community "Aether Flow"
 * hero snippet, cut down to just the canvas background (the snippet's own
 * headline/badge/CTA aren't used here; this hero already has its own) and
 * reworked to fit this component:
 *
 * - Sized to its container via ResizeObserver, not window.innerWidth/Height
 *   -- the original assumed a full-viewport canvas; here it fills the
 *   left or right column, or full hero background.
 * - Transparent background (clearRect every frame) instead of an opaque
 *   `fillStyle = 'black'` fill -- the original was a dark hero; this one
 *   sits over the site's white background.
 * - Node and link colors are read from the brand CSS custom properties at
 *   paint time rather than hardcoded hex, so this stays in sync with
 *   DESIGN.md's palette automatically instead of drifting from it.
 * - Respects prefers-reduced-motion: draws one static frame and skips the
 *   animation loop and pointer interactivity entirely, rather than the
 *   original's unconditional rAF + mousemove loop.
 */
export function HeroNetwork({ className, orientation = "left" }: HeroNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = getComputedStyle(document.documentElement);
    const readVar = (name: string, fallback: string) => {
      const value = root.getPropertyValue(name).trim();
      return value || fallback;
    };
    // ITSA's node palette: blue, deep blue, cyan, and orange -- mirrors the
    // logo's own node colors (DESIGN.md's "Connected Network" North Star).
    const nodeColors = [
      readVar("--brand", "#2f56d6"),
      readVar("--brand-deep", "#28479c"),
      readVar("--brand-cyan", "#5fb3df"),
      readVar("--brand-orange", "#e08a3f"),
    ];
    const linkColor = readVar("--brand", "#2f56d6");
    const linkHighlightColor = readVar("--brand-cyan", "#5fb3df");

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId = 0;
    const mouse = { x: -9999, y: -9999, radius: 140 };

    function seedParticles() {
      particles = [];
      // Sparser than the original (area / 9000) -- a quiet constellation,
      // not a busy sticker sheet.
      const count = Math.round((width * height) / 14000);

      // Pure Math.random() placement can clump by chance with a count this
      // low (it's a fresh draw every page load, so some loads look visibly
      // bottom- or top-heavy). Stratified placement -- one particle per
      // roughly-square grid cell, jittered within it -- guarantees even
      // top-to-bottom, left-to-right coverage every time instead of leaving
      // it to luck.
      const cols = Math.max(1, Math.round(Math.sqrt((count * width) / height)));
      const rows = Math.max(1, Math.ceil(count / cols));
      const cellW = width / cols;
      const cellH = height / rows;

      let i = 0;
      outer: for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (i >= count) break outer;
          const jitterX = (Math.random() - 0.5) * cellW * 0.7;
          const jitterY = (Math.random() - 0.5) * cellH * 0.7;
          particles.push({
            x: col * cellW + cellW / 2 + jitterX,
            y: row * cellH + cellH / 2 + jitterY,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            size: Math.random() * 2.5 + 2,
            color: nodeColors[i % nodeColors.length],
          });
          i++;
        }
      }
    }

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    }

    function drawFrame() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.fill();
      }

      const linkDistance = Math.min(width, height) / 4.2;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance >= linkDistance) continue;

          const opacity = 1 - distance / linkDistance;
          const midX = (particles[a].x + particles[b].x) / 2;
          const midY = (particles[a].y + particles[b].y) / 2;
          const distToMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
          const isNearMouse = distToMouse < mouse.radius;

          ctx!.strokeStyle = isNearMouse ? linkHighlightColor : linkColor;
          ctx!.globalAlpha = (isNearMouse ? 0.65 : 0.3) * opacity;
          ctx!.lineWidth = 1.75;
          ctx!.beginPath();
          ctx!.moveTo(particles[a].x, particles[a].y);
          ctx!.lineTo(particles[b].x, particles[b].y);
          ctx!.stroke();
        }
      }
      ctx!.globalAlpha = 1;
    }

    function step() {
      for (const p of particles) {
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          p.x -= (dx / distance) * force * 1.6;
          p.y -= (dy / distance) * force * 1.6;
        }

        p.x += p.vx;
        p.y += p.vy;
      }
      drawFrame();
      animationFrameId = requestAnimationFrame(step);
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handlePointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    if (prefersReducedMotion) {
      // One static, non-interactive frame -- the non-motion fallback this
      // codebase requires for every animation.
      drawFrame();
    } else {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
      animationFrameId = requestAnimationFrame(step);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  const maskStyle =
    orientation === "right"
      ? {
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 36%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0) 84%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 36%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0) 84%)",
        }
      : orientation === "full"
      ? undefined
      : {
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 36%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0) 84%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 36%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0) 84%)",
        };

  return (
    <canvas
      ref={canvasRef}
      style={maskStyle}
      className={className}
      aria-hidden="true"
    />
  );
}
