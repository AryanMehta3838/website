"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Focal point aligned with `DesktopFocalObject` root offset. */
const LOOK_AT = new THREE.Vector3(0, 0.06, 0);

export interface HeroCameraDollyProps {
  /** Mean camera distance (world +Z); lower = more zoomed in. */
  zBase?: number;
  /** Half-range of slow forward/back dolly (passes through depth stack). */
  zAmplitude?: number;
  /** Radians/sec for dolly cycle — keep slow (~0.12–0.2). */
  zFrequency?: number;
  /** Phase offset so dolly doesn’t sync awkwardly with breathing. */
  zPhase?: number;
  /** Subtle horizontal sway (world units). */
  swayX?: number;
  /** Subtle vertical sway (world units). */
  swayY?: number;
}

/**
 * Smooth dolly + micro sway so the view moves between layered shells (no OrbitControls).
 */
export function HeroCameraDolly({
  zBase = 2.06,
  zAmplitude = 0.42,
  zFrequency = 0.155,
  zPhase = 0.55,
  swayX = 0.038,
  swayY = 0.045,
}: HeroCameraDollyProps) {
  const { camera } = useThree();
  const baseY = 0.08;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const z = zBase + Math.sin(t * zFrequency + zPhase) * zAmplitude;
    const x = Math.sin(t * 0.088 + zPhase * 0.5) * swayX;
    const y = baseY + Math.cos(t * 0.102) * swayY;
    camera.position.set(x, y, z);
    camera.lookAt(LOOK_AT);
  });

  return null;
}
