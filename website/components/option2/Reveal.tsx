'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/**
 * Scroll motion for option 2. Content is visible at rest; JS adds the hidden start state only when
 * the visitor allows motion.
 *  - default: fade and lift in
 *  - effect="wipe": the block is revealed by a wipe from the bottom (photographs)
 *  - parallax: the child drifts slowly against the scroll (a signed strength in px)
 */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, effect = 'lift', parallax = 0, children }: { as?: ElementType; className?: string; delay?: 0 | 1 | 2 | 3; effect?: 'lift' | 'wipe'; parallax?: number; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cleanups: (() => void)[] = []
    const r = el.getBoundingClientRect()
    if (r.top >= window.innerHeight * 0.9) {
      el.classList.add(effect === 'wipe' ? 'o2-pre-wipe' : 'o2-pre')
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('o2-in')
            io.disconnect()
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      )
      io.observe(el)
      cleanups.push(() => io.disconnect())
    }
    if (parallax) {
      const inner = el.firstElementChild as HTMLElement | null
      if (inner) {
        let raf = 0
        const tick = () => {
          raf = 0
          const b = el.getBoundingClientRect()
          const vh = window.innerHeight
          const t = (b.top + b.height / 2 - vh / 2) / vh // -1..1 across the viewport
          inner.style.transform = `translate3d(0, ${(-t * parallax).toFixed(1)}px, 0)`
        }
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
        tick()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) })
      }
    }
    return () => cleanups.forEach((c) => c())
  }, [effect, parallax])
  return (
    <Tag ref={ref} className={className} data-delay={delay || undefined}>
      {children}
    </Tag>
  )
}
