'use client'

/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useEffect, type CSSProperties, type ReactNode } from 'react'
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

/** Which header design the inner pages use: 'a' is the live navy band, 'b' the editorial option under review. */
export const HeroVariant = createContext<'a' | 'b'>('a')

/** Option B header: four photographs per page, keyed by the page's breadcrumb label. */
const HERO_STRIP: Record<string, string[]> = {
  About: ['/photos/included/guests-group.webp', '/photos/frames/m-talk.webp', '/photos/frames/sob-entrance.webp', PHOTOS.hostess],
  'Case Studies': ['/video/3db-yas-poster.webp', '/video/sobha-atlantis-poster.webp', '/video/dragon-ferrari-poster.webp', '/video/milkor-idex-poster.webp'],
  Packages: [PHOTOS.shellScheme, PHOTOS.print, PHOTOS.hostess, PHOTOS.eventVideography],
  Insights: ['/photos/included/stand-floor-idex.webp', '/photos/included/brochure-reader.webp', PHOTOS.contentCreation, '/photos/frames/m-screens.webp'],
  Contact: [PHOTOS.hostess, '/photos/frames/m-guests.webp', '/photos/included/stand-floor-idex.webp', '/photos/frames/m-panel.webp'],
}

/**
 * Option B header: an editorial opener. The breadcrumb and a large headline on the left, the
 * intro line set against them on the right, the page name as a faint oversized word behind, and a
 * staggered strip of four photographs from the floor underneath. Orange only on the small dot.
 */
function PageHeroB({ eyebrow, title, line, crumbs, children }: { eyebrow?: string; title: ReactNode; line?: string; crumbs?: Crumb[]; children?: ReactNode }) {
  const label = crumbs?.[crumbs.length - 1]?.label ?? ''
  const strip = HERO_STRIP[label] ?? []
  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-40">
      <img src={PHOTOS.serviceBand} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hall/30 via-hall/40 to-hall" aria-hidden="true" />
      {/* The page name, oversized and faint, behind the headline. */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-4 top-20 select-none whitespace-nowrap font-display text-[clamp(5rem,16vw,15rem)] font-extrabold leading-none tracking-[-0.05em] text-mist/[0.035] md:top-24">
        {label}
      </span>
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:gap-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-12">
          <div className="flex flex-col gap-6 md:col-span-7">
            {crumbs && <Breadcrumbs items={crumbs} />}
            {eyebrow && (
              <p className="flex items-center gap-2 text-[14px] font-medium text-mist/80">
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h1 className="max-w-[16ch] font-display text-[clamp(2.6rem,5.6vw,5.4rem)] font-bold leading-[0.96] tracking-[-0.035em] [text-wrap:balance]">{title}</h1>
          </div>
          {(line || children) && (
            <div className="flex flex-col gap-6 md:col-span-5 md:border-l md:border-mist/12 md:pb-2 md:pl-10">
              {line && <p className="text-[17px] leading-relaxed text-mist/80 md:text-[19px]">{line}</p>}
              {children}
            </div>
          )}
        </div>
        {strip.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5" aria-hidden="true">
            {strip.map((src, i) => (
              <li key={src} className={`${i > 1 ? 'max-md:hidden' : ''} ${i % 2 ? 'md:translate-y-8' : ''}`}>
                <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] md:rounded-[24px]">
                  <img src={src} alt="" fetchPriority={i < 2 ? 'high' : undefined} className="absolute inset-0 h-full w-full object-cover" />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/**
 * Page opener shared by the inner pages (About, Packages, Case Studies, Insights, Contact): the
 * breadcrumb, an optional eyebrow, the headline and an optional line on the navy band. Service
 * pages have their own full-photo header. `photo`, `photoStyle` and `aside` are accepted for the
 * older service page layout but not shown here.
 */
export function PageHero({ eyebrow, title, line, crumbs, wide = false, children }: { eyebrow?: string; title: ReactNode; line?: string; crumbs?: Crumb[]; wide?: boolean; photo?: string; photoStyle?: CSSProperties; aside?: ReactNode; children?: ReactNode }) {
  const variant = useContext(HeroVariant)
  if (variant === 'b') return <PageHeroB eyebrow={eyebrow} title={title} line={line} crumbs={crumbs}>{children}</PageHeroB>
  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-44">
      <img src={PHOTOS.serviceBand} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hall/40 via-transparent to-hall/60" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="font-mono text-[12px] uppercase text-steel">{eyebrow}</p>}
        <h1 className={`${wide ? 'max-w-[24ch]' : 'max-w-[16ch]'} font-display text-[clamp(2.3rem,4.8vw,4.4rem)] font-semibold leading-[1] tracking-[-0.025em] [text-wrap:balance]`}>{title}</h1>
        {line && <p className="max-w-[58ch] text-[17px] leading-relaxed text-mist/80 md:text-[19px]">{line}</p>}
        {children}
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
