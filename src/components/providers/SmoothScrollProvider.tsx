'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { lenisStore } from '@/lib/lenis-store'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Expose instance so other components can call lenis.scrollTo()
    lenisStore.set(lenis)

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Capture the ticker function so we can remove the exact same reference on cleanup
    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisStore.set(null)
    }
  }, [])

  return <>{children}</>
}
