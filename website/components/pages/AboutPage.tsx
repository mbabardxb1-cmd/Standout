'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { StepIcon, type StepIconName } from '@/components/ui/StepIcon'
import { PHOTOS, TEAM_PHOTOS } from '@/lib/assets'
import { AGENCY_STATS } from '@/components/sections/AgencyIntro'
import { pageHref } from '@/lib/routes'
import { PageShell, PageHero } from '@/components/PageShell'
import { CtaPanel } from '@/components/CtaPanel'


const REASONS = [
  { title: 'Results, not decoration', icon: 'target' as StepIconName, line: 'A stand is a sales tool. Every design, campaign and host we put on a show is there to bring the right people to you and keep them.' },
  { title: 'One point of contact', icon: 'users' as StepIconName, line: 'One brief, one plan, one person who answers for the whole show, from the first invitation to the final report.' },
  { title: 'Exhibitions are all we do', icon: 'floorplan' as StepIconName, line: 'Shell-scheme specs, exhibitor manuals, hall traffic, badge data. We work inside the rules of the show, not around them.' },
  { title: 'On the floor in Dubai', icon: 'pin' as StepIconName, line: 'Based in JLT and on site at the region’s major shows, so we can be at your stand on build-up day, not on a call.' },
  { title: 'Measured, not guessed', icon: 'chart' as StepIconName, line: 'Leads captured, meetings booked, pipeline created. You get the numbers, segmented, within days of the show closing.' },
  { title: 'Packages or à la carte', icon: 'layers' as StepIconName, line: 'Three packages for the common cases, or pick the services you need. Priced per show, by stand size and dates.' },
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

      <Testimonials />

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

/** Why choose Standout: a heading row, then the six reasons in open columns with an icon each. */
function WhyChoose() {
  return (
    <section className="px-5 pb-20 md:px-10 md:pb-32">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-medium text-steel">Why choose Standout</p>
            <h2 className="max-w-[20ch] font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">Six reasons exhibitors come back show after show.</h2>
          </div>
          <p className="max-w-[44ch] text-[16px] leading-relaxed text-steel">One team that knows the floor, works to the show’s rules and measures what the stand brings back.</p>
        </div>
        <ul className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {REASONS.map((r) => (
            <li key={r.title} className="group flex flex-col gap-4 border-t border-mist/12 pt-7">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-signal/60 text-signal transition-colors duration-300 group-hover:bg-signal group-hover:text-night">
                <StepIcon name={r.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-display text-[clamp(1.3rem,1.8vw,1.6rem)] font-bold leading-tight tracking-[-0.02em]">{r.title}</h3>
              <p className="max-w-[40ch] text-[16px] leading-relaxed text-mist/70">{r.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/**
 * Testimonials. PLACEHOLDER QUOTES: replace with approved quotes from real clients (name, role,
 * company) before launch. One quote at a time beside a photograph from the floor, with previous
 * and next controls.
 */
const TESTIMONIALS = [
  { quote: 'Standout ran the whole show for us, from the invitations to the follow-up. We came home with more qualified meetings than the last two shows put together.', name: 'Client name', role: 'Marketing Director · Real estate developer', photo: '/photos/included/stand-floor-idex.webp' },
  { quote: 'One brief and one point of contact. The stand looked right, the hosts knew the product, and the leads were in our CRM before we had packed up.', name: 'Client name', role: 'Head of Sales · Defence manufacturer', photo: '/photos/frames/m-screens.webp' },
  { quote: 'The films and same-day content kept our channels busy all week. We were still using the footage months after the show.', name: 'Client name', role: 'Brand Manager · Motorsport team', photo: '/photos/included/highlight-film.webp' },
]

function Testimonials() {
  const [i, setI] = useState(0)
  const t = TESTIMONIALS[i]
  const go = (d: number) => setI((n) => (n + d + TESTIMONIALS.length) % TESTIMONIALS.length)
  return (
    <section className="px-5 pb-20 md:px-10 md:pb-32" aria-roledescription="carousel" aria-label="What our clients say">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-medium text-steel">Testimonials</p>
          <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">What exhibitors say.</h2>
        </div>
        <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-mist/12 bg-night/60 md:grid-cols-12">
          <div className="relative aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[440px]">
            {TESTIMONIALS.map((x, n) => (
              <img key={x.photo} src={x.photo} alt="" loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
          <figure className="flex flex-col justify-between gap-10 p-7 md:col-span-7 md:p-14">
            <div className="flex flex-col gap-6">
              <span aria-hidden="true" className="font-display text-[72px] font-extrabold leading-[0.6] text-signal">“</span>
              <blockquote key={i} className="hero-rise font-display text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.3] tracking-[-0.015em] [text-wrap:pretty]">{t.quote}</blockquote>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-mist/12 pt-6">
              <figcaption className="flex flex-col gap-1">
                <span className="font-display text-[17px] font-bold">{t.name}</span>
                <span className="text-[14px] text-steel">{t.role}</span>
              </figcaption>
              <div className="flex items-center gap-3">
                <span className="mr-2 text-[14px] tabular-nums text-steel">{i + 1} / {TESTIMONIALS.length}</span>
                <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-mist/20 text-mist transition-colors hover:border-signal hover:text-signal">←</button>
                <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-mist/20 text-mist transition-colors hover:border-signal hover:text-signal">→</button>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
