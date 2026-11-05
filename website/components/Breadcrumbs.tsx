'use client'

import { homeHref } from '@/lib/routes'

export type Crumb = { label: string; href?: string }

/** Small trail above a page heading: Home › Section › Page. The last item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'Home', href: homeHref() }, ...items]
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1
          return (
            <li key={c.label + i} className="flex items-center gap-x-2">
              {i > 0 && <span aria-hidden="true" className="text-signal">›</span>}
              {c.href && !last ? (
                <a href={c.href} className="transition-colors hover:text-signal">{c.label}</a>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-mist/80' : ''}>{c.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
