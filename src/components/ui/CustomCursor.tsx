'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on devices with a precise pointer (mouse/trackpad, not touch)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const mouse = { x: -100, y: -100 }
    const ring  = { x: -100, y: -100 }

    // Dot tracks mouse instantly
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      gsap.set(dotRef.current, { x: mouse.x - 3, y: mouse.y - 3 })
    }
    window.addEventListener('mousemove', onMouseMove)

    // Ring lerps toward mouse on every GSAP tick
    const onTick = () => {
      ring.x += (mouse.x - 16 - ring.x) * 0.15
      ring.y += (mouse.y - 16 - ring.y) * 0.15
      gsap.set(ringRef.current, { x: ring.x, y: ring.y })
    }
    gsap.ticker.add(onTick)

    // Hover scaling on [data-cursor-hover] elements
    const onEnter = () => {
      gsap.to(dotRef.current,  { scale: 2,   duration: 0.25, ease: 'power2.out' })
      gsap.to(ringRef.current, { scale: 1.5, duration: 0.25, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(dotRef.current,  { scale: 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(ringRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' })
    }

    // Attach hover listeners to all current + future hover targets via delegation
    const onDelegatedEnter = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('[data-cursor-hover]')) onEnter()
    }
    const onDelegatedLeave = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('[data-cursor-hover]')) onLeave()
    }
    document.addEventListener('mouseover', onDelegatedEnter)
    document.addEventListener('mouseout',  onDelegatedLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onDelegatedEnter)
      document.removeEventListener('mouseout',  onDelegatedLeave)
      gsap.ticker.remove(onTick)
    }
  }, [])

  return (
    <>
      {/* Small dot — instant tracking */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ width: 6, height: 6 }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>

      {/* Larger ring — lagged tracking */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ width: 32, height: 32 }}
      >
        <div className="w-full h-full rounded-full border border-white" />
      </div>
    </>
  )
}
