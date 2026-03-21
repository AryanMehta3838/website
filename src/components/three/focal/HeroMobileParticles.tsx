"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Points } from "three";
import { useHeroAmbientMotionEnabled } from "../heroMotionContext";
import { createShellPositions } from "./particlePositions";

const COUNT = 14;

const POSITIONS = createShellPositions(COUNT, 2.15, 1.15, 0.88, 2);

/** Ultra-sparse particles for mobile; no pointer logic, slower drift than desktop. */
export function HeroMobileParticles() {
  const pointsRef = useRef<Points>(null);
  const motionEnabled = useHeroAmbientMotionEnabled();

  useFrame((_, delta) => {
    const p = pointsRef.current;
    if (!p || !motionEnabled) return;
    p.rotation.y += delta * 0.007;
    p.rotation.x += delta * 0.0025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#6b9bd6"
        size={0.017}
        transparent
        opacity={0.26}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
