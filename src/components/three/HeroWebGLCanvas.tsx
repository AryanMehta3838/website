"use client";

import { Canvas } from "@react-three/fiber";
import type { HeroWebGLVariant } from "./heroBackdropPolicy";
import { HeroPlaceholderScene } from "./HeroPlaceholderScene";

export interface HeroWebGLCanvasProps {
  variant: HeroWebGLVariant;
}

/**
 * Client-only WebGL layer. Loaded via `next/dynamic` from `HeroScene` (ssr: false).
 */
export function HeroWebGLCanvas({ variant }: HeroWebGLCanvasProps) {
  const dpr: [number, number] =
    variant === "mobile" ? [1, 1] : [1, 1.5];

  return (
    <Canvas
      className="h-full w-full touch-none"
      style={{ pointerEvents: "none" }}
      gl={{
        alpha: true,
        antialias: variant === "desktop",
        powerPreference: "high-performance",
      }}
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 50 }}
      aria-hidden
    >
      <HeroPlaceholderScene variant={variant} />
    </Canvas>
  );
}
