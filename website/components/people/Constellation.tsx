'use client'

import { useEffect, useRef } from 'react'
import { useField } from '@/lib/field-store'
import { CLUSTER_SIZES } from '@/lib/formations'

const GOLDEN = 2.39996323

/**
 * One package constellation, drawn on a canvas inside its card window.
 * Nodes fly in from scattered points as the card scrolls up to the middle of the screen,
 * settle into a sunflower with short rays, and turn orange while the card is hovered.
 * The 360 constellation (index 2) keeps slowly orbiting.
 */
export function Constellation({ index, className = '' }: { index: 0 | 1 | 2; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const fallback = useField((s) => s.fieldFallback)

  useEffect(() => {
    const el = ref.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // With motion on, the live field flies the nodes in; this canvas is the still for reduced motion
    // and for browsers where the WebGL field cannot run.
    if (!calm && !fallback) return
    const n = CLUSTER_SIZES[index]

    // Unit sunflower offsets (radius 1 = biggest constellation), plus a scattered start point.
    const nodes = Array.from({ length: n }, (_, j) => {
      const r = Math.sqrt(n / 68) * Math.sqrt((j + 0.5) / n)
      const a = j * GOLDEN
      return { ux: Math.cos(a) * r, uy: Math.sin(a) * r, sx: Math.random() * 2 - 1, sy: Math.random() * 2 - 1, d: Math.random() * 0.35 }
    })
    // Two nearest neighbours each, for the rays.
    const pairs: [number, number][] = []
    nodes.forEach((p, i) => {
      nodes
        .map((q, j) => ({ j, d: (p.ux - q.ux) ** 2 + (p.uy - q.uy) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => i < j && pairs.push([i, j]))
    })

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

    let glow = 0
    const xs = new Float32Array(n)
    const ys = new Float32Array(n)
    const draw = (t: number, dt: number) => {
      if (!W || !H) return
      const r = el.getBoundingClientRect()
      // 0 while the window is at the bottom of the screen, 1 by the time it is two-thirds up.
      const raw = calm ? 1 : Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight * 0.55)))
      const hot = useField.getState().activePackage === index ? 1 : 0
      glow += (hot - glow) * Math.min(1, dt * 8)

      const R = Math.min(W, H) * 0.42
      const cx = W / 2
      const cy = H / 2
      const a = index === 2 && !calm ? t * 0.15 : 0
      const ca = Math.cos(a)
      const sa = Math.sin(a)
      for (let i = 0; i < n; i++) {
        const p = nodes[i]
        const k = Math.min(1, Math.max(0, (raw - p.d) / (1 - p.d)))
        const e = k * k * (3 - 2 * k)
        const tx = (p.ux * ca - p.uy * sa) * R
        const ty = (p.ux * sa + p.uy * ca) * R
        xs[i] = cx + p.sx * W * 0.5 * (1 - e) + tx * e
        ys[i] = cy + p.sy * H * 0.5 * (1 - e) + ty * e
      }

      ctx.clearRect(0, 0, W, H)
      const col = (alpha: number) =>
        `rgba(${Math.round(227 + 28 * glow)},${Math.round(232 - 142 * glow)},${Math.round(244 - 213 * glow)},${alpha})`
      ctx.lineWidth = 1
      ctx.strokeStyle = col((0.12 + 0.18 * glow) * raw)
      ctx.beginPath()
      for (const [i, j] of pairs) {
        ctx.moveTo(xs[i], ys[i])
        ctx.lineTo(xs[j], ys[j])
      }
      ctx.stroke()
      ctx.fillStyle = col(0.55 + 0.4 * Math.max(raw * 0.6, glow))
      for (let i = 0; i < n; i++) {
        ctx.beginPath()
        ctx.arc(xs[i], ys[i], i === 0 ? 3.2 : 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (calm) draw(0, 1)
    })
    ro.observe(el)

    let visible = true
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(el)

    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (visible) draw(now / 1000, dt)
      raf = requestAnimationFrame(loop)
    }
    const unsub = calm ? useField.subscribe(() => draw(0, 1)) : () => {}
    if (calm) draw(0, 1)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      unsub()
    }
  }, [index, fallback])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
