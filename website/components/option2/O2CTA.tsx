'use client'

import { useUI } from '@/lib/ui-store'
import { PhotoPlate } from './PhotoPlate'
import { PHOTOS } from '@/lib/assets'
import { Reveal } from './Reveal'

export function O2CTA() {
  const openContact = useUI((s) => s.openContact)
  return (
    <section id="o2-contact" aria-labelledby="o2-cta-title" className="bg-hall text-mist">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-5 py-20 md:grid-cols-12 md:gap-10 md:px-10 md:py-28">
        <Reveal className="flex flex-col gap-8 md:col-span-7">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Your next show</p>
          <h2 id="o2-cta-title" className="font-display text-[clamp(2.4rem,5.4vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.035em] [text-wrap:balance]">
            Tell us the show and the date. We’ll come back with a plan.
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-mist/75">
            A 30-minute call is enough to scope the stand, the campaign and the team you need. No obligation, and a written quote
            within a week.
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={openContact} className="lift h-13 bg-signal px-6 text-[15px] font-semibold text-paper hover:bg-mist hover:text-night">
              Discuss Your Next Exhibition
            </button>
            <a href="#o2-services" className="lift inline-flex h-13 items-center border border-mist/30 px-6 text-[15px] font-medium text-mist hover:border-signal hover:text-signal">
              Explore Our Services
            </a>
          </div>
        </Reveal>
        <Reveal delay={1} effect="wipe" parallax={24} className="md:col-span-5">
          <PhotoPlate dark shot="Handshake at the stand counter, badges visible, hall lights behind" src={PHOTOS.leadCapture} ratio="4 / 5" />
        </Reveal>
      </div>
    </section>
  )
}
