'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { PHOTOS, TEAM_PHOTOS } from '@/lib/assets'
import { AGENCY_STATS } from '@/components/sections/AgencyIntro'
import { pageHref } from '@/lib/routes'
import { PageShell, PageHero } from '@/components/PageShell'
import { CtaPanel } from '@/components/CtaPanel'


const REASONS = [
  { title: 'Results, not decoration', photo: '/photos/included/stand-floor-idex.webp', line: 'A stand is a sales tool. Every design, campaign and host we put on a show is there to bring the right people to you and keep them.' },
  { title: 'One point of contact', photo: '/photos/frames/m-talk.webp', line: 'One brief, one plan, one person who answers for the whole show, from the first invitation to the final report.' },
  { title: 'Exhibitions are all we do', photo: '/photos/frames/m-panel.webp', line: 'Shell-scheme specs, exhibitor manuals, hall traffic, badge data. We work inside the rules of the show, not around them.' },
  { title: 'On the floor in Dubai', photo: '/photos/frames/sob-entrance.webp', line: 'Based in JLT and on site at the region’s major shows, so we can be at your stand on build-up day, not on a call.' },
  { title: 'Measured, not guessed', photo: PHOTOS.dashboard, line: 'Leads captured, meetings booked, pipeline created. You get the numbers, segmented, within days of the show closing.' },
  { title: 'Packages or à la carte', photo: PHOTOS.shellScheme, line: 'Three packages for the common cases, or pick the services you need. Priced per show, by stand size and dates.' },
]

const TEAM = [
  { key: 'simon', name: 'Simon Bell', role: 'Managing Partner' },
  { key: 'gareth', name: 'Gareth Dodd', role: 'Director' },
  { key: 'dean', name: 'Dean Thornton', role: 'Head of USEO' },
  { key: 'olivia', name: 'Olivia Shaw', role: 'Head of Brande' },
  { key: 'pavan', name: 'Pavan Sandhu', role: 'Head of Social' },
]

/** About: why Standout exists, what we believe, how a show runs with us, the people, and where to find us. */
export function AboutPage() {
  return (
    <PageShell>
      <PageHero wide crumbs={[{ label: 'About' }]} title={<>We make brands<br className="hidden sm:block" /> impossible to walk past.</>} line="Standout is the exhibition-marketing team behind some of the busiest stands in Dubai. One brief, one crew, and a number at the end that tells you the show paid." />

      {/* Story + figures */}
      <section className="px-5 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden border border-mist/15 bg-night md:col-span-6 md:aspect-auto md:min-h-[520px]">
            <img src={PHOTOS.aboutFloor} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-8 md:col-span-6 md:pl-6">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em] [text-wrap:balance]">About Standout</h2>
            <div className="flex flex-col gap-5 text-[16.5px] leading-relaxed text-mist/80 md:text-[17px]">
              <p>At Standout, we believe successful exhibitions are about more than impressive stands. They are about creating experiences that attract the right audience, build meaningful connections and deliver real business opportunities.</p>
              <p>We bring every element together under one roof, from stand design and marketing campaigns to event staffing, brand coverage, lead capture and follow-up. Every detail works towards the same goal, ensuring a seamless experience from start to finish.</p>
              <p>With over 10 years of experience and more than 150 exhibitions delivered, we know what makes brands stand out.</p>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-mist/12 pt-7 sm:grid-cols-4">
              {AGENCY_STATS.map((st) => (
                <li key={st.label} className="flex flex-col gap-1">
                  <p className="font-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-extrabold leading-none tracking-[-0.035em] tabular-nums">
                    {st.value}<span className="text-signal">{st.unit}</span>
                  </p>
                  <p className="font-mono text-[11px] uppercase text-mist/90">{st.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WhyChoose />

      {/* Team */}
      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[12px] uppercase text-steel">The team</p>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">The people on your show.</h2>
            </div>
            <p className="max-w-[40ch] text-[15.5px] leading-relaxed text-mist/70">One point of contact from brief to report, backed by designers, campaign managers, hosts and crew.</p>
          </div>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
            {TEAM.map((m) => (
              <li key={m.key} className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full overflow-hidden border border-mist/15 bg-night">
                  <img src={TEAM_PHOTOS[m.key]} alt={m.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-[16px] font-bold tracking-[-0.01em]">{m.name}</h3>
                  <p className="font-mono text-[10.5px] uppercase text-steel">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto w-full max-w-[1440px]">
          <CtaPanel
            label="Work with us"
            title="Planning an exhibition or event? Let’s talk it through."
            line="One brief, one team, and a plan that runs from the first invitation to the final report."
            button="Plan your event"
            secondary={
              <a href={pageHref('case-studies')} className="inline-flex h-13 items-center rounded-full border border-mist/20 px-6 text-[15px] font-medium text-mist transition-colors hover:border-signal hover:text-signal">
                See our work
              </a>
            }
          />
        </div>
      </section>
    </PageShell>
  )
}

/**
 * Why choose Standout: the six reasons as large rows divided by hairlines. On wider screens the
 * heading and a photograph stay in view on the left, and the photograph changes with the reason
 * you hover or focus; that row brightens and opens its line. On phones every row shows its line.
 */
function WhyChoose() {
  const [active, setActive] = useState(0)
  return (
    <section className="px-5 pb-20 md:px-10 md:pb-32">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="flex flex-col gap-8 md:sticky md:top-28">
            <div className="flex flex-col gap-3">
              <p className="text-[14px] font-medium text-steel">Why choose Standout</p>
              <h2 className="max-w-[16ch] font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">Six reasons exhibitors come back show after show.</h2>
            </div>
            <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-[28px] md:block">
              {REASONS.map((r, i) => (
                <img key={r.title} src={r.photo} alt="" loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`} />
              ))}
            </div>
          </div>
        </div>
        <ul className="flex flex-col md:col-span-7">
          {REASONS.map((r, i) => {
            const on = i === active
            return (
              <li key={r.title} className="border-t border-mist/12 last:border-b">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="group flex w-full flex-col gap-3 py-7 text-left md:py-9"
                >
                  <span className="flex items-center justify-between gap-6">
                    <span className={`font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-bold leading-tight tracking-[-0.025em] transition-colors duration-300 ${on ? 'text-mist' : 'text-mist md:text-mist/45'}`}>{r.title}</span>
                    <span aria-hidden="true" className={`hidden h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-300 md:grid ${on ? 'rotate-0 border-signal bg-signal text-night' : '-rotate-45 border-mist/20 text-mist/50'}`}>→</span>
                  </span>
                  {/* The line: always shown on phones; opens with the active row on wider screens. */}
                  <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out max-md:grid-rows-[1fr] ${on ? 'md:grid-rows-[1fr] md:opacity-100' : 'md:grid-rows-[0fr] md:opacity-0'}`}>
                    <span className="overflow-hidden">
                      <span className="block max-w-[52ch] text-[16px] leading-relaxed text-mist/70 md:text-[17px]">{r.line}</span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
