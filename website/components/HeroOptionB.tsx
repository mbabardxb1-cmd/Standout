'use client'

import type { ReactNode } from 'react'
import { HeroVariant } from '@/components/PageShell'

/** Wraps an inner page so its header renders the option B design (for review routes). */
export function HeroOptionB({ children }: { children: ReactNode }) {
  return <HeroVariant.Provider value="b">{children}</HeroVariant.Provider>
}
