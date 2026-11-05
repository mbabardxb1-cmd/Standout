'use client'

import type { Phase } from '@/lib/field-store'

export const PHASES: { id: Phase; label: string; line: string }[] = [
  { id: 'pre', label: 'Pre-Event', line: 'Plan, design, invite the right people.' },
  { id: 'at', label: 'At the Event', line: 'Be the stand the crowd walks towards.' },
  { id: 'post', label: 'Post-Event', line: 'Every scanned badge leaves as a lead.' },
]

type Props = {
  value: Phase
  onChange: (phase: Phase) => void
  /** Hovering or focusing the tabs holds the current slide. */
  onHold: (hold: boolean) => void
  /** Auto slider on (off with reduced motion). */
  auto: boolean
  paused: boolean
  duration: number
  /** Changes whenever a slide starts, so its progress bar restarts from zero. */
  cycle: number
  onDone: () => void
}

/** Segmented control built on real radio inputs: arrow keys and screen readers work for free. */
export function PhaseToggle({ value, onChange, onHold, auto, paused, duration, cycle, onDone }: Props) {
  const current = PHASES.find((p) => p.id === value)!

  return (
    <div className="hero-fade flex flex-col gap-4">
      <style href="hero-slide" precedence="default">{`@keyframes hero-slide { from { transform: scaleX(0) } to { transform: scaleX(1) } } @keyframes hero-line { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }`}</style>
      <fieldset
        className="inline-flex w-fit border border-mist/20 p-1"
        onPointerEnter={() => onHold(true)}
        onPointerLeave={() => onHold(false)}
        onFocus={() => onHold(true)}
        onBlur={() => onHold(false)}
      >
        <legend className="sr-only">Preview your show</legend>
        {PHASES.map((p) => {
          const active = p.id === value
          return (
            <label
              key={p.id}
              data-cursor="preview"
              className={`relative cursor-pointer whitespace-nowrap px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] sm:px-4 sm:text-[12px] sm:tracking-[0.12em] transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal md:px-5 ${
                active ? 'bg-mist text-night' : 'text-mist/70 hover:text-mist'
              }`}
            >
              <input
                type="radio"
                name="phase"
                value={p.id}
                checked={active}
                onChange={() => onChange(p.id)}
                className="sr-only"
              />
              {active && (
                <span aria-hidden="true" className="absolute -top-[5px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signal" />
              )}
              {p.label}
              {/* Slide timer: fills over the slide's duration, then advances. */}
              {active && auto && (
                <span
                  key={cycle}
                  aria-hidden="true"
                  onAnimationEnd={onDone}
                  className="absolute inset-x-0 bottom-0 block h-[3px] origin-left bg-signal"
                  style={{ animation: `hero-slide ${duration}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              )}
            </label>
          )
        })}
      </fieldset>
      {/* Screen readers still hear which slide is showing. */}
      <p key={value} aria-live="polite" className="sr-only">{current.label}. {current.line}</p>
    </div>
  )
}
