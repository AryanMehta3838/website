"use client";

import { useEffect, useState } from "react";

/** Default max-width for “mobile” WebGL branch (matches Tailwind `md`). */
export const HERO_MOBILE_MAX_WIDTH_PX = 768;

export type HeroWebGLVariant = "desktop" | "mobile";

export type HeroBackdropPolicy =
  | { ready: false }
  | { ready: true; useWebGL: false }
  | { ready: true; useWebGL: true; variant: HeroWebGLVariant };

/** Detect WebGL1/2 without throwing in restricted environments. */
function isWebGLAvailable(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Decides static CSS vs WebGL and desktop vs mobile variant.
 * - No WebGL / reduced motion → static fallback only.
 * - Otherwise → Canvas with `desktop` or `mobile` placeholder scenes (geometry added later).
 */
export function useHeroBackdropPolicy(
  mobileMaxWidthPx: number = HERO_MOBILE_MAX_WIDTH_PX,
): HeroBackdropPolicy {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia(
      `(max-width: ${mobileMaxWidthPx - 1}px)`,
    );

    const sync = () => {
      setPrefersReducedMotion(mqReduce.matches);
      setIsMobile(mqMobile.matches);
      setWebglOk(isWebGLAvailable());
    };

    sync();
    mqReduce.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, [mounted, mobileMaxWidthPx]);

  if (!mounted) {
    return { ready: false };
  }

  if (prefersReducedMotion || !webglOk) {
    return { ready: true, useWebGL: false };
  }

  return {
    ready: true,
    useWebGL: true,
    variant: isMobile ? "mobile" : "desktop",
  };
}
