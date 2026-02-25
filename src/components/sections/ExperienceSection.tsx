'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { EXPERIENCE } from '@/data/experience'
import type { TExperience } from '@/types'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entries = gsap.utils.toArray<HTMLElement>('.exp-entry')

      entries.forEach((entry, i) => {
        // Odd entries are on the right (slide from right), even from left
        const fromLeft = i % 2 === 0
        gsap.from(entry, {
          x: fromLeft ? -60 : 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen py-24"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">

        {/* ── Header ── */}
        <div className="mb-20 text-center">
          <p className="font-mono text-sm text-accent tracking-widest uppercase mb-4">
            Experience
          </p>
          <h2 className="font-display text-4xl text-text-primary">
            The journey so far.
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical centre line — hidden on mobile, visible md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-muted/40 -translate-x-1/2" />

          <div className="flex flex-col gap-16">
            {EXPERIENCE.map((entry, i) => (
              <TimelineEntry key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function TimelineEntry({
  entry,
  index,
}: {
  entry: TExperience
  index: number
}) {
  const isLeft = index % 2 === 0

  return (
    <div
      className={`exp-entry relative flex flex-col md:flex-row items-start gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Card — takes up ~45% width on desktop, full on mobile */}
      <div className="w-full md:w-[45%] bg-surface border border-muted rounded-xl p-6 flex flex-col gap-4">

        {/* Role + company */}
        <div>
          <h3 className="font-display text-xl text-text-primary">
            {entry.role}
          </h3>
          <p className="font-mono text-accent mt-1">{entry.company}</p>
        </div>

        {/* Meta: dates + location */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-text-secondary">
            {entry.startDate} — {entry.endDate}
          </span>
          <span className="text-muted/60">·</span>
          <span className="font-mono text-xs text-muted">{entry.location}</span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed">
          {entry.description}
        </p>

        {/* Achievements */}
        {entry.achievements.length > 0 && (
          <ul className="flex flex-col gap-2">
            {entry.achievements.map((achievement, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack chips */}
        {entry.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-muted/40">
            {entry.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 border border-muted rounded-full font-mono text-xs text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Centre dot on the timeline line — desktop only */}
      <div className="hidden md:flex w-[10%] justify-center items-start pt-6 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
      </div>

      {/* Spacer — pushes card to correct side */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  )
}
