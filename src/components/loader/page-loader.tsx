"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./page-loader.css";

const MINIMUM_DISPLAY_MS = 3200; // Allow time for the slow glass flare
const EXIT_DURATION = 1.0;
const PULSE_SCALE_MAX = 1.03;
const PULSE_DURATION = 3.8;
const FLOAT_Y_AMOUNT = 12;
const FLOAT_DURATION = 4.5;

gsap.registerPlugin(useGSAP);

export function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const pageLoadedRef = useRef(false);
  const minTimePassedRef = useRef(false);
  const exitCalledRef = useRef(false);
  const pulseTweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    function onReady() { pageLoadedRef.current = true; }
    if (document.readyState === "complete") {
      pageLoadedRef.current = true;
    } else {
      window.addEventListener("load", onReady);
      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { minTimePassedRef.current = true; }, MINIMUM_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const triggerExit = useCallback(() => {
    if (exitCalledRef.current || !containerRef.current) return;
    exitCalledRef.current = true;

    const logoEl = containerRef.current.querySelector(".page-loader__logo");
    const flareContainer = containerRef.current.querySelector(".page-loader__flare-container");
    const glow = containerRef.current.querySelector(".page-loader__glow");

    pulseTweensRef.current.forEach((t) => t.kill());
    pulseTweensRef.current = [];

    const tl = gsap.timeline({ onComplete: () => setVisible(false) });

    // Sync the logo zoom-out and background fade perfectly at time '0'
    if (logoEl && flareContainer) {
      tl.to([logoEl, flareContainer], { opacity: 0, scale: 1.2, duration: 0.6, ease: "power2.inOut" }, 0);
    }
    if (glow) tl.to(glow, { opacity: 0, scale: 1.2, duration: 0.6, ease: "power2.inOut" }, 0);

    tl.to(containerRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pageLoadedRef.current && minTimePassedRef.current) {
        clearInterval(interval);
        triggerExit();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [triggerExit]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const logoEl = containerRef.current.querySelector<HTMLImageElement>(".page-loader__logo");
      const flareContainer = containerRef.current.querySelector<HTMLDivElement>(".page-loader__flare-container");
      const flareBeam = containerRef.current.querySelector<HTMLDivElement>(".page-loader__flare-beam");
      const mesh = containerRef.current.querySelector(".page-loader__mesh");
      const glow = containerRef.current.querySelector(".page-loader__glow");
      const blobs = containerRef.current.querySelectorAll(".page-loader__mesh-blob");
      
      const master = gsap.timeline();

      // Mesh fades in
      if (mesh) master.to(mesh, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0);

      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-60, 60),
          y: () => gsap.utils.random(-40, 40),
          duration: gsap.utils.random(10, 18),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      // ── The Apple Spring (iOS Pop) ──
      if (logoEl && flareContainer) {
        master.fromTo(
          [logoEl, flareContainer],
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(2.2)", // The magic iOS spring tension
          },
          0.2
        );
      }

      const assemblyDone = 1.4;

      // ── The Glass Flare Sweep ──
      // Triggers exactly as the logo finishes popping into place
      if (flareBeam) {
        master.to(
          flareBeam,
          {
            left: "200%",
            duration: 1.6, // Slowed down significantly so it's very noticeable
            ease: "power2.inOut",
          },
          assemblyDone - 0.1
        );
      }

      if (glow) {
        master.to(glow, { opacity: 0.4, duration: 1.5, ease: "power2.inOut" }, assemblyDone - 0.5);
      }

      // Idle Breathing Loop
      master.call(
        () => {
          if (!logoEl || !flareContainer) return;
          const breathe = gsap.to([logoEl, flareContainer], { scale: PULSE_SCALE_MAX, duration: PULSE_DURATION / 2, ease: "sine.inOut", repeat: -1, yoyo: true });
          const float = gsap.to([logoEl, flareContainer], { y: FLOAT_Y_AMOUNT / 2, duration: FLOAT_DURATION / 2, ease: "sine.inOut", repeat: -1, yoyo: true });
          pulseTweensRef.current = [breathe, float];
        },
        [],
        assemblyDone
      );

      if (glow) {
        gsap.to(glow, { opacity: 0.25, scale: 1.1, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: assemblyDone + 1 });
      }
    },
    { scope: containerRef }
  );

  if (!visible) return null;

  return (
    <div ref={containerRef} className="page-loader" role="status" aria-label="Loading page">
      <div className="page-loader__mesh">
        <div className="page-loader__mesh-blob page-loader__mesh-blob--blue" />
        <div className="page-loader__mesh-blob page-loader__mesh-blob--orange" />
        <div className="page-loader__mesh-blob page-loader__mesh-blob--deep" />
      </div>

      <div className="page-loader__content">
        <div className="page-loader__logo-wrapper">
          <div className="page-loader__glow" />

          {/* Glass Flare Layer */}
          <div className="page-loader__flare-container">
            <div className="page-loader__flare-beam" />
          </div>

          {/* Just the single, clean logo using intense spring physics */}
          <img
            className="page-loader__logo"
            src="/logo.png"
            alt="ITSA Logo"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
