'use client'

import type { ReactNode } from 'react'
import { HeroVariant } from '@/components/PageShell'

/** Wraps an inner page so its header renders the option C design (for review routes). */
export function HeroOptionC({ children }: { children: ReactNode }) {
  return <HeroVariant.Provider value="c">{children}</HeroVariant.Provider>
}
