import type { ReactNode } from "react";
import { HeroScene } from "@/src/components/three/HeroScene";

export interface HeroSectionProps {
  children: ReactNode;
}

/**
 * Introduction / hero region: decorative backdrop + foreground content.
 * Backdrop is non-interactive; links and buttons stay in the elevated column.
 */
export function HeroSection({ children }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-32"
      aria-label="Introduction"
    >
      {/* Layer 0: Three.js or CSS fallback — never captures pointer events */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <HeroScene />
      </div>

      {/* Layer 1: readable, interactive hero copy */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {children}
      </div>
    </section>
  );
}
