import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SolarScope | Portfolio",
  description: "Rooftop solar feasibility explorer",
};

export default function SolarScopeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <nav
        className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 backdrop-blur-sm"
        aria-label="SolarScope navigation"
      >
        <div className="mx-auto flex max-w-5xl items-center px-6 py-3">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 rounded"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
