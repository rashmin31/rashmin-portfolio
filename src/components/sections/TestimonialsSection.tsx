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
          <p className="font-mono text-sm text-accent tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-4xl text-text-primary">
            What people say.
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
    <div className="testimonial-card bg-surface border border-muted rounded-2xl p-8 flex flex-col gap-6">

      {/* Large decorative opening quote */}
      <div
        className="font-display text-6xl text-accent leading-none select-none"
        style={{ opacity: 0.3 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <blockquote className="font-sans text-lg text-text-secondary italic leading-relaxed flex-1">
        {testimonial.text}
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-4 pt-4 border-t border-muted/40">
        <Avatar name={testimonial.name} avatarUrl={testimonial.avatarUrl} />
        <div>
          <p className="font-display text-text-primary leading-tight">
            {testimonial.name}
          </p>
          <p className="font-mono text-sm text-text-secondary mt-0.5">
            {testimonial.role} · {testimonial.company}
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
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
    )
  }

  return (
    <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
      <span className="font-mono text-xs text-accent font-bold">{initials}</span>
    </div>
  )
}
