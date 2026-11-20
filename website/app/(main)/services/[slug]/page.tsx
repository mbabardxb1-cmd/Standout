import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/lib/content'
import { SERVICE_PAGES, pageFor } from '@/lib/service-pages'
import { ServicePage } from '@/components/ServicePage'
import { ServicePageB } from '@/components/ServicePageB'
import { SERVICE_VISUALS } from '@/lib/service-visuals'

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hit = pageFor(slug)
  if (!hit) return {}
  return { title: `${SERVICES[hit.index].name} — Standout`, description: hit.page.headline }
}

/** One page per service: /services/<slug>. */
export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hit = pageFor(slug)
  if (!hit) notFound()
  // Services with option C pictures use the option C layout; the rest keep the original one.
  return SERVICE_VISUALS[slug] ? <ServicePageB index={hit.index} variant="c" /> : <ServicePage index={hit.index} />
}
