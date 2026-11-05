import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'

export const metadata: Metadata = { title: 'Contact — Standout', description: 'Tell us the show and the date. We’ll come back with a plan.' }

export default function Contact() {
  return <ContactPage />
}
