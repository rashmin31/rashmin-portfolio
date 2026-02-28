'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { lenisStore } from '@/lib/lenis-store'
import { NAV_SECTIONS } from '@/lib/constants'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function NavigationDots() {
  const { activeSection } = useScrollProgress()
  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Animate the active dot to accent colour + scale, others to muted
  useEffect(() => {
    NAV_SECTIONS.forEach(({ id }) => {
      const dot = dotRefs.current[id]
      if (!dot) return
      if (id === activeSection) {
        gsap.to(dot, {
          scale: 1.5,
          backgroundColor: '#2962ff',
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#363c4e',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    })
  }, [activeSection])

  const scrollTo = (id: string) => {
    const lenis = lenisStore.get()
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.2 })
    } else {
      // Fallback for environments where Lenis hasn't initialised yet
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4 items-center"
    >
      {NAV_SECTIONS.map(({ id, label }) => (
        <div key={id} className="relative group flex items-center justify-end">

          {/* Tooltip — appears to the left of the dot on hover */}
          <span
            className="absolute right-full mr-3 px-2 py-1 rounded bg-surface border border-muted font-mono text-xs text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            aria-hidden="true"
          >
            {label}
          </span>

          {/* Dot */}
          <button
            onClick={() => scrollTo(id)}
            aria-label={`Scroll to ${label}`}
            data-cursor-hover
            className="w-2 h-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div
              ref={(el) => { dotRefs.current[id] = el }}
              className="w-full h-full rounded-full bg-muted"
              style={{ transformOrigin: 'center' }}
            />
          </button>

        </div>
      ))}
    </nav>
  )
}
