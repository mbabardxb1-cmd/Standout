import type { Formation, Sim } from './field-store'

/*
 * Every formation places the same COUNT nodes in world units on the z = 0 plane,
 * sized from the visible viewport (R3F viewport.width / height at the camera's distance).
 * Positions written as viewport fractions (0..1 from the left / top) are shared with the
 * DOM, so drawn lines and labels land on the same pixels as the nodes.
 */
export const COLS = 14
export const ROWS = 10
export const COUNT = COLS * ROWS // 140
export const MAX_RAYS = 300 // pairs

/** Story grid, shared with components/sections/StoryGrid.tsx. */
export const GRID = { cols: COLS, rows: ROWS, inset: 0.05 } as const

/** The node that lifts and turns orange in the "At the Event" stand. */
export const LIFT_INDEX = 4 * COLS + 7
/** Slide 3: the one qualified lead that leaves the channel, drawn orange. */
export const LEAD_INDEX = 7 * ROWS + (ROWS - 1)

/** Services: 10 hubs on a baseline near the bottom of the viewport. */
export const SERVICE_COUNT = 10
export const HUB_Y = 0.86 // fraction from the top
export const hubX = (i: number) => 0.08 + (i * 0.84) / (SERVICE_COUNT - 1) // fraction from the left
export const serviceOf = (i: number) => (i < SERVICE_COUNT ? i : (i - SERVICE_COUNT) % SERVICE_COUNT)

/** Packages: three constellations, sized small / medium / large. */
export const CLUSTER_SIZES = [28, 44, 68] as const
export const clusterOf = (i: number) => (i < 28 ? 0 : i < 72 ? 1 : 2)

/** Lead flow: a stream left to right through a scan gate and a nurture stage. */
/** Fractions of the lead-flow stage box (not the viewport). */
export const PIPE = { x0: 0.03, x1: 0.97, gate: 0.42, nurture: 0.64, band: 0.4, spread: 0.26 } as const
export const pipeX = (u: number) => PIPE.x0 + u * (PIPE.x1 - PIPE.x0)

/** CTA: the field pours into the main button. Default centre if not measured (fraction from top). */
export const POINT_Y = 0.75

/** Field brightness and ray strength per formation (blended during morphs). */
// `rest` is fully dimmed: once the field has nothing to say it disappears, so no static grid sits behind the lower sections.
export const DIM: Record<Formation, number> = {
  scatter: 1, stand: 1, converge: 1, grid: 0.65, services: 0.75,
  clusters: 0.95, pipeline: 1, point: 1, rest: 0,
}
export const RAY_OPACITY: Record<Formation, number> = {
  scatter: 0.1, stand: 0.26, converge: 0.22, grid: 0.18, services: 0.22,
  clusters: 0.3, pipeline: 0, point: 0, rest: 0,
}

const wx = (fx: number, w: number) => (fx - 0.5) * w
const wy = (fy: number, h: number) => (0.5 - fy) * h
const GOLDEN = 2.39996323
const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

// Deterministic random so layouts are identical on every visit.
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// ---------------------------------------------------------------- hero

function scatter(w: number, h: number): Float32Array {
  const r = seeded(7)
  const p = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    p[i * 3] = (r() - 0.5) * w * 0.96
    p[i * 3 + 1] = (r() - 0.5) * h * 0.9
    p[i * 3 + 2] = (r() - 0.5) * 3
  }
  return p
}

function stand(w: number, h: number): Float32Array {
  const p = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const c = i % COLS
    const r = Math.floor(i / COLS)
    p[i * 3] = w * 0.18 + (w * 0.29 * c) / (COLS - 1)
    p[i * 3 + 1] = -h * 0.3 + (h * 0.6 * r) / (ROWS - 1)
    p[i * 3 + 2] = ((c % 3) - 1) * 0.55
  }
  p[LIFT_INDEX * 3 + 1] += h * 0.07
  p[LIFT_INDEX * 3 + 2] += 0.6
  return p
}

/** Post-event: 14 lines of visitors converging into one channel, all to the right of the copy. */
function converge(w: number, h: number): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const wide = w / h > 1.1
  const x0 = wide ? w * 0.19 : -w * 0.42
  const x1 = wide ? w * 0.38 : w * 0.3
  for (let i = 0; i < COUNT; i++) {
    const line = Math.floor(i / ROWS)
    const step = i % ROWS
    const startY = (wide ? -h * 0.36 : -h * 0.44) + ((wide ? h * 0.72 : h * 0.88) * line) / (COLS - 1)
    const t = Math.pow(step / (ROWS - 1), 0.85)
    p[i * 3] = x0 + (x1 - x0) * t
    p[i * 3 + 1] = startY * (1 - t)
  }
  // The lead steps out just past the point where every line meets.
  p[LEAD_INDEX * 3] = x1 + w * 0.045
  p[LEAD_INDEX * 3 + 1] = 0
  p[LEAD_INDEX * 3 + 2] = 0.4
  return p
}

// ---------------------------------------------------------------- grids

function gridLayout(cols: number, rows: number, inset: number, w: number, h: number): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const sx = 1 - inset * 2
  for (let i = 0; i < COUNT; i++) {
    const c = i % cols
    const r = Math.floor(i / cols) % rows
    p[i * 3] = wx(inset + (sx * c) / (cols - 1), w)
    p[i * 3 + 1] = wy(inset + (sx * r) / (rows - 1), h)
  }
  return p
}

function gridRays(cols: number): Uint16Array {
  const out: number[] = []
  for (let i = 0; i < COUNT; i++) {
    if (i % cols < cols - 1 && i + 1 < COUNT) out.push(i, i + 1)
    if (i + cols < COUNT) out.push(i, i + cols)
  }
  return Uint16Array.from(out)
}

function lineRays(): Uint16Array {
  const out: number[] = []
  for (let i = 0; i < COUNT; i++) if (i % ROWS < ROWS - 1) out.push(i, i + 1)
  return Uint16Array.from(out)
}

/** k nearest neighbours among `idx`, computed once. */
function nearestPairs(px: (i: number) => number, py: (i: number) => number, idx: number[], k: number): number[] {
  const out: number[] = []
  const seen = new Set<number>()
  for (const i of idx) {
    const d: [number, number][] = []
    for (const j of idx) {
      if (i === j) continue
      const dx = px(i) - px(j)
      const dy = py(i) - py(j)
      d.push([dx * dx + dy * dy, j])
    }
    d.sort((a, b) => a[0] - b[0])
    for (let n = 0; n < Math.min(k, d.length); n++) {
      const j = d[n][1]
      const key = i < j ? i * 1000 + j : j * 1000 + i
      if (!seen.has(key)) {
        seen.add(key)
        out.push(i, j)
      }
    }
  }
  return out
}

// ---------------------------------------------------------------- services

function services(w: number, h: number): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const r = seeded(11)
  const R = Math.min(0.045 * w, 0.085 * h)
  for (let i = 0; i < COUNT; i++) {
    const g = serviceOf(i)
    const hx = wx(hubX(g), w)
    const hy = wy(HUB_Y, h)
    if (i < SERVICE_COUNT) {
      p[i * 3] = hx
      p[i * 3 + 1] = hy
      continue
    }
    const k = Math.floor((i - SERVICE_COUNT) / SERVICE_COUNT) // 0..14 around each hub
    const a = k * GOLDEN + g
    const rad = R * (0.35 + 0.65 * Math.sqrt((k + 1) / 15))
    p[i * 3] = hx + Math.cos(a) * rad
    p[i * 3 + 1] = hy + Math.sin(a) * rad * 0.55
    p[i * 3 + 2] = (r() - 0.5) * 0.6
  }
  return p
}

function hubRays(): Uint16Array {
  const out: number[] = []
  for (let i = SERVICE_COUNT; i < COUNT; i++) out.push(serviceOf(i), i)
  for (let g = 0; g < SERVICE_COUNT - 1; g++) out.push(g, g + 1) // the baseline joining all hubs
  return Uint16Array.from(out)
}

// ---------------------------------------------------------------- packages

/** Offsets (x, y) of each node from its cluster centre, in a sunflower pattern. */
function clusterBase(w: number, h: number): Float32Array {
  const off = new Float32Array(COUNT * 2)
  const big = Math.min(0.085 * w, 0.075 * h)
  let start = 0
  for (let c = 0; c < 3; c++) {
    const n = CLUSTER_SIZES[c]
    const R = big * Math.sqrt(n / 68)
    for (let j = 0; j < n; j++) {
      const i = start + j
      const rr = R * Math.sqrt((j + 0.5) / n)
      const a = j * GOLDEN
      off[i * 2] = Math.cos(a) * rr
      off[i * 2 + 1] = Math.sin(a) * rr
    }
    start += n
  }
  return off
}

function clusterRays(base: Float32Array): Uint16Array {
  const out: number[] = []
  let start = 0
  for (let c = 0; c < 3; c++) {
    const idx = Array.from({ length: CLUSTER_SIZES[c] }, (_, j) => start + j)
    out.push(...nearestPairs((i) => base[i * 2], (i) => base[i * 2 + 1], idx, 2))
    start += CLUSTER_SIZES[c]
  }
  return Uint16Array.from(out)
}

/** Writes cluster positions. The 360 constellation slowly orbits. */
export function clustersInto(out: Float32Array, base: Float32Array, centers: Float32Array, t: number) {
  const a = t * 0.15
  const ca = Math.cos(a)
  const sa = Math.sin(a)
  for (let i = 0; i < COUNT; i++) {
    const c = clusterOf(i)
    let ox = base[i * 2]
    let oy = base[i * 2 + 1]
    if (c === 2) {
      const rx = ox * ca - oy * sa
      oy = ox * sa + oy * ca
      ox = rx
    }
    out[i * 3] = centers[c * 2] + ox
    out[i * 3 + 1] = centers[c * 2 + 1] + oy
    out[i * 3 + 2] = 0
  }
}

// ---------------------------------------------------------------- lead flow

const rp = seeded(23)
const PHASE = Float32Array.from({ length: COUNT }, () => rp())
const LANE = Float32Array.from({ length: COUNT }, () => rp() * 2 - 1)
// Evenly spaced ranks (37 and 53 are coprime with 140), so "40% captured" means 56 of 140 nodes.
const RANK = Float32Array.from({ length: COUNT }, (_, i) => (((i * 37) % COUNT) + 0.5) / COUNT)
const RANK2 = Float32Array.from({ length: COUNT }, (_, i) => (((i * 53) % COUNT) + 0.5) / COUNT)

/**
 * Animated stream: visitors flow in from the left. At the scan gate, captured contacts
 * narrow into a channel and the rest fall away. At the nurture stage, the share that
 * responds carries on as qualified leads (drawn orange); the others drop out.
 */
export function pipelineInto(
  out: Float32Array, scale: Float32Array, lead: Uint8Array,
  w: number, h: number, t: number, sim: Sim,
) {
  const speed = 0.03 + (Math.min(sim.visitors, 3000) / 3000) * 0.06
  const cap = sim.capture / 100
  const resp = sim.response / 100
  const band = wy(PIPE.band, h)
  const spread = PIPE.spread * h
  for (let i = 0; i < COUNT; i++) {
    const u = (PHASE[i] + t * speed) % 1
    const ly = LANE[i] * spread
    const captured = RANK[i] < cap
    const isLead = captured && RANK2[i] < resp
    let y = band + ly
    let s = smooth(0, 0.04, u)
    if (u > PIPE.gate) {
      if (!captured) {
        const d = (u - PIPE.gate) / (1 - PIPE.gate)
        y -= d * d * 0.6 * h
        s *= 1 - smooth(0, 0.35, d)
      } else {
        const k = smooth(PIPE.gate, PIPE.gate + 0.1, u)
        y = band + ly * (1 - 0.7 * k)
        if (u > PIPE.nurture) {
          if (!isLead) {
            const d = (u - PIPE.nurture) / (1 - PIPE.nurture)
            y -= d * d * 0.45 * h
            s *= 1 - smooth(0, 0.4, d)
          } else {
            y = band + ly * 0.3 * (1 - smooth(PIPE.nurture, 0.95, u))
          }
        }
      }
    }
    s *= 1 - smooth(0.97, 1, u)
    out[i * 3] = wx(pipeX(u), w)
    out[i * 3 + 1] = y
    out[i * 3 + 2] = 0
    scale[i] = s * (isLead && u > PIPE.nurture ? 1.5 : 1)
    lead[i] = isLead && u > PIPE.nurture ? 1 : 0
  }
}

// ---------------------------------------------------------------- CTA

/** A disc around the origin; NodeField moves it onto the CTA button each frame. */
function point(w: number, h: number): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const R = Math.min(0.07 * h, 0.12 * w)
  for (let i = 0; i < COUNT; i++) {
    const rr = R * Math.sqrt((i + 0.5) / COUNT)
    const a = i * GOLDEN
    p[i * 3] = Math.cos(a) * rr * 1.8 // wider than tall, like the button
    p[i * 3 + 1] = Math.sin(a) * rr
  }
  return p
}

export const pointDefaultY = (h: number) => wy(POINT_Y, h)

// ---------------------------------------------------------------- hero text zone

/**
 * The block of hero copy (eyebrow, headline, paragraph, toggle), as viewport fractions.
 * Hero dots that land inside it are hidden, so nothing sits behind the text.
 * On tall / narrow screens the copy spans the full width.
 */
export function inHeroText(x: number, y: number, w: number, h: number) {
  const fx = x / w + 0.5
  const fy = 0.5 - y / h
  const right = w / h > 1.1 ? 0.66 : 1.01
  return fx < right && fy > 0.12 && fy < 0.84
}

function heroMask(p: Float32Array, w: number, h: number): Float32Array {
  const m = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i++) m[i] = inHeroText(p[i * 3], p[i * 3 + 1], w, h) ? 0 : 1
  return m
}

const keepPairs = (pairs: Uint16Array, mask: Float32Array) => {
  const out: number[] = []
  for (let r = 0; r < pairs.length; r += 2) if (mask[pairs[r]] && mask[pairs[r + 1]]) out.push(pairs[r], pairs[r + 1])
  return Uint16Array.from(out)
}

// ---------------------------------------------------------------- build

export type FormationSet = {
  positions: Record<Formation, Float32Array>
  rays: Record<Formation, Uint16Array>
  scales: Record<Formation, Float32Array | null>
  clusterBase: Float32Array
  defaultCenters: Float32Array
}

export function buildFormations(w: number, h: number): FormationSet {
  const s = scatter(w, h)
  const base = clusterBase(w, h)
  const defaultCenters = Float32Array.from([wx(1 / 6, w), wy(0.45, h), 0, wy(0.45, h), wx(5 / 6, w), wy(0.45, h)])
  const initialClusters = new Float32Array(COUNT * 3)
  clustersInto(initialClusters, base, defaultCenters, 0)

  const serviceScale = new Float32Array(COUNT).fill(1)
  for (let g = 0; g < SERVICE_COUNT; g++) serviceScale[g] = 1.9

  // Hero: hide every dot behind the copy, and only link the visible ones.
  const scatterMask = heroMask(s, w, h)
  const conv = converge(w, h)
  const convergeMask = heroMask(conv, w, h)
  const visible = Array.from({ length: COUNT }, (_, i) => i).filter((i) => scatterMask[i])
  const scatterRays = Uint16Array.from(nearestPairs((i) => s[i * 3], (i) => s[i * 3 + 1], visible, 2))

  return {
    positions: {
      scatter: s,
      stand: stand(w, h),
      converge: conv,
      grid: gridLayout(COLS, ROWS, GRID.inset, w, h),
      services: services(w, h),
      clusters: initialClusters, // replaced every frame by clustersInto
      pipeline: s, // replaced every frame by pipelineInto
      point: point(w, h),
      rest: gridLayout(20, 7, 0.04, w, h),
    },
    rays: {
      scatter: scatterRays,
      stand: gridRays(COLS),
      converge: keepPairs(lineRays(), convergeMask),
      grid: gridRays(COLS),
      services: hubRays(),
      clusters: clusterRays(base),
      pipeline: new Uint16Array(),
      point: new Uint16Array(),
      rest: gridRays(20),
    },
    scales: {
      scatter: scatterMask, stand: null, converge: convergeMask, grid: null, services: serviceScale,
      clusters: null, pipeline: null, point: new Float32Array(COUNT).fill(1.3), rest: null,
    },
    clusterBase: base,
    defaultCenters,
  }
}
