'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Turns clicks on internal links into client-side navigation, and prefetches a page as soon as
 * its link is hovered or touched. The WebGL field, fonts and scripts then stay loaded between
 * pages instead of starting over on every click. External, hash-only, mail, phone, new-tab and
 * modified clicks are left to the browser.
 */
function internalHref(a: HTMLAnchorElement | null): string | null {
  if (!a || !a.href || a.target === '_blank' || a.hasAttribute('download')) return null
  const raw = a.getAttribute('href') ?? ''
  if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return null
  const url = new URL(a.href, window.location.href)
  if (url.origin !== window.location.origin) return null
  return url.pathname + url.search + url.hash
}

export function InstantNav() {
  const router = useRouter()

  useEffect(() => {
    const prefetched = new Set<string>()
    const prefetch = (e: Event) => {
      const href = internalHref((e.target as Element | null)?.closest?.('a') ?? null)
      if (!href) return
      const path = href.split('#')[0] || '/'
      if (prefetched.has(path)) return
      prefetched.add(path)
      router.prefetch(path)
    }
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const href = internalHref((e.target as Element | null)?.closest?.('a') ?? null)
      if (!href) return
      const here = window.location.pathname + window.location.search
      const [path] = href.split('#')
      // Same page with a hash: let the page's own scroll handling deal with it.
      if ((path || '/') === here && href.includes('#')) return
      e.preventDefault()
      router.push(href)
    }
    document.addEventListener('mouseover', prefetch, { passive: true })
    document.addEventListener('touchstart', prefetch, { passive: true })
    document.addEventListener('click', click)
    return () => {
      document.removeEventListener('mouseover', prefetch)
      document.removeEventListener('touchstart', prefetch)
      document.removeEventListener('click', click)
    }
  }, [router])

  return null
}
