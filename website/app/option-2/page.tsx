import type { Metadata } from 'next'
import { Option2Page } from '@/components/option2/Option2Page'

export const metadata: Metadata = {
  title: 'Standout — Make every exhibition count',
  description:
    'Exhibition marketing for exhibitors: stand branding, digital campaigns, hosts and hostesses, photography, lead capture and post-event nurturing.',
}

/** Homepage option 2: light editorial layout led by photography. */
export default function OptionTwo() {
  return <Option2Page />
}
