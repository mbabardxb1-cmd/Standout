'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useField } from '@/lib/field-store'
import { Hero } from './Hero'
import { AgencyIntro } from './AgencyIntro'
import { dimField } from '@/lib/field-dim'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Section 1 + the "Who we are" statement, as one pinned stage.
 *
 * Timeline (in timeline seconds, scrubbed by about 1.25 viewports of scroll):
 *   0.00 – 0.50  headline lines clip away upward along their baseline
 *   0.30 – end   the node field goes dark; the services deck keeps it dark from the hand-over
 *   0.35 – 1.05  "Who we are": each word brightens from a dull glow to full light
 *   0.72 – 1.10  the four figures rise in beneath and count up
  *   0.90 – 1.50  field morphs from the hero formation into the grid, ready for the sections below
 *   1.25         pin releases with the statement still on screen; it scrolls away with the stage
 * Scrolling back reverses every step exactly. How we work follows the Services section (StoryIntro).
 */
export function HeroIntro() {
  const stage = useRef<HTMLElement>(null)
  const heroLayer = useRef<HTMLDivElement>(null)
  const aboutLayer = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const { setSegment } = useField.getState()
        const proxy = { mix: 0 }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top top',
            end: '+=125%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const t = self.progress * tl.duration()
              // The field goes dark behind the statement and returns as the grid forms (a class, because the
              // canvas mounts lazily and lives outside this stage; the CSS transition does the fade).
              // Dark until the pin releases; the services deck takes over the dimming from there.
              dimField('intro', t > 0.3 && self.progress < 1)
            },
          },
        })

        // Field: hero formation -> grid (the grid formation also dims the field so the copy wins).
        tl.to(
          proxy,
          {
            mix: 1,
            duration: 0.6,
            ease: 'power2.inOut',
            onUpdate: () => setSegment('intro', { order: 1, from: 'hero', to: 'grid', progress: proxy.mix }),
          },
          0.9, // waits while the statement is on screen, then lands as the grid takes over
        )

        // Hero exits: lines clip upward, supporting copy lifts and fades.
        tl.to('.hero-line', { clipPath: 'inset(0% 0% 100% 0%)', yPercent: -35, duration: 0.45, stagger: 0.06, ease: 'power2.in' }, 0)
          .to('.hero-fade', { autoAlpha: 0, y: -24, duration: 0.3, stagger: 0.04 }, 0)
          .set(heroLayer.current, { pointerEvents: 'none' }, 0.5)

        // Who we are: dull light brightens word by word, holds, then lifts away before the grid lands.
        const words = gsap.utils.toArray<HTMLElement>('.about-word')
        tl.set(aboutLayer.current, { autoAlpha: 1 }, 0.35)
          .fromTo('.about-eyebrow', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.35)
          .fromTo(
            words,
            { autoAlpha: 0.14, color: '#3a4663', textShadow: '0 0 0 rgba(255,255,255,0)' },
            { autoAlpha: 1, color: '#e3e8f4', textShadow: '0 0 24px rgba(227,232,244,0.28)', duration: 0.35, stagger: 0.012, ease: 'power2.out' },
            0.4,
          )
          .to(words, { textShadow: '0 0 0 rgba(255,255,255,0)', duration: 0.25 }, 1.05)

        // The figures rise in under the statement as its last words light, and count up to their values.
        tl.fromTo('.about-stat', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.05, ease: 'power2.out' }, 0.72)
        gsap.utils.toArray<HTMLElement>('.about-num').forEach((el, i) => {
          const end = Number(el.dataset.value)
          const o = { v: 0 }
          tl.to(o, { v: end, duration: 0.28, ease: 'power2.out', onUpdate: () => (el.textContent = String(Math.round(o.v))) }, 0.74 + i * 0.04)
        })
        // The statement and figures stay on screen; the pin releases and the stage scrolls away with
        // them still visible, so there is no empty screen before the services.
        tl.to({}, { duration: 0.05 }, 1.2)

        return () => {
          setSegment('intro', null)
          dimField('intro', false)
        }
      })

      return () => mm.revert()
    },
    { scope: stage },
  )

  return (
    <section ref={stage} className="intro-stage" aria-label="Introduction">
      <div ref={heroLayer} className="hero-layer">
        <Hero />
      </div>
      <div ref={aboutLayer} className="about-layer">
        <AgencyIntro />
      </div>
    </section>
  )
}
