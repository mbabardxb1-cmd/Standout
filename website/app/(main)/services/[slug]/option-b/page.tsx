import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/lib/content'
import { pageFor } from '@/lib/service-pages'
import { ServicePageB } from '@/components/ServicePageB'

/** Option B of the service page layout, built for one service so far, to compare with the current one. */
const OPTION_B = ['photography-video']

export const dynamicParams = false

export function generateStaticParams() {
  return OPTION_B.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hit = pageFor(slug)
  if (!hit) return {}
  return { title: `${SERVICES[hit.index].name} (option B) — Standout`, robots: { index: false } }
}

export default async function ServiceOptionB({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hit = pageFor(slug)
  if (!hit || !OPTION_B.includes(slug)) notFound()
  return <ServicePageB index={hit.index} />
}
