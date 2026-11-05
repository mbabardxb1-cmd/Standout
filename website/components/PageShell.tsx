'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, type ReactNode } from 'react'
import { PHOTOS } from '@/lib/assets'
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs'
import { useUI } from '@/lib/ui-store'
import { dimField } from '@/lib/field-dim'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ContactSheet } from '@/components/overlays/ContactSheet'
import { ScrollLock } from '@/components/ui/Sheet'

/** Chrome shared by the inner pages: header, footer, the brief form, and a dark background field. */
export function PageShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    dimField('page', true)
    const lenis = useUI.getState().lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    return () => dimField('page', false)
  }, [])

  return (
    <>
      <SiteHeader home={false} />
      <main id="top" className="relative">
        {children}
      </main>
      <SiteFooter home={false} />
      <ContactSheet />
      <ScrollLock />
    </>
  )
}

/** Page opener: eyebrow, headline and an optional line, shared by the inner pages. */
export function PageHero({ eyebrow, title, line, crumbs, wide = false, children }: { eyebrow?: string; title: ReactNode; line?: string; crumbs?: Crumb[]; wide?: boolean; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-44">
      <img src={PHOTOS.serviceBand} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hall/40 via-transparent to-hall/60" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">{eyebrow}</p>}
        <h1 className={`${wide ? 'max-w-[24ch]' : 'max-w-[16ch]'} font-display text-[clamp(2.3rem,4.8vw,4.4rem)] font-semibold leading-[1] tracking-[-0.025em] [text-wrap:balance]`}>{title}</h1>
        {line && <p className="max-w-[58ch] text-[17px] leading-relaxed text-mist/80 md:text-[19px]">{line}</p>}
        {children}
      </div>
    </section>
  )
}
