'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useField } from '@/lib/field-store'
import { StoryGrid } from './StoryGrid'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Section 2, How we work, after the case studies. It scrolls like any other section (no pin):
 * as it comes into view the field rises from rest into the grid behind the cards, and the
 * heading and the four cards rise in together.
 */
export function StoryIntro() {
  const stage = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const { setSegment } = useField.getState()
        const cells = gsap.utils.toArray<HTMLElement>('.story-cell')

        ScrollTrigger.create({
          trigger: stage.current,
          start: 'top bottom',
          end: 'top top',
          onUpdate: (self) => setSegment('story', { order: 2.5, from: 'rest', to: 'grid', progress: gsap.parseEase('power2.inOut')(self.progress) }),
        })
        gsap.set('.story-bg', { autoAlpha: 1 })
        gsap.fromTo('.story-head', { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: stage.current, start: 'top 90%', end: 'top 55%', scrub: 0.3 } })
        gsap.fromTo(cells, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: stage.current, start: 'top 85%', end: 'top 40%', scrub: 0.3 } })

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
