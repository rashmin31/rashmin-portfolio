'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { SKILLS } from '@/data/skills'

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each skill group slides up with stagger between groups
      const groups = gsap.utils.toArray<HTMLElement>('.skill-group')

      groups.forEach((group, i) => {
        // Group heading + chip row fade up together, offset by group index
        gsap.from(group, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: group,
            start: 'top 88%',
            once: true,
          },
        })

        // Individual chips within this group stagger
        const chips = group.querySelectorAll('.skill-chip')
        gsap.from(chips, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power3.out',
          delay: i * 0.1 + 0.15,
          scrollTrigger: {
            trigger: group,
            start: 'top 88%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen flex items-center py-24"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">

        {/* ── Header ── */}
        <div className="mb-16">
          <p className="font-mono text-sm text-accent tracking-widest uppercase mb-4">
            Skills &amp; Expertise
          </p>
          <h2 className="font-display text-4xl text-text-primary">
            The tools I build with.
          </h2>
        </div>

        {/* ── Skill groups ── */}
        <div className="flex flex-col gap-12">
          {SKILLS.map((group) => (
            <div key={group.category} className="skill-group">

              {/* Category label */}
              <h3 className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4">
                {group.category}
              </h3>

              {/* Chip row */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="skill-chip px-4 py-2 bg-white/5 border border-muted rounded-full font-mono text-sm text-text-secondary hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
