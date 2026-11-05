'use client'

import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { HeroIntro } from '@/components/sections/HeroIntro'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { StoryIntro } from '@/components/sections/StoryIntro'
import { ServicesF } from '@/components/sections/ServicesF'
import { ServicesB } from '@/components/sections/ServicesB'
import { Packages } from '@/components/sections/Packages'
import { LeadFlow } from '@/components/sections/LeadFlow'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { ServiceDrawer } from '@/components/overlays/ServiceDrawer'
import { CompareSheet } from '@/components/overlays/CompareSheet'
import { ContactSheet } from '@/components/overlays/ContactSheet'
import { ScrollLock } from '@/components/ui/Sheet'
import { OpeningIntro } from '@/components/OpeningIntro'
import { PhotosContext } from '@/lib/photos-context'
import { useEffect } from 'react'
import { scrollToId } from '@/lib/ui-store'
import { isPageHash } from '@/lib/routes'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * The full homepage. Sections are mounted top to bottom, so their ScrollTriggers
 * (and pins) are created in page order. `photos` turns on option 3: the same page
 * with exhibition photography in the hero, the story cards and the closing section.
 * `services="b"` swaps in Services option B (three grouped cards) for comparison.
 */
export function HomePage({ photos = false, services = 'a' }: { photos?: boolean; services?: 'a' | 'b' }) {
  // Arriving with #services (from a service page) lands on that section once the page has laid out.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id || id === 'top' || isPageHash(window.location.hash)) return
    const go = () => {
      ScrollTrigger.refresh()
      scrollToId(id)
    }
    // Pins and the smooth scroller settle after mount; go once, then check and go again if needed.
    const t1 = window.setTimeout(go, 350)
    const t2 = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el && Math.abs(el.getBoundingClientRect().top) > 40) go()
    }, 2200)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])
  return (
    <PhotosContext.Provider value={photos}>
      <OpeningIntro />
      <SiteHeader />
      <main id="top">
        <HeroIntro />
        {/* Own wrapper: the pinned sections around it get wrapped in pin spacers, so React needs a
            stable parent to swap the layout inside without losing its reference sibling. */}
        <div id="services-slot">
          {services === 'b' ? <ServicesB /> : <ServicesF />}
        </div>
        <CaseStudy />
        <StoryIntro />
        <Packages />
        <LeadFlow />
        <FinalCTA />
      </main>
      <SiteFooter />
      <ServiceDrawer />
      <CompareSheet />
      <ContactSheet />
      <ScrollLock />
    </PhotosContext.Provider>
  )
}
