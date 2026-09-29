"use client";

import React, { useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

// ── CONFIGURABLE TIMING & ANIMATION VALUES ────────────────────────────────
export const LOGO_CONFIG = {
  // Build-in Phase
  buildEase: "power2.out",    // Softer, highly fluid ease
  dropInYOffset: -40,         // Distance the top circle drops from
  dropInDuration: 1.2,        // Slower drop in
  centerScaleDuration: 1.0,   // Slower center build
  armDrawDuration: 0.8,       // Much smoother, clearer line draw
  staggerDelay: 0.35,         // Increased stagger so each connection is distinct and clear
  settleRotation: -14,        // Starting rotation before settling to 0
  settleDuration: 3.5,        // Very slow, graceful settle

  // Idle Loop Phase
  idleFloatY: 6,              // Pixels to float up/down
  idleFloatDuration: 4,       // Seconds for one full float cycle
  idleDriftPx: 4,             // Max pixels each node drifts randomly
  idlePulseScale: 0.92,       // How much nodes shrink during pulse

  // Exit Phase
  exitSwellScale: 1.1,      
  exitDuration: 0.8,
  exitRotation: 12,         
};
// ────────────────────────────────────────────────────────────────────────

export interface AnimatedLogoRef {
  playBuild: () => void;
  playExit: (onComplete?: () => void) => void;
}

interface AnimatedLogoProps {
  className?: string;
  autoPlay?: boolean;
}

const NODES = [
  { id: "top", cx: 100, cy: 20, r: 20, gradient: "blue" },         // 0
  { id: "ul", cx: 60, cy: 60, r: 20, gradient: "orange" },         // 1
  { id: "ur", cx: 140, cy: 60, r: 20, gradient: "orange" },        // 2
  { id: "center", cx: 100, cy: 100, r: 20, gradient: "blue" },     // 3
  { id: "ll", cx: 60, cy: 140, r: 20, gradient: "blue" },          // 4
  { id: "lr", cx: 140, cy: 140, r: 20, gradient: "orange" },       // 5
  { id: "bottom", cx: 100, cy: 180, r: 20, gradient: "blue" },     // 6
];

// The arms map exactly to the nodes, using the circle diameter (40) for stroke width.
const ARMS = [
  { from: 3, to: 1, gradient: "orange", width: 40 }, // center to ul
  { from: 3, to: 2, gradient: "orange", width: 40 }, // center to ur
  { from: 3, to: 4, gradient: "blue", width: 40 },   // center to ll
  { from: 4, to: 6, gradient: "blue", width: 40 },   // ll to bottom
];

export const AnimatedLogo = forwardRef<AnimatedLogoRef, AnimatedLogoProps>(
  ({ className = "", autoPlay = true }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const nodesRef = useRef<(SVGCircleElement | null)[]>([]);
    const armsRef = useRef<(SVGLineElement | null)[]>([]);
    const idleCtx = useRef<gsap.Context | null>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    // Ensure array sizing
    if (nodesRef.current.length !== NODES.length) {
      nodesRef.current = Array(NODES.length).fill(null);
    }
    if (armsRef.current.length !== ARMS.length) {
      armsRef.current = Array(ARMS.length).fill(null);
    }

    const startIdleLoop = contextSafe((reducedMotion: boolean) => {
      // Clean up previous idle loops if any
      if (idleCtx.current) idleCtx.current.revert();

      if (reducedMotion) return;

      const ctx = gsap.context(() => {
        // Whole logo slow float
        gsap.to(svgRef.current, {
          y: LOGO_CONFIG.idleFloatY,
          duration: LOGO_CONFIG.idleFloatDuration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Physical stretching: animate a proxy so the arms stay connected
        const proxies = NODES.map(n => ({ x: n.cx, y: n.cy }));

        proxies.forEach((proxy, i) => {
          const node = nodesRef.current[i];
          if (!node) return;

          // Random spatial drift modifying underlying SVG attributes directly
          gsap.to(proxy, {
            x: () => NODES[i].cx + gsap.utils.random(-LOGO_CONFIG.idleDriftPx, LOGO_CONFIG.idleDriftPx),
            y: () => NODES[i].cy + gsap.utils.random(-LOGO_CONFIG.idleDriftPx, LOGO_CONFIG.idleDriftPx),
            duration: gsap.utils.random(3, 5),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            repeatRefresh: true, // Forces new random coordinates every yoyo
            delay: i * 0.2,
            onUpdate: () => {
              // Move the circle
              node.setAttribute("cx", proxy.x.toString());
              node.setAttribute("cy", proxy.y.toString());

              // Update all connected arms endpoints so they stretch like liquid
              ARMS.forEach((arm, armIdx) => {
                const armEl = armsRef.current[armIdx];
                if (!armEl) return;
                
                if (arm.from === i) {
                  armEl.setAttribute("x1", proxy.x.toString());
                  armEl.setAttribute("y1", proxy.y.toString());
                }
                if (arm.to === i) {
                  armEl.setAttribute("x2", proxy.x.toString());
                  armEl.setAttribute("y2", proxy.y.toString());
                }
              });
            }
          });

          // Gentle scale wave pulse
          gsap.to(node, {
            scale: LOGO_CONFIG.idlePulseScale,
            duration: 2 + i * 0.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.1,
          });
        });
      }, containerRef);

      idleCtx.current = ctx;
    });

    const playBuild = contextSafe(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const speed = reducedMotion ? 2 : 1; // Speed up if reduced motion

      // Reset states
      gsap.set(nodesRef.current, { scale: 0, opacity: 0, x: 0, y: 0 });
      gsap.set(armsRef.current, { opacity: 0 });
      
      const tl = gsap.timeline({
        onComplete: () => startIdleLoop(reducedMotion)
      });

      // Subtle settle rotation
      tl.fromTo(
        svgRef.current,
        { rotation: LOGO_CONFIG.settleRotation, y: 0 },
        { 
          rotation: 0, 
          duration: LOGO_CONFIG.settleDuration / speed, 
          ease: "power3.out", 
          transformOrigin: "50% 50%" 
        },
        0
      );

      // Top standalone blue circle drops in
      tl.fromTo(
        nodesRef.current[0],
        { y: LOGO_CONFIG.dropInYOffset, opacity: 0, scale: 1 },
        { y: 0, opacity: 1, duration: LOGO_CONFIG.dropInDuration / speed, ease: LOGO_CONFIG.buildEase },
        0
      );

      // Center circle scales up
      tl.fromTo(
        nodesRef.current[3],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: LOGO_CONFIG.centerScaleDuration / speed, ease: LOGO_CONFIG.buildEase },
        0.2 / speed
      );

      // Lower-right standalone orange circle fades/scales in
      tl.fromTo(
        nodesRef.current[5],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: LOGO_CONFIG.centerScaleDuration / speed, ease: LOGO_CONFIG.buildEase },
        0.3 / speed
      );

      // Connect the arms outward from the center
      ARMS.forEach((arm, idx) => {
        const fromNode = NODES[arm.from];
        const toNode = NODES[arm.to];
        const startTime = (0.4 + idx * LOGO_CONFIG.staggerDelay) / speed;

        // Calculate exact arm length for line dash animation
        const dx = toNode.cx - fromNode.cx;
        const dy = toNode.cy - fromNode.cy;
        const length = Math.sqrt(dx * dx + dy * dy);

        // Draw arm line out smoothly using stroke-dashoffset
        tl.fromTo(
          armsRef.current[idx],
          { strokeDasharray: length, strokeDashoffset: length, opacity: 1 },
          { strokeDashoffset: 0, duration: LOGO_CONFIG.armDrawDuration / speed, ease: "power3.inOut" },
          startTime
        );

        // Scale up the destination circle as arm reaches it
        tl.fromTo(
          nodesRef.current[arm.to],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: LOGO_CONFIG.centerScaleDuration / speed, ease: LOGO_CONFIG.buildEase },
          startTime + (LOGO_CONFIG.armDrawDuration * 0.7) / speed
        );
      });
    });

    const playExit = contextSafe((onComplete?: () => void) => {
      if (idleCtx.current) idleCtx.current.revert();
      
      const tl = gsap.timeline({ onComplete });
      
      // Return nodes to natural position if they were drifting
      tl.to(nodesRef.current, { x: 0, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }, 0);
      tl.to(svgRef.current, { y: 0, duration: 0.3, ease: "power2.out" }, 0);

      // Swell slightly then shrink out
      tl.to(svgRef.current, {
        scale: LOGO_CONFIG.exitSwellScale,
        duration: LOGO_CONFIG.exitDuration * 0.3,
        ease: "power2.out"
      }, 0);
      
      tl.to(svgRef.current, {
        scale: 0.3,
        opacity: 0,
        rotation: LOGO_CONFIG.exitRotation,
        duration: LOGO_CONFIG.exitDuration * 0.7,
        ease: "power3.in"
      }, LOGO_CONFIG.exitDuration * 0.3);
    });

    useImperativeHandle(ref, () => ({
      playBuild,
      playExit,
    }));

    useEffect(() => {
      if (autoPlay) {
        // Small delay to ensure DOM is fully ready
        const timer = setTimeout(() => playBuild(), 100);
        return () => clearTimeout(timer);
      }
    }, [autoPlay, playBuild]);

    return (
      <div ref={containerRef} className={`w-full h-full flex items-center justify-center ${className}`}>
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-full h-full max-w-[400px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="logo-grad-blue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2bb3e0" />
              <stop offset="100%" stopColor="#3457a3" />
            </linearGradient>
            <linearGradient id="logo-grad-orange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7b731" />
              <stop offset="100%" stopColor="#ee5a52" />
            </linearGradient>

            <filter id="logo-goo" x="-25%" y="-25%" width="150%" height="150%">
              {/* Clean Goo Effect */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 19 -7"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" result="gooLayer" />
              
              {/* Grain / Noise Texture */}
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        1 0 0 0 0
                        1 0 0 0 0
                        0 0 0 0.25 0"
                in="noise"
                result="coloredNoise"
              />
              <feComposite
                in="coloredNoise"
                in2="gooLayer"
                operator="in"
                result="maskedNoise"
              />
              <feBlend
                mode="multiply"
                in="maskedNoise"
                in2="gooLayer"
              />
            </filter>
          </defs>

          {/* Group wrapping arms and nodes for gooey liquid blending */}
          <g filter="url(#logo-goo)">
            {/* Arms (drawn as thick round-capped lines behind nodes) */}
            {ARMS.map((arm, i) => {
              const dx = NODES[arm.to].cx - NODES[arm.from].cx;
              const dy = NODES[arm.to].cy - NODES[arm.from].cy;
              const length = Math.sqrt(dx * dx + dy * dy);
              return (
                <line
                  key={`arm-${i}`}
                  ref={(el) => { armsRef.current[i] = el; }}
                  x1={NODES[arm.from].cx}
                  y1={NODES[arm.from].cy}
                  x2={NODES[arm.to].cx}
                  y2={NODES[arm.to].cy}
                  stroke={`url(#logo-grad-${arm.gradient})`}
                  strokeWidth={arm.width}
                  strokeLinecap="round"
                  strokeDasharray={length}
                  strokeDashoffset={length}
                  opacity={0}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => (
              <circle
                key={`node-${i}`}
                ref={(el) => { nodesRef.current[i] = el; }}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={`url(#logo-grad-${node.gradient})`}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center center",
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
);

AnimatedLogo.displayName = "AnimatedLogo";
