'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { scrollToId, useUI } from '@/lib/ui-store'
import { WORDMARK } from '@/lib/assets'
import { SERVICES } from '@/lib/content'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { homeHref, pageHref, serviceHref, type PageName } from '@/lib/routes'

const PAGES: { label: string; page: PageName }[] = [
  { label: 'Packages', page: 'packages' },
  { label: 'Case Studies', page: 'case-studies' },
  { label: 'Insights', page: 'insights' },
  { label: 'Contact', page: 'contact' },
]

/** The ten services grouped by when they happen, for the dropdown. */
const GROUPS = [
  { title: 'Before the show', ids: [0, 1, 2, 3, 4] },
  { title: 'At the show', ids: [5, 6, 7, 8] },
  { title: 'After the show', ids: [9] },
]

/** Fixed header that stays above every section, with a services dropdown and a mobile menu. */
export function SiteHeader({ home = true }: { home?: boolean } = {}) {
  const openContact = useUI((s) => s.openContact)
  const lenis = useUI((s) => s.lenis)
  const menuOpen = useUI((s) => s.menuOpen)
  const setMenu = useUI((s) => s.setMenu)
  const [svcOpen, setSvcOpen] = useState(false)
  const [mobileSvc, setMobileSvc] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const nav = useRef<HTMLElement>(null)

  const show = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setSvcOpen(true)
  }
  const hide = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setSvcOpen(false), 140)
  }

  // Escape and clicks elsewhere close the dropdown; the hash changing closes everything.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSvcOpen(false)
        setMenu(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (nav.current && !nav.current.contains(e.target as Node)) setSvcOpen(false)
    }
    const onHash = () => {
      setSvcOpen(false)
      setMenu(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
    }
  }, [setMenu])

  // The header always sits on its own dark bar; once the page has scrolled it also casts a shadow.
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const allServicesHref = home ? '#services' : homeHref('services')
  const onAllServices = (e: React.MouseEvent) => {
    setSvcOpen(false)
    setMenu(false)
    if (!home) return
    e.preventDefault()
    scrollToId('services')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)]">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-20 border-b border-mist/10 bg-hall/92 backdrop-blur-md transition-shadow duration-300 ${
          scrolled && !menuOpen ? 'shadow-[0_10px_40px_rgba(0,0,0,0.35)]' : ''
        }`}
      />
      <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a
          href={home ? '#top' : homeHref()}
          aria-label={home ? 'Standout, back to top' : 'Standout, home'}
          className="lift relative z-10 block"
          onClick={(e) => {
            setMenu(false)
            if (!home) return
            e.preventDefault()
            if (lenis) lenis.scrollTo(0, { duration: 1.6 })
            else window.scrollTo(0, 0)
          }}
        >
          <img src={WORDMARK} alt="Standout" width={168} height={26} data-site-logo className="h-[20px] w-auto sm:h-[24px] md:h-[26px]" />
        </a>

        <nav ref={nav} aria-label="Main" className="flex items-center gap-2 md:gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            <li>
              <a href={pageHref('about')} className="lift inline-block text-[15px] font-medium text-mist/80 hover:text-signal">
                About
              </a>
            </li>
            <li onMouseEnter={show} onMouseLeave={hide}>
              <button
                type="button"
                aria-expanded={svcOpen}
                aria-haspopup="true"
                onClick={() => setSvcOpen((o) => !o)}
                className="lift inline-flex items-center gap-1.5 text-[15px] font-medium text-mist/80 hover:text-signal"
              >
                Services
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${svcOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div
                className={`absolute inset-x-5 top-full z-50 mx-auto w-auto max-w-[860px] pt-2 transition-all duration-200 md:inset-x-10 ${
                  svcOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                }`}
              >
                <div className="border border-mist/15 bg-night/95 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
                  <div className="grid grid-cols-[1.25fr_1.1fr_1fr] gap-8 p-6">
                    {GROUPS.map((g) => (
                      <div key={g.title} className="flex flex-col gap-2">
                        <p className="mb-1 border-b border-mist/10 pb-2 font-mono text-[11px] uppercase text-signal">{g.title}</p>
                        <ul className="flex flex-col">
                          {g.ids.map((i) => (
                            <li key={i}>
                              <a href={serviceHref(SERVICE_PAGES[i].slug)} onClick={() => setSvcOpen(false)} className="block py-1.5 text-[14.5px] leading-snug text-mist/85 transition-colors hover:text-signal">
                                {SERVICES[i].cardName ?? SERVICES[i].name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-mist/10 px-6 py-4">
                    <p className="text-[13.5px] text-steel">One team for everything before, during and after the show.</p>
                    <a href={allServicesHref} onClick={onAllServices} className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase text-mist hover:text-signal">
                      All ten services <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {PAGES.map((p) => (
              <li key={p.page}>
                <a href={pageHref(p.page)} className="lift inline-block text-[15px] font-medium text-mist/80 hover:text-signal">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openContact}
            data-cursor="let's talk"
            className="lift relative z-10 hidden h-10 items-center whitespace-nowrap rounded-full bg-signal px-4 text-[13.5px] font-semibold text-night min-[360px]:inline-flex sm:h-11 sm:px-5 sm:text-[15px]"
          >
            Plan your show
          </button>
          <button
            type="button"
            onClick={() => setMenu(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-mist/20 text-mist sm:h-11 sm:w-11 md:hidden"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              {menuOpen ? <path d="M2 1l14 12M16 1L2 13" /> : <path d="M0 1h18M0 7h18M0 13h18" />}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-0 flex flex-col overflow-y-auto bg-hall/95 px-5 pb-10 pt-28 backdrop-blur-md transition-opacity duration-200 md:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col divide-y divide-mist/10 border-y border-mist/10">
          <li>
            <a href={pageHref('about')} onClick={() => setMenu(false)} className="block py-4 font-display text-[24px] font-extrabold tracking-[-0.02em]">
              About
            </a>
          </li>
          <li>
            <button type="button" onClick={() => setMobileSvc((o) => !o)} aria-expanded={mobileSvc} className="flex w-full items-center justify-between py-4 font-display text-[24px] font-extrabold tracking-[-0.02em]">
              Services
              <span aria-hidden="true" className={`text-signal transition-transform ${mobileSvc ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${mobileSvc ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <ul className="flex flex-col gap-1 overflow-hidden pb-2">
                {SERVICES.map((s, i) => (
                  <li key={s.code}>
                    <a href={serviceHref(SERVICE_PAGES[i].slug)} onClick={() => setMenu(false)} className="block py-2 text-[16px] text-mist/85">
                      {s.cardName ?? s.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={allServicesHref} onClick={onAllServices} className="inline-block py-2 font-mono text-[12px] uppercase text-signal">All ten services →</a>
                </li>
              </ul>
            </div>
          </li>
          {PAGES.map((p) => (
            <li key={p.page}>
              <a href={pageHref(p.page)} onClick={() => setMenu(false)} className="block py-4 font-display text-[24px] font-extrabold tracking-[-0.02em]">
                {p.label}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" onClick={openContact} className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-signal text-[16px] font-semibold text-night">
          Plan your show
        </button>
      </div>
    </header>
  )
}
