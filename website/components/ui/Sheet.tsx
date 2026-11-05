'use client'

import { useEffect, useRef } from 'react'
import { useUI } from '@/lib/ui-store'

type Props = {
  open: boolean
  onClose: () => void
  side: 'right' | 'bottom'
  labelledBy: string
  children: React.ReactNode
}

/** Modal panel that slides in from the right or the bottom. Esc and the backdrop close it. */
export function Sheet({ open, onClose, side, labelledBy, children }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (open && !wasOpen.current) {
      returnTo.current = document.activeElement as HTMLElement | null
      const id = window.setTimeout(() => {
        panel.current
          ?.querySelector<HTMLElement>('[data-autofocus], input, button, select, textarea, a[href]')
          ?.focus({ preventScroll: true })
      }, 80)
      wasOpen.current = true
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        window.clearTimeout(id)
        window.removeEventListener('keydown', onKey)
      }
    }
    if (!open && wasOpen.current) {
      wasOpen.current = false
      returnTo.current?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  const placement =
    side === 'right'
      ? `inset-y-0 right-0 w-full max-w-[540px] border-l ${open ? 'translate-x-0' : 'translate-x-full'}`
      : `inset-x-0 bottom-0 max-h-[92svh] border-t ${open ? 'translate-y-0' : 'translate-y-full'}`

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open} inert={!open}>
      <div
        className={`absolute inset-0 bg-hall/75 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        data-lenis-prevent
        className={`absolute overflow-y-auto overscroll-contain border-mist/15 bg-night pb-[env(safe-area-inset-bottom,0px)] transition-transform duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${placement}`}
      >
        {children}
      </div>
    </div>
  )
}

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mist/20 text-mist transition-colors hover:border-signal hover:text-signal"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  )
}

/** Stops page scroll whenever any overlay is open. */
export function ScrollLock() {
  const anyOpen = useUI((s) => s.contactOpen || s.compareOpen || s.menuOpen || s.drawerService !== null)
  useEffect(() => {
    const lenis = useUI.getState().lenis
    if (anyOpen) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [anyOpen])
  return null
}
