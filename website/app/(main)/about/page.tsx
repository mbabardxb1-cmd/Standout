import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'

export const metadata: Metadata = { title: 'About — Standout', description: 'One team for everything before, during and after the show. Who we are and how we work.' }

export default function About() {
  return <AboutPage />
}
