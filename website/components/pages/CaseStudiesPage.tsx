'use client'

import { useState } from 'react'
import { CASES } from '@/lib/case-studies'
import { PageShell, PageHero } from '@/components/PageShell'
import { CtaPanel } from '@/components/CtaPanel'
import { Film } from '@/components/sections/CaseStudy'

/** Case studies: the films, each with the client, show, one line and one figure. */
export function CaseStudiesPage() {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <PageShell>
      <PageHero crumbs={[{ label: 'Case Studies' }]} title="Shows we made count." line="Films from the floor. Press play." />

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
          {CASES.map((c, i) => (
            <Film key={c.client + c.show} c={c} i={i} playingIndex={playing} onPlay={setPlaying} />
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto w-full max-w-[1440px]">
          <CtaPanel label="Your show next" title="Plan a show like these." line="Tell us the show and the date, and we’ll come back with a plan and a quote." />
        </div>
      </section>
    </PageShell>
  )
}
