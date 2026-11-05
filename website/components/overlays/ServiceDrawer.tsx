'use client'

import { useEffect, useState } from 'react'
import { SERVICES } from '@/lib/content'
import { useUI } from '@/lib/ui-store'
import { CloseButton, Sheet } from '@/components/ui/Sheet'
import { ServiceIcon3D } from '@/components/icons/ServiceIcon3D'
import { SERVICE_PAGES } from '@/lib/service-pages'
import { serviceHref } from '@/lib/routes'

export function ServiceDrawer() {
  const current = useUI((s) => s.drawerService)
  const close = useUI((s) => s.closeService)
  const toggle = useUI((s) => s.toggleService)
  const open = useUI((s) => s.openService)
  const selected = useUI((s) => s.selected)
  const [shown, setShown] = useState(0) // keeps content in place while the panel slides out

  useEffect(() => {
    if (current !== null) setShown(current)
  }, [current])

  const s = SERVICES[shown]
  const inShow = selected.includes(shown)
  const next = (shown + 1) % SERVICES.length

  return (
    <Sheet open={current !== null} onClose={close} side="right" labelledBy="service-title">
      <div className="flex min-h-full flex-col gap-10 p-6 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[12px] uppercase text-steel">
            <span className="text-signal">{s.code}</span> <span className="mx-2">·</span> {s.phase}
          </p>
          <CloseButton onClick={close} />
        </div>

        <div className="flex flex-col gap-5">
          <ServiceIcon3D index={shown} size={132} active className="-ml-2" />
          <h2 id="service-title" className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold leading-[1.02] tracking-[-0.025em] [text-wrap:balance]">
            {s.name}
          </h2>
          <p className="text-[17px] leading-relaxed text-mist/80">{s.line}</p>
          <a href={serviceHref(SERVICE_PAGES[shown].slug)} onClick={close} className="group inline-flex w-fit items-center gap-2 border-b border-signal pb-1 font-mono text-[12px] uppercase text-mist transition-colors hover:text-signal">
            See the full service <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-[12px] uppercase text-steel">What you get</h3>
          <ul className="flex flex-col border-t border-mist/15">
            {s.deliverables.map((d) => (
              <li key={d} className="flex gap-4 border-b border-mist/15 py-4 text-[15.5px] leading-snug">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            data-autofocus
            onClick={() => toggle(shown)}
            aria-pressed={inShow}
            className={`h-14 flex-1 rounded-full px-6 text-[16px] font-semibold transition-colors ${
              inShow ? 'border border-mist/30 text-mist hover:border-signal' : 'bg-signal text-night'
            }`}
          >
            {inShow ? 'Remove from my show' : 'Add to my show'}
          </button>
          <button
            type="button"
            onClick={() => open(next)}
            className="h-14 rounded-full border border-mist/20 px-6 text-left text-[15px] text-mist/85 transition-colors hover:border-signal hover:text-mist"
          >
            Next: {SERVICES[next].short} →
          </button>
        </div>
      </div>
    </Sheet>
  )
}
