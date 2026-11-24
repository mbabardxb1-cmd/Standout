'use client'

import { useState } from 'react'
import { CONTACT } from '@/lib/content'
import { PageShell, PageHero } from '@/components/PageShell'
import { BriefForm } from '@/components/BriefForm'
import { StepIcon } from '@/components/ui/StepIcon'

const NEXT = [
  { icon: 'mail', title: 'We reply within one working day', line: 'A short call to understand the show, the stand and what a good result looks like.' },
  { icon: 'clipboard', title: 'A plan and a quote', line: 'The services that fit, in a single plan with dates, from invitation to final report.' },
  { icon: 'send', title: 'One team, start to finish', line: 'Design, campaign, stand team, coverage and follow-up, run by the same people.' },
] as const

/** Contact page: the brief form beside the office details, and what happens next. */
export function ContactPage() {
  const [sentTo, setSentTo] = useState<string | null>(null)
  return (
    <PageShell>
      <PageHero crumbs={[{ label: 'Contact' }]} title="Tell us the show and the date." line="We’ll come back with a plan. Send the brief below, or call and talk it through." />

      <section className="px-5 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(300px,380px)] lg:gap-20">
          <div className="flex flex-col gap-8 border border-mist/12 bg-night/50 p-6 md:p-10">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[12px] uppercase text-steel">Plan your show</p>
              <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1] tracking-[-0.03em]">
                {sentTo === null ? 'Your brief' : `Thanks${sentTo ? `, ${sentTo}` : ''}.`}
              </h2>
            </div>
            <BriefForm id="page" sentTo={sentTo} onSent={setSentTo} />
          </div>

          <aside className="flex flex-col gap-10 lg:pt-6">
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[12px] uppercase text-steel">Email</h2>
              <a href={`mailto:${CONTACT.email}`} className="w-fit font-display text-[clamp(1.3rem,2vw,1.7rem)] font-bold tracking-[-0.02em] hover:text-signal">{CONTACT.email}</a>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[12px] uppercase text-steel">Phone</h2>
              <a href={CONTACT.phoneHref} className="w-fit font-display text-[clamp(1.3rem,2vw,1.7rem)] font-bold tracking-[-0.02em] hover:text-signal">{CONTACT.phone}</a>
              <p className="text-[14px] text-steel">Monday to Friday, 9am to 6pm Gulf Standard Time.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[12px] uppercase text-steel">Office</h2>
              <p className="text-[16px] leading-relaxed text-mist/85">
                {CONTACT.address[0]}
                <br />
                {CONTACT.address[1]}
              </p>
              <a href={CONTACT.mapHref} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-2 border-b border-signal pb-1 font-mono text-[12px] uppercase text-mist transition-colors hover:text-signal">
                Open in Google Maps <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-mist/12 bg-night">
              <iframe
                src={CONTACT.mapEmbed}
                title="Map showing United SEO at Mazaya Business Avenue BB2, Jumeirah Lakes Towers"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(185deg)_saturate(0.7)_brightness(0.9)]"
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">What happens next</h2>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {NEXT.map((n, i) => (
              <li key={n.title} className="flex flex-col gap-5 border border-mist/12 bg-night/50 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center bg-hall ring-1 ring-signal/60"><StepIcon name={n.icon} className="h-7 w-7 text-signal" /></span>
                  <span className="font-mono text-[12px] uppercase text-steel">0{i + 1}</span>
                </div>
                <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]">{n.title}</h3>
                <p className="text-[15px] leading-relaxed text-mist/70">{n.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  )
}
