"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";
import type { LayerWobble, SpeedModulation } from "./RotatingPolygonLayer";

export interface RotatingFlatRingProps {
  innerRadius: number;
  outerRadius: number;
  thetaSegments: number;
  rotationSpeed: number;
  axis?: "x" | "y" | "z";
  rotationPhase?: number;
  tilt?: [number, number, number];
  position?: [number, number, number];
  layerScale?: number;
  speedModulation?: SpeedModulation;
  wobble?: LayerWobble;
  color: string;
  opacity?: number;
  wireframe?: boolean;
}

/**
 * Flat ring with same motion vocabulary as polygon layers (spin, wobble, depth, phase).
 */
export function RotatingFlatRing({
  innerRadius,
  outerRadius,
  thetaSegments,
  rotationSpeed,
  axis = "y",
  rotationPhase = 0,
  tilt = [0, 0, 0],
  position = [0, 0, 0],
  layerScale = 1,
  speedModulation,
  wobble,
  color,
  opacity = 0.35,
  wireframe = false,
}: RotatingFlatRingProps) {
  const tiltWobbleRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);
  const spinAccumRef = useRef(rotationPhase);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const tw = tiltWobbleRef.current;
    const sp = spinRef.current;
    if (!tw || !sp) return;

    const mod =
      speedModulation != null
        ? 1 +
          speedModulation.amp *
            Math.sin(t * speedModulation.freq + speedModulation.phase)
        : 1;

    spinAccumRef.current += rotationSpeed * mod * delta;

    sp.rotation.set(0, 0, 0);
    if (axis === "y") sp.rotation.y = spinAccumRef.current;
    else if (axis === "x") sp.rotation.x = spinAccumRef.current;
    else sp.rotation.z = spinAccumRef.current;

    const [tx, ty, tz] = tilt;
    const wAmp = wobble?.amp ?? 0;
    const wFreq = wobble?.freq ?? 0.28;
    const wPh = wobble?.phase ?? 0;

    if (axis === "y") {
      tw.rotation.x = tx + wAmp * Math.sin(t * wFreq + wPh);
      tw.rotation.y = ty;
      tw.rotation.z = tz + wAmp * 0.65 * Math.cos(t * wFreq * 0.91 + wPh + 0.9);
    } else if (axis === "x") {
      tw.rotation.x = tx;
      tw.rotation.y = ty + wAmp * Math.sin(t * wFreq + wPh);
      tw.rotation.z = tz + wAmp * 0.65 * Math.cos(t * wFreq * 0.91 + wPh + 0.9);
    } else {
      tw.rotation.x = tx + wAmp * Math.sin(t * wFreq + wPh);
      tw.rotation.y = ty + wAmp * 0.65 * Math.cos(t * wFreq * 0.91 + wPh + 0.9);
      tw.rotation.z = tz;
    }
  });

  return (
    <group position={position}>
      <group ref={tiltWobbleRef}>
        <group ref={spinRef}>
          <mesh scale={layerScale} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[innerRadius, outerRadius, thetaSegments]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              wireframe={wireframe}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
