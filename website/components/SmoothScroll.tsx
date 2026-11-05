'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUI } from '@/lib/ui-store'

gsap.registerPlugin(ScrollTrigger)

/** Inertial scroll kept in lockstep with ScrollTrigger. Off for reduced motion. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Pins depend on final text sizes: measure again once the fonts are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    useUI.getState().setLenis(lenis)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      useUI.getState().setLenis(null)
    }
  }, [])

  return <>{children}</>
}
