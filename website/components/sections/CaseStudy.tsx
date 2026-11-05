'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { dimField } from '@/lib/field-dim'
import { CASE_STUDY_FILMS } from '@/lib/assets'
import { CASES as ALL_CASES, type CaseStudy } from '@/lib/case-studies'
import { pageHref } from '@/lib/routes'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CASES = ALL_CASES.filter((c) => c.home)

export function Film({ c, i, playingIndex, onPlay }: { c: CaseStudy; i: number; playingIndex: number | null; onPlay: (i: number | null) => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const f = CASE_STUDY_FILMS[c.film]
  const playing = playingIndex === i

  // Only one film plays at a time; a film also pauses when it scrolls out of view.
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (!playing && !v.paused) v.pause()
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting && !v.paused) v.pause() }, { threshold: 0.2 })
    io.observe(v)
    return () => io.disconnect()
  }, [playing])

  return (
    <article className="cs-card flex flex-col gap-4">
      {/* Large rounded tile: the film fills a 16:10 frame; portrait films are cropped to it until played. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] border border-mist/10 bg-night md:rounded-[28px]">
        <video
          ref={video}
          src={f.video}
          poster={f.poster}
          preload="metadata"
          playsInline
          loop
          controls={playing}
          onPlay={() => onPlay(i)}
          onPause={() => playingIndex === i && onPlay(null)}
          className={`absolute inset-0 h-full w-full ${playing && f.portrait ? 'object-contain bg-hall' : 'object-cover'} ${playing ? '' : 'cs-drift'}`}
          aria-label={`${c.client} at ${c.show}, case-study film`}
        />
        {!playing && (
          <button
            type="button"
            onClick={() => { onPlay(i); video.current?.play().catch(() => onPlay(null)) }}
            data-cursor="play"
            className="group absolute inset-0"
            aria-label={`Play the ${c.client} film`}
          >
            <span className="absolute inset-0 bg-hall/10 transition-colors group-hover:bg-hall/0" aria-hidden="true" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-mist transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 md:h-20 md:w-20" aria-hidden="true">
              <span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-mist md:border-y-[12px] md:border-l-[20px]" />
            </span>
          </button>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-4 px-1">
        <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em]">{c.client}</h3>
        <p className="text-[14px] text-steel">{c.show}</p>
      </div>
    </article>
  )
}

/** Section: two case-study films side by side as rounded tiles, each with just the client and the show. */
export function CaseStudy() {
  const section = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState<number | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The field goes dark behind the films; it only ever dims here and the sections after lift it.
        const dim = (s: ScrollTrigger) => dimField('cases', s.isActive)
        ScrollTrigger.create({ trigger: section.current, start: 'top 70%', end: 'bottom 30%', onToggle: dim, onRefresh: dim })
        gsap.fromTo('.cs-card', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: section.current, start: 'top 80%', end: 'top 40%', scrub: 0.5 } })
      })
      return () => {
        dimField('cases', false)
        mm.revert()
      }
    },
    { scope: section },
  )

  return (
    <section ref={section} id="case-study" aria-labelledby="cs-title" className="relative px-5 pb-12 pt-20 md:px-10 md:pb-16 md:pt-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:gap-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-[14px] text-steel">Case Studies</p>
            <h2 id="cs-title" className="font-display text-[clamp(2rem,4.2vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] [text-wrap:balance]">
              Shows we made count.
            </h2>
          </div>
          <a href={pageHref('case-studies')} className="group inline-flex items-center gap-2 border-b border-signal pb-1 text-[15px] font-medium text-mist transition-colors hover:text-signal">
            All Case Studies <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {CASES.map((c, i) => (
            <Film key={c.client + c.show} c={c} i={i} playingIndex={playing} onPlay={setPlaying} />
          ))}
        </div>
      </div>
    </section>
  )
}
