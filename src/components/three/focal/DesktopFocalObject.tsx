"use client";

import { BreathingGroup } from "./BreathingGroup";
import { RotatingFlatRing } from "./RotatingFlatRing";
import { RotatingPolygonLayer } from "./RotatingPolygonLayer";

/** Site accent blue (Tailwind blue-500 / blue-400 family). */
const BLUE = "#3b82f6";
const BLUE_SOFT = "#60a5fa";
const BLUE_MUTED = "#1e3a8a";
const BLUE_GLOW = "#2563eb";

/**
 * Desktop centerpiece: layered shells with z-depth, scale contrast, phased breathing,
 * per-layer speed modulation, and subtle orthogonal wobble (deterministic, slow).
 */
export function DesktopFocalObject() {
  return (
    <group position={[0, 0.06, 0]} rotation={[0.24, -0.38, 0.06]}>
      <BreathingGroup>
        {/* Layer 1 — outer shell: forward z, slightly enlarged, slow CW + wobble */}
        <RotatingPolygonLayer
          radius={1.22}
          tube={0.016}
          radialSegments={8}
          tubularSegments={34}
          rotationSpeed={0.088}
          axis="y"
          rotationPhase={0.35}
          position={[0, 0, 0.17]}
          layerScale={1.07}
          speedModulation={{ amp: 0.095, freq: 0.31, phase: 0.2 }}
          wobble={{ amp: 0.052, freq: 0.26, phase: 0.4 }}
          color={BLUE_SOFT}
          wireframe
          opacity={0.36}
        />

        {/* Layer 2 — mid shell: back in z, smaller scale, faster opposite spin */}
        <RotatingPolygonLayer
          radius={1.02}
          tube={0.048}
          radialSegments={6}
          tubularSegments={28}
          rotationSpeed={-0.234}
          axis="y"
          rotationPhase={2.15}
          tilt={[0.05, 0.12, 0]}
          position={[0.02, -0.02, -0.2]}
          layerScale={0.86}
          speedModulation={{ amp: 0.11, freq: 0.38, phase: 1.7 }}
          wobble={{ amp: 0.048, freq: 0.33, phase: 2.8 }}
          color={BLUE_MUTED}
          wireframe={false}
          opacity={0.13}
        />

        {/* Layer 3 — tilted band: strongest z push, largest scale, Z-roll + speed breathe */}
        <RotatingPolygonLayer
          radius={0.84}
          tube={0.02}
          radialSegments={12}
          tubularSegments={24}
          rotationSpeed={0.295}
          axis="z"
          rotationPhase={0.9}
          tilt={[Math.PI / 4.6, Math.PI / 7, 0.15]}
          position={[-0.03, 0.03, 0.26]}
          layerScale={1.11}
          speedModulation={{ amp: 0.1, freq: 0.44, phase: 0.65 }}
          wobble={{ amp: 0.062, freq: 0.29, phase: 1.1 }}
          color={BLUE}
          wireframe
          opacity={0.42}
        />

        {/* Layer 4 — counter-rotating mid shell, shallow z, tighter geometry */}
        <RotatingPolygonLayer
          radius={0.64}
          tube={0.028}
          radialSegments={8}
          tubularSegments={22}
          rotationSpeed={-0.205}
          axis="y"
          rotationPhase={4.2}
          tilt={[0.08, 0.52, 0.06]}
          position={[0.03, 0.02, -0.11]}
          layerScale={0.93}
          speedModulation={{ amp: 0.088, freq: 0.36, phase: 3.4 }}
          wobble={{ amp: 0.058, freq: 0.35, phase: 4.5 }}
          color={BLUE_GLOW}
          wireframe
          opacity={0.3}
        />

        {/* Layer 5 — inner luminous shell: X spin, deep wobble, contrasting scale */}
        <RotatingPolygonLayer
          radius={0.44}
          tube={0.036}
          radialSegments={6}
          tubularSegments={18}
          rotationSpeed={0.362}
          axis="x"
          rotationPhase={1.25}
          tilt={[Math.PI / 3.1, 0.55, 0.22]}
          position={[-0.02, -0.03, 0.14]}
          layerScale={1.04}
          speedModulation={{ amp: 0.102, freq: 0.41, phase: 2.25 }}
          wobble={{ amp: 0.067, freq: 0.32, phase: 0.85 }}
          color={BLUE}
          wireframe={false}
          opacity={0.2}
          useLitMaterial
          emissive={BLUE_SOFT}
          emissiveIntensity={0.32}
        />

        {/* Layer 6 — inner halo: far z, gentle speed undulation, minimal wobble */}
        <RotatingFlatRing
          innerRadius={0.15}
          outerRadius={0.225}
          thetaSegments={28}
          rotationSpeed={0.072}
          axis="y"
          rotationPhase={5.1}
          tilt={[Math.PI / 2.25, 0.68, 0.08]}
          position={[0.02, 0, -0.24]}
          layerScale={1.18}
          speedModulation={{ amp: 0.075, freq: 0.28, phase: 4.8 }}
          wobble={{ amp: 0.038, freq: 0.24, phase: 3.2 }}
          color={BLUE_SOFT}
          opacity={0.18}
          wireframe={false}
        />
      </BreathingGroup>
    </group>
  );
}
