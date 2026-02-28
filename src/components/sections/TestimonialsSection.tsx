'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { TESTIMONIALS } from '@/data/testimonials'
import type { TTestimonial } from '@/types'

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card')
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="min-h-screen flex items-center py-24"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">

        {/* ── Header ── */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
            ANALYST COVERAGE / RATINGS
          </p>
          <h2 className="font-display text-4xl text-text-primary">
            Market Sentiment
          </h2>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function TestimonialCard({ testimonial }: { testimonial: TTestimonial }) {
  return (
    <div className="testimonial-card bg-surface/80 backdrop-blur-sm border border-muted border-l-2 border-l-[#26a69a] rounded-2xl p-8 flex flex-col gap-5">

      {/* Rating header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-muted tracking-widest">RATING:</span>
        <span className="font-mono text-xs text-[#26a69a] tracking-wider">■■■■■</span>
        <span className="font-mono text-xs text-[#26a69a] tracking-widest">STRONG BUY</span>
      </div>

      {/* Analyst note label */}
      <span className="font-mono text-xs text-muted tracking-widest">{'// ANALYST NOTE:'}</span>

      {/* Quote text */}
      <blockquote className="font-sans text-base text-text-secondary italic leading-relaxed flex-1">
        {testimonial.text}
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-4 pt-4 border-t border-muted/40">
        <Avatar name={testimonial.name} avatarUrl={testimonial.avatarUrl} />
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-xs text-muted tracking-widest">
            ANALYST: <span className="text-text-primary">{testimonial.name}</span>
          </p>
          <p className="font-mono text-xs text-muted tracking-widest">
            FIRM: <span className="text-text-secondary">{testimonial.company}</span>
          </p>
        </div>
      </div>

    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-[#26a69a]/40"
      />
    )
  }

  return (
    <div className="w-10 h-10 rounded-md bg-[#26a69a]/10 border border-[#26a69a]/40 flex items-center justify-center flex-shrink-0">
      <span className="font-mono text-xs text-[#26a69a] font-bold">{initials}</span>
    </div>
  )
}
