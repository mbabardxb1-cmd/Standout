'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useField } from '@/lib/field-store'
import { StoryGrid } from './StoryGrid'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const IDLE_BORDER = 'rgba(227, 232, 244, 0.15)'
const SIGNAL = '#FF5A1F'

/**
 * Section 2, How we work, as a pinned stage after Services.
 *
 * Timeline (in timeline seconds, scrubbed by about 1.3 viewports of scroll):
 *   (before the pin) heading and cells rise in as the stage scrolls into view
 *   0.00 – 0.40  field rises from rest into the story grid
 *   0.15 – 1.30  the orange border moves card to card (Prepare, Promote, Perform, Profit)
 */
export function StoryIntro() {
  const stage = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const { setSegment } = useField.getState()
        const proxy = { mix: 0 }
        const cells = gsap.utils.toArray<HTMLElement>('.story-cell')
        const counter = stage.current!.querySelector<HTMLElement>('.story-counter')

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Follow the scroll position itself, not the smoothed timeline, so the number matches the lit card.
              const t = self.progress * tl.duration()
              const step = Math.min(4, Math.max(1, Math.floor((t - 0.15) / 0.3) + 1))
              if (counter) counter.textContent = String(step).padStart(2, '0')
            },
          },
        })

        tl.to(proxy, { mix: 1, duration: 0.4, ease: 'power2.inOut', onUpdate: () => setSegment('story', { order: 2.5, from: 'rest', to: 'grid', progress: proxy.mix }) }, 0)
        // Heading and cards rise in while the stage is still scrolling up into view, before it pins,
        // so there is never a blank screen between the case studies and this section.
        gsap.set('.story-bg', { autoAlpha: 1 })
        gsap.fromTo('.story-head', { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: stage.current, start: 'top 90%', end: 'top 55%', scrub: 0.3 } })
        gsap.fromTo(cells, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: stage.current, start: 'top 85%', end: 'top 40%', scrub: 0.3 } })
        cells.forEach((cell, i) => {
          const t = 0.15 + i * 0.3
          tl.to(cell, { y: -8, borderColor: SIGNAL, duration: 0.1 }, t)
          if (i < cells.length - 1) tl.to(cell, { y: 0, borderColor: IDLE_BORDER, duration: 0.1 }, t + 0.3)
        })
        tl.to({}, { duration: 0.1 }, 1.3) // hold the final state before the pin releases

        return () => setSegment('story', null)
      })
      return () => mm.revert()
    },
    { scope: stage },
  )

  return (
    <section ref={stage} id="how-we-work" className="story-stage" aria-label="How we work">
      <StoryGrid />
    </section>
  )
}
