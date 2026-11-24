import type { Metadata } from 'next'
import { InsightsPage } from '@/components/pages/InsightsPage'
import { HeroOptionC } from '@/components/HeroOptionC'

export const metadata: Metadata = { title: 'Header option C — Standout', robots: { index: false } }

/** Header option C, for review against the live page. */
export default function Page() {
  return (
    <HeroOptionC>
      <InsightsPage />
    </HeroOptionC>
  )
}
