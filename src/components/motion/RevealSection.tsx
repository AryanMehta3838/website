"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import {
  sectionRevealTransition,
  sectionRevealVariants,
} from "@/src/lib/animation/motion-config";

export type RevealSectionProps = HTMLMotionProps<"section">;

/**
 * One-time subtle fade + slight rise when the section enters the viewport.
 * Intentionally minimal so the hero WebGL remains the focal drama.
 */
export function RevealSection({ children, ...props }: RevealSectionProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      {...props}
      variants={sectionRevealVariants}
      initial={reduced ? "visible" : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -56px 0px" }}
      transition={sectionRevealTransition(!!reduced)}
    >
      {children}
    </motion.section>
  );
}
