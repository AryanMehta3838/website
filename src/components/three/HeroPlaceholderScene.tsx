"use client";

import type { HeroWebGLVariant } from "./heroBackdropPolicy";
import { DesktopFocalObject } from "./focal/DesktopFocalObject";
import { HeroCameraDolly } from "./focal/HeroCameraDolly";
import { HeroMobileParticles } from "./focal/HeroMobileParticles";
import { MobileFocalObject } from "./focal/MobileFocalObject";
import { HeroSecondaryEffects } from "./focal/HeroSecondaryEffects";

export interface HeroPlaceholderSceneProps {
  variant: HeroWebGLVariant;
}

/**
 * R3F scene: desktop = full focal + dolly + secondary; mobile = simplified focal + sparse particles.
 */
export function HeroPlaceholderScene({ variant }: HeroPlaceholderSceneProps) {
  if (variant === "mobile") {
    return (
      <>
        <ambientLight intensity={0.22} />
        <pointLight
          position={[0.9, 0.65, 3.4]}
          intensity={0.42}
          color="#60a5fa"
          distance={14}
          decay={2}
        />
        <pointLight
          position={[-1.6, -0.8, 2.8]}
          intensity={0.12}
          color="#1e40af"
          distance={12}
          decay={2}
        />
        <HeroMobileParticles />
        <MobileFocalObject />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight
        position={[1.4, 1.1, 2.8]}
        intensity={0.52}
        color="#60a5fa"
        distance={9}
        decay={2}
      />
      <pointLight
        position={[-2, -1, 3]}
        intensity={0.15}
        color="#1e40af"
        distance={10}
        decay={2}
      />
      <HeroCameraDolly />
      <HeroSecondaryEffects />
      <DesktopFocalObject />
    </>
  );
}
