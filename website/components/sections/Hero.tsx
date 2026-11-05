'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { PHASE_FORMATION, useField, type Phase } from '@/lib/field-store'
import { PHASES, PhaseToggle } from './PhaseToggle'
import { Crowd } from '@/components/people/Crowd'

const SLIDE_MS = 6000

/** The brand Lift: one raised orange o per headline. */
const O = ({ c = 'o' }: { c?: string }) => <span className="inline-block -translate-y-[0.18em] text-signal">{c}</span>

/** Headline and support copy per slide. Working draft; slide 1 is the agreed positioning. */
const SLIDES: Record<Phase, { lines: ReactNode[]; support: string }> = {
  pre: {
    lines: [
      <>Your Event Journey,</>,
      <>
        Managed by <O c="O" />ne Team
      </>,
    ],
    support:
      'From stand design and content creation to lead generation and exceptional people who make your brand stand out. Everything you need to maximise your event.',
  },
  at: {
    lines: [
      <>Don’t just exhibit.</>,
      <>
        Stand <O />ut.
      </>,
    ],
    support: 'Stand graphics, hosts, photography and live lead capture, so every visitor who stops is welcomed and remembered.',
  },
  post: {
    lines: [
      <>The show closes.</>,
      <>
        Your pipeline <O />pens.
      </>,
    ],
    support: 'Every conversation captured on the stand and followed up while it’s still warm, until it becomes a meeting.',
  },
}

/**
 * Section 1 — the hook. Copy is a working draft.
 * The node field behind it is the shared FieldCanvas; this component only tells it
 * which formation to show. Scroll-out is choreographed by HeroIntro.
 */
export function Hero() {
  const [phase, setPhase] = useState<Phase>('pre')
  // Auto slider: loops through the three slides. The active tab's progress bar times each
  // slide and advances when it fills. It pauses while the tabs are hovered or focused and
  // while the page is scrolled away from the hero; picking a slide restarts its timer.
  const [auto, setAuto] = useState(false)
  const [hold, setHold] = useState(false)
  const [away, setAway] = useState(false)
  const [cycle, setCycle] = useState(0)

  // Drive the field from the slide. Springs in NodeField animate the morph (about 0.9 s).
  useEffect(() => {
    useField.getState().setHeroFormation(PHASE_FORMATION[phase])
  }, [phase])

  useEffect(() => {
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const onScroll = () => setAway(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const next = () => {
    setPhase((p) => PHASES[(PHASES.findIndex((x) => x.id === p) + 1) % PHASES.length].id)
    setCycle((c) => c + 1)
  }
  const pick = (p: Phase) => {
    setPhase(p)
    setCycle((c) => c + 1)
  }

  return (
    <div className="relative flex h-full min-h-svh flex-col justify-center px-5 pb-28 pt-28 md:px-10">
      {/* Visitors walking the exhibition floor; they react to the phase toggle. */}
      <Crowd mode="hero" className="hero-fade pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative mx-auto w-full max-w-[1440px]">

        {/* Two line slots stay mounted (HeroIntro clips them on scroll); the text inside swaps per slide. */}
        <h1 className="font-display text-[clamp(2rem,5.9vw,5.4rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
          {[0, 1].map((n) => {
            const line = SLIDES[phase].lines[n]
            return (
              <span
                key={n}
                className={`hero-line -mt-[0.4em] block overflow-hidden pb-[0.08em] pt-[0.4em] ${line === undefined ? 'hidden' : ''}`}
                style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              >
                <span key={phase} className="hero-swap block" style={{ animationDelay: `${n * 70}ms` }}>
                  {line}
                </span>
              </span>
            )
          })}
        </h1>

        {/* Positioning: the lead line is the slide headline; this line says what that covers. */}
        <div className="hero-fade mt-8 flex max-w-[640px] flex-col gap-3">
          <p key={phase} className="hero-swap-fade text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-mist/75">
            {SLIDES[phase].support}
          </p>
        </div>

        <div className="mt-12">
          <PhaseToggle
            value={phase}
            onChange={pick}
            onHold={setHold}
            auto={auto}
            paused={hold || away}
            duration={SLIDE_MS}
            cycle={cycle}
            onDone={next}
          />
        </div>
      </div>

      {/* Scroll cue: the word lifts off its baseline, like the logo's O. */}
      <div className="hero-fade absolute inset-x-5 bottom-8 md:inset-x-10" aria-hidden="true">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-2">
          <span className="cue-word font-mono text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <span className="flex h-[2px] w-full">
            <span className="block h-full w-16 bg-signal" />
            <span className="block h-full flex-1 bg-mist/15" />
          </span>
        </div>
      </div>
    </div>
  )
}
