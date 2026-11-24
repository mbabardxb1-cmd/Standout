import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'
import { HeroOptionB } from '@/components/HeroOptionB'

export const metadata: Metadata = { title: 'Header option B — Standout', robots: { index: false } }

/** Header option B, for review against the live page. */
export default function Page() {
  return (
    <HeroOptionB>
      <AboutPage />
    </HeroOptionB>
  )
}
