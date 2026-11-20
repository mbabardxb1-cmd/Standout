import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/lib/content'
import { pageFor } from '@/lib/service-pages'
import { ServicePageB } from '@/components/ServicePageB'
import { SERVICE_VISUALS } from '@/lib/service-visuals'

/** Option C of the service page layout (option B with a picture for every included item), built for one service so far, to compare with the current one. */
const OPTION_C = Object.keys(SERVICE_VISUALS)

export const dynamicParams = false

export function generateStaticParams() {
  return OPTION_C.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hit = pageFor(slug)
  if (!hit) return {}
  return { title: `${SERVICES[hit.index].name} (option C) — Standout`, robots: { index: false } }
}

export default async function ServiceOptionC({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hit = pageFor(slug)
  if (!hit || !OPTION_C.includes(slug)) notFound()
  return <ServicePageB index={hit.index} variant="c" />
}
