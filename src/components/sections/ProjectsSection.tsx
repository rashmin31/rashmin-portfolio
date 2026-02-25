'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { PROJECTS } from '@/data/projects'
import { ProjectModal } from '@/components/ui/ProjectModal'
import type { TProject } from '@/types'

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeProject, setActiveProject] = useState<TProject | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="min-h-screen py-24"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">

          {/* ── Header ── */}
          <div className="mb-16">
            <p className="font-mono text-sm text-accent tracking-widest uppercase mb-4">
              Projects
            </p>
            <h2 className="font-display text-4xl text-text-primary">
              Things I&apos;ve built.
            </h2>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Modal — rendered outside section to avoid stacking context issues */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onOpen,
}: {
  project: TProject
  onOpen: () => void
}) {
  return (
    <article
      className={`project-card group relative bg-surface border border-muted rounded-xl overflow-hidden flex flex-col cursor-pointer transition-colors duration-300 hover:border-accent/50 ${
        project.featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      onClick={onOpen}
    >
      {/* Project image */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {/* Fallback gradient shown when no image exists */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-muted/60" />

        {/* "View Project" overlay — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="font-mono text-sm text-accent border border-accent rounded-full px-5 py-2">
            View Project
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-6 flex-1">

        {/* Role badge */}
        <p className="font-mono text-xs text-accent">{project.role}</p>

        {/* Title */}
        <h3 className="font-display text-xl text-text-primary leading-snug">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="font-sans text-sm text-text-secondary leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-muted/40">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 border border-muted rounded-full font-mono text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-3 py-1 font-mono text-xs text-muted">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

      </div>
    </article>
  )
}
