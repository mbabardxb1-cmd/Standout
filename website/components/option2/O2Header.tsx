'use client'

import { useEffect, useState } from 'react'
import { WORDMARK_COLOUR } from '@/lib/assets'
import { useUI } from '@/lib/ui-store'

const NAV = [
  ['Services', 'o2-services'],
  ['Approach', 'o2-approach'],
  ['Results', 'o2-results'],
  ['Contact', 'o2-contact'],
]

export function O2Header() {
  const [solid, setSolid] = useState(false)
  const openContact = useUI((s) => s.openContact)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className="o2-header fixed inset-x-0 top-0 z-40 border-b border-transparent" data-solid={solid}>
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#o2-top" aria-label="Standout, home" className="shrink-0">
          <img src={WORDMARK_COLOUR} alt="Standout" width={168} height={26} className="h-[22px] w-auto md:h-[26px]" />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="text-[15px] font-medium text-night/80 transition-colors hover:text-signal">
              {label}
            </a>
          ))}
        </nav>
        <button type="button" onClick={openContact} className="lift h-11 bg-night px-5 text-[14px] font-semibold text-paper hover:bg-signal md:h-12 md:px-6 md:text-[15px]">
          <span className="sm:hidden">Talk to us</span>
          <span className="hidden sm:inline">Discuss your exhibition</span>
        </button>
      </div>
    </header>
  )
}
