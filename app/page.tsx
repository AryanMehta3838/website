"use client";

import { useState } from "react";
import { HeroSection } from "@/src/components/hero/HeroSection";
import { ProjectCard } from "@/src/components/ProjectCard";
import { projects, PROJECT_CATEGORIES } from "@/src/data/projects";

const featuredProjects = projects.filter((p) => p.featured);

/** Replace with your resume file path (e.g. /resume.pdf) or external URL. */
const RESUME_DOWNLOAD_URL = "/resume.pdf";

/** Replace with your contact links. */
const CONTACT_LINKS = {
  email: "mailto:aryanmehtamustangs@gmail.com",
  phone: "tel:6024329904",
  github: "https://github.com/AryanMehta3838",
  linkedin: "https://www.linkedin.com/in/aryan-c-mehta",
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects =
    selectedCategory === null
      ? projects
      : projects.filter((p) => p.category === selectedCategory);
  return (
    <>
      <nav
        className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-4 py-3 sm:px-6 sm:py-4 sm:gap-8">
          <a
            href="#hero"
            className="text-sm font-medium text-[#e8e6e3] hover:text-blue-400 transition-colors duration-150"
          >
            Introduction
          </a>
          <a
            href="#featured-projects"
            className="text-sm font-medium text-[#e8e6e3] hover:text-blue-400 transition-colors duration-150"
          >
            Featured
          </a>
          <a
            href="#all-projects"
            className="text-sm font-medium text-[#e8e6e3] hover:text-blue-400 transition-colors duration-150"
          >
            Projects
          </a>
          <a
            href="#resume"
            className="text-sm font-medium text-[#e8e6e3] hover:text-blue-400 transition-colors duration-150"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-[#e8e6e3] hover:text-blue-400 transition-colors duration-150"
          >
            Contact
          </a>
        </div>
      </nav>

      <main>
        <HeroSection>
          <h1 className="text-4xl font-semibold tracking-tight text-[#e8e6e3] sm:text-5xl">
            Aryan Mehta
          </h1>
          <p className="mt-4 text-lg font-medium text-blue-400 sm:text-xl">
            Software Engineer
          </p>
          <p className="mt-5 text-[#b0aeab] leading-relaxed sm:mt-6 sm:text-lg">
            Versatile individual with hands-on software experience, bringing a
            collaborative mindset and an analytical approach.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#featured-projects"
              className="w-full rounded-lg bg-blue-500 px-6 py-3 text-center text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="https://github.com/AryanMehta3838"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg border border-white/20 px-6 py-3 text-center text-sm font-medium text-[#e8e6e3] transition-colors duration-150 hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] sm:w-auto"
            >
              GitHub
            </a>
          </div>
        </HeroSection>

        <section
          id="featured-projects"
          className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20"
          aria-label="Featured projects"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-[#e8e6e3] sm:text-3xl">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-2xl text-[#b0aeab] sm:text-lg">
              A selection of projects I&apos;ve built — from tools and backends
              to frontend components.
            </p>
            <ul className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="all-projects"
          className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20"
          aria-label="All projects"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-[#e8e6e3] sm:text-3xl">
              All Projects
            </h2>
            <p className="mt-3 max-w-2xl text-[#b0aeab] sm:text-lg">
              Full list of projects — tools, backends, and frontend work.
            </p>
            <div className="mt-6 sm:mt-8" role="group" aria-label="Filter by category">
              <span className="sr-only">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                    selectedCategory === null
                      ? "border-blue-500/50 bg-blue-500/15 text-blue-400"
                      : "border-white/20 text-[#e8e6e3] hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  All
                </button>
                {PROJECT_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                      selectedCategory === category
                        ? "border-blue-500/50 bg-blue-500/15 text-blue-400"
                        : "border-white/20 text-[#e8e6e3] hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="resume"
          className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20"
          aria-label="Resume"
        >
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold text-[#e8e6e3] sm:text-3xl">
              Resume
            </h2>
            <p className="mt-3 text-[#b0aeab] leading-relaxed sm:text-lg">
              Computer science student and software developer with hands-on
              experience building real-world projects in web development,
              automation, and application design. Strong analytical thinker with
              a collaborative mindset and a passion for creating reliable,
              well-structured software systems.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={RESUME_DOWNLOAD_URL}
                download
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                Download resume
              </a>
              <a
                href="https://github.com/AryanMehta3838"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-[#e8e6e3] transition-colors duration-150 hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20"
          aria-label="Contact"
        >
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold text-[#e8e6e3] sm:text-3xl">
              Contact
            </h2>
            <p className="mt-3 text-[#b0aeab] sm:text-lg">
              Get in touch — email, phone, or connect on GitHub or LinkedIn.
            </p>
            <ul className="mt-8 flex flex-wrap gap-4 sm:gap-6" aria-label="Contact links">
              <li>
                <a
                  href={CONTACT_LINKS.email}
                  className="text-sm font-medium text-blue-400 transition-colors duration-150 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_LINKS.phone}
                  className="text-sm font-medium text-blue-400 transition-colors duration-150 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  Phone
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-400 transition-colors duration-150 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-400 transition-colors duration-150 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
