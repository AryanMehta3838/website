"use client";

import type { HeroWebGLVariant } from "./heroBackdropPolicy";

export interface HeroPlaceholderSceneProps {
  variant: HeroWebGLVariant;
}

/**
 * Empty R3F scene shell. Fancy geometry / particles will mount here later.
 * `variant` is reserved for tuning (counts, DPR, effects) in a follow-up.
 */
export function HeroPlaceholderScene({ variant: _variant }: HeroPlaceholderSceneProps) {
  void _variant;
  return null;
}
