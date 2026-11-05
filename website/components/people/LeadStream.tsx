'use client'

import { useEffect, useRef } from 'react'
import { useField } from '@/lib/field-store'
import { COUNT, pipelineInto } from '@/lib/formations'

/**
 * The lead-flow particle stream, drawn on a 2D canvas inside its own stage box.
 * Because it lives in the section (not the fixed background), it scrolls with the
 * labels and controls and lines up at any screen size, pinned or not.
 * Visitors flow in, the scan gate keeps the captured share, nurture turns responders orange.
 */
export function LeadStream({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    const resize = () => {
      const r = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width
      H = r.height
      el.width = Math.round(W * dpr)
      el.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const pos = new Float32Array(COUNT * 3)
    const scale = new Float32Array(COUNT)
    const lead = new Uint8Array(COUNT)

    const draw = (t: number) => {
      if (!W || !H) return
      pipelineInto(pos, scale, lead, W, H, t, useField.getState().sim)
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < COUNT; i++) {
        const s = scale[i]
        if (s < 0.03) continue
        const x = pos[i * 3] + W / 2
        const y = H / 2 - pos[i * 3 + 1]
        ctx.beginPath()
        if (lead[i]) {
          ctx.fillStyle = 'rgb(255,90,31)'
          ctx.shadowColor = 'rgba(255,90,31,0.9)'
          ctx.shadowBlur = 12
          ctx.arc(x, y, 3.4 * s, 0, Math.PI * 2)
        } else {
          ctx.fillStyle = `rgba(227,232,244,${0.85 * Math.min(1, s)})`
          ctx.shadowBlur = 0
          ctx.arc(x, y, 2.6 * s, 0, Math.PI * 2)
        }
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (calm) draw(12)
    })
    ro.observe(el)

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)

    let raf = 0
    const loop = () => {
      if (visible) draw(performance.now() / 1000)
      raf = requestAnimationFrame(loop)
    }
    // Reduced motion: one still frame, redrawn when the sliders change.
    const unsub = calm ? useField.subscribe(() => draw(12)) : () => {}
    if (calm) draw(12)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      unsub()
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
