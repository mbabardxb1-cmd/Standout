'use client'

import { useEffect } from 'react'
import { CONTACT, SERVICES } from '@/lib/content'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { SERVICE_PHOTOS, servicePhotoStyle } from '@/lib/assets'
import { useUI } from '@/lib/ui-store'
import { dimField } from '@/lib/field-dim'
import { homeHref, serviceHref } from '@/lib/routes'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ContactSheet } from '@/components/overlays/ContactSheet'
import { ScrollLock } from '@/components/ui/Sheet'
import { HowItWorks } from '@/components/HowItWorks'
import { PageHero, HeroFigure } from '@/components/PageShell'
import { CtaPanel } from '@/components/CtaPanel'

/** How each service is named in the closing headline, where the short name alone reads oddly. */
const CTA_NAME: Record<string, string> = { Nurture: 'post-event lead nurturing', 'Email & LinkedIn': 'an email and LinkedIn campaign', 'Photo, video & content': 'photo, video and content', Hostesses: 'trained hosts and hostesses', Collateral: 'marketing collateral', 'Digital ads': 'digital advertising', 'Lead capture': 'lead capture', 'Social media': 'social media management' }

/** One service, as a page: header with the photograph, what's included, the process, goals, related services and the brief form. */
export function ServicePage({ index }: { index: number }) {
  const s = SERVICES[index]
  const p = SERVICE_PAGES[index]
  const openContact = useUI((st) => st.openContact)
  const selected = useUI((st) => st.selected)
  const toggle = useUI((st) => st.toggleService)
  const inShow = selected.includes(index)
  const prev = (index + SERVICES.length - 1) % SERVICES.length
  const next = (index + 1) % SERVICES.length

  // The background field stays dark on service pages; the photograph carries the page.
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
        {/* Header: what the service is, the two actions, and its photograph with the key figure. */}
        <PageHero
          crumbs={[{ label: 'Services', href: homeHref('services') }, { label: s.name }]}
          eyebrow={p.eyebrow}
          title={s.name}
          wide
          photo={SERVICE_PHOTOS[index]}
          photoStyle={servicePhotoStyle(index)}
          aside={<HeroFigure value={p.stat.value} label={p.stat.label} />}
        >
          <p className="max-w-[30ch] font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-mist [text-wrap:balance]">{p.headline}</p>
          <p className="max-w-[58ch] text-[16px] leading-relaxed text-mist/75 md:text-[17px]">{p.intro}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={openContact} data-cursor="let's talk" className="cta-glow inline-flex h-13 items-center gap-2.5 rounded-full bg-signal px-7 text-[15px] font-semibold text-night transition-transform hover:-translate-y-0.5">
              Talk to us about this
              <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-night/50 text-[13px]">→</span>
            </button>
            <button type="button" onClick={() => toggle(index)} aria-pressed={inShow} className={`inline-flex h-13 items-center gap-2 rounded-full border px-6 text-[15px] font-medium transition-colors ${inShow ? 'border-mist bg-mist text-night' : 'border-mist/20 text-mist hover:border-signal hover:text-signal'}`}>
              {inShow ? 'In your show' : 'Add to my show'} <span aria-hidden="true">{inShow ? '✓' : '+'}</span>
            </button>
          </div>
        </PageHero>

        {/* What's included: one card per part of the service. */}
        <section className="px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:gap-14">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">What’s included</h2>
              <p className="max-w-[46ch] text-[16px] leading-relaxed text-steel">{s.line}</p>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {p.included.map((it, i) => (
                <li key={it.title} className="group flex flex-col gap-4 rounded-[20px] border border-mist/12 bg-night/60 p-6 transition-colors duration-300 hover:border-signal/60 md:p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-signal/50 font-display text-[14px] font-bold text-signal transition-colors group-hover:bg-signal group-hover:text-night">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.015em]">{it.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mist/70">{it.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works: the full process. */}
        <HowItWorks steps={p.steps} lead={`${p.steps.length} steps from brief to delivery, with one team across all of them.`} />

        {/* Goals, where the service has them. */}
        {p.goals && (
          <section className="px-5 py-16 md:px-10 md:py-20">
            <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 rounded-[28px] border border-mist/12 bg-night/60 p-6 md:grid-cols-12 md:gap-12 md:p-12">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em] [text-wrap:balance] md:col-span-4">{p.goals.title}</h2>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:col-span-8">
                {p.goals.items.map((g) => (
                  <li key={g.title} className="flex flex-col gap-2 border-t border-mist/12 pt-5">
                    <h3 className="flex items-center gap-2.5 font-display text-[19px] font-bold tracking-[-0.015em]">
                      <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                      {g.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-mist/70">{g.line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related */}
        <section className="px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">Often taken with</h2>
              <a href={homeHref('services')} className="font-mono text-[12px] uppercase text-mist/70 hover:text-signal">All services →</a>
            </div>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6">
              {p.related.map((ri) => {
                const r = SERVICES[ri]
                return (
                  <li key={r.code}>
                    <a href={serviceHref(SERVICE_PAGES[ri].slug)} className="group flex flex-col gap-4 border border-mist/15 bg-night/70 p-4 transition-colors hover:border-signal">
                      <span className="relative block aspect-[16/10] w-full overflow-hidden">
                        <img src={SERVICE_PHOTOS[ri]} style={servicePhotoStyle(ri)} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="font-display text-[18px] font-bold leading-tight tracking-[-0.015em]">{r.cardName ?? r.name}</span>
                        <span className="font-mono text-[11px] uppercase text-steel">{r.phase}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Prev / next + closing */}
        <section className="px-5 pb-24 pt-10 md:px-10 md:pb-32">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
            <nav aria-label="Other services" className="grid grid-cols-2 gap-4 border-y border-mist/10 py-5">
              <a href={serviceHref(SERVICE_PAGES[prev].slug)} className="group flex flex-col gap-1 font-mono text-[11px] uppercase text-steel hover:text-signal">
                <span><span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">←</span> Previous</span>
                <span className="font-sans text-[15px] normal-case tracking-normal text-mist">{SERVICES[prev].short}</span>
              </a>
              <a href={serviceHref(SERVICE_PAGES[next].slug)} className="group flex flex-col items-end gap-1 text-right font-mono text-[11px] uppercase text-steel hover:text-signal">
                <span>Next <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
                <span className="font-sans text-[15px] normal-case tracking-normal text-mist">{SERVICES[next].short}</span>
              </a>
            </nav>
            <CtaPanel
              label={`Plan your show · ${s.short}`}
              title={<>Put {CTA_NAME[s.short] ?? s.short.toLowerCase()} on your next show.</>}
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
