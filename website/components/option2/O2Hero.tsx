'use client'

import type React from 'react'
import { O2_HERO, O2_SECTORS } from '@/lib/option2-content'
import { useUI } from '@/lib/ui-store'
import { PhotoPlate } from './PhotoPlate'
import { PHOTOS } from '@/lib/assets'
import { Reveal } from './Reveal'

/** Editorial split hero: copy on the left, a cinematic plate running off the right edge. */
export function O2Hero() {
  const openContact = useUI((s) => s.openContact)
  return (
    <section id="o2-top" className="relative overflow-hidden pt-[72px]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 pb-10 pt-12 md:grid-cols-12 md:gap-8 md:px-10 md:pb-16 md:pt-20">
        <div className="flex flex-col justify-center gap-8 md:col-span-6 lg:col-span-5">
          <p className="font-mono text-[12px] uppercase text-slate">
            <span className="text-signal">●</span> {O2_HERO.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.9rem,7vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.035em] [text-wrap:balance]">
            {['Make', 'Every', 'Exhibition'].map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <span className="o2-word-in inline-block" style={{ animationDelay: `${i * 90}ms` }}>{w}</span>
              </span>
            )).reduce<React.ReactNode[]>((acc, el, i) => (i ? [...acc, ' ', el] : [el]), [])}{' '}
            <span className="-mt-[0.15em] inline-block overflow-hidden pb-[0.08em] pt-[0.15em] align-top">
              <span className="o2-word-in inline-block" style={{ animationDelay: '270ms' }}>
                C<span className="relative -top-[0.12em] inline-block text-signal">o</span>unt.
              </span>
            </span>
          </h1>
          <p className="o2-rise max-w-[46ch] text-[17px] leading-relaxed text-slate md:text-[18px]" style={{ animationDelay: '480ms' }}>{O2_HERO.support}</p>
          <div className="o2-rise flex flex-wrap gap-3" style={{ animationDelay: '600ms' }}>
            <button type="button" onClick={openContact} className="lift h-13 bg-signal px-6 text-[15px] font-semibold text-paper hover:bg-night">
              {O2_HERO.primary}
            </button>
            <a href="#o2-services" className="lift inline-flex h-13 items-center border border-night/25 px-6 text-[15px] font-medium text-night hover:border-signal hover:text-signal">
              {O2_HERO.secondary}
            </a>
          </div>
        </div>

        <div className="relative md:col-span-6 lg:col-span-7">
          {/* The plate bleeds past the grid to the viewport edge on wide screens. */}
          <div className="o2-hero-plate relative md:-mr-10 lg:-mr-[calc((100vw-1440px)/2+40px)]">
            <Reveal parallax={30}>
              <PhotoPlate shot={O2_HERO.photo} src={PHOTOS[O2_HERO.src]} ratio="16 / 11" captionTop className="md:aspect-[16/11] lg:aspect-[4/3]" />
            </Reveal>
            <Reveal delay={2} className="pointer-events-none absolute -bottom-6 left-5 hidden max-w-[300px] border border-night/10 bg-paper p-5 md:block lg:left-10">
              <p className="font-mono text-[11px] uppercase text-slate">On the floor</p>
              <p className="mt-2 font-display text-[22px] font-bold leading-tight tracking-[-0.02em]">
                The right visitors, planned in. Every conversation captured.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Sector marquee */}
      <div className="border-y border-night/10">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-8 overflow-hidden px-5 py-4 md:px-10">
          <span className="shrink-0 font-mono text-[11px] uppercase text-slate">Sectors</span>
          <div className="o2-marquee flex min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-label={O2_SECTORS.join(', ')}>
            {[0, 1].map((k) => (
              <ul key={k} className="o2-marquee-track flex shrink-0 items-center gap-10 pr-10 text-[14px] text-night/70" aria-hidden={k === 1}>
                {O2_SECTORS.map((sec) => (
                  <li key={sec} className="flex items-center gap-10 whitespace-nowrap">
                    {sec} <span className="h-1 w-1 bg-signal" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
