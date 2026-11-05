'use client'

import type { ReactNode } from 'react'
import { useUI } from '@/lib/ui-store'

/**
 * Closing call to action for the inner pages: a rounded panel with a soft, blurred glow in the
 * brand navy and orange, a pill label, a headline, one line and the button, all centred.
 */
export function CtaPanel({ label = 'Plan your show', title, line, button = 'Plan your show', secondary }: { label?: string; title: ReactNode; line?: string; button?: string; secondary?: ReactNode }) {
  const openContact = useUI((s) => s.openContact)
  return (
    <div className="cta-panel relative overflow-hidden rounded-[28px] border border-mist/10 bg-hall">
      <div className="cta-panel-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-7 px-6 py-20 text-center md:px-12 md:py-28">
        <span className="inline-flex items-center rounded-full border border-mist/15 bg-night/70 px-5 py-2 text-[14px] text-mist/90 shadow-[inset_0_1px_0_rgba(227,232,244,0.12)] backdrop-blur-sm">{label}</span>
        <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,4.2rem)] font-semibold leading-[1] tracking-[-0.03em] [text-wrap:balance]">{title}</h2>
        {line && <p className="max-w-[46ch] text-[16px] leading-relaxed text-mist/70 md:text-[17px]">{line}</p>}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" onClick={openContact} data-cursor="let's talk" className="cta-glow inline-flex h-13 items-center gap-2.5 rounded-full bg-signal px-7 text-[15px] font-semibold text-night transition-transform hover:-translate-y-0.5">
            {button}
            <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-night/50 text-[13px]">→</span>
          </button>
          {secondary}
        </div>
      </div>
    </div>
  )
}
