'use client'

import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { gsap } from '@/lib/gsap'

export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const hasExited = useRef(false)

  // Actual Three.js loading progress (0–100)
  const { progress } = useProgress()

  // Animate the loading bar width as progress updates
  useEffect(() => {
    if (!barRef.current) return
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [progress])

  // Exit when Three.js signals 100% — with a minimum display window of 800ms
  // so the bar is always visible briefly even when there are no external assets.
  // A 3s hard-timeout fires as a fallback in case the loading manager never
  // emits a 100 event (e.g. no loaders registered at all).
  useEffect(() => {
    const exit = () => {
      if (hasExited.current || !loaderRef.current) return
      hasExited.current = true

      // Snap bar to 100% before sliding out
      gsap.set(barRef.current, { width: '100%' })

      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.15,
        onComplete: () => setVisible(false),
      })
    }

    // Primary: respect actual load progress
    if (progress === 100) {
      const t = setTimeout(exit, 800)
      return () => clearTimeout(t)
    }

    // Fallback: hard cap at 3 seconds so the loader never hangs
    const fallback = setTimeout(exit, 3000)
    return () => clearTimeout(fallback)
  }, [progress])

  if (!visible) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-10"
    >
      {/* RB monogram */}
      <span className="font-display text-8xl font-bold text-accent select-none">
        RB
      </span>

      {/* Loading bar track */}
      <div className="w-48 h-px bg-muted/40 relative overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="absolute left-0 top-0 h-full bg-accent rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}
