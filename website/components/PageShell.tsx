'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, type CSSProperties, type ReactNode } from 'react'
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

/**
 * Page opener shared by the inner pages: the breadcrumb, an optional eyebrow, the headline, an
 * optional line and any actions on the left; a large photograph on the right, with an optional
 * figure floating on its corner. Without a photograph the text runs full width.
 */
export function PageHero({
  eyebrow,
  title,
  line,
  crumbs,
  wide = false,
  photo,
  photoStyle,
  aside,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  line?: string
  crumbs?: Crumb[]
  wide?: boolean
  photo?: string
  photoStyle?: CSSProperties
  /** Floats on the photograph's lower-left corner, e.g. a key figure. */
  aside?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
      <img src={PHOTOS.serviceBand} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-hall/30 via-transparent to-hall" aria-hidden="true" />
      {/* A soft orange glow behind the photograph. */}
      {photo && <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-signal/10 blur-[120px]" aria-hidden="true" />}
      <div className={`relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 ${photo ? 'md:grid-cols-12 md:items-center md:gap-12' : ''}`}>
        <div className={`flex flex-col gap-6 ${photo ? 'md:col-span-7' : ''}`}>
          {crumbs && <Breadcrumbs items={crumbs} />}
          {eyebrow && (
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-mist/20 bg-hall/40 px-3.5 py-1.5 text-[13px] font-medium text-mist/90">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className={`${wide ? 'max-w-[22ch]' : 'max-w-[16ch]'} font-display text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.03em] [text-wrap:balance]`}>{title}</h1>
          {line && <p className="max-w-[56ch] text-[17px] leading-relaxed text-mist/80 md:text-[19px]">{line}</p>}
          {children}
        </div>
        {photo && (
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-mist/12 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] md:aspect-[4/5] md:rounded-[32px]">
              <img src={photo} style={photoStyle} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hall/50 via-transparent to-transparent" aria-hidden="true" />
            </div>
            {aside && <div className="absolute -bottom-6 left-5 md:-left-8 md:bottom-10">{aside}</div>}
          </div>
        )}
      </div>
    </section>
  )
}

/** A key figure in a small card, for PageHero's `aside`. */
export function HeroFigure({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex max-w-[240px] flex-col gap-1 rounded-[18px] border border-mist/12 bg-night/95 px-5 py-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur">
      <span className="font-display text-[30px] font-extrabold leading-none tracking-[-0.03em] text-mist">{value}</span>
      <span className="text-[13px] leading-snug text-steel">{label}</span>
    </div>
  )
}
