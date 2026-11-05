'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { StepIcon, type StepIconName } from '@/components/ui/StepIcon'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export type Step = { icon: StepIconName; title: string; line: string }

/** Three steps as cards: icon tile, step number, title and line, revealed one after another as the section arrives. */
export function HowItWorks({ steps, lead }: { steps: Step[]; lead?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const cards = gsap.utils.toArray<HTMLElement>('.hiw-card', el)
      const tiles = gsap.utils.toArray<HTMLElement>('.hiw-tile', el)
      gsap.set(cards, { autoAlpha: 0, y: 28 })
      gsap.set(tiles, { scale: 0.6, rotate: -8 })
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      })
      tl.to(cards, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.16 }, 0.1)
        .to(tiles, { scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.8)', stagger: 0.16 }, 0.2)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">How it works</h2>
          {lead && <p className="max-w-[48ch] text-[16px] leading-relaxed text-steel">{lead}</p>}
        </div>

        <div className="relative">

          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {steps.map((st, i) => (
              <li key={st.title} className="hiw-card group relative flex flex-col gap-6 border border-mist/12 bg-night/50 p-6 transition-colors duration-300 hover:border-signal/70 md:items-center md:px-8 md:pt-8 md:text-center">
                <div className="flex items-center justify-between gap-4 md:flex-col md:gap-5">
                  <span className="hiw-tile relative grid h-[72px] w-[72px] shrink-0 place-items-center bg-hall ring-1 ring-signal/60 transition-all duration-300 group-hover:bg-signal group-hover:ring-signal">
                    <StepIcon name={st.icon} className="h-8 w-8 text-signal transition-colors duration-300 group-hover:text-night" />
                  </span>
                  <span className="font-mono text-[12px] uppercase text-steel">Step {String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[21px] font-bold leading-tight tracking-[-0.02em]">{st.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mist/70">{st.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
