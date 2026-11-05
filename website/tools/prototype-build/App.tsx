import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HomePage } from '@/components/HomePage'
import { ServicePage } from '@/components/ServicePage'
import { ContactPage } from '@/components/pages/ContactPage'
import { InsightsPage, ArticlePage } from '@/components/pages/InsightsPage'
import { PackagesPage } from '@/components/pages/PackagesPage'
import { CaseStudiesPage } from '@/components/pages/CaseStudiesPage'
import { AboutPage } from '@/components/pages/AboutPage'
import { pageFor } from '@/lib/service-pages'
import { articleFor } from '@/lib/insights'
import { articleFromHash, pageFromHash, serviceFromHash } from '@/lib/routes'

/**
 * Single-file preview router. #service-<slug> shows that service page, #page-<name> one of the
 * inner pages, #insight-<slug> an article; anything else is the homepage.
 */
export function App({ photos = false }: { photos?: boolean }) {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  // A new view means new scroll triggers: measure once it has rendered.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [hash])

  const slug = serviceFromHash(hash)
  const svc = slug ? pageFor(slug) : null
  if (svc) return <ServicePage key={svc.index} index={svc.index} />
  const art = articleFromHash(hash)
  const hitArt = art ? articleFor(art) : null
  if (hitArt) return <ArticlePage key={hitArt.index} index={hitArt.index} />
  switch (pageFromHash(hash)) {
    case 'contact':
      return <ContactPage key="contact" />
    case 'insights':
      return <InsightsPage key="insights" />
    case 'packages':
      return <PackagesPage key="packages" />
    case 'case-studies':
      return <CaseStudiesPage key="case-studies" />
    case 'about':
      return <AboutPage key="about" />
  }
  return <HomePage photos={photos} />
}
