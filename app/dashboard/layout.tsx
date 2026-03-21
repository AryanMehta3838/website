import type { Metadata } from "next";
import "@/src/styles/dashboard/tokens.css";

export const metadata: Metadata = {
  title: "Dashboard | Portfolio",
  description: "Reusable React components for charts, tables, and filters",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
