"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Single reduced-motion subscription for the hero Canvas subtree (avoids N duplicate
 * matchMedia listeners on particles, shards, dolly-adjacent effects).
 */
const HeroAmbientMotionContext = createContext(true);

function readAmbientMotionEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroAmbientMotionProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(readAmbientMotionEnabled);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <HeroAmbientMotionContext.Provider value={enabled}>
      {children}
    </HeroAmbientMotionContext.Provider>
  );
}

/** When false, skip ambient rotations / pointer parallax (defense in depth vs static fallback). */
export function useHeroAmbientMotionEnabled(): boolean {
  return useContext(HeroAmbientMotionContext);
}
