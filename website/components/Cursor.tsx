'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * Small orange ring that follows the pointer and grows into a label over
 * any element with data-cursor="label". Fine pointers only, never with reduced motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !calm)
  }, [])

  useEffect(() => {
    if (!enabled || !ring.current) return
    gsap.set(ring.current, { xPercent: -50, yPercent: -50 }) // centre on the pointer
    const xTo = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
      setLabel(target?.dataset.cursor ?? null)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50"
    >
      <div
        className={`flex items-center justify-center rounded-full border border-signal font-mono text-[11px] uppercase tracking-[0.12em] text-signal transition-all duration-300 ease-[var(--ease-out-expo)] ${
          label ? 'h-20 w-20 bg-signal/10' : 'h-5 w-5'
        }`}
      >
        {label && <span>{label}</span>}
      </div>
    </div>
  )
}
