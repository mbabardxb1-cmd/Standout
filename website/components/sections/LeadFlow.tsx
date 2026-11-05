'use client'

import { useRef } from 'react'
import { useField, type Sim } from '@/lib/field-store'
import { PIPE, pipeX } from '@/lib/formations'
import { Crowd } from '@/components/people/Crowd'
import { LeadStream } from '@/components/people/LeadStream'

const SLIDERS: { key: keyof Sim; label: string; min: number; max: number; step: number; unit: string }[] = [
  { key: 'visitors', label: 'Visitors to your stand', min: 50, max: 3000, step: 50, unit: '' },
  { key: 'capture', label: 'Captured with the data system', min: 0, max: 100, step: 5, unit: '%' },
  { key: 'manual', label: 'Captured by hand, without it', min: 0, max: 100, step: 5, unit: '%' },
  { key: 'response', label: 'Respond to post-show nurture', min: 0, max: 100, step: 1, unit: '%' },
]

const fmt = new Intl.NumberFormat('en-GB')

/**
 * Section 5: the field becomes a live stream. Visitors flow in, the scan gate keeps the
 * captured share, nurture turns the responders orange. All numbers come from the inputs.
 */
export function LeadFlow() {
  const section = useRef<HTMLElement>(null)
  const sim = useField((s) => s.sim)
  const setSim = useField((s) => s.setSim)

  const captured = Math.round((sim.visitors * sim.capture) / 100)
  const leads = Math.round((captured * sim.response) / 100)
  const manualLeads = Math.round((((sim.visitors * sim.manual) / 100) * sim.response) / 100)
  const max = Math.max(leads, manualLeads, 1)

  const bandTop = (PIPE.band - PIPE.spread) * 100
  const bandBottom = (PIPE.band + PIPE.spread) * 100
  const stages = [
    { x: pipeX(0), label: 'Stand visitors', value: fmt.format(sim.visitors), align: 'left' as const, suffix: '' },
    { x: pipeX(PIPE.gate), label: 'Scan gate', value: fmt.format(captured), suffix: ' captured', align: 'center' as const },
    { x: pipeX(PIPE.nurture), label: 'Nurture', value: `${sim.response}%`, suffix: ' respond', align: 'center' as const },
    { x: pipeX(1), label: 'Qualified leads', value: fmt.format(leads), align: 'right' as const, suffix: '' },
  ]

  return (
    <section ref={section} id="results" aria-labelledby="results-title" className="relative py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <p className="font-mono text-[12px] uppercase text-steel">
          Lead flow <span className="text-signal">·</span> try your numbers
        </p>
        <h2 id="results-title" className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,3.6vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] [text-wrap:balance]">
          From foot traffic to pipeline.
        </h2>
      </div>

      {/* The stage: stream, gates, visitors and labels share one box, so they always line up. */}
      <div className="relative mt-6 h-[clamp(280px,44svh,460px)] w-full" aria-hidden="true">
        <LeadStream className="absolute inset-0 h-full w-full" />
        <Crowd mode="flow" className="pointer-events-none absolute inset-0 h-full w-full" />
        {[PIPE.gate, PIPE.nurture].map((u) => (
          <span
            key={u}
            className="absolute w-px border-l border-dashed border-mist/25"
            style={{ left: `${pipeX(u) * 100}%`, top: `${bandTop}%`, height: `${bandBottom - bandTop}%` }}
          />
        ))}
        {stages.map((s) => (
          <span
            key={s.label}
            // On phones the two middle labels sit above the stream so the four never collide.
            className={`absolute flex flex-col gap-1 whitespace-nowrap ${s.align === 'center' ? '-translate-x-1/2 items-center top-[var(--above)] -translate-y-full md:top-[var(--below)] md:translate-y-0' : `top-[var(--below)] ${s.align === 'right' ? '-translate-x-full items-end' : 'items-start'}`}`}
            style={{ left: `${s.x * 100}%`, ['--below' as string]: `calc(${bandBottom}% + 14px)`, ['--above' as string]: `calc(${bandTop}% - 10px)` }}
          >
            <span className="font-mono text-[10.5px] uppercase text-steel md:text-[11px]">{s.label}</span>
            <span className={`font-mono text-[13px] tabular-nums md:text-[14px] ${s.label === 'Qualified leads' ? 'text-signal' : 'text-mist'}`}>{s.value}<span className="hidden md:inline">{s.suffix}</span></span>
          </span>
        ))}
      </div>

      {/* Controls and results. */}
      <div className="relative mt-6 px-5 md:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 border border-mist/15 bg-night/90 p-5 backdrop-blur md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(260px,0.8fr)] md:gap-8 md:p-7">
          {[SLIDERS.slice(0, 2), SLIDERS.slice(2)].map((group, gi) => (
            <div key={gi} className="flex flex-col gap-5">
              {group.map((s) => (
                <div key={s.key} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={`sim-${s.key}`} className="text-[14px] text-mist/85">
                      {s.label}
                    </label>
                    <output htmlFor={`sim-${s.key}`} className="font-mono text-[14px] tabular-nums text-mist">
                      {fmt.format(sim[s.key])}
                      {s.unit}
                    </output>
                  </div>
                  <input
                    id={`sim-${s.key}`}
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={sim[s.key]}
                    onChange={(e) => setSim({ [s.key]: Number(e.target.value) })}
                    className="h-6 w-full accent-signal"
                  />
                </div>
              ))}
            </div>
          ))}

          <div className="flex flex-col justify-between gap-4 border-t border-mist/15 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <p className="font-mono text-[12px] uppercase text-steel">Qualified leads</p>
              <p aria-live="polite" className="font-display text-[clamp(3rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em] text-signal tabular-nums">
                {fmt.format(leads)}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-mist/80">
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0">With the system</span>
                <span className="h-2 bg-signal" style={{ width: `${(leads / max) * 100}%` }} />
                <span className="font-mono tabular-nums">{fmt.format(leads)}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0">By hand</span>
                <span className="h-2 bg-steel/60" style={{ width: `${(manualLeads / max) * 100}%` }} />
                <span className="font-mono tabular-nums">{fmt.format(manualLeads)}</span>
              </div>
            </div>
            <p className="text-[12px] text-steel">Example figures. Change them to match your show.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
