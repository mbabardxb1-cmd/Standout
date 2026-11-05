'use client'

import { useEffect, useState } from 'react'
import { useUI } from '@/lib/ui-store'
import { CloseButton, Sheet } from '@/components/ui/Sheet'
import { BriefForm } from '@/components/BriefForm'

/** The brief form in a bottom sheet, opened from "Plan your show" anywhere on the site. */
export function ContactSheet() {
  const open = useUI((s) => s.contactOpen)
  const close = useUI((s) => s.closeContact)
  const contactPackage = useUI((s) => s.contactPackage)
  const [sentTo, setSentTo] = useState<string | null>(null)

  useEffect(() => {
    if (open) return
    const id = window.setTimeout(() => setSentTo(null), 500)
    return () => window.clearTimeout(id)
  }, [open])

  return (
    <Sheet open={open} onClose={close} side="bottom" labelledBy="contact-title">
      <div className="mx-auto flex w-full max-w-[920px] flex-col gap-8 px-5 py-8 md:px-10 md:py-12">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Plan your show</p>
            <h2 id="contact-title" className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              {sentTo === null ? 'Tell us about your next exhibition.' : `Thanks${sentTo ? `, ${sentTo}` : ''}.`}
            </h2>
          </div>
          <CloseButton onClick={close} />
        </div>
        <BriefForm key={`${open}-${contactPackage ?? ''}`} id="sheet" sentTo={sentTo} onSent={setSentTo} onBack={close} preselect={contactPackage} />
      </div>
    </Sheet>
  )
}
