'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { ARTICLES, CATEGORIES, formatDate, type Article } from '@/lib/insights'
import { PHOTOS } from '@/lib/assets'
import { articleHref, pageHref } from '@/lib/routes'
import { useUI } from '@/lib/ui-store'
import { PageShell, PageHero } from '@/components/PageShell'
import { Breadcrumbs } from '@/components/Breadcrumbs'

function Card({ a, featured = false }: { a: Article; featured?: boolean }) {
  return (
    <a href={articleHref(a.slug)} className={`group flex border border-mist/12 bg-night/50 transition-colors hover:border-signal/70 ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}>
      <span className={`relative block overflow-hidden ${featured ? 'aspect-[16/10] md:aspect-auto md:w-[58%]' : 'aspect-[16/10]'}`}>
        <img src={PHOTOS[a.photo]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
      </span>
      <span className={`flex flex-col gap-3 p-6 ${featured ? 'justify-center md:w-[42%] md:p-10' : ''}`}>
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase text-steel">
          <span className="text-signal">{a.category}</span>
          <span>{formatDate(a.date)}</span>
          <span>{a.readMinutes} min</span>
        </span>
        <span className={`font-display font-extrabold leading-[1.05] tracking-[-0.025em] ${featured ? 'text-[clamp(1.6rem,2.8vw,2.6rem)]' : 'text-[clamp(1.2rem,1.6vw,1.5rem)]'} [text-wrap:balance]`}>{a.title}</span>
        <span className="line-clamp-2 text-[15px] leading-relaxed text-mist/70">{a.dek}</span>
        <span className="mt-2 font-mono text-[12px] uppercase text-mist/80 group-hover:text-signal">Read more <span aria-hidden="true" className="text-signal">→</span></span>
      </span>
    </a>
  )
}

/** Insights: the blog listing, six cards in a grid with a category filter. */
export function InsightsPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('All')
  const list = cat === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === cat)
  return (
    <PageShell>
      <PageHero crumbs={[{ label: 'Insights' }]} eyebrow="Insights" title="What we’ve learned on the floor." line="Short, practical pieces on making exhibitions pay: before the show, on the stand and after it.">
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`h-10 rounded-full border px-4 font-mono text-[12px] uppercase transition-colors ${cat === c ? 'border-signal bg-signal text-night' : 'border-mist/20 text-mist/80 hover:border-signal hover:text-signal'}`}>
              {c}
            </button>
          ))}
        </div>
      </PageHero>
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <li key={a.slug}><Card a={a} /></li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}

/** One article. */
export function ArticlePage({ index }: { index: number }) {
  const a = ARTICLES[index]
  const openContact = useUI((s) => s.openContact)
  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3)
  return (
    <PageShell>
      <article>
        <section className="relative overflow-hidden px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-44">
          <img src={PHOTOS.serviceBand} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hall/40 via-transparent to-hall/60" aria-hidden="true" />
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6">
            <Breadcrumbs items={[{ label: 'Insights', href: pageHref('insights') }, { label: a.title }]} />
            <p className="flex items-center gap-3 font-mono text-[12px] uppercase text-steel">
              <span className="text-signal">{a.category}</span>
              <span>{formatDate(a.date)}</span>
              <span>{a.readMinutes} min read</span>
            </p>
            <h1 className="max-w-[24ch] font-display text-[clamp(2.1rem,4.2vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.025em] [text-wrap:balance]">{a.title}</h1>
            <p className="max-w-[60ch] text-[17px] leading-relaxed text-mist/80 md:text-[19px]">{a.dek}</p>
          </div>
        </section>
        <section className="px-5 md:px-10">
          <div className="relative mx-auto aspect-[21/9] w-full max-w-[1440px] overflow-hidden border border-mist/12">
            <img src={PHOTOS[a.photo]} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </section>
        <section className="px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6">
            {a.body.map((p, i) => (
              <p key={i} className={`leading-[1.7] text-mist/85 ${i === 0 ? 'text-[19px] md:text-[21px]' : 'text-[17px] md:text-[18px]'}`}>{p}</p>
            ))}
            <div className="mt-6 flex flex-col items-start gap-5 border-t border-mist/12 pt-8">
              <p className="font-display text-[clamp(1.4rem,2.2vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">Planning a show? Tell us the date and we’ll come back with a plan.</p>
              <button type="button" onClick={openContact} className="cta-glow inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-semibold text-night transition-transform hover:-translate-y-0.5">
                Plan your show <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      </article>
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em]">More insights</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => (
              <li key={x.slug}><Card a={x} /></li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}
