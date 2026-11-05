import { create } from 'zustand'
import { hasWebGL } from './webgl'

/** Layouts the shared node field can take. Every formation places the same 140 nodes. */
export type Formation =
  | 'scatter' // hero: pre-event
  | 'stand' // hero: at the event
  | 'converge' // hero: post-event
  | 'grid' // story: shell-scheme floor plan
  | 'services' // 10 service hubs on a baseline
  | 'clusters' // 3 package constellations
  | 'pipeline' // lead-flow particle stream (animated)
  | 'point' // CTA: everything converges
  | 'rest' // footer: calm wide grid

/** The three hero phases and the formation each one shows. */
export type Phase = 'pre' | 'at' | 'post'
export const PHASE_FORMATION: Record<Phase, Formation> = {
  pre: 'scatter',
  at: 'stand',
  post: 'converge',
}

/**
 * One scroll-driven morph. Each section registers its own; the one with the highest
 * `order` that has started (progress > 0) wins. That keeps the field correct even
 * when the visitor jumps straight to an anchor far down the page and back.
 * `from: 'hero'` means "whatever the hero toggle currently shows".
 */
export type Segment = { order: number; from: Formation | 'hero'; to: Formation; progress: number }

export type Sim = { visitors: number; capture: number; manual: number; response: number }
export const DEFAULT_SIM: Sim = { visitors: 500, capture: 40, manual: 15, response: 20 }

type FieldState = {
  heroFormation: Formation
  segments: Record<string, Segment>
  activeService: number | null
  activePackage: number | null
  /** Package constellation centres in viewport px, measured from the DOM. */
  clusterCenters: [number, number][] | null
  /** CTA button centre in viewport px, measured from the DOM. */
  pointCenter: [number, number] | null
  sim: Sim
  /** True when the WebGL field cannot run (no WebGL, or it crashed). Sections then draw their own stills. */
  fieldFallback: boolean
  /** Services formation shows only the nine hub centres (no satellites or rays). Option 3. */
  hubsOnly: boolean
  setHeroFormation: (f: Formation) => void
  setSegment: (id: string, s: Segment | null) => void
  setActiveService: (i: number | null) => void
  setActivePackage: (i: number | null) => void
  setClusterCenters: (c: [number, number][] | null) => void
  setPointCenter: (c: [number, number] | null) => void
  setSim: (patch: Partial<Sim>) => void
  setFieldFallback: (on: boolean) => void
  setHubsOnly: (on: boolean) => void
}

export const useField = create<FieldState>((set) => ({
  heroFormation: 'scatter',
  segments: {},
  activeService: null,
  activePackage: null,
  clusterCenters: null,
  pointCenter: null,
  sim: DEFAULT_SIM,
  fieldFallback: !hasWebGL(),
  hubsOnly: false,
  setHeroFormation: (heroFormation) => set({ heroFormation }),
  setSegment: (id, s) =>
    set((st) => {
      const segments = { ...st.segments }
      if (s) segments[id] = s
      else delete segments[id]
      return { segments }
    }),
  setActiveService: (activeService) => set({ activeService }),
  setActivePackage: (activePackage) => set({ activePackage }),
  setClusterCenters: (clusterCenters) => set({ clusterCenters }),
  setPointCenter: (pointCenter) => set({ pointCenter }),
  setSim: (patch) => set((st) => ({ sim: { ...st.sim, ...patch } })),
  setFieldFallback: (fieldFallback) => set({ fieldFallback }),
  setHubsOnly: (hubsOnly) => set({ hubsOnly }),
}))

export function resolveMorph(segments: Record<string, Segment>): {
  from: Formation | 'hero'
  to: Formation
  mix: number
} {
  let best: Segment | null = null
  for (const id in segments) {
    const s = segments[id]
    if (s.progress > 0 && (!best || s.order > best.order)) best = s
  }
  return best ? { from: best.from, to: best.to, mix: best.progress } : { from: 'hero', to: 'grid', mix: 0 }
}
// The canvas reads this with useField.getState() inside useFrame,
// so scroll updates never trigger React re-renders.
