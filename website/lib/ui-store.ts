import { create } from 'zustand'
import type Lenis from 'lenis'

type UIState = {
  /** Services the visitor has added to their show (à la carte). */
  selected: number[]
  toggleService: (i: number) => void
  drawerService: number | null
  openService: (i: number) => void
  closeService: () => void
  compareOpen: boolean
  compareMode: 'packages' | 'custom'
  openCompare: (mode?: 'packages' | 'custom') => void
  setCompareMode: (mode: 'packages' | 'custom') => void
  closeCompare: () => void
  contactOpen: boolean
  /** Package id the brief form opens with preselected, if any. */
  contactPackage: string | null
  openContact: () => void
  /** Open the brief form with a package preselected. */
  openContactFor: (packageId: string) => void
  closeContact: () => void
  /** Mobile navigation panel. */
  menuOpen: boolean
  setMenu: (open: boolean) => void
  lenis: Lenis | null
  setLenis: (l: Lenis | null) => void
}

export const useUI = create<UIState>((set) => ({
  selected: [],
  toggleService: (i) =>
    set((s) => ({
      selected: s.selected.includes(i) ? s.selected.filter((x) => x !== i) : [...s.selected, i].sort((a, b) => a - b),
    })),
  drawerService: null,
  openService: (i) => set({ drawerService: i }),
  closeService: () => set({ drawerService: null }),
  compareOpen: false,
  compareMode: 'packages',
  openCompare: (mode) => set((s) => ({ compareOpen: true, compareMode: mode ?? s.compareMode })),
  setCompareMode: (compareMode) => set({ compareMode }),
  closeCompare: () => set({ compareOpen: false }),
  contactOpen: false,
  contactPackage: null,
  openContact: () => set({ contactOpen: true, contactPackage: null, drawerService: null, compareOpen: false, menuOpen: false }),
  openContactFor: (packageId) => set({ contactOpen: true, contactPackage: packageId, drawerService: null, compareOpen: false, menuOpen: false }),
  closeContact: () => set({ contactOpen: false }),
  menuOpen: false,
  setMenu: (menuOpen) => set({ menuOpen }),
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
}))

/** Smooth-scroll to a section by id (native jump when smooth scroll is off). */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = useUI.getState().lenis
  if (lenis) lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView()
}
