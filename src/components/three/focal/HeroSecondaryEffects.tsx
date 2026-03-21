"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { useHeroAmbientMotionEnabled } from "../heroMotionContext";
import { HeroAmbientParticles } from "./HeroAmbientParticles";
import { HeroOrbitingShards } from "./HeroOrbitingShards";

const POINTER_LERP = 0.045;
const PARALLAX_Y = 0.095;
const PARALLAX_X = 0.068;

/**
 * Desktop-only supporting layer: sparse particles + orbiting shards, wrapped in one
 * gently mouse-reactive group. The focal polygon stack stays outside this wrapper.
 */
export function HeroSecondaryEffects() {
  const groupRef = useRef<Group>(null);
  const motionEnabled = useHeroAmbientMotionEnabled();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!motionEnabled) return;
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [motionEnabled]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;

    if (!motionEnabled) {
      g.rotation.x = 0;
      g.rotation.y = 0;
      return;
    }

    current.current.x += (target.current.x - current.current.x) * POINTER_LERP;
    current.current.y += (target.current.y - current.current.y) * POINTER_LERP;
    g.rotation.y = current.current.x * PARALLAX_Y;
    g.rotation.x = current.current.y * PARALLAX_X;
  });

  return (
    <group ref={groupRef}>
      <HeroAmbientParticles />
      <HeroOrbitingShards />
    </group>
  );
}
