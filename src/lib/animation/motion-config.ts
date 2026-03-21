import type { Transition, Variants } from "framer-motion";

/**
 * Smooth, decelerated easing — calm and premium; slower than typical UI snappy curves
 * so non-hero motion reads as supportive of the hero, not competing with it.
 */
export const SITE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Section scroll-reveal: gentle, slower than micro-interactions. */
export const SECTION_REVEAL_DURATION = 0.62;

/** Card hover / press: slightly quicker but still soft. */
export const CARD_INTERACTION_DURATION = 0.38;

const ANIMATION_BASE = 0.25;
const EASING_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Legacy default transition (client-only callers). Prefer `useReducedMotion()` +
 * {@link sectionRevealTransition} / MotionConfig where possible.
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

/** Scroll-triggered section reveal: small lift + fade only — no scale drama. */
export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SECTION_REVEAL_DURATION,
      ease: SITE_EASE,
    },
  },
};

export function sectionRevealTransition(reducedMotion: boolean): Transition {
  if (reducedMotion) return { duration: 0 };
  return {
    duration: SECTION_REVEAL_DURATION,
    ease: SITE_EASE,
  };
}
