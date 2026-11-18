'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
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
const VISUALS: Record<string, { side: string; items: string[]; band: { src: string; line: string }; gallery: { src: string; client: string; show: string }[] }> = {
  'photography-video': {
    side: PHOTOS.contentCreation,
    /** One picture per "What's included" item, in order (option C). */
    items: [
      '/photos/included/videographers.webp',
      PHOTOS.photographer,
      '/photos/included/interviews.webp',
      PHOTOS.contentCreation,
      '/photos/included/highlight-film.webp',
      '/photos/included/same-day.webp',
    ],
    band: { src: '/photos/band-crowd-filming.webp', line: 'Captured as it happens, posted while it still matters.' },
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
  const selected = useUI((st) => st.selected)
  const toggle = useUI((st) => st.toggleService)
  const inShow = selected.includes(index)

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
        <section className="relative isolate flex min-h-[462px] items-end overflow-hidden md:min-h-[66svh]">
          <img src={SERVICE_PHOTOS[index]} style={servicePhotoStyle(index)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-hall via-hall/30 to-hall/40" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-hall/70 via-transparent to-transparent" aria-hidden="true" />
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 md:px-10 md:pb-20">
            <h1 className="max-w-[20ch] font-display text-[clamp(2rem,5.2vw,5.25rem)] font-bold leading-[0.92] tracking-[-0.035em] [text-wrap:balance]">{s.name}</h1>
          </div>
        </section>

        {/* Intro: the promise on the left, the detail and actions on the right. */}
        <section className="px-5 py-20 md:px-10 md:py-32">
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
                  Talk to us about this
                  <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-night/50 text-[13px]">→</span>
                </button>
                <button type="button" onClick={() => toggle(index)} aria-pressed={inShow} className={`inline-flex h-13 items-center gap-2 rounded-full border px-6 text-[15px] font-medium transition-colors ${inShow ? 'border-mist bg-mist text-night' : 'border-mist/20 text-mist hover:border-signal hover:text-signal'}`}>
                  {inShow ? 'In your show' : 'Add to my show'} <span aria-hidden="true">{inShow ? '✓' : '+'}</span>
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
                      <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-hall/80 font-display text-[14px] font-bold text-signal backdrop-blur-sm">{String(i + 1).padStart(2, '0')}</span>
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
              <p className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1] tracking-[-0.03em] [text-wrap:balance]">{v.band.line}</p>
            </div>
          </section>
        )}

        {/* Process: a timeline, one step after another along a line. */}
        <section className="px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em]">How it works</h2>
              <p className="max-w-[44ch] text-[16px] leading-relaxed text-steel">{p.steps.length} steps from brief to delivery, with one team across all of them.</p>
            </div>
            <ol className={`relative grid grid-cols-1 gap-10 md:gap-8 ${p.steps.length >= 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
              {/* The line the steps sit on: down the left on phones, across the top on wider screens. */}
              <span className="pointer-events-none absolute bottom-2 left-[11px] top-2 w-px bg-mist/15 md:bottom-auto md:left-0 md:right-0 md:top-[11px] md:h-px md:w-auto" aria-hidden="true" />
              {p.steps.map((st, i) => (
                <li key={st.title} className="relative flex flex-col gap-3 pl-10 md:pl-0 md:pt-12">
                  <span className="absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full border border-signal bg-hall" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-signal" />
                  </span>
                  <span className="text-[13px] font-medium text-signal">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-[21px] font-bold leading-tight tracking-[-0.02em]">{st.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mist/70">{st.line}</p>
                </li>
              ))}
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
