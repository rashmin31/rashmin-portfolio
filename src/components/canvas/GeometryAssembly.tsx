import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { MutableRefObject } from 'react'

export const GeometryAssembly = forwardRef<Group>(
  function GeometryAssembly(_, forwardedRef) {
    // Internal ref drives the per-frame rotation animation
    const internalRef = useRef<Group | null>(null) as MutableRefObject<Group | null>

    useFrame(() => {
      if (internalRef.current) {
        internalRef.current.rotation.y += 0.002
        internalRef.current.rotation.x += 0.001
      }
    })

    // Merge internal ref (animation) with forwarded ref (ScrollOrchestrator control)
    const setRef = (node: Group | null) => {
      internalRef.current = node
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    }

    return (
      <group ref={setRef}>
        {/* Outer wireframe — the fragmented, data-like shell */}
        <mesh>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial wireframe color="#6366f1" />
        </mesh>

        {/* Inner solid — dark core, creates depth against the wireframe */}
        <mesh scale={0.95}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
      </group>
    )
  }
)
