/**
 * Project type and sample data for the portfolio.
 * Edit this file to add or update projects.
 */

export type ProjectStatus = "completed" | "in-progress" | "archived";

/** Canonical categories for filter and card actions. Display order for filter buttons. */
export const PROJECT_CATEGORIES = [
  "AI/ML",
  "Web Apps",
  "Mobile Apps",
  "Automation & Tools",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl: string;
  downloadUrl: string;
  liveDemoUrl?: string;
  thumbnail?: string;
  status: ProjectStatus;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "solarscope",
    title: "SolarScope",
    description:
      "Rooftop solar feasibility explorer: search an address to see solar potential, max panel count, and estimated yearly generation using Google Solar API.",
    category: "Web Apps",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Google Maps API", "Google Solar API"],
    githubUrl: "https://github.com/AryanMehta3838/SolarScope",
    downloadUrl: "https://github.com/AryanMehta3838/SolarScope",
    liveDemoUrl: "/projects/solarscope",
    thumbnail: "/solarscope-thumbnail.png",
    status: "completed",
    featured: true,
  },
  {
    id: "cli-task-runner",
    title: "CLI Task Runner",
    description:
      "A command-line task management tool built to organize, track, and execute tasks efficiently from the terminal. Designed for speed and simplicity, it provides a lightweight workflow for managing productivity without leaving the command line.",
    category: "Automation & Tools",
    techStack: ["Python", "CLI", "Automation", "Terminal UX"],
    githubUrl:
      "https://github.com/AryanMehta3838/CLITasker/tree/main",
    downloadUrl:
      "https://github.com/AryanMehta3838/CLITasker/archive/refs/heads/main.zip",
    thumbnail: "/cli-task-runner-thumbnail.png",
    status: "completed",
    featured: true,
  },
  {
    id: "api-gateway-proxy",
    title: "API Gateway Proxy",
    description:
      "Lightweight reverse proxy with rate limiting and request logging. Used as an internal gateway for microservices.",
    category: "Automation & Tools",
    techStack: ["Go", "Chi", "Redis"],
    githubUrl: "https://github.com/example/api-gateway-proxy",
    downloadUrl: "https://github.com/example/api-gateway-proxy/releases",
    liveDemoUrl: "https://demo.example.com",
    status: "completed",
    featured: true,
  },
  {
    id: "dashboard-widgets",
    title: "Dashboard Widget Library",
    description:
      "Reusable React components for charts, tables, and filters. Designed for internal admin dashboards with dark mode support.",
    category: "Web Apps",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    githubUrl: "https://github.com/AryanMehta3838/DashWidgets",
    downloadUrl: "https://github.com/AryanMehta3838/DashWidgets",
    liveDemoUrl: "/dashboard",
    thumbnail: "/dashboard-widgets-thumbnail.png",
    status: "completed",
    featured: true,
  },
  {
    id: "batch-job-queue",
    title: "Batch Job Queue",
    description:
      "Simple job queue with retries and dead-letter handling. Runs background tasks without external queue services.",
    category: "Automation & Tools",
    techStack: ["Python", "SQLite", "asyncio"],
    githubUrl: "https://github.com/example/batch-job-queue",
    downloadUrl: "https://github.com/example/batch-job-queue/releases",
    status: "completed",
    featured: false,
  },
  {
    id: "env-config-validator",
    title: "Env Config Validator",
    description:
      "Validates environment variables at startup using a schema. Fails fast with clear errors when required vars are missing.",
    category: "Automation & Tools",
    techStack: ["TypeScript", "Zod"],
    githubUrl: "https://github.com/example/env-config-validator",
    downloadUrl: "https://github.com/example/env-config-validator/releases",
    status: "in-progress",
    featured: false,
  },
  {
    id: "docs-static-site",
    title: "Docs Static Site",
    description:
      "Minimal static site generator for technical docs. Markdown in, searchable HTML out with a simple theme.",
    category: "Automation & Tools",
    techStack: ["Node.js", "Marked", "Highlight.js"],
    githubUrl: "https://github.com/example/docs-static-site",
    downloadUrl: "https://github.com/example/docs-static-site/releases",
    liveDemoUrl: "https://docs.example.com",
    status: "archived",
    featured: false,
  },
];
