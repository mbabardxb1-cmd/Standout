'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { NodeField } from './NodeField'

/** The persistent WebGL layer. Fixed behind the page, ignores clicks, hidden from assistive tech. */
export default function FieldCanvas() {
  const [dpr, setDpr] = useState(1.5)
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined)

  // The canvas has pointer-events: none, so R3F reads the pointer from the whole page.
  useEffect(() => setEventSource(document.body), [])

  return (
    <div className="field-canvas pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        eventSource={eventSource}
        eventPrefix="client"
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        <NodeField />
      </Canvas>
    </div>
  )
}
