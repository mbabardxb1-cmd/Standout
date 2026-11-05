'use client'

import { PACKAGES, SERVICES } from '@/lib/content'
import { useUI } from '@/lib/ui-store'
import { CloseButton, Sheet } from '@/components/ui/Sheet'

function Tick({ on }: { on: boolean }) {
  return on ? (
    <svg width="18" height="18" viewBox="0 0 18 18" role="img" aria-label="Included" className="mx-auto">
      <path d="M3 9.5l4 4 8-9" fill="none" stroke="#FF5A1F" strokeWidth="2" />
    </svg>
  ) : (
    <span className="block text-center text-steel/60" aria-label="Not included">
      —
    </span>
  )
}

export function CompareSheet() {
  const open = useUI((s) => s.compareOpen)
  const mode = useUI((s) => s.compareMode)
  const setMode = useUI((s) => s.setCompareMode)
  const close = useUI((s) => s.closeCompare)
  const selected = useUI((s) => s.selected)
  const toggle = useUI((s) => s.toggleService)
  const openContact = useUI((s) => s.openContact)

  return (
    <Sheet open={open} onClose={close} side="bottom" labelledBy="compare-title">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-5 py-8 md:px-10 md:py-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">Packages</p>
            <h2 id="compare-title" className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-none tracking-[-0.025em]">
              {mode === 'packages' ? 'What each package includes' : 'Build your own show'}
            </h2>
          </div>
          <CloseButton onClick={close} />
        </div>

        <fieldset className="inline-flex w-fit border border-mist/20 p-1">
          <legend className="sr-only">View</legend>
          {(['packages', 'custom'] as const).map((m) => (
            <label
              key={m}
              className={`cursor-pointer px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
                mode === m ? 'bg-mist text-night' : 'text-mist/70 hover:text-mist'
              }`}
            >
              <input type="radio" name="compare-mode" value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
              {m === 'packages' ? 'Packages' : 'Build your own'}
            </label>
          ))}
        </fieldset>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-mist/20 font-mono text-[12px] uppercase tracking-[0.12em] text-steel">
                <th scope="col" className="py-3 pr-4 font-normal">Service</th>
                {mode === 'packages' ? (
                  PACKAGES.map((p) => (
                    <th key={p.id} scope="col" className={`w-28 py-3 text-center font-normal ${p.tag ? 'text-signal' : ''}`}>
                      {p.name}
                    </th>
                  ))
                ) : (
                  <th scope="col" className="w-36 py-3 text-center font-normal">In my show</th>
                )}
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s, i) => (
                <tr key={s.code} className="border-b border-mist/10">
                  <th scope="row" className="py-3.5 pr-4 font-normal">
                    <span className="mr-3 font-mono text-[12px] text-steel">{s.code}</span>
                    <span className="text-[15px]">{s.name}</span>
                  </th>
                  {mode === 'packages' ? (
                    PACKAGES.map((p) => (
                      <td key={p.id} className="py-3.5">
                        <Tick on={p.includes.includes(i)} />
                      </td>
                    ))
                  ) : (
                    <td className="py-3.5 text-center">
                      <input
                        id={`pick-${i}`}
                        type="checkbox"
                        checked={selected.includes(i)}
                        onChange={() => toggle(i)}
                        aria-label={`Add ${s.name}`}
                        className="h-5 w-5 accent-signal"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-4">
          <button
            type="button"
            onClick={openContact}
            className="h-12 rounded-full bg-signal px-6 text-[15px] font-semibold text-night"
          >
            {mode === 'custom' && selected.length ? `Send my list (${selected.length})` : 'Ask for a quote'}
          </button>
        </div>
      </div>
    </Sheet>
  )
}
