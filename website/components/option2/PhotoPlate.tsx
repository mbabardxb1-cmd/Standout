import type { ReactNode } from 'react'

/**
 * The slot for an exhibition photograph. Pass `src` once the client’s photography is in; until then
 * it shows a flat navy plate with the shot description, so the layout reads and nothing is faked.
 */
export function PhotoPlate({ shot, src, ratio, className = '', dark = false, captionTop = false, contain, children }: { shot: string; src?: string; ratio: string; className?: string; dark?: boolean; captionTop?: boolean; contain?: string; children?: ReactNode }) {
  return (
    <figure className={`o2-plate ${dark ? 'o2-plate-dark' : ''} ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <img src={src} alt="" className="o2-img" style={contain ? { objectFit: 'contain', backgroundColor: contain } : undefined} />
      ) : (
        <figcaption className={`absolute inset-0 flex flex-col p-5 md:p-6 ${captionTop ? 'justify-start gap-3' : 'justify-between'}`}>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mist/60">
            <span className="inline-block h-3 w-3 border border-mist/40" aria-hidden="true" />
            Photography
          </span>
          <span className="max-w-[32ch] text-[13px] leading-snug text-mist/55">{shot}</span>
        </figcaption>
      )}
      {children}
    </figure>
  )
}
