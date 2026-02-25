'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Lights } from './Lights'
import { ParticleField } from './ParticleField'
import { CameraRig } from './CameraRig'
import { GeometryAssembly } from './GeometryAssembly'

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <Suspense fallback={null}>
          <Lights />
          <ParticleField />
          <GeometryAssembly />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
