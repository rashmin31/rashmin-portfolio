'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { SchedulerModal } from '@/components/ui/SchedulerModal'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [modalOpen, setModalOpen] = useState(false)

  // ── GSAP ScrollTrigger entrance animations ─────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side: slide from left
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Right CTA card: fade up + slight scale
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
          delay: 0.15,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="min-h-screen flex items-center py-24"
      >
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row gap-16 items-center">

          {/* ── Left: invite copy ── */}
          <div ref={leftRef} className="md:w-2/5 flex flex-col gap-6 opacity-0">
            <p className="font-mono text-sm text-accent tracking-widest uppercase">
              Let&apos;s Work Together
            </p>
            <h2 className="font-display text-4xl text-text-primary leading-snug">
              Have a project in mind?
            </h2>
            <p className="font-sans text-text-secondary leading-relaxed">
              I&apos;m open to discussing new opportunities, technical
              consultations, and interesting projects. Let&apos;s find a time
              to talk.
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-xs text-muted tracking-wide">
                or reach out directly
              </p>
              <a
                href="mailto:rashminbhanderi@gmail.com"
                className="font-mono text-sm text-accent hover:underline underline-offset-4 transition-all w-fit"
              >
                rashminbhanderi@gmail.com
              </a>
            </div>
          </div>

          {/* ── Right: CTA card ── */}
          <div className="md:w-3/5 w-full flex justify-center opacity-0" ref={cardRef}>
            <div className="w-full max-w-md bg-surface border border-muted rounded-2xl p-10 flex flex-col items-center gap-6 text-center">

              {/* Calendar icon */}
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <CalendarDays className="w-8 h-8 text-accent" />
              </div>

              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl text-text-primary">
                  Book a 30-min call
                </h3>
                <p className="font-sans text-text-secondary text-sm leading-relaxed">
                  Pick a time that works for you.
                  <br />
                  We&apos;ll meet on Google Meet.
                </p>
              </div>

              {/* CTA button */}
              <button
                onClick={() => setModalOpen(true)}
                data-cursor-hover
                className="px-8 py-4 rounded-xl bg-accent text-white font-mono text-sm hover:bg-accent/80 hover:scale-105 transition-all duration-200"
              >
                Schedule a Meeting
              </button>

              {/* Fine print */}
              <p className="font-mono text-xs text-muted tracking-wide">
                Free · 30 minutes · Google Meet
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* Scheduler modal — rendered outside section to avoid stacking-context issues */}
      <SchedulerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
