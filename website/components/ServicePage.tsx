'use client'

import { useEffect } from 'react'
import { CONTACT, SERVICES } from '@/lib/content'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { PHOTOS, SERVICE_PHOTOS, servicePhotoStyle } from '@/lib/assets'
import { useUI } from '@/lib/ui-store'
import { dimField } from '@/lib/field-dim'
import { homeHref, serviceHref } from '@/lib/routes'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ContactSheet } from '@/components/overlays/ContactSheet'
import { ScrollLock } from '@/components/ui/Sheet'
import { HowItWorks } from '@/components/HowItWorks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaPanel } from '@/components/CtaPanel'

/** How each service is named in the closing headline, where the short name alone reads oddly. */
const CTA_NAME: Record<string, string> = { Nurture: 'post-event lead nurturing', Email: 'targeted email', 'Photo & video': 'photography and video', Hostesses: 'hosts and hostesses', Collateral: 'marketing collateral', 'Digital ads': 'digital advertising', 'Lead capture': 'lead capture' }

/** One service, as a page: hero with the photograph, what you get, how it works, related services and the brief form. */
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
        {/* Heading band: the service name on a navy grain. */}
        <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
          <img src={PHOTOS.serviceBand} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hall/40 via-transparent to-hall/60" aria-hidden="true" />
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6">
            <Breadcrumbs items={[{ label: 'Services', href: homeHref('services') }, { label: s.name }]} />
            <h1 className="max-w-[18ch] font-display text-[clamp(2.3rem,4.8vw,4.4rem)] font-semibold leading-[1] tracking-[-0.025em] [text-wrap:balance]">{s.name}</h1>
          </div>
        </section>

        {/* Opening: the photograph beside the intro and the two actions. */}
        <section className="px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-10">
            <div className="flex flex-col gap-6 md:col-span-6">
              <h2 className="max-w-[24ch] font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.025em] [text-wrap:balance]">{p.headline}</h2>
              <p className="max-w-[56ch] text-[17px] leading-relaxed text-mist/80 md:text-[18px]">{p.intro}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button type="button" onClick={openContact} data-cursor="let's talk" className="cta-glow inline-flex h-13 items-center gap-2.5 rounded-full bg-signal px-7 text-[15px] font-semibold text-night transition-transform hover:-translate-y-0.5">
                  Talk to us about this
                  <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-night/50 text-[13px]">→</span>
                </button>
                <button type="button" onClick={() => toggle(index)} aria-pressed={inShow} className={`inline-flex h-13 items-center gap-2 rounded-full border px-6 text-[15px] font-medium transition-colors ${inShow ? 'border-mist bg-mist text-night' : 'border-mist/20 text-mist hover:border-signal hover:text-signal'}`}>
                  {inShow ? 'In your show' : 'Add to my show'} <span aria-hidden="true">{inShow ? '✓' : '+'}</span>
                </button>
              </div>
            </div>
            <div className="relative md:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-mist/15 bg-night">
                <img src={SERVICE_PHOTOS[index]} style={servicePhotoStyle(index)} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* What you get + stat */}
        <section className="px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 border-t border-mist/10 pt-12 md:grid-cols-12 md:gap-10">
            <div className="flex flex-col gap-4 md:col-span-4">
              <p className="font-mono text-[12px] uppercase text-steel">What you get</p>
              <p className="font-display text-[clamp(2.4rem,4vw,3.8rem)] font-extrabold leading-none tracking-[-0.035em] tabular-nums">{p.stat.value}</p>
              <p className="font-mono text-[11px] uppercase text-signal">{p.stat.label}</p>
            </div>
            <ul className="flex flex-col md:col-span-8">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-4 border-b border-mist/10 py-5 text-[17px] leading-snug text-mist/90 first:border-t">
                  <span className="mt-[0.6em] h-2 w-2 shrink-0 bg-signal" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <HowItWorks steps={p.steps} lead="Three steps from brief to delivery, with one team across all of them." />

        {/* Related */}
        <section className="px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">Often taken with</h2>
              <a href={homeHref('services')} className="font-mono text-[12px] uppercase text-mist/70 hover:text-signal">All ten services →</a>
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
