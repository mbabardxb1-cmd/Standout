'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useField } from '@/lib/field-store'
import { PACKAGES, SERVICES } from '@/lib/content'
import { useUI } from '@/lib/ui-store'
import { Constellation } from '@/components/people/Constellation'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Intersection 2 + Section 4. As the cards scroll in, the nine service hubs fly apart into
 * three constellations that settle inside the card windows. Window centres are measured
 * every frame, so this works without pinning at any screen size. 360 keeps orbiting.
 */
export function Packages() {
  const section = useRef<HTMLElement>(null)
  const windows = useRef<(HTMLDivElement | null)[]>([])
  const openCompare = useUI((s) => s.openCompare)
  const openContactFor = useUI((s) => s.openContactFor)
  const setActivePackage = useField((s) => s.setActivePackage)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const { setSegment, setClusterCenters } = useField.getState()

        // Live window centres in viewport px, measured every frame while the section is near,
        // so the constellations land in the windows wherever the cards are on screen.
        let live = false
        const measure = () => {
          if (!live) return
          setClusterCenters(
            windows.current.map((el) => {
              const r = el!.getBoundingClientRect()
              return [r.left + r.width / 2, r.top + r.height / 2] as [number, number]
            }),
          )
        }
        gsap.ticker.add(measure)
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (s) => {
            live = s.isActive
            measure()
          },
        })

        // In: the nine service hubs break apart and fly into the three card windows.
        ScrollTrigger.create({
          trigger: '.pk-list',
          start: 'top bottom',
          end: 'top 55%',
          onUpdate: (s) => setSegment('packages', {
              order: 3,
              // How we work leaves the field as the story grid.
              from: 'grid',
              to: 'clusters',
              progress: s.progress,
            }),
        })
        // Out: once the cards scroll away, the field settles into a quiet grid.
        ScrollTrigger.create({
          trigger: '.pk-list',
          start: 'bottom 35%',
          end: 'bottom top',
          onUpdate: (s) => setSegment('packagesOut', { order: 3.5, from: 'clusters', to: 'rest', progress: s.progress }),
        })

        gsap.fromTo(
          '.pk-card',
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.pk-list', start: 'top 92%', end: 'top 50%', scrub: 0.6 },
          },
        )
        return () => {
          gsap.ticker.remove(measure)
          setSegment('packages', null)
          setSegment('packagesOut', null)
          setClusterCenters(null)
        }
      })
      return () => mm.revert()
    },
    { scope: section },
  )

  return (
    <section ref={section} id="packages" aria-labelledby="packages-title" className="relative">
      <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center gap-10 px-5 py-24 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[720px] flex-col gap-4">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">
              Packages <span className="text-signal">·</span> or build your own
            </p>
            <h2 id="packages-title" className="font-display text-[clamp(2rem,4.2vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] [text-wrap:balance]">
              Pick how far you want to stand out.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openCompare('custom')}
              className="lift h-12 rounded-full border border-mist/25 px-5 text-[15px] font-medium hover:border-signal"
            >
              Build your own
            </button>
          </div>
        </div>

        <ul className="pk-list grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end md:gap-6">
          {PACKAGES.map((p, i) => {
            const hero = i === 2
            return (
              <li key={p.id} className="pk-card">
                <article
                  tabIndex={0}
                  aria-labelledby={`pk-${p.id}`}
                  onPointerEnter={() => setActivePackage(i)}
                  onPointerLeave={() => setActivePackage(null)}
                  onFocus={() => setActivePackage(i)}
                  onBlur={() => setActivePackage(null)}
                  className={`lift relative flex flex-col border ${
                    hero ? 'pk-glow border-signal/70' : 'border-mist/15 hover:border-mist/40'
                  }`}
                >
                  {/* Window: the package's constellation forms here. */}
                  <div
                    ref={(el) => {
                      windows.current[i] = el
                    }}
                    className={`relative border-b border-mist/10 ${hero ? 'h-[clamp(170px,26svh,250px)]' : 'h-[clamp(130px,19svh,190px)]'}`}
                    aria-hidden="true"
                  >
                    <Constellation index={i as 0 | 1 | 2} className="absolute inset-0 h-full w-full" />
                    {p.tag && (
                      <span className="absolute left-5 top-5 rounded-full bg-signal px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-night">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 bg-night/85 p-6 backdrop-blur-sm md:p-7">
                    <h3 id={`pk-${p.id}`} className="font-display text-[clamp(1.9rem,2.8vw,2.75rem)] font-extrabold leading-none tracking-[-0.03em]">
                      {p.name}
                    </h3>
                    <p className="min-h-[3em] text-[15.5px] leading-relaxed text-mist/80">{p.line}</p>
                    <div className="flex flex-col gap-3 border-t border-mist/10 pt-4">
                      <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-steel">
                        {p.includes.length} of {SERVICES.length} services included
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {SERVICES.map((s, j) => {
                          const on = p.includes.includes(j)
                          return (
                            <li key={s.code} className={`flex items-start gap-2.5 text-[13.5px] leading-snug ${on ? 'text-mist/90' : 'text-mist/30'}`}>
                              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center ${on ? 'bg-signal text-night' : 'border border-mist/20'}`} aria-hidden="true">
                                {on && <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 6.5 4.8 9 10 3" /></svg>}
                              </span>
                              <span className={on ? '' : 'line-through decoration-mist/30'}>{s.cardName ?? s.name}</span>
                              <span className="sr-only">{on ? ' included' : ' not included'}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openContactFor(p.id)}
                      data-cursor="let's talk"
                      className={`lift mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors ${
                        hero ? 'bg-signal text-night hover:bg-mist' : 'border border-mist/30 text-mist hover:border-signal hover:text-signal'
                      }`}
                    >
                      Ask about {p.name} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
