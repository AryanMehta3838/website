import type { Transition } from "framer-motion";

const ANIMATION_BASE = 0.25;
const EASING_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Default Framer Motion transition; respects prefers-reduced-motion.
 */
export function getDefaultTransition(): Transition {
  if (getPrefersReducedMotion()) {
    return { duration: 0 };
  }
  return {
    duration: ANIMATION_BASE,
    ease: EASING_STANDARD,
  };
}
