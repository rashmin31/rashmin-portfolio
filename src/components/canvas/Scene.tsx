'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Lights } from './Lights'
import { ParticleField } from './ParticleField'
import { CameraRig } from './CameraRig'
import { CandlestickChart } from './CandlestickChart'
import { CHART_ORIGIN_X } from '@/lib/constants'

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [CHART_ORIGIN_X + 2, 0, 5], fov: 60 }}
        style={{ background: '#131722' }}
      >
        <fog attach="fog" args={['#131722', 18, 40]} />
        <Suspense fallback={null}>
          <Lights />
          <ParticleField />
          <CandlestickChart />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
