import { O2_APPROACH } from '@/lib/option2-content'
import { PhotoPlate } from './PhotoPlate'
import { PHOTOS } from '@/lib/assets'
import { Reveal } from './Reveal'

export function O2Approach() {
  return (
    <section id="o2-approach" aria-labelledby="o2-approach-title" className="bg-night text-mist">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-20 md:gap-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="flex flex-col gap-5 md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">
              <span className="text-signal">●</span> Our approach
            </p>
            <h2 id="o2-approach-title" className="font-display text-[clamp(2.2rem,4.6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] [text-wrap:balance]">
              Before, during and after. The show is only the middle.
            </h2>
          </Reveal>
          <Reveal delay={1} effect="wipe" parallax={24} className="md:col-span-5 md:pt-3">
            <PhotoPlate dark shot="Hall at opening hour: aisles filling, a branded stand catching the light" src={PHOTOS.handshake} ratio="4 / 3" />
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 gap-10 border-t border-mist/15 pt-10 md:grid-cols-3 md:gap-8">
          {O2_APPROACH.map((p, i) => (
            <Reveal as="li" key={p.phase} delay={i as 0 | 1 | 2} className="flex flex-col gap-4">
              <h3 className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em]">{p.phase}</h3>
              <p className="text-[15.5px] leading-relaxed text-mist/75">{p.line}</p>
            </Reveal>
          ))}
        </ol>

      </div>
    </section>
  )
}
