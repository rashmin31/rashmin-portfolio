import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  CHART_ORIGIN_X,
  CHART_CANDLE_STEP,
  CHART_TOTAL_CANDLES,
} from '@/lib/constants'
import { lenisStore } from '@/lib/lenis-store'

export function CameraRig() {
  const { camera } = useThree()

  // Raw normalised mouse position (-1 to +1)
  const mouse = useRef({ x: 0, y: 0 })
  // Smoothed mouse offset that lags behind mouse
  const target = useRef({ x: 0, y: 0 })
  // Smoothed scroll-driven horizontal pan
  const scrollPan = useRef({ x: CHART_ORIGIN_X })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // ── Mouse parallax (unchanged from original) ──────────────────────
    target.current.x += (mouse.current.x * 0.3 - target.current.x) * 0.05
    target.current.y += (mouse.current.y * 0.15 - target.current.y) * 0.05

    // ── Scroll-driven horizontal pan ──────────────────────────────────
    // Read from Lenis (authoritative) — falls back to native scrollY
    const lenis = lenisStore.get()
    const progress = (lenis && lenis.limit > 0)
      ? lenis.progress
      : (() => {
          const scrollable = document.documentElement.scrollHeight - window.innerHeight
          return scrollable > 0 ? window.scrollY / scrollable : 0
        })()

    // Index of the currently forming candle (float)
    const formingIdx = Math.min(
      progress * (CHART_TOTAL_CANDLES + 2),
      CHART_TOTAL_CANDLES - 1
    )
    // World X of that candle
    const formingX = CHART_ORIGIN_X + formingIdx * CHART_CANDLE_STEP
    // Keep forming candle slightly right of center in view
    const desiredPanX = formingX

    // Lerp smoothly to the desired pan position
    scrollPan.current.x += (desiredPanX - scrollPan.current.x) * 0.04

    // ── Combine pan + mouse offset ────────────────────────────────────
    camera.position.x = scrollPan.current.x + target.current.x
    camera.position.y = target.current.y
    // camera.position.z is set by the Canvas camera prop — do not touch
  })

  return null
}
