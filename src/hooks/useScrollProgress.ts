'use client'

import { useEffect, useState } from 'react'
import { NAV_SECTIONS } from '@/lib/constants'

type ScrollProgress = {
  activeSection: string
  scrollProgress: number
}

export function useScrollProgress(): ScrollProgress {
  const [activeSection, setActiveSection] = useState<string>(NAV_SECTIONS[0].id)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Track scroll progress (0–1)
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // IntersectionObserver: track which section is most in view
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })

        // Active = section with the highest intersection ratio
        let maxRatio = 0
        let mostVisible = activeSection
        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            mostVisible = id
          }
        })
        setActiveSection(mostVisible)
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
    )

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) {
        ratios.set(id, 0)
        observer.observe(el)
      }
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { activeSection, scrollProgress }
}
