import type { Metadata } from 'next'
import { PackagesPage } from '@/components/pages/PackagesPage'

export const metadata: Metadata = { title: 'Packages — Standout', description: 'Essentials, Marketing and 360: three packages, or build your own from our services.' }

export default function Packages() {
  return <PackagesPage />
}
