import type { HeroWebGLVariant } from "./heroBackdropPolicy";

/** Mobile: fixed 1× DPR for throughput. */
export const HERO_DPR_MOBILE: [number, number] = [1, 1];

/**
 * Desktop: clamp DPR so 3× displays don’t silently triple fragment cost.
 * 1.5 keeps current visual weight; raise only if profiling allows.
 */
export const HERO_DPR_DESKTOP: [number, number] = [1, 1.5];

export function heroCanvasDpr(variant: HeroWebGLVariant): [number, number] {
  return variant === "mobile" ? HERO_DPR_MOBILE : HERO_DPR_DESKTOP;
}
