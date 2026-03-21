import type { Metadata } from "next";
import Link from "next/link";
import "@/src/styles/dashboard/tokens.css";

export const metadata: Metadata = {
  title: "Dashboard Widget Library | Portfolio",
  description: "Reusable React components for charts, tables, and filters",
};

export default function DashboardWidgetsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <nav
        className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm"
        aria-label="Dashboard Widget Library navigation"
      >
        <div className="mx-auto flex max-w-5xl items-center px-6 py-3">
          <Link
            href="/"
            className="text-sm font-medium text-[#e8e6e3] transition-colors hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
