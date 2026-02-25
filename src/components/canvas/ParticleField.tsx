import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 3000
const SPREAD = 15

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * SPREAD * 2 // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 2 // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 2 // z
    }
    return arr
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6366f1"
        size={0.02}
        opacity={0.6}
        transparent
        sizeAttenuation
      />
    </points>
  )
}
