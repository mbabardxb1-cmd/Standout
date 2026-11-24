import { PHOTOS } from '@/lib/assets'

/**
 * Pictures for the option C service page, per service slug. A service listed here gets the
 * option C layout at /services/<slug>; the others keep the original layout until they are added.
 */
export type ServiceVisuals = {
  /** Tall photograph beside the list (option B only). */
  side: string
  /** One picture per "What's included" item, in order. */
  items: string[]
  /** One picture per process step, in order. */
  steps: string[]
  /** Full-width banner photograph and its line. */
  band: { src: string; line: string }
  /** Client work from the floor; leave out for services without matching films. */
  gallery?: { src: string; client: string; show: string }[]
  /** Closing call-to-action headline. */
  cta?: string
}

export const SERVICE_VISUALS: Record<string, ServiceVisuals> = {
  'photography-video': {
    side: PHOTOS.contentCreation,
    items: [
      '/photos/included/videographers.webp',
      PHOTOS.eventPhotography,
      '/photos/included/interviews.webp',
      PHOTOS.contentCreation,
      '/photos/included/highlight-film.webp',
      '/photos/included/same-day-edit.webp',
    ],
    steps: [
      '/photos/included/guests-group.webp',
      '/photos/included/interviews.webp',
      '/photos/included/videographers.webp',
      '/photos/included/same-day-edit.webp',
      '/photos/included/highlight-film.webp',
    ],
    band: { src: '/photos/band-exhibition.webp', line: 'Captured as it happens, posted while it still matters.' },
    gallery: [
      { src: '/video/3db-yas-poster.webp', client: '3DB', show: 'F1 The Movie · Abu Dhabi premiere' },
      { src: '/video/sobha-atlantis-poster.webp', client: 'Sobha', show: 'Atlantis, Dubai' },
      { src: '/video/dragon-ferrari-poster.webp', client: 'Dragon Racing', show: 'Ferrari experience · Abu Dhabi' },
      { src: '/video/dpworld-tour-poster.webp', client: 'DP World', show: 'DP World Tour' },
    ],
    cta: 'Put photo, video and content on your next show.',
  },
  'print-collateral': {
    side: PHOTOS.print,
    items: [
      PHOTOS.print, // Portfolio book
      '/photos/included/brochure-reader.webp', // Brochures and flyers
      '/photos/included/company-profile.webp', // Company profile
      '/photos/included/visiting-cards.webp', // Visiting cards
      PHOTOS.shellScheme, // Print management
    ],
    steps: [
      '/photos/included/brochure-reader.webp',
      '/photos/included/company-profile.webp',
      '/photos/included/stand-3d-letters.webp',
      PHOTOS.print,
      PHOTOS.shellScheme,
    ],
    band: { src: '/photos/included/stand-floor-idex.webp', line: 'Everything they take home, in the same brand as your stand.' },
    cta: 'Put marketing collateral on your next show.',
  },
}
