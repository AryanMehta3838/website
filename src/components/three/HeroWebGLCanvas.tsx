"use client";

import { Canvas } from "@react-three/fiber";
import { memo } from "react";
import type { HeroWebGLVariant } from "./heroBackdropPolicy";
import { heroCanvasDpr } from "./heroConstants";
import { HeroAmbientMotionProvider } from "./heroMotionContext";
import { HeroPlaceholderScene } from "./HeroPlaceholderScene";

export interface HeroWebGLCanvasProps {
  variant: HeroWebGLVariant;
}

/**
 * Client-only WebGL layer. Loaded via `next/dynamic` from `HeroScene` (ssr: false).
 * Memoized so parent React re-renders (e.g. home page state) don’t reset GL state.
 */
function HeroWebGLCanvasInner({ variant }: HeroWebGLCanvasProps) {
  const dpr = heroCanvasDpr(variant);

  return (
    <Canvas
      className="h-full w-full touch-none"
      style={{ pointerEvents: "none" }}
      gl={{
        alpha: true,
        antialias: variant === "desktop",
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      dpr={dpr}
      camera={
        variant === "desktop"
          ? { position: [0, 0.08, 2.32], fov: 44, near: 0.08, far: 40 }
          : { position: [0, 0.06, 3.2], fov: 47, near: 0.1, far: 32 }
      }
      aria-hidden
    >
      <HeroAmbientMotionProvider>
        <HeroPlaceholderScene variant={variant} />
      </HeroAmbientMotionProvider>
    </Canvas>
  );
}

export const HeroWebGLCanvas = memo(HeroWebGLCanvasInner);
