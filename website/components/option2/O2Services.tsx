'use client'

import { O2_SERVICES, type O2Service } from '@/lib/option2-content'
import { useUI } from '@/lib/ui-store'
import { PhotoPlate } from './PhotoPlate'
import { PHOTOS } from '@/lib/assets'
import { Reveal } from './Reveal'

function Items({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={it} className="border border-night/15 px-3 py-1.5 text-[13.5px] text-night/80">{it}</li>
      ))}
    </ul>
  )
}

function Ask({ name }: { name: string }) {
  const openContact = useUI((s) => s.openContact)
  return (
    <button type="button" onClick={openContact} className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase text-night transition-colors hover:text-signal">
      Talk to us about {name.split(' ')[0].toLowerCase() === 'exhibition' ? 'this' : name.split(' & ')[0].toLowerCase()}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
    </button>
  )
}

/** Feature row: plate on one side, copy on the other. `flip` puts the plate on the right. */
function FeatureRow({ s, flip = false }: { s: O2Service; flip?: boolean }) {
  return (
    <article className="o2-card grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
      <Reveal effect="wipe" parallax={28} className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <PhotoPlate shot={s.photo} src={PHOTOS[s.src]} ratio="16 / 10" />
      </Reveal>
      <Reveal delay={1} className={`flex flex-col justify-center gap-6 md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <h3 className="font-display text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">{s.name}</h3>
        <div className="o2-rule" />
        <p className="text-[16px] leading-relaxed text-slate">{s.intro}</p>
        <Items items={s.items} />
        <Ask name={s.name} />
      </Reveal>
    </article>
  )
}

/** Image card: tall plate with the copy beneath, used in pairs. */
function ImageCard({ s, delay = 0 }: { s: O2Service; delay?: 0 | 1 }) {
  return (
    <Reveal as="article" delay={delay} className="o2-card flex flex-col gap-6">
      <Reveal effect="wipe" parallax={18}>
        <PhotoPlate shot={s.photo} src={PHOTOS[s.src]} ratio="4 / 3" />
      </Reveal>
      <div className="flex flex-col gap-5">
        <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">{s.name}</h3>
        <div className="o2-rule" />
        <p className="text-[16px] leading-relaxed text-slate">{s.intro}</p>
        <Items items={s.items} />
        <Ask name={s.name} />
      </div>
    </Reveal>
  )
}

export function O2Services() {
  const [s1, s2, s3, s4, s5, s6] = O2_SERVICES
  return (
    <section id="o2-services" aria-labelledby="o2-services-title" className="border-t border-night/10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-20 md:gap-24 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="font-mono text-[12px] uppercase text-slate">
              <span className="text-signal">●</span> Services
            </p>
          </Reveal>
          <Reveal delay={1} className="flex flex-col gap-5 md:col-span-8">
            <h2 id="o2-services-title" className="font-display text-[clamp(2.2rem,4.6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] [text-wrap:balance]">
              Six services. One team.
            </h2>
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-slate">Take the full programme or the pieces you need, all planned around your show dates.</p>
          </Reveal>
        </div>

        <FeatureRow s={s1} />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          <ImageCard s={s2} />
          <ImageCard s={s3} delay={1} />
        </div>
        <FeatureRow s={s4} flip />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          <ImageCard s={s5} />
          <ImageCard s={s6} delay={1} />
        </div>
      </div>
    </section>
  )
}
