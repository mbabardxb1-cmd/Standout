'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { WORDMARK } from '@/lib/assets'

/**
 * Opening: the wordmark fills the screen with its O lifted high and large; the O zooms out and
 * drops into the word, then the whole mark shrinks and flies into its place in the header. The page
 * underneath is held hidden (html.intro-wait) until the mark lands. Plays once per visit; skipped
 * with reduced motion. The header's own logo appears at the exact moment this one lands on it.
 */
export function OpeningIntro() {
  const [on, setOn] = useState(false)
  const layer = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLDivElement>(null)
  const o = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    let seen = false
    try {
      seen = sessionStorage.getItem('standout-intro') === '1'
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('intro-wait')
      return
    }
    setOn(true)
  }, [])

  useEffect(() => {
    if (!on) return
    const root = document.documentElement
    const target = document.querySelector<HTMLElement>('[data-site-logo]')
    const finish = () => {
      root.classList.remove('intro-wait')
      try {
        sessionStorage.setItem('standout-intro', '1')
      } catch {}
      setOn(false)
    }
    if (!layer.current || !mark.current || !o.current || !target) return finish()

    const m = mark.current
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: finish })
    // 1. letters rise in; the O starts far above and much larger
    tl.fromTo('.oi-letter', { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.04, ease: 'power3.out' }, 0.1)
      .fromTo(o.current, { y: '-1.2em', scale: 3.2, autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, 0.3)
      // 2. the O zooms out and settles to its lifted place in the wordmark
      .to(o.current, { y: '-0.18em', scale: 1, duration: 0.9, ease: 'expo.inOut' }, 0.6)
      .to({}, { duration: 0.35 })
      // 3. the whole mark shrinks and flies to the header logo
      .add(() => {
        // Match by width and by the letters' own box (the mark's box also holds the lifted O), so the
        // S of the flying mark lands on the S of the header wordmark.
        const r = target.getBoundingClientRect()
        const b = m.getBoundingClientRect()
        const first = m.querySelector('.oi-letter')!.getBoundingClientRect()
        const s = r.width / b.width
        const cx = b.left + b.width / 2
        const cy = b.top + b.height / 2
        const sLeft = cx + (first.left - cx) * s
        const sMid = cy + ((first.top + first.bottom) / 2 - cy) * s
        gsap.to(m, { x: r.left - sLeft, y: r.top + r.height * 0.57 - sMid, scale: s, duration: 1.0, ease: 'expo.inOut' })
      })
      .to(layer.current, { backgroundColor: 'rgba(5,10,24,0)', duration: 0.7 }, '>0.3')
      // crossfade into the real header logo as the mark lands
      .set(target, { visibility: 'visible', opacity: 0 }, '>-0.25')
      .to(target, { opacity: 1, duration: 0.25, ease: 'none' }, '<')
      .to(m, { autoAlpha: 0, duration: 0.25, ease: 'none' }, '<')
      .set(target, { clearProps: 'opacity,visibility' })
    return () => {
      tl.kill()
    }
  }, [on])

  if (!on) return null
  return (
    <div ref={layer} className="fixed inset-0 z-[60] flex items-center justify-center bg-hall" aria-hidden="true">
      <div ref={mark} className="flex origin-center items-baseline font-display text-[clamp(3.5rem,12vw,11rem)] font-extrabold leading-none tracking-[-0.04em] text-mist will-change-transform">
        {['S', 'T', 'A', 'N', 'D'].map((c, i) => (
          <span key={i} className="oi-letter inline-block">{c}</span>
        ))}
        <span ref={o} className="inline-block text-signal">O</span>
        {['U', 'T'].map((c, i) => (
          <span key={i} className="oi-letter inline-block">{c}</span>
        ))}
      </div>
      {/* The real wordmark is used for the header; this text mark is only the animation. */}
      <img src={WORDMARK} alt="" className="hidden" />
    </div>
  )
}
