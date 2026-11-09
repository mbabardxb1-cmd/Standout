'use client'

import { useState } from 'react'
import { PACKAGES, SERVICES } from '@/lib/content'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { useUI } from '@/lib/ui-store'
import { serviceHref } from '@/lib/routes'
import { PageShell, PageHero } from '@/components/PageShell'

const FAQ = [
  { q: 'Can we swap a service in a package?', a: 'Yes. Packages are the combinations most exhibitors ask for, not fixed bundles. Start from the nearest one and add or remove services; the quote follows.' },
  { q: 'How early should we start?', a: 'Eight weeks before the show is comfortable for the Marketing and 360 packages, because the email and ad campaigns need a run-up. Essentials can be turned around in three to four weeks, subject to the organiser’s artwork deadline.' },
  { q: 'Do you work with our stand contractor?', a: 'Yes. We design to the organiser’s shell-scheme spec and deliver print-ready files to your contractor, or we manage print and delivery through ours.' },
  { q: 'What do we get at the end?', a: 'A report: who visited, who was captured, what was sent after the show, and the meetings and pipeline that came from it. One document the board can read.' },
]

function Tick({ on }: { on: boolean }) {
  return on ? (
    <svg width="18" height="18" viewBox="0 0 18 18" role="img" aria-label="Included" className="mx-auto"><path d="M3 9.5l4 4 8-9" fill="none" stroke="#FF5A1F" strokeWidth="2" /></svg>
  ) : (
    <span className="block text-center text-steel/60" aria-label="Not included">—</span>
  )
}

/** Packages page: the three packages in full, a comparison table, build your own, and questions. */
export function PackagesPage() {
  const openContactFor = useUI((s) => s.openContactFor)
  const openContact = useUI((s) => s.openContact)
  const selected = useUI((s) => s.selected)
  const toggle = useUI((s) => s.toggleService)
  const [open, setOpen] = useState<number | null>(0)

  return (
    <PageShell>
      <PageHero crumbs={[{ label: 'Packages' }]} eyebrow="Packages" title="Pick how far you want to stand out." line="Three packages, from the essentials for a strong stand to the whole journey before, during and after the show. Or build your own from our services." />

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <ul className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PACKAGES.map((p, i) => {
            const hero = i === 2
            return (
              <li key={p.id}>
                <article aria-labelledby={`pkp-${p.id}`} className={`flex h-full flex-col gap-5 border bg-night/60 p-6 md:p-8 ${hero ? 'pk-glow border-signal/70' : 'border-mist/15'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <h2 id={`pkp-${p.id}`} className="font-display text-[clamp(2rem,3vw,3rem)] font-extrabold leading-none tracking-[-0.03em]">{p.name}</h2>
                    {p.tag && <span className="rounded-full bg-signal px-3 py-1 font-mono text-[11px] uppercase text-night">{p.tag}</span>}
                  </div>
                  <p className="text-[16px] leading-relaxed text-mist/80">{p.line}</p>
                  <div className="flex flex-col gap-3 border-t border-mist/10 pt-5">
                    <span className="font-mono text-[12px] uppercase text-steel">{p.includes.length} of {SERVICES.length} services</span>
                    <ul className="flex flex-col gap-2">
                      {SERVICES.map((s, j) => {
                        const on = p.includes.includes(j)
                        return (
                          <li key={s.code} className={`flex items-start gap-2.5 text-[14.5px] leading-snug ${on ? 'text-mist/90' : 'text-mist/30'}`}>
                            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center ${on ? 'bg-signal text-night' : 'border border-mist/20'}`} aria-hidden="true">
                              {on && <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 6.5 4.8 9 10 3" /></svg>}
                            </span>
                            {on ? <a href={serviceHref(SERVICE_PAGES[j].slug)} className="hover:text-signal">{s.cardName ?? s.name}</a> : <span className="line-through decoration-mist/30">{s.cardName ?? s.name}</span>}
                            <span className="sr-only">{on ? ' included' : ' not included'}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="mt-auto flex flex-col gap-3 pt-3">
                    <p className="text-[13px] text-steel">Quoted per show, by stand size and dates.</p>
                    <button type="button" onClick={() => openContactFor(p.id)} data-cursor="let's talk" className={`lift inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors ${hero ? 'bg-signal text-night hover:bg-mist' : 'border border-mist/30 text-mist hover:border-signal hover:text-signal'}`}>
                      Ask about {p.name} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">Side by side</h2>
            <p className="font-mono text-[11px] uppercase text-steel md:hidden">Scroll sideways <span aria-hidden="true" className="text-signal">→</span></p>
          </div>
          <div className="overflow-x-auto border border-mist/12 bg-night/50">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-mist/20 font-mono text-[12px] uppercase text-steel">
                  <th scope="col" className="sticky left-0 z-10 bg-night px-4 py-4 font-normal md:bg-transparent md:px-5">Service</th>
                  <th scope="col" className="hidden w-24 px-3 py-4 text-center font-normal md:table-cell">Phase</th>
                  {PACKAGES.map((p) => (
                    <th key={p.id} scope="col" className={`w-28 px-3 py-4 text-center font-normal ${p.tag ? 'text-signal' : ''}`}>{p.name}</th>
                  ))}
                  <th scope="col" className="w-32 px-3 py-4 text-center font-normal">My show</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s, i) => (
                  <tr key={s.code} className="border-b border-mist/10 last:border-b-0">
                    <th scope="row" className="sticky left-0 z-10 min-w-[150px] bg-night px-4 py-3.5 font-normal md:min-w-0 md:bg-transparent md:px-5">
                      <a href={serviceHref(SERVICE_PAGES[i].slug)} className="text-[14px] hover:text-signal md:text-[15px]">
                        <span className="md:hidden">{s.short}</span>
                        <span className="hidden md:inline">{s.cardName ?? s.name}</span>
                      </a>
                    </th>
                    <td className="hidden px-3 py-3.5 text-center font-mono text-[11px] uppercase text-steel md:table-cell">{s.phase}</td>
                    {PACKAGES.map((p) => (
                      <td key={p.id} className="px-3 py-3.5"><Tick on={p.includes.includes(i)} /></td>
                    ))}
                    <td className="px-3 py-3.5 text-center">
                      <input type="checkbox" checked={selected.includes(i)} onChange={() => toggle(i)} aria-label={`Add ${s.name} to my show`} className="h-5 w-5 accent-signal" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border border-mist/12 bg-night/50 p-5 md:p-6">
            <div className="flex flex-col gap-1">
              <p className="font-display text-[20px] font-bold tracking-[-0.02em]">Build your own</p>
              <p className="text-[15px] text-mist/70">{selected.length === 0 ? 'Tick the services you want in the last column, then send the list with your brief.' : `${selected.length} ${selected.length === 1 ? 'service' : 'services'} in your show: ${selected.map((i) => SERVICES[i].short).join(', ')}.`}</p>
            </div>
            <button type="button" onClick={openContact} className="cta-glow inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-semibold text-night transition-transform hover:-translate-y-0.5">
              Request a quote <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">Questions we get asked</h2>
          <ul className="flex flex-col border-t border-mist/12">
            {FAQ.map((f, i) => (
              <li key={f.q} className="border-b border-mist/12">
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className="font-display text-[18px] font-bold tracking-[-0.02em] md:text-[20px]">{f.q}</span>
                  <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center border border-mist/20 text-signal transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden text-[15.5px] leading-relaxed text-mist/75"><span className="block pb-6">{f.a}</span></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}
