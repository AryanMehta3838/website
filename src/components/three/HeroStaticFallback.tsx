/**
 * CSS-only backdrop when WebGL is unavailable, reduced motion is on, or before hydration.
 * Decorative only; keep in sync with site dark + blue accent tone.
 */
export function HeroStaticFallback() {
  return (
    <div
      className="absolute inset-0 bg-[#0a0a0a] bg-gradient-to-b from-[#0a0a0a] via-[#0c1220] to-[#0a0a0a]"
      aria-hidden
    >
      {/* Subtle radial accent — no animation (safe for reduced motion). */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 20%, rgb(59 130 246), transparent 70%)",
        }}
      />
    </div>
  );
}
