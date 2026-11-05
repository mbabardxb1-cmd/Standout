import type { Metadata } from 'next'
import { CaseStudiesPage } from '@/components/pages/CaseStudiesPage'

export const metadata: Metadata = { title: 'Case studies — Standout', description: 'Shows we made count: what we did, for whom, and the number that mattered.' }

export default function CaseStudies() {
  return <CaseStudiesPage />
}
