"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { useHeroAmbientMotionEnabled } from "../heroMotionContext";

const SHARD_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
const ORBIT_RADIUS = 2.02;
const SPIN_SIGNS = [1, -1, 1, -1] as const;

/**
 * Four small wireframe shards on one slow carousel — accent only, not a second hero.
 * Single useFrame keeps subscription overhead low vs one hook per shard.
 */
export function HeroOrbitingShards() {
  const orbitRef = useRef<Group>(null);
  const shardRefs = useRef<(Mesh | null)[]>([null, null, null, null]);
  const motionEnabled = useHeroAmbientMotionEnabled();

  useFrame((_, delta) => {
    if (!motionEnabled) return;

    const g = orbitRef.current;
    if (g) g.rotation.y += delta * 0.038;

    shardRefs.current.forEach((m, i) => {
      if (!m) return;
      const s = SPIN_SIGNS[i] ?? 1;
      m.rotation.y += s * delta * 0.42;
      m.rotation.x += s * 0.22 * delta;
    });
  });

  return (
    <group ref={orbitRef} rotation={[0.12, 0.4, 0]}>
      {SHARD_ANGLES.map((angle, i) => (
        <group key={angle} rotation={[0, angle, 0]}>
          <mesh
            ref={(el) => {
              shardRefs.current[i] = el;
            }}
            position={[ORBIT_RADIUS, 0, 0]}
          >
            <tetrahedronGeometry args={[0.044, 0]} />
            <meshBasicMaterial
              color="#5b8ed9"
              wireframe
              transparent
              opacity={0.26}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
