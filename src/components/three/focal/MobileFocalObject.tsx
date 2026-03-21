"use client";

import { BreathingGroup } from "./BreathingGroup";
import { RotatingPolygonLayer } from "./RotatingPolygonLayer";

/** Match desktop palette — same identity, calmer execution. */
const BLUE = "#3b82f6";
const BLUE_SOFT = "#60a5fa";
const BLUE_MUTED = "#1e3a8a";

/**
 * Mobile hero centerpiece: three layered shells, shallow z, slow spin, no speed/wobble modulation.
 * Sibling to desktop stack — reuses RotatingPolygonLayer + shared breathing.
 */
export function MobileFocalObject() {
  return (
    <group position={[0, 0.05, 0]} rotation={[0.16, -0.3, 0.035]}>
      <BreathingGroup
        primaryAmp={0.044}
        secondaryAmp={0.007}
        freqPrimary={0.55}
        freqSecondary={1.02}
        phasePrimary={0.55}
        phaseSecondary={1.65}
      >
        {/* Outer — octagon wireframe, gentle CW */}
        <RotatingPolygonLayer
          radius={1.06}
          tube={0.014}
          radialSegments={8}
          tubularSegments={24}
          rotationSpeed={0.038}
          axis="y"
          rotationPhase={0.5}
          position={[0, 0, 0.055]}
          layerScale={1.02}
          color={BLUE_SOFT}
          wireframe
          opacity={0.32}
        />

        {/* Mid — hex band, opposite direction, shallow z */}
        <RotatingPolygonLayer
          radius={0.88}
          tube={0.04}
          radialSegments={6}
          tubularSegments={20}
          rotationSpeed={-0.052}
          axis="y"
          rotationPhase={2.4}
          tilt={[0.04, 0.1, 0]}
          position={[0.015, -0.015, -0.055]}
          layerScale={0.92}
          color={BLUE_MUTED}
          wireframe={false}
          opacity={0.11}
        />

        {/* Inner — tilted oct wireframe, Z-roll for depth cue without heavy z stack */}
        <RotatingPolygonLayer
          radius={0.58}
          tube={0.022}
          radialSegments={8}
          tubularSegments={18}
          rotationSpeed={0.045}
          axis="z"
          rotationPhase={1.1}
          tilt={[Math.PI / 5.2, Math.PI / 9, 0.08]}
          position={[-0.02, 0.02, 0.02]}
          layerScale={0.98}
          color={BLUE}
          wireframe
          opacity={0.34}
        />
      </BreathingGroup>
    </group>
  );
}
