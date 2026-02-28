'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { SchedulerModal } from '@/components/ui/SchedulerModal'

const ORDER_ROWS = [
  { label: 'ORDER_TYPE:', value: 'Discovery Call / Collaboration' },
  { label: 'INSTRUMENT:', value: 'Rashmin Bhanderi' },
  { label: 'QUANTITY:', value: '1 Session (30 min)' },
  { label: 'EXECUTION:', value: 'Google Meet' },
  { label: 'MARKET:', value: 'Mumbai · Remote · Worldwide' },
]

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
            toggleActions: 'play none none reverse',
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
            toggleActions: 'play none none reverse',
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
            <p className="font-mono text-xs text-accent tracking-widest uppercase">
              ORDER TICKET / INITIATE TRADE
            </p>
            <h2 className="font-display text-4xl text-text-primary leading-snug">
              Open a Position
            </h2>
            <p className="font-sans text-text-secondary leading-relaxed">
              Available for full-time roles, technical consulting, and project
              collaborations. Experienced in React ecosystems, algorithmic
              trading, and 3D web. Let&apos;s find the right entry point.
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-xs text-muted tracking-widest">
                DIRECT LINE:
              </p>
              <a
                href="mailto:rashminbhanderi@gmail.com"
                className="font-mono text-sm text-accent hover:underline underline-offset-4 transition-all w-fit"
              >
                rashminbhanderi@gmail.com
              </a>
            </div>
          </div>

          {/* ── Right: order ticket card ── */}
          <div className="md:w-3/5 w-full flex justify-center opacity-0" ref={cardRef}>
            <div className="w-full max-w-md bg-surface/80 backdrop-blur-sm border border-muted border-l-2 border-l-[#26a69a] rounded-2xl p-8 flex flex-col gap-0">

              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs text-muted tracking-widest">ORDER TICKET</span>
                <span className="font-mono text-xs text-[#26a69a] tracking-widest">■■■■ LIMIT</span>
              </div>

              {/* Order rows */}
              <div className="flex flex-col divide-y divide-muted/30">
                {ORDER_ROWS.map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-mono text-xs text-muted tracking-widest flex-shrink-0">
                      {label}
                    </span>
                    <span className="font-mono text-xs text-text-secondary text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-muted/40 my-5" />

              {/* Availability */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#26a69a] animate-pulse" />
                <span className="font-mono text-xs text-[#26a69a] tracking-widest">
                  AVAILABILITY: OPEN FOR OPPORTUNITIES
                </span>
              </div>

              {/* CTA button */}
              <button
                onClick={() => setModalOpen(true)}
                data-cursor-hover
                className="w-full py-4 border border-[#26a69a] text-[#26a69a] font-mono text-sm rounded hover:bg-[#26a69a]/10 hover:scale-[1.02] transition-all duration-200 tracking-widest"
              >
                PLACE ORDER →
              </button>

              <p className="font-mono text-xs text-muted tracking-wide text-center mt-3">
                schedule via Cal.com · Free · 30 min
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
