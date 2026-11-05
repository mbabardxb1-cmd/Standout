/**
 * Who we are: one statement about the agency and the four figures, shown between the hero and
 * the services. Inside the pinned intro stage HeroIntro drives it: each word brightens from a
 * dull glow to full light as the headline leaves, the figures count up beneath, then the whole
 * statement dissolves as the grid lands. With reduced motion it is a normal section in the flow.
 */
/** The agency statement, also used on the About page. */
export const AGENCY_STATEMENT =
  'We’re your all-in-one creative event team, specialising in event branding, marketing, stand design and lead generation. From concept to execution, we make your brand stand out at every event.'

/** STANDOUT's figures, as supplied. */
export const AGENCY_STATS = [
  { value: 150, unit: '+', label: 'Events delivered', line: 'Creating memorable event experiences' },
  { value: 50, unit: '+', label: 'Brands supported', line: 'Helping brands stand out' },
  { value: 10, unit: '+', label: 'Years of experience', line: 'Bringing creative ideas to life' },
  { value: 360, unit: '°', label: 'Event solutions', line: 'From concept to execution' },
]

export function AgencyIntro() {
  return (
    <section id="about" aria-labelledby="about-title" className="about-stage flex min-h-svh flex-col justify-center px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-10 md:gap-y-12">
        <p id="about-title" className="about-eyebrow font-mono text-[12px] uppercase text-steel md:col-span-3">
          Who we are <span className="text-signal">·</span> Standout
        </p>
        <p className="font-display text-[clamp(1.6rem,3.1vw,3.3rem)] font-bold leading-[1.08] tracking-[-0.025em] md:col-span-9 [text-wrap:balance]">
          {AGENCY_STATEMENT.split(' ').map((w, i) => (
            <span key={i} className="about-word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-mist/12 pt-8 md:col-span-9 md:col-start-4 md:grid-cols-4 md:gap-x-8" aria-label="Standout in numbers">
          {AGENCY_STATS.map((s) => (
            <li key={s.label} className="about-stat flex flex-col gap-2">
              <p className="font-display text-[clamp(2.1rem,3.2vw,3.2rem)] font-extrabold leading-none tracking-[-0.035em] tabular-nums">
                <span className="about-num" data-value={s.value}>{s.value}</span>
                <span className="text-signal">{s.unit}</span>
              </p>
              <p className="font-mono text-[11px] uppercase text-mist/90">{s.label}</p>
              <p className="text-[14px] leading-snug text-steel">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
