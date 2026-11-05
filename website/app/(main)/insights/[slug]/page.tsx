import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ARTICLES, articleFor } from '@/lib/insights'
import { ArticlePage } from '@/components/pages/InsightsPage'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hit = articleFor(slug)
  if (!hit) return {}
  return { title: `${hit.article.title} — Standout`, description: hit.article.dek }
}

/** One article: /insights/<slug>. */
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hit = articleFor(slug)
  if (!hit) notFound()
  return <ArticlePage index={hit.index} />
}
