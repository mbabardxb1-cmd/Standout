'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useField } from '@/lib/field-store'
import { useUI } from '@/lib/ui-store'
import { dimField } from '@/lib/field-dim'
import { SERVICES } from '@/lib/content'
import { SERVICE_PHOTOS, servicePhotoStyle } from '@/lib/assets'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { serviceHref } from '@/lib/routes'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PEEK = 22 // px each card beneath peeks out below the one above it
const SHRINK = 0.02 // scale step per card beneath
const VISIBLE = 3 // how many cards show beneath the current one

/**
 * Services layout F (option 3): a deck of cards pinned in the middle of the screen. The current
 * card sits on top with the next few peeking out beneath it; as you scroll, the top card hinges
 * up from its bottom edge and lifts away, and the one beneath rises to take its place.
 */
export function ServicesF() {
  const section = useRef<HTMLElement>(null)
  const selected = useUI((s) => s.selected)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const { setSegment } = useField.getState()
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top bottom',
          end: 'top 40%',
          onUpdate: (s) => setSegment('services', { order: 2, from: 'grid', to: 'rest', progress: s.progress }),
          onRefresh: (s) => setSegment('services', { order: 2, from: 'grid', to: 'rest', progress: s.progress }),
        })
        // The field stays dark for the whole deck: nothing should sit behind the cards.
        const dim = (s: ScrollTrigger) => dimField('servicesF', s.isActive)
        ScrollTrigger.create({ trigger: section.current, start: 'top bottom', end: 'bottom 40%', onToggle: dim, onRefresh: dim })

        const cards = gsap.utils.toArray<HTMLElement>('.sv7-card')
        const n = cards.length
        const place = (d: number) => ({ y: PEEK * d, scale: 1 - SHRINK * d, autoAlpha: d <= VISIBLE ? 1 : 0 })
        cards.forEach((card, j) => gsap.set(card, { ...place(j), zIndex: n - j, rotateX: 0, yPercent: 0, transformOrigin: '50% 100%' }))

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: `+=${(n - 1) * 60}%`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        })
        for (let i = 0; i < n - 1; i++) {
          // The top card hinges up from its bottom edge and lifts off; it fades at the very end.
          tl.to(cards[i], { rotateX: 32, yPercent: -115, duration: 1, ease: 'power2.in' }, i)
          tl.to(cards[i], { autoAlpha: 0, duration: 0.35 }, i + 0.5)
          // Every card beneath moves up one place in the deck.
          for (let j = i + 1; j < Math.min(i + VISIBLE + 3, n); j++) tl.to(cards[j], { ...place(j - i - 1), duration: 1 }, i)
        }
        tl.to({}, { duration: 0.35 }, n - 1) // hold the last card before the pin releases

        return () => {
          setSegment('services', null)
          dimField('servicesF', false)
        }
      })
      return () => mm.revert()
    },
    { scope: section },
  )

  return (
    <section ref={section} id="services" aria-labelledby="services-title" className="relative px-5 pb-10 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-4 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Our services</p>
        <h2 id="services-title" className="max-w-[22ch] font-display text-[clamp(1.7rem,3vw,2.8rem)] font-extrabold leading-[0.98] tracking-[-0.03em] [text-wrap:balance]">
          Everything your show needs, from one team.
        </h2>
      </div>

      {/* The deck: every card sits in the same place; motion stacks and peels them. Without motion they simply flow. */}
      <ol className="relative mx-auto mt-8 w-full max-w-[1100px] [perspective:1600px] motion-safe:h-[min(58svh,520px)] motion-safe:mb-[calc(3*22px)] md:mt-10">
        {SERVICES.map((s, i) => {
          const inShow = selected.includes(i)
          return (
            <li key={s.code} className="sv7-card motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-safe:h-full motion-reduce:mb-6 will-change-transform">
              <article
                className="flex h-full flex-col overflow-hidden rounded-[24px] border border-mist/12 bg-night shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:grid md:grid-cols-12 md:rounded-[28px]"
                aria-labelledby={`sv7-${s.code}`}
              >
                {/* Photograph: left on even cards, right on odd. */}
                <div className={`relative h-[36%] shrink-0 p-[17px] md:col-span-6 md:h-full ${i % 2 ? 'md:order-2' : ''}`}>
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] md:rounded-[22px]">
                    <img src={SERVICE_PHOTOS[i]} style={servicePhotoStyle(i)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
                <div className={`flex min-h-0 flex-1 flex-col justify-center gap-4 p-6 md:col-span-6 md:gap-5 md:p-10 ${i % 2 ? 'md:order-1' : ''}`}>
                  <span className="font-mono text-[12px] text-steel">({String(i + 1).padStart(2, '0')})</span>
                  <h3 id={`sv7-${s.code}`} className="font-display text-[clamp(1.5rem,2.8vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] [text-wrap:balance]">
                    {s.name}
                  </h3>
                  <p className="max-w-[46ch] text-[14px] leading-snug text-mist/75 md:text-[16px] md:leading-relaxed">{s.line}</p>
                  <a
                    href={serviceHref(SERVICE_PAGES[i].slug)}
                    data-cursor="open"
                    className="group inline-flex w-fit items-center gap-2 border-b border-signal pb-1 text-[14px] font-medium text-mist transition-colors hover:text-signal"
                  >
                    {inShow ? 'In your show · Read more' : 'Read more'}
                    <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
