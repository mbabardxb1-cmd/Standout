import { O2_OUTCOMES } from '@/lib/option2-content'
import { PhotoPlate } from './PhotoPlate'
import { PHOTOS } from '@/lib/assets'
import { Reveal } from './Reveal'

export function O2Outcomes() {
  return (
    <section id="o2-results" aria-labelledby="o2-results-title">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-5 py-20 md:grid-cols-12 md:gap-10 md:px-10 md:py-28">
        <Reveal effect="wipe" parallax={20} className="md:col-span-5">
          <PhotoPlate shot="Stand team debrief at close of day, lead report on screen" src={PHOTOS.print} contain="#e2e4ea" ratio="3 / 4" className="md:sticky md:top-[96px]" />
        </Reveal>
        <div className="flex flex-col gap-10 md:col-span-7 md:pl-6">
          <Reveal className="flex flex-col gap-5">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-slate">
              <span className="text-signal">●</span> Results
            </p>
            <h2 id="o2-results-title" className="font-display text-[clamp(2.2rem,4.6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] [text-wrap:balance]">
              Measured in meetings, not footfall.
            </h2>
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-slate">Every programme ends with a report, so you see what the show returned in your own numbers.</p>
          </Reveal>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-8 border-t border-night/10 pt-8 sm:grid-cols-2">
            {O2_OUTCOMES.map((o, i) => (
              <Reveal key={o.label} delay={(i % 2) as 0 | 1} className="flex flex-col gap-2">
                <dt className="order-2 font-mono text-[12px] uppercase tracking-[0.14em] text-signal">{o.label}</dt>
                <dd className="order-1 font-display text-[clamp(2.6rem,4.5vw,4rem)] font-extrabold leading-none tracking-[-0.04em] [font-variant-numeric:tabular-nums]">
                  {o.value}
                </dd>
                <dd className="order-3 text-[14.5px] leading-relaxed text-slate">{o.note}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="text-[13px] text-slate/80">Example figures for this design. To be replaced with Standout’s own results.</p>
        </div>
      </div>
    </section>
  )
}
