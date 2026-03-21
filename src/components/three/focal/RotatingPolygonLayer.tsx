"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";

export type RotationAxis = "x" | "y" | "z";

/** Subtle speed breathing: effective speed *= 1 + amp * sin(t * freq + phase). Keep amp small (≤~0.12). */
export interface SpeedModulation {
  amp: number;
  freq: number;
  phase: number;
}

/** Orthogonal wobble (tilt drift) on the two axes not used for primary spin. */
export interface LayerWobble {
  amp: number;
  freq: number;
  phase: number;
}

export interface RotatingPolygonLayerProps {
  /** Major radius of the torus. */
  radius: number;
  /** Tube radius. */
  tube: number;
  /** Low values = faceted / polygonal ring. */
  radialSegments: number;
  tubularSegments: number;
  /** Base radians per second; sign sets direction. */
  rotationSpeed: number;
  axis?: RotationAxis;
  /** Initial spin offset on the primary axis (radians). */
  rotationPhase?: number;
  /** Fixed tilt of the whole spinning shell (radians); wobble adds on orthogonal axes. */
  tilt?: [number, number, number];
  /** Layer offset in space; use z for depth stacking. */
  position?: [number, number, number];
  /** Uniform scale of the torus mesh. */
  layerScale?: number;
  speedModulation?: SpeedModulation;
  wobble?: LayerWobble;
  color: string;
  wireframe?: boolean;
  opacity?: number;
  emissive?: string;
  emissiveIntensity?: number;
  useLitMaterial?: boolean;
}

/**
 * Faceted torus: outer tilt + wobble, inner primary spin + optional speed modulation.
 */
export function RotatingPolygonLayer({
  radius,
  tube,
  radialSegments,
  tubularSegments,
  rotationSpeed,
  axis = "y",
  rotationPhase = 0,
  tilt = [0, 0, 0],
  position = [0, 0, 0],
  layerScale = 1,
  speedModulation,
  wobble,
  color,
  wireframe = false,
  opacity = 1,
  emissive,
  emissiveIntensity = 0,
  useLitMaterial = false,
}: RotatingPolygonLayerProps) {
  const tiltWobbleRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);
  const spinAccumRef = useRef(rotationPhase);

  const geometryArgs: [number, number, number, number] = [
    radius,
    tube,
    radialSegments,
    tubularSegments,
  ];

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

    const [tx, ty, tz] = tilt;
    const wAmp = wobble?.amp ?? 0;
    const wFreq = wobble?.freq ?? 0.31;
    const wPh = wobble?.phase ?? 0;

    sp.rotation.set(0, 0, 0);
    if (axis === "y") sp.rotation.y = spinAccumRef.current;
    else if (axis === "x") sp.rotation.x = spinAccumRef.current;
    else sp.rotation.z = spinAccumRef.current;

    if (axis === "y") {
      tw.rotation.x = tx + wAmp * Math.sin(t * wFreq + wPh);
      tw.rotation.y = ty;
      tw.rotation.z = tz + wAmp * 0.68 * Math.cos(t * wFreq * 0.89 + wPh + 1.15);
    } else if (axis === "x") {
      tw.rotation.x = tx;
      tw.rotation.y = ty + wAmp * Math.sin(t * wFreq + wPh);
      tw.rotation.z = tz + wAmp * 0.68 * Math.cos(t * wFreq * 0.89 + wPh + 1.15);
    } else {
      tw.rotation.x = tx + wAmp * Math.sin(t * wFreq + wPh);
      tw.rotation.y = ty + wAmp * 0.68 * Math.cos(t * wFreq * 0.89 + wPh + 1.15);
      tw.rotation.z = tz;
    }
  });

  return (
    <group position={position}>
      <group ref={tiltWobbleRef}>
        <group ref={spinRef}>
          <mesh scale={layerScale}>
            <torusGeometry args={geometryArgs} />
            {useLitMaterial ? (
              <meshStandardMaterial
                color={color}
                wireframe={wireframe}
                transparent={opacity < 1}
                opacity={opacity}
                metalness={0.2}
                roughness={0.45}
                emissive={emissive ?? "#000000"}
                emissiveIntensity={emissiveIntensity}
                side={THREE.DoubleSide}
              />
            ) : (
              <meshBasicMaterial
                color={color}
                wireframe={wireframe}
                transparent={opacity < 1}
                opacity={opacity}
                side={THREE.DoubleSide}
              />
            )}
          </mesh>
        </group>
      </group>
    </group>
  );
}
