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
  /** On phones, size the header to the photograph's shape so nothing is cut at the sides. */
  headerWholeOnMobile?: 'square' | '16/10' | '16/9'
}

/** Where a picture is anchored when cropped into a tile (src → CSS object-position); default is the centre. */
export const IMAGE_POS: Record<string, string> = {
  '/photos/included/live-posting.webp': '50% 0%', // square: keep her phone and the social icons in frame
  '/photos/included/content-calendar.webp': '62% 50%', // keep the calendar on screen in frame
  '/photos/included/objectives-goals.webp': '50% 55%', // portrait: keep the team on the stand in frame
  '/photos/included/industry-briefing.webp': '50% 6%', // portrait: keep the faces and tablets in frame
  '/photos/included/video-wall.webp': '62% 50%', // keep the LED wall in frame
  '/photos/included/tablet-versions.webp': '78% 50%', // keep the tablet and screen on the counter in frame
  '/photos/included/floor-wayfinding.webp': '55% 75%', // keep the roll-up banners in frame
  '/photos/included/screen-artwork.webp': '62% 30%', // keep the TV screen in frame
  '/photos/included/counter-wrap.webp': '55% 75%', // keep the blue booth desk in frame
  '/photos/included/fascia-header.webp': '85% 50%', // keep the blue arch header in frame
  [PHOTOS.nurture]: '100% 50%', // keep the lead-nurture journey panel on the right
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
      '/photos/included/stand-3d-letters.webp', // 3D stand printing
      '/photos/included/business-cards.webp', // Business cards
    ],
    steps: [
      '/photos/included/brochure-reader.webp',
      '/photos/included/company-profile.webp',
      '/photos/included/stand-3d-letters.webp',
      PHOTOS.print,
      '/photos/included/business-cards.webp', // Print and delivery: the finished printed pieces,
    ],
    band: { src: '/photos/included/stand-floor-idex.webp', line: 'Everything they take home, in the same brand as your stand.' },
    cta: 'Put marketing collateral on your next show.',
  },
  'stand-graphics': {
    side: PHOTOS.shellScheme,
    items: [
      '/photos/included/wall-panel-graphics.webp', // Wall and panel graphics
      '/photos/included/fascia-header.webp', // Fascia and header boards
      '/photos/included/counter-wrap.webp', // Counter and furniture wraps
      '/photos/included/screen-artwork.webp', // Screen artwork
      '/photos/included/floor-wayfinding.webp', // Hanging banners
      '/photos/included/print-ready-stand.webp', // Print-ready files
    ],
    steps: [
      '/photos/included/screen-artwork.webp', // Brief and floor plan: the stand before branding
      '/photos/included/video-wall.webp', // Concept
      '/photos/included/wall-panel-graphics.webp', // Design and proof
      '/photos/included/print-ready-stand.webp', // Print-ready delivery: the finished stand
    ],
    band: { src: '/photos/frames/sob-entrance.webp', line: 'Branded from the aisle to the counter.' },
    cta: 'Put stand graphics on your next show.',
  },
  'email-linkedin-marketing': {
    headerWholeOnMobile: '16/10',
    side: '/photos/included/campaign-audience.webp',
    items: [
      '/photos/included/data-research.webp', // Data scraping and research
      '/photos/included/verified-contacts.webp', // Verified contact list
      '/photos/included/email-setup.webp', // Email set-up
      '/photos/included/linkedin-outreach.webp', // LinkedIn outreach
      PHOTOS.nurture,
      '/photos/frames/m-talk.webp',
    ],
    steps: [
      '/photos/included/campaign-audience.webp',
      PHOTOS.email,
      PHOTOS.landing,
      PHOTOS.nurture,
      '/photos/frames/m-talk.webp',
      '/photos/included/campaign-report.webp',
    ],
    band: { src: '/photos/frames/m-guests.webp', line: 'Meetings in the diary before the doors open.' },
    cta: 'Fill your stand diary before the show.',
  },
  'paid-advertising': {
    headerWholeOnMobile: '16/9',
    side: PHOTOS.contentCreation,
    items: [
      '/photos/included/organic-posting.webp', // Organic posting before the event
      '/photos/included/social-ads.webp', // Social ads
      PHOTOS.ads,
      '/photos/included/stand-floor-idex.webp',
      '/photos/frames/m-screens.webp',
      '/photos/included/ads-reporting.webp', // Reporting
    ],
    steps: [
      PHOTOS.ads,
      PHOTOS.contentCreation,
      PHOTOS.landing,
      '/photos/included/stand-floor-idex.webp',
      '/photos/included/ads-reporting.webp',
    ],
    band: { src: PHOTOS.eventVideography, line: 'Your market knows where to find you before day one.' },
    cta: 'Put digital advertising on your next show.',
  },
  'social-media-management': {
    side: '/photos/included/content-calendar.webp',
    items: [
      '/photos/included/content-calendar.webp', // Content calendar
      '/photos/included/live-posting.webp', // Live posting
      '/photos/included/stories-reels.webp', // Stories and reels
      '/photos/included/highlight-film.webp',
    ],
    steps: [
      '/photos/included/organic-posting.webp', // Plan
      PHOTOS.contentCreation, // Capture: the manager filming the stand on her phone
      '/photos/included/social-ads.webp', // Post live
      '/photos/included/ads-reporting.webp', // Recap and report
    ],
    band: { src: '/photos/included/stand-floor-idex.webp', line: 'Live from the floor, every show day.' },
    cta: 'Put social media management on your next show.',
  },
  'presentations': {
    side: '/photos/frames/m-screens.webp',
    items: [
      '/photos/frames/m-screens.webp',
      '/photos/included/tablet-versions.webp', // Tablet versions
      '/photos/included/video-wall.webp', // Video walls and LED
    ],
    steps: [
      '/photos/frames/m-screens.webp',
      PHOTOS.presentation,
      '/photos/frames/sob-entrance.webp',
      '/photos/frames/m-screens.webp',
    ],
    band: { src: PHOTOS.eventVideography, line: 'Understood in seconds, from across the aisle.' },
    cta: 'Put digital decks on your next show.',
  },
  'hosts-and-hostesses': {
    headerWholeOnMobile: '16/10',
    side: PHOTOS.hostess,
    items: [
      PHOTOS.hostess,
      '/photos/included/industry-briefing.webp', // Industry briefing
      '/photos/included/objectives-goals.webp', // Objectives and goals
      '/photos/frames/m-guests.webp',
      PHOTOS.leadCapture,
    ],
    steps: [
      PHOTOS.hostess,
      '/photos/frames/m-uniform.webp',
      '/photos/frames/m-talk.webp',
      '/photos/frames/m-guests.webp',
      PHOTOS.leadCapture,
      '/photos/frames/dr-talk.webp',
    ],
    band: { src: '/photos/included/stand-floor-idex.webp', line: 'Every visitor welcomed by someone who knows your product.' },
    cta: 'Put trained hosts and hostesses on your next show.',
  },
  'lead-capture': {
    side: PHOTOS.leadCapture,
    items: [
      PHOTOS.leadCapture, // Badge scanning
      '/photos/frames/m-talk.webp',
      '/photos/included/brochure-reader.webp',
      '/photos/included/live-lead-dashboard.webp' /* Live dashboard */,
      PHOTOS.email,
    ],
    steps: [
      PHOTOS.leadCapture,
      '/photos/included/tablet-versions.webp', // Devices set up,
      '/photos/frames/m-uniform.webp',
      PHOTOS.email,
    ],
    band: { src: '/photos/frames/m-guests.webp', line: 'No conversation leaves the stand unrecorded.' },
    cta: 'Put lead capture on your next show.',
  },
  'lead-nurturing': {
    headerWholeOnMobile: '16/9',
    side: '/photos/included/lead-segmentation.webp',
    items: [
      '/photos/included/lead-segmentation.webp', // Lead segmentation
      PHOTOS.email,
      PHOTOS.nurture,
    ],
    steps: [
      '/photos/included/lead-segmentation.webp',
      PHOTOS.email,
      PHOTOS.nurture,
      '/photos/included/campaign-report.webp', // Report
    ],
    band: { src: PHOTOS.aboutFloor, line: 'The show closes. Your pipeline opens.' },
    cta: 'Turn your next show into pipeline.',
  },
}
