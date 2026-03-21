"use client";

import dynamic from "next/dynamic";
import { memo } from "react";
import { HeroStaticFallback } from "./HeroStaticFallback";
import { useHeroBackdropPolicy } from "./heroBackdropPolicy";
import type { HeroWebGLVariant } from "./heroBackdropPolicy";

const HeroWebGLCanvas = dynamic(
  () =>
    import("./HeroWebGLCanvas").then((m) => ({ default: m.HeroWebGLCanvas })),
  {
    ssr: false,
    loading: () => <HeroStaticFallback />,
  },
);

/** Isolated branch so home-page state changes don’t remount the GL root unnecessarily. */
const HeroWebGLBranch = memo(function HeroWebGLBranch({
  variant,
}: {
  variant: HeroWebGLVariant;
}) {
  return <HeroWebGLCanvas variant={variant} />;
});

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

  return <HeroWebGLBranch variant={policy.variant} />;
}
