"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";

export interface BreathingGroupProps {
  children: ReactNode;
  /** Primary sine amplitude (scale delta). */
  primaryAmp?: number;
  /** Secondary harmonic amplitude — keep small for subtlety. */
  secondaryAmp?: number;
  freqPrimary?: number;
  freqSecondary?: number;
  phasePrimary?: number;
  phaseSecondary?: number;
}

/** Desktop-tuned defaults — mobile passes gentler overrides. */
const DESKTOP_DEFAULT = {
  primaryAmp: 0.064,
  secondaryAmp: 0.017,
  freqPrimary: 0.82,
  freqSecondary: 1.51,
  phasePrimary: 0.42,
  phaseSecondary: 2.05,
};

/**
 * Smooth breathing scale on a parent group (shared by desktop + mobile focal stacks).
 */
export function BreathingGroup({
  children,
  primaryAmp = DESKTOP_DEFAULT.primaryAmp,
  secondaryAmp = DESKTOP_DEFAULT.secondaryAmp,
  freqPrimary = DESKTOP_DEFAULT.freqPrimary,
  freqSecondary = DESKTOP_DEFAULT.freqSecondary,
  phasePrimary = DESKTOP_DEFAULT.phasePrimary,
  phaseSecondary = DESKTOP_DEFAULT.phaseSecondary,
}: BreathingGroupProps) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const breath =
      1 +
      Math.sin(t * freqPrimary + phasePrimary) * primaryAmp +
      Math.sin(t * freqSecondary + phaseSecondary) * secondaryAmp;
    ref.current?.scale.setScalar(breath);
  });

  return <group ref={ref}>{children}</group>;
}
