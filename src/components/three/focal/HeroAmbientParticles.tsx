"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Points } from "three";
import { useHeroAmbientMotionEnabled } from "../heroMotionContext";
import { createShellPositions } from "./particlePositions";

const COUNT = 52;

const POSITIONS = createShellPositions(COUNT, 2.0, 1.45, 0.92, 1);

/** Sparse point field in a loose shell around the focal volume (no full-screen fill). */
export function HeroAmbientParticles() {
  const pointsRef = useRef<Points>(null);
  const motionEnabled = useHeroAmbientMotionEnabled();

  useFrame((_, delta) => {
    const p = pointsRef.current;
    if (!p || !motionEnabled) return;
    p.rotation.y += delta * 0.018;
    p.rotation.x += delta * 0.006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <float32BufferAttribute
          attach="attributes-position"
          args={[POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6b9bd6"
        size={0.022}
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
