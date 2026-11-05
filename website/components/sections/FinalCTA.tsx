'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useUI } from '@/lib/ui-store'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { usePhotos } from '@/lib/photos-context'
import { PHOTOS } from '@/lib/assets'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Section 6: particles across the section gather round the button and turn orange. */
export function FinalCTA() {
  const section = useRef<HTMLElement>(null)
  const openContact = useUI((s) => s.openContact)
  const photos = usePhotos()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.cta-line',
          { yPercent: 40, autoAlpha: 0.15 },
          {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: section.current, start: 'top 85%', end: 'center 60%', scrub: 0.5 },
          },
        )
        // Option 3: with the photograph behind the headline, the background field fades out from
        // here to the end of the page so its quiet grid doesn't sit over the picture.
        if (photos) {
          const root = document.documentElement
          ScrollTrigger.create({
            trigger: section.current,
            start: 'top 70%',
            end: 'max',
            onToggle: (s) => root.classList.toggle('field-off', s.isActive),
          })
          return () => root.classList.remove('field-off')
        }
      })
      return () => mm.revert()
    },
    { scope: section },
  )

  return (
    <section
      ref={section}
      id="contact"
      aria-labelledby="cta-title"
      className="relative flex min-h-svh flex-col items-center justify-center px-5 py-32 text-center md:px-10"
    >
      {photos && (
        <div className="cta-photo pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <img src={PHOTOS.handshake} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.22]" />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center gap-10">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Your next show</p>
        <h2
          id="cta-title"
          className="max-w-[14ch] font-display text-[clamp(2.75rem,7.6vw,8.5rem)] font-extrabold leading-[0.92] tracking-[-0.035em]"
        >
          <span className="cta-line block">Ready to dominate</span>
          <span className="cta-line block">
            your next <span className="text-signal">exhibition?</span>
          </span>
        </h2>
        <p className="max-w-[44ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-mist/80">
          Tell us the show and the date. We’ll come back with a plan and a quote.
        </p>
        <div data-cta-button className="relative">
          <MagneticButton onClick={openContact}>Plan your show</MagneticButton>
        </div>
      </div>
    </section>
  )
}
