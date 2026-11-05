'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useField } from '@/lib/field-store'
import { dimField } from '@/lib/field-dim'
import { SERVICES } from '@/lib/content'
import { SERVICE_PHOTOS, servicePhotoStyle } from '@/lib/assets'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { serviceHref } from '@/lib/routes'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PEEK = 22 // px each card beneath peeks out below the one above it
const SHRINK = 0.02 // scale step per card beneath

/**
 * The ten services in three groups. Each group leads with one service (big photograph, name,
 * line, link) and lists the rest as small thumbnails. Indexes are into SERVICES.
 */
const GROUPS = [
  { label: 'Your stand', lead: 0, more: [1, 5, 6] }, // Stand graphics; collateral, decks, hosts
  { label: 'Your audience', lead: 3, more: [2, 4] }, // Digital ads; email, landing pages
  { label: 'Your leads', lead: 8, more: [7, 9] }, // Lead capture; photo and video, nurture
]

/**
 * Services option B: the same deck as option A (cards stack, the top one hinges up and lifts
 * away as you scroll), but with three cards, one per group, instead of ten.
 */
export function ServicesB() {
  const section = useRef<HTMLElement>(null)

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
        const dim = (s: ScrollTrigger) => dimField('servicesB', s.isActive)
        ScrollTrigger.create({ trigger: section.current, start: 'top bottom', end: 'bottom 40%', onToggle: dim, onRefresh: dim })

        const cards = gsap.utils.toArray<HTMLElement>('.svb-card')
        const n = cards.length
        const place = (d: number) => ({ y: PEEK * d, scale: 1 - SHRINK * d, autoAlpha: 1 })
        cards.forEach((card, j) => gsap.set(card, { ...place(j), zIndex: n - j, rotateX: 0, yPercent: 0, transformOrigin: '50% 100%' }))

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: `+=${(n - 1) * 70}%`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        })
        for (let i = 0; i < n - 1; i++) {
          tl.to(cards[i], { rotateX: 32, yPercent: -115, duration: 1, ease: 'power2.in' }, i)
          tl.to(cards[i], { autoAlpha: 0, duration: 0.35 }, i + 0.5)
          for (let j = i + 1; j < n; j++) tl.to(cards[j], { ...place(j - i - 1), duration: 1 }, i)
        }
        tl.to({}, { duration: 0.35 }, n - 1)

        return () => {
          setSegment('services', null)
          dimField('servicesB', false)
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

      <ol className="relative mx-auto mt-8 w-full max-w-[1100px] [perspective:1600px] motion-safe:h-[min(64svh,560px)] motion-safe:mb-[calc(2*22px)] md:mt-10">
        {GROUPS.map((g, i) => {
          const s = SERVICES[g.lead]
          return (
            <li key={g.label} className="svb-card motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-safe:h-full motion-reduce:mb-6 will-change-transform">
              <article
                className="flex h-full flex-col overflow-hidden rounded-[24px] border border-mist/12 bg-night shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:grid md:grid-cols-12 md:rounded-[28px]"
                aria-labelledby={`svb-${s.code}`}
              >
                {/* Lead photograph: left on even cards, right on odd. */}
                <div className={`relative h-[40%] shrink-0 p-[17px] md:col-span-6 md:h-full ${i % 2 ? 'md:order-2' : ''}`}>
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] md:rounded-[22px]">
                    <img src={SERVICE_PHOTOS[g.lead]} style={servicePhotoStyle(g.lead)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>

                <div className={`flex min-h-0 flex-1 flex-col justify-center gap-3 px-5 pb-5 md:col-span-6 md:gap-4 md:p-10 ${i % 2 ? 'md:order-1' : ''}`}>
                  <span className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-[-0.01em] text-mist md:text-[18px]">
                    <span className="text-signal">{String(i + 1).padStart(2, '0')}</span>
                    {g.label}
                  </span>
                  <h3 id={`svb-${s.code}`} className="font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] [text-wrap:balance]">
                    {s.name}
                  </h3>
                  <p className="max-w-[46ch] text-[14px] leading-[1.45] text-mist/75 max-md:line-clamp-2 md:text-[16px] [@media(min-width:768px)_and_(max-height:720px)]:hidden md:leading-relaxed">{s.line}</p>
                  <a
                    href={serviceHref(SERVICE_PAGES[g.lead].slug)}
                    data-cursor="open"
                    className="group inline-flex w-fit items-center gap-2 text-[14px] font-medium text-mist transition-colors hover:text-signal"
                  >
                    Read more
                    <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
                  </a>

                  {/* The rest of the group as small thumbnails. */}
                  <div className="mt-auto flex flex-col gap-2 border-t border-mist/10 pt-3 md:mt-4 md:gap-3 md:pt-5">
                    <span className="text-[12px] text-steel md:text-[13px]">Also in this group</span>
                    <ul className={`grid gap-2 md:gap-3 ${g.more.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {g.more.map((m) => (
                        <li key={m}>
                          <a href={serviceHref(SERVICE_PAGES[m].slug)} data-cursor="open" className="group flex flex-col gap-1.5">
                            <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-mist/10 md:rounded-[12px]">
                              <img src={SERVICE_PHOTOS[m]} style={servicePhotoStyle(m)} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
                            </span>
                            <span className="text-[12px] leading-tight text-mist/85 transition-colors group-hover:text-signal md:text-[13px]">
                              <span className="md:hidden">{SERVICES[m].short}</span>
                              <span className="max-md:hidden">{SERVICES[m].name}</span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
