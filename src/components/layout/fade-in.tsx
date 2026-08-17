"use client";

import { motion, type DOMMotionComponents } from "framer-motion";
import { ReactNode } from "react";

// The elements framer-motion actually provides a motion component for, so
// `motion[Component]` is a checked lookup rather than an `any` cast.
type MotionTag = keyof DOMMotionComponents;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: MotionTag;
}

export function FadeIn({ children, delay = 0, className, as: Component = "div" }: FadeInProps) {
  const MotionComponent = motion[Component];

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
