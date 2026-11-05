'use client'

import { O2Header } from './O2Header'
import { O2Hero } from './O2Hero'
import { O2Statement } from './O2Statement'
import { O2Services } from './O2Services'
import { O2Approach } from './O2Approach'
import { O2Outcomes } from './O2Outcomes'
import { O2CTA } from './O2CTA'
import { O2Footer } from './O2Footer'
import { ContactSheet } from '@/components/overlays/ContactSheet'
import { ScrollLock } from '@/components/ui/Sheet'

/** Homepage option 2: light editorial layout led by exhibition photography. Native scroll, no WebGL. */
export function Option2Page() {
  return (
    <div className="o2 min-h-screen">
      <O2Header />
      <main>
        <O2Hero />
        <O2Statement />
        <O2Services />
        <O2Approach />
        <O2Outcomes />
        <O2CTA />
      </main>
      <O2Footer />
      <ContactSheet />
      <ScrollLock />
    </div>
  )
}
