'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = { children: React.ReactNode; onClick?: () => void; className?: string }

/** Pulls towards the cursor within 100 px; the label travels a little less than the shape. */
export function MagneticButton({ children, onClick, className = '' }: Props) {
  const btn = useRef<HTMLButtonElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (calm || !fine || !btn.current || !label.current) return
    const el = btn.current
    const opts = { duration: 0.6, ease: 'elastic.out(1, 0.45)' }
    const bx = gsap.quickTo(el, 'x', opts)
    const by = gsap.quickTo(el, 'y', opts)
    const lx = gsap.quickTo(label.current, 'x', opts)
    const ly = gsap.quickTo(label.current, 'y', opts)

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const near = Math.hypot(dx, dy) < 100 + r.width / 2
      bx(near ? dx * 0.3 : 0)
      by(near ? dy * 0.3 : 0)
      lx(near ? dx * 0.12 : 0)
      ly(near ? dy * 0.12 : 0)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <button
      ref={btn}
      type="button"
      onClick={onClick}
      data-cursor="let's go"
      className={`cta-glow inline-flex items-center justify-center rounded-full bg-signal px-10 py-6 text-[18px] font-semibold text-night md:px-14 md:py-7 md:text-[20px] ${className}`}
    >
      <span ref={label} className="inline-block">
        {children}
      </span>
    </button>
  )
}
