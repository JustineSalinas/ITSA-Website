"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Pixel {
  x: number;
  y: number;
  size: number;
  color: string;
  phase: number;
  speed: number;
}

/**
 * Ambient twinkling-pixel backdrop for the footer's wordmark band -- small
 * brand-colored squares that fade in and out on their own sine cycle rather
 * than moving or reacting to the pointer. Same brand-token-at-paint-time and
 * ResizeObserver/ prefers-reduced-motion conventions as HeroNetwork, but a
 * calmer "dust" effect: this sits low on the page as a quiet accent behind
 * static text, not a hero-level focal point.
 */
export function FooterGlow({ className }: { className?: string }) {
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
    const colors = [
      readVar("--brand", "#2f56d6"),
      readVar("--brand-cyan", "#5fb3df"),
      readVar("--brand-orange", "#e08a3f"),
    ];

    let pixels: Pixel[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId = 0;

    function seedPixels() {
      pixels = [];
      const count = Math.round((width * height) / 9000);
      for (let i = 0; i < count; i++) {
        pixels.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5 + 1.5,
          color: colors[i % colors.length],
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.4 + 0.2,
        });
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
      seedPixels();
    }

    function drawFrame(time: number) {
      ctx!.clearRect(0, 0, width, height);
      for (const p of pixels) {
        const twinkle = (Math.sin(time * 0.001 * p.speed + p.phase) + 1) / 2;
        ctx!.globalAlpha = 0.15 + twinkle * 0.55;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx!.globalAlpha = 1;
    }

    function step(time: number) {
      drawFrame(time);
      animationFrameId = requestAnimationFrame(step);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    if (prefersReducedMotion) {
      drawFrame(0);
    } else {
      animationFrameId = requestAnimationFrame(step);
    }

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
