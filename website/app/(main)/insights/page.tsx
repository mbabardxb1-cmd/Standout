import type { Metadata } from 'next'
import { InsightsPage } from '@/components/pages/InsightsPage'

export const metadata: Metadata = { title: 'Insights — Standout', description: 'Short, practical pieces on making exhibitions pay.' }

export default function Insights() {
  return <InsightsPage />
}
