'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { EXPERIENCE } from '@/data/experience'
import type { TExperience } from '@/types'

function toTicker(company: string): string {
  const map: Record<string, string> = {
    'Punon Technologies': 'PUNON:TECH',
    'Independent': 'SELF:DEV',
    'Cityfalcon': 'CITY:FIN',
    'Xebia': 'XEBIA:CONS',
    'KPIT Technologies': 'KPIT:ENG',
  }
  return map[company] ?? company.toUpperCase().slice(0, 8)
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entries = gsap.utils.toArray<HTMLElement>('.exp-entry')

      entries.forEach((entry, i) => {
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
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
            TRADE HISTORY
          </p>
          <h2 className="font-display text-4xl text-text-primary">
            The journey so far.
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical centre line */}
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
  const isOpen = entry.endDate === 'Present'

  return (
    <div
      className={`exp-entry relative flex flex-col md:flex-row items-start gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Card */}
      <div
        className={`w-full md:w-[45%] bg-surface/80 backdrop-blur-sm border border-muted rounded-xl p-6 flex flex-col gap-4 ${
          isOpen ? 'border-l-2 border-l-[#26a69a]' : 'border-l-2 border-l-muted'
        }`}
      >
        {/* Header row: ticker + status badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-xs text-accent tracking-widest mb-1">
              {toTicker(entry.company)}
            </p>
            <h3 className="font-display text-xl text-text-primary">
              <span className="font-mono text-xs text-muted mr-1">POSITION:</span>
              {entry.role}
            </h3>
          </div>
          <span
            className={`font-mono text-xs tracking-widest flex-shrink-0 mt-1 ${
              isOpen ? 'text-[#26a69a]' : 'text-muted'
            }`}
          >
            {isOpen ? '● OPEN' : '■ CLOSED'}
          </span>
        </div>

        {/* Meta: dates + location */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-secondary">
          <span>
            <span className="text-muted">ENTRY:</span> {entry.startDate}
          </span>
          <span className="text-muted/40">·</span>
          <span>
            <span className="text-muted">EXIT:</span>{' '}
            <span className={isOpen ? 'text-[#26a69a]' : ''}>{entry.endDate}</span>
          </span>
          <span className="text-muted/40">·</span>
          <span className="text-muted">{entry.location}</span>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-muted tracking-widest">{'// TRADE RATIONALE'}</span>
          <p className="text-text-secondary text-sm leading-relaxed">
            {entry.description}
          </p>
        </div>

        {/* Achievements */}
        {entry.achievements.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-muted tracking-widest">{'// P&L HIGHLIGHTS'}</span>
            <ul className="flex flex-col gap-2">
              {entry.achievements.map((achievement, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-[2px] text-[#26a69a] flex-shrink-0 font-mono text-xs">▲</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack chips */}
        {entry.techStack.length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-muted/40">
            <span className="font-mono text-xs text-muted tracking-widest">INSTRUMENTS:</span>
            <div className="flex flex-wrap gap-2">
              {entry.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 border border-[#26a69a]/30 rounded-full font-mono text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Centre marker on the timeline line — desktop only */}
      <div className="hidden md:flex w-[10%] justify-center items-start pt-6 flex-shrink-0">
        <div className="w-3 h-3 bg-accent ring-4 ring-background" style={{ clipPath: 'none' }} />
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  )
}
