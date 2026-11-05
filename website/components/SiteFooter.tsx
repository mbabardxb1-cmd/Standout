'use client'

/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react'
import { scrollToId } from '@/lib/ui-store'
import { WORDMARK } from '@/lib/assets'
import { CONTACT } from '@/lib/content'
import { homeHref, pageHref, type PageName } from '@/lib/routes'

const PAGES: { label: string; page: PageName }[] = [
  { label: 'Packages', page: 'packages' },
  { label: 'Case Studies', page: 'case-studies' },
  { label: 'Insights', page: 'insights' },
  { label: 'Contact', page: 'contact' },
]

export function SiteFooter({ home = true }: { home?: boolean } = {}) {
  const footer = useRef<HTMLElement>(null)

  return (
    <footer ref={footer} className="relative border-t border-mist/10 px-5 pb-10 pt-24 md:px-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Standout</h3>
            <p className="max-w-[32ch] text-[15px] leading-relaxed text-mist/80">
              Exhibition marketing, end to end. Stand graphics, campaigns, coverage, data capture and follow-up from one team.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Contact</h3>
            <a href={`mailto:${CONTACT.email}`} className="w-fit text-[15px] text-mist/80 hover:text-signal">{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="w-fit text-[15px] text-mist/80 hover:text-signal">{CONTACT.phone}</a>
            <a href={CONTACT.mapHref} target="_blank" rel="noreferrer" className="w-fit text-[15px] leading-relaxed text-mist/80 hover:text-signal">
              {CONTACT.address[0]}
              <br />
              {CONTACT.address[1]}
            </a>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Explore</h3>
            <a href={pageHref('about')} className="w-fit text-[15px] text-mist/80 hover:text-signal">
              About
            </a>
            <a
              href={home ? '#services' : homeHref('services')}
              onClick={(e) => {
                if (!home) return
                e.preventDefault()
                scrollToId('services')
              }}
              className="w-fit text-[15px] text-mist/80 hover:text-signal"
            >
              Services
            </a>
            {PAGES.map((p) => (
              <a key={p.page} href={pageHref(p.page)} className="w-fit text-[15px] text-mist/80 hover:text-signal">
                {p.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Follow</h3>
            <div className="flex items-center gap-3">
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="Standout on LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-mist/20 text-mist/85 transition-colors hover:border-signal hover:text-signal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Standout on Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-mist/20 text-mist/85 transition-colors hover:border-signal hover:text-signal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
            </div>
          </div>
        </div>

        <img src={WORDMARK} alt="Standout" width={1600} height={245} className="h-auto w-full" />

        <div className="flex flex-wrap justify-between gap-4 border-t border-mist/10 pt-6 text-[13px] text-steel">
          <p>© 2026 Standout</p>
        </div>
      </div>
    </footer>
  )
}
