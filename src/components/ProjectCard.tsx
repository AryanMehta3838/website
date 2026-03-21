"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Project, ProjectStatus } from "@/src/data/projects";
import {
  CARD_INTERACTION_DURATION,
  SITE_EASE,
} from "@/src/lib/animation/motion-config";

export interface ProjectCardProps {
  project: Project;
}

const statusLabels: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  archived: "Archived",
};

const statusStyles: Record<ProjectStatus, string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "in-progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  archived: "bg-white/10 text-[#b0aeab] border-white/20",
};

const cardTransition = {
  duration: CARD_INTERACTION_DURATION,
  ease: SITE_EASE,
};

const cardVariants: Variants = {
  rest: {
    y: 0,
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.10), 0 4px 20px -8px rgba(0,0,0,0.35)",
  },
  hover: {
    y: -3,
    boxShadow:
      "0 0 0 1px rgba(96,165,250,0.22), 0 16px 40px -12px rgba(0,0,0,0.5)",
    transition: cardTransition,
  },
  tap: {
    scale: 0.997,
    transition: { duration: 0.12, ease: SITE_EASE },
  },
};

const thumbVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: CARD_INTERACTION_DURATION + 0.06,
      ease: SITE_EASE,
    },
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const reduced = useReducedMotion();
  const {
    title,
    description,
    category,
    techStack,
    status,
    githubUrl,
    downloadUrl,
    liveDemoUrl,
    thumbnail,
  } = project;

  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0f0f0f]"
      aria-labelledby={`project-title-${project.id}`}
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover={reduced ? undefined : "hover"}
      whileTap={reduced ? undefined : "tap"}
    >
      {/* Thumbnail or placeholder — subtle zoom on card hover (variant inheritance). */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#141414]">
        <motion.div className="h-full w-full" variants={thumbVariants}>
          {thumbnail ? (
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${thumbnail})` }}
              aria-hidden
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-[#3d3d3d] text-sm"
              aria-hidden
            >
              No image
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* Category + status */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-[#b0aeab]">
            {category}
          </span>
          <span
            className={`rounded border px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>

        <h3
          id={`project-title-${project.id}`}
          className="text-lg font-semibold text-[#e8e6e3] sm:text-xl"
        >
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#b0aeab]">
          {description}
        </p>

        {/* Tech stack tags */}
        {techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
            {techStack.map((tech) => (
              <li key={tech}>
                <span className="rounded bg-white/5 px-2.5 py-1 text-xs text-[#b0aeab]">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons: Web Apps show Live Demo and optional GitHub; other categories show GitHub, Download, and optional Live Demo */}
        <div className="mt-6 flex flex-wrap gap-3">
          {category === "Web Apps" ? (
            <>
              {liveDemoUrl && (
                <a
                  href={liveDemoUrl}
                  target={liveDemoUrl.startsWith("http") ? "_blank" : undefined}
                  rel={liveDemoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]"
                >
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-[#e8e6e3] transition-colors duration-150 hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]"
                >
                  GitHub
                </a>
              )}
            </>
          ) : (
            <>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]"
              >
                GitHub
              </a>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-[#e8e6e3] transition-colors duration-150 hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]"
              >
                Download
              </a>
              {liveDemoUrl && (
                <a
                  href={liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-[#e8e6e3] transition-colors duration-150 hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]"
                >
                  Live Demo
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
