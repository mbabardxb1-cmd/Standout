'use client'

import { useEffect, useRef } from 'react'
import { useField } from '@/lib/field-store'
import { PIPE, pipeX } from '@/lib/formations'

/**
 * Animated exhibition visitors, drawn on a 2D canvas in front of the node field.
 *
 * mode="hero": people walk the floor (the orange baseline at the bottom of the hero) and
 *   react to the Pre / At / Post toggle: a few wander; a crowd gathers in front of the stand
 *   and some get their badge scanned; scanned visitors leave as orange leads.
 * mode="flow": visitors walk up to the lead-flow scan gate. Captured ones dissolve up into
 *   the data stream; the rest turn away. Arrival rate and capture share follow the sliders.
 *
 * Pointing at someone shows their visitor tag. Reduced motion draws one still frame.
 */

type Mode = 'hero' | 'flow'
type State = 'off' | 'walk' | 'idle' | 'gather' | 'exit' | 'enter' | 'dissolve' | 'reject'

type Person = {
  id: number
  x: number
  z: number // depth 0 (back) .. 1 (front)
  v: number // walking speed factor
  dir: 1 | -1
  step: number // walk-cycle phase
  state: State
  timer: number
  tx: number
  gatherer: boolean
  willScan: boolean
  scanned: boolean
  scanT: number
  captured: boolean
  h: number // height factor
  w: number // build factor
  bag: 0 | 1 | 2 // none, tote, backpack
  fade: number
  lift: number
}

const MIST = '227,232,244'
const ORANGE = '255,90,31'
const HALL = '5,10,24'
const POOL = { hero: 36, flow: 44 }
const HERO_ACTIVE: Record<string, number> = { scatter: 12, stand: 32, converge: 26 }

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Opaque colour = `rgb` laid over the page ground at `alpha`. */
function solid(rgb: string, alpha: number) {
  const [r, g, b] = rgb.split(',').map(Number)
  const [hr, hg, hb] = HALL.split(',').map(Number)
  const a = Math.min(1, Math.max(0, alpha))
  return `rgb(${Math.round(hr + (r - hr) * a)},${Math.round(hg + (g - hg) * a)},${Math.round(hb + (b - hb) * a)})`
}
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

function makePerson(id: number): Person {
  return {
    id, x: -100, z: Math.random(), v: rand(0.85, 1.2), dir: Math.random() < 0.5 ? 1 : -1, step: rand(0, 6),
    state: 'off', timer: 0, tx: 0, gatherer: false, willScan: false, scanned: false, scanT: -9,
    captured: false, h: rand(0.9, 1.08), w: rand(0.88, 1.15), bag: (Math.random() < 0.55 ? 0 : Math.random() < 0.5 ? 1 : 2) as 0 | 1 | 2,
    fade: 1, lift: 0,
  }
}

/** One visitor: head, shoulders, swinging arms and legs, lanyard badge, optional bag. */
function drawPerson(
  ctx: CanvasRenderingContext2D, p: Person, x: number, y: number, size: number,
  rgb: string, alpha: number, badgeOn: boolean, now: number,
) {
  const s = size * p.h
  const moving = p.state === 'walk' || p.state === 'exit' || p.state === 'enter' || p.state === 'reject'
  const swing = moving ? Math.sin(p.step) : 0
  const hipY = y - 0.47 * s
  const shY = y - 0.8 * s
  const tw = 0.3 * s * p.w
  const bw = 0.24 * s * p.w
  const r = 0.08 * s
  const fill = solid(rgb, alpha)
  const cut = solid(rgb, alpha * 0.35)

  ctx.fillStyle = fill
  ctx.strokeStyle = fill
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // Backpack sits behind the body, on the side opposite the walking direction.
  if (p.bag === 2) {
    ctx.beginPath()
    ctx.roundRect(x - p.dir * tw * 0.62 - 0.07 * s, shY + 0.05 * s, 0.14 * s, 0.24 * s, 0.04 * s)
    ctx.fill()
  }

  // Legs
  ctx.lineWidth = 0.1 * s
  ctx.beginPath()
  ctx.moveTo(x - 0.04 * s, hipY)
  ctx.lineTo(x + swing * 0.12 * s - 0.03 * s, y)
  ctx.moveTo(x + 0.04 * s, hipY)
  ctx.lineTo(x - swing * 0.12 * s + 0.03 * s, y)
  ctx.stroke()

  // Torso: broad shoulders tapering to the hips
  ctx.beginPath()
  ctx.moveTo(x - tw / 2 + r, shY)
  ctx.lineTo(x + tw / 2 - r, shY)
  ctx.quadraticCurveTo(x + tw / 2, shY, x + tw / 2, shY + r)
  ctx.lineTo(x + bw / 2, hipY + 0.03 * s)
  ctx.lineTo(x - bw / 2, hipY + 0.03 * s)
  ctx.lineTo(x - tw / 2, shY + r)
  ctx.quadraticCurveTo(x - tw / 2, shY, x - tw / 2 + r, shY)
  ctx.fill()

  // Arms swing against the legs
  ctx.lineWidth = 0.08 * s
  ctx.beginPath()
  ctx.moveTo(x - tw / 2 + 0.03 * s, shY + 0.05 * s)
  ctx.lineTo(x - tw / 2 - 0.01 * s - swing * 0.08 * s, hipY + 0.04 * s)
  ctx.moveTo(x + tw / 2 - 0.03 * s, shY + 0.05 * s)
  ctx.lineTo(x + tw / 2 + 0.01 * s + swing * 0.08 * s, hipY + 0.04 * s)
  ctx.stroke()

  // Tote bag hangs from the leading hand
  if (p.bag === 1) {
    const hx = x + p.dir * (tw / 2 + 0.02 * s) + p.dir * swing * 0.06 * s
    ctx.beginPath()
    ctx.roundRect(hx - 0.06 * s, hipY + 0.02 * s, 0.12 * s, 0.15 * s, 0.02 * s)
    ctx.fill()
  }

  // Head
  ctx.beginPath()
  ctx.arc(x, shY - 0.125 * s, 0.1 * s, 0, Math.PI * 2)
  ctx.fill()

  // Lanyard and badge: cut out of the torso, orange once scanned
  ctx.strokeStyle = cut
  ctx.lineWidth = Math.max(0.8, 0.018 * s)
  ctx.beginPath()
  ctx.moveTo(x - 0.06 * s, shY + 0.005 * s)
  ctx.lineTo(x - 0.03 * s, shY + 0.13 * s)
  ctx.moveTo(x + 0.06 * s, shY + 0.005 * s)
  ctx.lineTo(x + 0.03 * s, shY + 0.13 * s)
  ctx.stroke()
  ctx.fillStyle = badgeOn ? solid(ORANGE, Math.min(1, alpha + 0.45)) : cut
  ctx.fillRect(x - 0.045 * s, shY + 0.12 * s, 0.09 * s, 0.1 * s)

  // Scan pulse
  const since = now - p.scanT
  if (since >= 0 && since < 0.8) {
    const k = since / 0.8
    ctx.strokeStyle = `rgba(${ORANGE},${(1 - k) * 0.9})`
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(x, shY + 0.17 * s, 0.08 * s + k * 0.35 * s, 0, Math.PI * 2)
    ctx.stroke()
  }
}

export function Crowd({ mode, className = '' }: { mode: Mode; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
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
    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (calm) draw(0)
    })
    ro.observe(el)

    const mono =
      getComputedStyle(document.body).getPropertyValue('--font-geist-mono').trim() || 'ui-monospace, monospace'
    const people = Array.from({ length: POOL[mode] }, (_, i) => makePerson(i))
    const pointer = { x: -999, y: -999 }
    let hover: Person | null = null
    let lastForm = ''
    let spawnAcc = 0
    let visible = true
    let now = 0

    // ---- geometry: where the floor is and how big people are
    const floor = () => {
      if (mode === 'hero') {
        const front = clamp(H * 0.085, 44, 84) * (W < 640 ? 0.8 : 1)
        return { yBack: H * 0.865, yFront: H * 0.955, hBack: front * 0.6, hFront: front }
      }
      const yFront = H * (PIPE.band + PIPE.spread) + 4
      const front = clamp(H * 0.06, 32, 56)
      return { yBack: yFront - 12, yFront, hBack: front * 0.72, hFront: front }
    }
    const place = (p: Person) => {
      const f = floor()
      return { y: f.yBack + (f.yFront - f.yBack) * p.z - p.lift, size: f.hBack + (f.hFront - f.hBack) * p.z }
    }

    const spawnEdge = (p: Person, side?: 1 | -1) => {
      const from = side ?? (Math.random() < 0.5 ? -1 : 1)
      p.dir = (from === -1 ? 1 : -1) as 1 | -1
      p.x = from === -1 ? -40 : W + 40
      p.z = Math.random()
      p.state = 'walk'
      p.scanned = false
      p.gatherer = false
      p.fade = 1
      p.lift = 0
    }

    // ---- hero behaviour
    const onHeroForm = (form: string) => {
      const active = HERO_ACTIVE[form] ?? 12
      people.forEach((p, i) => {
        if (i >= active) return
        if (form === 'stand') {
          p.gatherer = Math.random() < 0.62
          p.willScan = Math.random() < 0.5
          p.tx = rand(0.57, 0.95) * W
        } else {
          p.gatherer = false
          if (p.state === 'gather') p.state = 'walk'
        }
        if (form === 'converge') {
          const onScreen = p.state !== 'off' && p.x > 0 && p.x < W
          if (!p.scanned && onScreen && Math.random() < 0.22) p.scanned = true // show a few leads even without a stop at the stand
          if (p.scanned && p.state !== 'off') {
            p.state = 'exit'
            p.dir = 1
          }
        }
        if (form === 'scatter') p.scanned = false
      })
    }

    const updateHero = (dt: number) => {
      const form = useField.getState().heroFormation
      if (form !== lastForm) {
        lastForm = form
        onHeroForm(form)
      }
      const active = HERO_ACTIVE[form] ?? 12
      const f = floor()
      people.forEach((p, i) => {
        const isActive = i < active
        if (p.state === 'off') {
          if (isActive) {
            spawnEdge(p)
            if (form === 'stand') {
              p.gatherer = Math.random() < 0.5
              p.willScan = Math.random() < 0.5
              p.tx = rand(0.57, 0.95) * W
            }
          }
          return
        }
        if (p === hover) return // stops while someone looks at them
        const size = f.hBack + (f.hFront - f.hBack) * p.z
        const speed = 34 * p.v * (size / 60)

        if (p.state === 'idle') {
          p.timer -= dt
          if (p.timer <= 0) {
            p.state = 'walk'
            if (Math.random() < 0.35) p.dir = (p.dir * -1) as 1 | -1
          }
          return
        }
        if (p.state === 'gather') {
          p.timer -= dt
          if (p.timer <= 0 && p.willScan && !p.scanned) {
            p.scanned = true
            p.scanT = now
          }
          if (form !== 'stand') p.state = 'walk'
          return
        }
        const fast = p.state === 'exit' ? 1.7 : 1
        if (form === 'stand' && p.gatherer && isActive && p.state === 'walk') {
          p.dir = p.tx > p.x ? 1 : -1
          if (Math.abs(p.tx - p.x) < 3) {
            p.state = 'gather'
            p.timer = rand(0.8, 4)
            return
          }
        }
        p.x += p.dir * speed * fast * dt
        p.step += dt * speed * 0.16 * fast
        if (p.state === 'walk' && form !== 'stand' && Math.random() < dt * 0.07) {
          p.state = 'idle'
          p.timer = rand(0.8, 2.4)
        }
        if (p.x < -60 || p.x > W + 60) {
          if (!isActive) p.state = 'off'
          else spawnEdge(p, p.state === 'exit' ? -1 : undefined)
        }
      })
    }

    // ---- lead-flow behaviour
    const updateFlow = (dt: number) => {
      const sim = useField.getState().sim
      const gateX = pipeX(PIPE.gate) * W
      spawnAcc += dt * (0.8 + (sim.visitors / 3000) * 5)
      while (spawnAcc >= 1) {
        spawnAcc -= 1
        const p = people.find((q) => q.state === 'off')
        if (!p) break
        p.x = -30
        p.dir = 1
        p.z = Math.random()
        p.state = 'enter'
        p.fade = 1
        p.lift = 0
        p.scanned = false
        p.captured = Math.random() < sim.capture / 100
      }
      const f = floor()
      people.forEach((p) => {
        if (p.state === 'off' || p === hover) return
        const size = f.hBack + (f.hFront - f.hBack) * p.z
        const speed = 95 * p.v * (size / 50)
        if (p.state === 'enter') {
          p.x += speed * dt
          p.step += dt * speed * 0.18
          if (p.x >= gateX - size * 0.3) {
            if (p.captured) {
              p.state = 'dissolve'
              p.scanned = true
              p.scanT = now
            } else {
              p.state = 'reject'
              p.dir = -1
            }
          }
        } else if (p.state === 'dissolve') {
          p.fade -= dt * 1.4
          p.lift += dt * size * 1.6 // rises into the stream
          if (p.fade <= 0) p.state = 'off'
        } else if (p.state === 'reject') {
          p.x -= speed * 0.7 * dt
          p.step += dt * speed * 0.12
          p.fade -= dt * 0.4
          if (p.fade <= 0 || p.x < -40) p.state = 'off'
        }
      })
    }

    // ---- hover: the frontmost person under the pointer
    const pickHover = () => {
      hover = null
      if (pointer.x < 0) return
      let bestZ = -1
      for (const p of people) {
        if (p.state === 'off' || p.state === 'dissolve') continue
        const { y, size } = place(p)
        const s = size * p.h
        if (Math.abs(pointer.x - p.x) < s * 0.22 && pointer.y < y + 2 && pointer.y > y - s * 1.05 && p.z > bestZ) {
          bestZ = p.z
          hover = p
        }
      }
    }

    function draw(dt: number) {
      now += dt
      if (!calm) {
        if (mode === 'hero') updateHero(dt)
        else updateFlow(dt)
      }
      pickHover()
      ctx!.clearRect(0, 0, W, H)
      const order = people.filter((p) => p.state !== 'off').sort((a, b) => a.z - b.z)
      for (const p of order) {
        const { y, size } = place(p)
        const orange = p.state === 'exit' || p.state === 'dissolve' || p === hover
        const base = mode === 'hero' ? 0.16 + 0.42 * p.z : 0.3 + 0.4 * p.z
        const alpha = clamp((orange ? base + 0.3 : base) * p.fade, 0, 1)
        drawPerson(ctx!, p, p.x, y, size, orange ? ORANGE : MIST, alpha, p.scanned || p.captured && p.state === 'dissolve', now)
      }
      if (hover) {
        const { y, size } = place(hover)
        const tag = `VISITOR ${String(1000 + ((hover.id * 379) % 9000)).padStart(4, '0')}${hover.scanned ? ' · LEAD' : ''}`
        ctx!.font = `500 11px ${mono}`
        const tw = ctx!.measureText(tag).width + 14
        const tx = clamp(hover.x - tw / 2, 4, W - tw - 4)
        const ty = y - size * hover.h * 1.08 - 26
        ctx!.fillStyle = `rgba(${HALL},0.85)`
        ctx!.fillRect(tx, ty, tw, 20)
        ctx!.strokeStyle = `rgba(${ORANGE},0.9)`
        ctx!.lineWidth = 1
        ctx!.strokeRect(tx + 0.5, ty + 0.5, tw - 1, 19)
        ctx!.fillStyle = `rgba(${MIST},0.95)`
        ctx!.fillText(tag, tx + 7, ty + 14)
      }
    }

    // Initial scene: the hero opens with a few people already on the floor.
    if (mode === 'hero') {
      lastForm = useField.getState().heroFormation
      const active = HERO_ACTIVE[lastForm] ?? 12
      people.forEach((p, i) => {
        if (i < active) {
          p.state = 'walk'
          p.x = rand(0.04, 0.96) * W
        }
      })
    } else if (calm) {
      people.slice(0, 12).forEach((p, i) => {
        p.state = 'enter'
        p.x = ((i + 0.5) / 12) * pipeX(PIPE.gate) * W
      })
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      if (pointer.x < 0 || pointer.y < 0 || pointer.x > W || pointer.y > H) pointer.x = -999
      if (calm) draw(0)
    }
    window.addEventListener('pointermove', onMove)

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    let raf = 0
    let last = performance.now()
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      // Skip work while off screen or faded out by the scroll timeline.
      if (visible && el.style.visibility !== 'hidden') draw(dt)
      raf = requestAnimationFrame(loop)
    }
    if (calm) draw(0)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [mode])

  return <canvas ref={canvas} aria-hidden="true" className={className} />
}
