'use client'

import dynamic from 'next/dynamic'
import { Component, type ReactNode } from 'react'
import { useField } from '@/lib/field-store'

/** Static poster shown until Three.js has loaded, so the first paint is never empty. */
function FieldPoster() {
  return (
    <div className="field-canvas pointer-events-none fixed inset-0 z-0 opacity-40" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 48 }, (_, i) => {
          const x = (i * 37) % 160
          const y = (i * 53) % 90
          return <circle key={i} cx={x} cy={y} r="0.35" fill="#E3E8F4" />
        })}
      </svg>
    </div>
  )
}

const FieldCanvas = dynamic(() => import('./FieldCanvas'), { ssr: false, loading: FieldPoster })

/** If the WebGL canvas throws (no context, driver failure), fall back to the poster and tell the sections. */
class FieldBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    useField.getState().setFieldFallback(true)
  }
  render() {
    return this.state.failed ? <FieldPoster /> : this.props.children
  }
}

export function FieldLayer() {
  const fallback = useField((s) => s.fieldFallback)
  if (fallback) return <FieldPoster />
  return (
    <FieldBoundary>
      <FieldCanvas />
    </FieldBoundary>
  )
}
