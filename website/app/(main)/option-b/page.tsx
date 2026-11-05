import type { Metadata } from 'next'
import { HomePage } from '@/components/HomePage'

export const metadata: Metadata = { title: 'Standout — Services option B', robots: { index: false } }

/** Homepage with Services option B (three grouped cards), to compare with the live homepage. */
export default function OptionB() {
  return <HomePage photos services="b" />
}
