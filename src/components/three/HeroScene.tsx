"use client";

import dynamic from "next/dynamic";
import { HeroStaticFallback } from "./HeroStaticFallback";
import { useHeroBackdropPolicy } from "./heroBackdropPolicy";

const HeroWebGLCanvas = dynamic(
  () =>
    import("./HeroWebGLCanvas").then((m) => ({ default: m.HeroWebGLCanvas })),
  {
    ssr: false,
    loading: () => <HeroStaticFallback />,
  },
);

/**
 * Hero Three.js backdrop wrapper: static fallback or dynamically loaded Canvas.
 * Renders **background only** — parent section should stack copy above with z-index.
 */
export function HeroScene() {
  const policy = useHeroBackdropPolicy();

  if (!policy.ready) {
    return <HeroStaticFallback />;
  }

  if (!policy.useWebGL) {
    return <HeroStaticFallback />;
  }

  return <HeroWebGLCanvas variant={policy.variant} />;
}
