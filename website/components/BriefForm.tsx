'use client'

import { useState } from 'react'
import { PACKAGES, SERVICES } from '@/lib/content'
import { useUI } from '@/lib/ui-store'

const field =
  'h-12 w-full border border-mist/20 bg-hall/60 px-4 text-[16px] text-mist placeholder:text-steel/70 focus:border-signal focus:outline-none'
const labelCls = 'font-mono text-[12px] uppercase text-steel'

/**
 * The brief form, used in the bottom sheet and on the contact page. The prototype has no
 * backend, so submitting only confirms on screen. `id` keeps field ids unique per instance.
 */
export function BriefForm({ id = 'c', sentTo, onSent, onBack, preselect }: { id?: string; sentTo: string | null; onSent: (name: string) => void; onBack?: () => void; preselect?: string | null }) {
  const selected = useUI((s) => s.selected)
  const toggle = useUI((s) => s.toggleService)
  const [pkg, setPkg] = useState(preselect ?? 'all')

  if (sentTo !== null) {
    return (
      <div className="flex flex-col gap-6">
        <p className="max-w-[56ch] text-[17px] leading-relaxed text-mist/85">
          This prototype doesn’t send anything yet. On the live site, your brief goes straight to the Standout team, who reply with a plan and a quote.
        </p>
        {onBack && (
          <button type="button" onClick={onBack} className="h-12 w-fit rounded-full bg-signal px-6 text-[15px] font-semibold text-night">
            Back to the page
          </button>
        )}
      </div>
    )
  }

  return (
    <form
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        onSent(String(data.get('name') ?? '').trim().split(' ')[0] ?? '')
      }}
    >
      <label className="flex flex-col gap-2" htmlFor={`${id}-name`}>
        <span className={labelCls}>Your name</span>
        <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-2" htmlFor={`${id}-company`}>
        <span className={labelCls}>Company</span>
        <input id={`${id}-company`} name="company" autoComplete="organization" className={field} />
      </label>
      <label className="flex flex-col gap-2" htmlFor={`${id}-email`}>
        <span className={labelCls}>Work email</span>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-2" htmlFor={`${id}-phone`}>
        <span className={labelCls}>Mobile number</span>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+971 50 000 0000" className={field} />
      </label>
      <label className="flex flex-col gap-2" htmlFor={`${id}-show`}>
        <span className={labelCls}>Which show / event?</span>
        <input id={`${id}-show`} name="show" placeholder="Name and venue" className={field} />
      </label>
      <label className="flex flex-col gap-2" htmlFor={`${id}-package`}>
        <span className={labelCls}>Interested in</span>
        <select id={`${id}-package`} name="package" value={pkg} onChange={(e) => setPkg(e.target.value)} className={field}>
          <option value="all">All services</option>
          <optgroup label="Packages">
            {PACKAGES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} package
              </option>
            ))}
          </optgroup>
          <optgroup label="Services">
            {SERVICES.map((s, i) => (
              <option key={s.code} value={`service-${i}`}>
                {s.cardName ?? s.name}
              </option>
            ))}
          </optgroup>
          <option value="custom">My own selection</option>
        </select>
      </label>

      {selected.length > 0 && (
        <div className="flex flex-col gap-3 md:col-span-2">
          <span className={labelCls}>Services in your show</span>
          <ul className="flex flex-wrap gap-2">
            {selected.map((i) => (
              <li key={i}>
                <button type="button" onClick={() => toggle(i)} aria-label={`Remove ${SERVICES[i].name}`} className="flex items-center gap-2 rounded-full border border-signal/60 px-3 py-1.5 text-[14px] hover:border-signal">
                  {SERVICES[i].short}
                  <span aria-hidden="true" className="text-signal">×</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <label className="flex flex-col gap-2 md:col-span-2" htmlFor={`${id}-message`}>
        <span className={labelCls}>Anything else?</span>
        <textarea id={`${id}-message`} name="message" rows={4} className={`${field} h-auto py-3`} placeholder="Stand size, goals, deadlines" />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
        <p className="text-[13px] text-steel">Prototype form: nothing is sent.</p>
        <button type="submit" className="cta-glow h-14 rounded-full bg-signal px-8 text-[16px] font-semibold text-night">
          Send my brief
        </button>
      </div>
    </form>
  )
}
