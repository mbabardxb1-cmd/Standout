'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { StepIcon } from '@/components/ui/StepIcon'
import { CONTACT, SERVICES } from '@/lib/content'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { PHOTOS, SERVICE_PHOTOS, servicePhotoStyle } from '@/lib/assets'
import { useUI } from '@/lib/ui-store'
import { dimField } from '@/lib/field-dim'
import { homeHref, pageHref, serviceHref } from '@/lib/routes'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ContactSheet } from '@/components/overlays/ContactSheet'
import { ScrollLock } from '@/components/ui/Sheet'
import { CtaPanel } from '@/components/CtaPanel'

/** Extra pictures for the option B layout, per service slug. Falls back to the service photograph. */
const VISUALS: Record<string, { side: string; items: string[]; steps: string[]; band: { src: string; line: string }; gallery: { src: string; client: string; show: string }[] }> = {
  'photography-video': {
    side: PHOTOS.contentCreation,
    /** One picture per "What's included" item, in order (option C). */
    items: [
      '/photos/included/videographers.webp',
      PHOTOS.eventPhotography,
      '/photos/included/interviews.webp',
      PHOTOS.contentCreation,
      '/photos/included/highlight-film.webp',
      '/photos/included/on-stage.webp',
    ],
    /** One picture per process step, in order. */
    steps: [
      '/photos/included/guests-group.webp',
      '/photos/included/interviews.webp',
      '/photos/included/videographers.webp',
      '/photos/included/on-stage.webp',
      '/photos/included/highlight-film.webp',
    ],
    band: { src: '/photos/band-exhibition.webp', line: 'Captured as it happens, posted while it still matters.' },
    gallery: [
      { src: '/video/3db-yas-poster.webp', client: '3DB', show: 'F1 The Movie · Abu Dhabi premiere' },
      { src: '/video/sobha-atlantis-poster.webp', client: 'Sobha', show: 'Atlantis, Dubai' },
      { src: '/video/dragon-ferrari-poster.webp', client: 'Dragon Racing', show: 'Ferrari experience · Abu Dhabi' },
      { src: '/video/dpworld-tour-poster.webp', client: 'DP World', show: 'DP World Tour' },
    ],
  },
}

/**
 * Service page, option B: a full-bleed photograph with only the heading, then open, editorial
 * sections with pictures (no card grids): intro, what's included beside a tall photo, a
 * full-width image band, the process as a timeline, work from the floor, related services.
 * Option C is the same page with a picture, title and description for every included item.
 */
export function ServicePageB({ index, variant = 'b' }: { index: number; variant?: 'b' | 'c' }) {
  const s = SERVICES[index]
  const p = SERVICE_PAGES[index]
  const v = VISUALS[p.slug]
  const openContact = useUI((st) => st.openContact)

  // How it works: the step nearest the middle of the screen is the active one.
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveStep(Number((e.target as HTMLElement).dataset.step))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    stepRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [index])

  useEffect(() => {
    dimField('service-page', true)
    const lenis = useUI.getState().lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    return () => dimField('service-page', false)
  }, [index])

  return (
    <>
      <SiteHeader home={false} />
      <main id="top" className="relative">
        {/* Header: the photograph edge to edge, and only the heading. */}
        <section className="relative isolate flex min-h-[508px] items-end overflow-hidden md:min-h-[73svh]">
          <img src={SERVICE_PHOTOS[index]} style={servicePhotoStyle(index)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-hall/75 via-hall/15 to-hall/40" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-hall/70 via-transparent to-transparent" aria-hidden="true" />
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 md:px-10 md:pb-20">
            <h1 className="max-w-[20ch] font-display text-[clamp(1.5rem,3.9vw,3.95rem)] font-bold leading-[0.92] tracking-[-0.035em] [text-wrap:balance]">{s.name}</h1>
          </div>
        </section>

        {/* Intro: the promise on the left, the detail and actions on the right. */}
        <section className="px-5 pb-20 pt-12 md:px-10 md:pb-32 md:pt-16">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
            <div className="flex flex-col gap-5 md:col-span-6">
              <p className="flex items-center gap-2 text-[14px] font-medium text-signal">
                {p.eyebrow}
              </p>
              <h2 className="font-display text-[clamp(2rem,3.8vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">{p.headline}</h2>
            </div>
            <div className="flex flex-col gap-8 md:col-span-6 md:pt-10">
              <p className="text-[18px] leading-relaxed text-mist/80 md:text-[20px]">{p.intro}</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={openContact} data-cursor="let's talk" className="cta-glow inline-flex h-13 items-center gap-2.5 rounded-full bg-signal px-7 text-[15px] font-semibold text-night transition-transform hover:-translate-y-0.5">
                  Contact us
                  <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-night/50 text-[13px]">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* What's included, option C: every item with its own picture, title and description. */}
        {variant === 'c' && v ? (
          <section className="px-5 pb-20 md:px-10 md:pb-32">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
                <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">What’s included</h2>
                <p className="max-w-[46ch] text-[16px] leading-relaxed text-steel">{s.line}</p>
              </div>
              <ol className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {p.included.map((it, i) => (
                  <li key={it.title} className="group flex flex-col gap-5">
                    <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[24px]">
                      <img src={v.items[i] ?? SERVICE_PHOTOS[index]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                    </span>
                    <div className="flex flex-col gap-2 pr-4">
                      <h3 className="font-display text-[clamp(1.3rem,1.8vw,1.6rem)] font-bold leading-tight tracking-[-0.02em]">{it.title}</h3>
                      <p className="text-[16px] leading-relaxed text-mist/70">{it.line}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : (
          // What's included, option B: a tall photograph beside an open, numbered list.
        <section className="px-5 pb-20 md:px-10 md:pb-32">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] md:sticky md:top-28">
                <img src={v?.side ?? SERVICE_PHOTOS[index]} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: '22% 50%' }} />
              </div>
            </div>
            <div className="flex flex-col gap-10 md:col-span-7">
              <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">What’s included</h2>
              <ol className="flex flex-col">
                {p.included.map((it, i) => (
                  <li key={it.title} className="group grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-mist/12 py-7 last:border-b md:grid-cols-[5rem_1fr]">
                    <span className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-none text-signal/80 transition-colors group-hover:text-signal">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.6rem)] font-bold leading-tight tracking-[-0.02em]">{it.title}</h3>
                      <p className="max-w-[52ch] text-[16px] leading-relaxed text-mist/70">{it.line}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        )}

        {/* Image band: one photograph edge to edge, with a single line over it. */}
        {v && (
          <section className="relative isolate flex min-h-[420px] items-center overflow-hidden md:min-h-[70svh]">
            <img src={v.band.src} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-hall/90 via-hall/50 to-hall/10" aria-hidden="true" />
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
              <div className="flex flex-col items-start gap-8">
                <p className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1] tracking-[-0.03em] [text-wrap:balance]">{v.band.line}</p>
                <button type="button" onClick={openContact} data-cursor="let's talk" className="cta-glow inline-flex h-13 items-center gap-2.5 rounded-full bg-signal px-7 text-[15px] font-semibold text-night transition-transform hover:-translate-y-0.5">
                  Contact us
                  <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-night/50 text-[13px]">→</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Process: a photograph that stays in view on the left and changes with the step; the steps
            on the right light up one by one as you scroll, along a line that fills in orange. */}
        <section className="px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <div className="flex flex-col gap-8 md:sticky md:top-28">
                <div className="flex flex-col gap-3">
                  <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">How it works</h2>
                  <p className="max-w-[44ch] text-[16px] leading-relaxed text-steel">From brief to delivery, with one team across all of it.</p>
                </div>
                {v && (
                  <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-[28px] md:block">
                    {v.steps.map((src, i) => (
                      <img key={src + i} src={src} alt="" className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${i === activeStep ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`} />
                    ))}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hall/70 via-transparent to-transparent" aria-hidden="true" />
                    <p className="absolute bottom-6 left-6 right-6 font-display text-[clamp(1.4rem,2vw,1.9rem)] font-bold leading-tight tracking-[-0.02em]">{p.steps[activeStep]?.title}</p>
                  </div>
                )}
              </div>
            </div>
            <ol className="relative flex flex-col md:col-span-6">
              {/* The line: grey all the way down, orange up to the active step. */}
              <span className="pointer-events-none absolute bottom-0 left-[23px] top-0 w-px bg-mist/15" aria-hidden="true" />
              <span className="pointer-events-none absolute left-[23px] top-0 w-px bg-signal transition-all duration-700 ease-out" style={{ height: `${((activeStep + 1) / p.steps.length) * 100}%` }} aria-hidden="true" />
              {p.steps.map((st, i) => {
                const on = i <= activeStep
                const current = i === activeStep
                return (
                  <li key={st.title} ref={(el) => { stepRefs.current[i] = el }} data-step={i} className="relative flex gap-6 pb-14 last:pb-0 md:min-h-[38svh] md:pb-0">
                    <span className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${current ? 'border-signal bg-signal text-night' : on ? 'border-signal bg-hall text-signal' : 'border-mist/20 bg-hall text-mist/50'}`}>
                      <StepIcon name={st.icon} className="h-5 w-5" />
                    </span>
                    <div className={`flex flex-col gap-3 pt-2 transition-opacity duration-500 ${current ? 'opacity-100' : 'md:opacity-45'}`}>
                      <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.02em]">{st.title}</h3>
                      <p className="max-w-[44ch] text-[16px] leading-relaxed text-mist/75 md:text-[17px]">{st.line}</p>
                      {v?.steps[i] && (
                        <span className="relative mt-3 block aspect-[16/10] w-full overflow-hidden rounded-[20px] md:hidden">
                          <img src={v.steps[i]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                        </span>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* Work from the floor: real films, as pictures. */}
        {v && (
          <section className="px-5 pb-20 md:px-10 md:pb-32">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">From the floor</h2>
                <a href={pageHref('case-studies')} className="group inline-flex items-center gap-2 text-[15px] font-medium text-mist hover:text-signal">
                  All Case Studies <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
                {v.gallery.map((g, i) => (
                  <li key={g.src} className={i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : 'md:col-span-6'}>
                    <a href={pageHref('case-studies')} className="group flex flex-col gap-3">
                      <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-[22px] md:aspect-auto md:h-[clamp(260px,30vw,440px)]">
                        <img src={g.src} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                      </span>
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-[18px] font-bold tracking-[-0.01em]">{g.client}</span>
                        <span className="text-[14px] text-steel">{g.show}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related services: picture and name, no frames. */}
        <section className="px-5 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 border-t border-mist/12 pt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">Often taken with</h2>
              <a href={homeHref('services')} className="group inline-flex items-center gap-2 text-[15px] font-medium text-mist hover:text-signal">
                All services <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {p.related.map((ri) => {
                const r = SERVICES[ri]
                return (
                  <li key={r.code}>
                    <a href={serviceHref(SERVICE_PAGES[ri].slug)} className="group flex flex-col gap-4">
                      <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[22px]">
                        <img src={SERVICE_PHOTOS[ri]} style={servicePhotoStyle(ri)} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                      </span>
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-display text-[20px] font-bold leading-tight tracking-[-0.015em] group-hover:text-signal">{r.cardName ?? r.name}</span>
                        <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto w-full max-w-[1440px]">
            <CtaPanel
              label={`Plan your show · ${s.short}`}
              title={<>Put photo, video and content on your next show.</>}
              line="Tell us the show and the date. We’ll come back with a plan."
              secondary={
                <a href={CONTACT.phoneHref} className="inline-flex h-13 items-center rounded-full border border-mist/20 px-6 text-[15px] font-medium text-mist transition-colors hover:border-signal hover:text-signal">
                  Call {CONTACT.phone}
                </a>
              }
            />
          </div>
        </section>
      </main>
      <SiteFooter home={false} />
      <ContactSheet />
      <ScrollLock />
    </>
  )
}
