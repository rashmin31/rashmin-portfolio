import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export function CameraRig() {
  const { camera } = useThree()

  // Raw normalised mouse position (-1 to +1)
  const mouse = useRef({ x: 0, y: 0 })
  // Smoothed position that lags behind mouse
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // Lerp smoothly toward mouse position
    target.current.x += (mouse.current.x * 0.3 - target.current.x) * 0.05
    target.current.y += (mouse.current.y * 0.15 - target.current.y) * 0.05

    // Apply to camera — z is reserved for ScrollTrigger
    camera.position.x = target.current.x
    camera.position.y = target.current.y
  })

  return null
}
