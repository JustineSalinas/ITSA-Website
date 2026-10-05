"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, CreditCard, KeyRound, Radio, Wifi, Code2, type LucideIcon } from "lucide-react";
import { techBrands } from "./tech-brands";

// No brand mark exists for these, so a neutral glyph stands in.
const fallbackIcons: Record<string, LucideIcon> = {
  LoRa: Radio,
  FreeRTOS: Cpu,
  "HMAC-SHA256": KeyRound,
  PayMongo: CreditCard,
  "ESP-NOW": Wifi,
};

// Near-black brand colours vanish on the dark-on-light chip, so they use ink.
const isNearBlack = (hex: string) => ["000000", "181717", "191919"].includes(hex.toLowerCase());

function TechIcon({ name }: { name: string }) {
  const brand = techBrands[name];
  const Fallback = fallbackIcons[name] ?? Code2;
  const color = brand && !isNearBlack(brand.hex) ? `#${brand.hex}` : "var(--foreground)";
  return (
    <span
      className="grid size-9 place-items-center rounded-lg bg-secondary/60 transition-colors duration-200 group-hover:bg-card"
      style={{ color }}
    >
      {brand ? (
        <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
          <path d={brand.path} />
        </svg>
      ) : (
        <Fallback className="size-5 text-brand" aria-hidden="true" />
      )}
    </span>
  );
}

export function TechStack({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="flex flex-wrap justify-center gap-3 md:justify-start">
      {items.map((name, i) => (
        <motion.li
          key={name}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
        >
          <motion.div
            whileHover={reduce ? undefined : { y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group flex items-center gap-3 rounded-xl border-2 border-foreground/15 bg-card py-2 pl-2 pr-4 shadow-[2px_2px_0_0_var(--foreground)] transition-[border-color,box-shadow] duration-200 hover:border-foreground hover:shadow-[4px_4px_0_0_var(--foreground)]"
          >
            <motion.span
              // gentle idle float, staggered so the row never moves in lockstep
              animate={reduce ? undefined : { y: [0, -1.5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
            >
              <TechIcon name={name} />
            </motion.span>
            <span className="font-mono text-sm font-semibold text-foreground">{name}</span>
          </motion.div>
        </motion.li>
      ))}
    </ul>
  );
}
