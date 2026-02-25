'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import type { TProject } from '@/types'

type ProjectModalProps = {
  project: TProject | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // ── Open animation + keyboard + scroll lock ──────────────────────────────
  useEffect(() => {
    if (!project) return

    // Lock body scroll + signal cursor to hide
    document.body.style.overflow = 'hidden'
    document.body.setAttribute('data-modal', 'open')

    // Animate in
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    tl.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' },
      '-=0.1'
    )

    // Escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal')
      window.removeEventListener('keydown', handleKeyDown)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project])

  // ── Animated close ───────────────────────────────────────────────────────
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' })
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1')
  }

  if (!project) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-muted rounded-2xl p-8 flex flex-col gap-8"
      >
        {/* ── Close button ── */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-accent transition-colors text-xl leading-none"
        >
          ×
        </button>

        {/* 1. Project image */}
        <div className="relative aspect-video rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 2. Title + role */}
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl text-text-primary leading-snug">
            {project.title}
          </h2>
          <span className="font-mono text-sm text-accent">{project.role}</span>
        </div>

        {/* 3. Tech stack chips */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 border border-muted rounded-full font-mono text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 4–6. Problem / Solution / Outcome */}
        <div className="flex flex-col gap-6">
          <ContentBlock label="The Problem" body={project.problem} />
          <ContentBlock label="The Solution" body={project.solution} />
          <ContentBlock label="The Outcome" body={project.outcome} />
        </div>

        {/* 7. Full description */}
        <p className="font-sans text-text-secondary leading-relaxed text-sm">
          {project.description}
        </p>

        {/* 8. Links */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-muted/40">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm px-5 py-2 rounded-full bg-accent text-white hover:bg-accent/80 transition-colors"
              >
                View Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm px-5 py-2 rounded-full border border-muted text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function ContentBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-mono text-xs text-accent tracking-widest uppercase">
        {label}
      </h3>
      <p className="font-sans text-text-secondary leading-relaxed text-sm">
        {body}
      </p>
    </div>
  )
}
