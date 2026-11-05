import type React from 'react'
/** Brand asset URLs (served from /public in Next.js). */
export const WORDMARK = '/standout-wordmark-reversed.svg'
/** Navy wordmark with the orange O, for light grounds (homepage option 2). */
export const WORDMARK_COLOUR = '/standout-wordmark-colour.svg'

/** "How we work" step icons. White line art with alpha, used as CSS masks so CSS sets the colour. */
export const HOW_ICONS = {
  prepare: '/icons/how-prepare.png',
  promote: '/icons/how-promote.png',
  perform: '/icons/how-perform.png',
  profit: '/icons/how-profit.png',
}

/** 3D service renders (S/01 to S/10), transparent WebP. */
const R = ['stand', 'print', 'email', 'ads', 'landing', 'screen', 'hosts', 'camera', 'capture', 'nurture']
export const SERVICE_RENDERS: string[] = R.map((n) => `/icons/services/svc-${n}.webp`)

/** Exhibition photography for homepage option 3 (client-supplied). */
export const PHOTOS = {
  stand: '/photos/stand.webp',
  shellScheme: '/photos/shell-scheme.webp',
  dashboard: '/photos/dashboard.webp',
  handshake: '/photos/handshake.webp',
  leadCapture: '/photos/lead-capture.webp',
  ads: '/photos/ads.webp',
  photographer: '/photos/photographer.webp',
  hostess: '/photos/hostess.webp',
  landing: '/photos/landing.webp',
  presentation: '/photos/presentation.webp',
  print: '/photos/print.webp',
  email: '/photos/email.webp',
  nurture: '/photos/nurture.webp',
  serviceBand: '/photos/service-band.webp',
}

/** Photographs shown whole rather than cropped (index into SERVICES), with the ground colour behind them. */
export const SERVICE_PHOTO_FIT: Record<number, { fit: 'contain'; bg: string }> = {}
/** Inline styles for a service photograph: cover by default, contain on its own ground when listed above. */
/** Where a cropped photograph is anchored (index into SERVICES); default is the centre. */
export const SERVICE_PHOTO_POS: Record<number, string> = {
  4: '40% 50%', // landing mockup: keep the laptop and phone, lose some of the stand on the right
  9: '78% 50%', // nurture mockup: keep the laptop, phone and journey panel, lose the plant on the left
}
export const servicePhotoStyle = (i: number): React.CSSProperties =>
  SERVICE_PHOTO_FIT[i] ? { objectFit: 'contain', backgroundColor: SERVICE_PHOTO_FIT[i].bg } : SERVICE_PHOTO_POS[i] ? { objectPosition: SERVICE_PHOTO_POS[i] } : {}
/** One photograph per service (S/01 to S/10). */
export const SERVICE_PHOTOS: string[] = [PHOTOS.shellScheme, PHOTOS.print, PHOTOS.email, PHOTOS.ads, PHOTOS.landing, PHOTOS.presentation, PHOTOS.hostess, PHOTOS.photographer, PHOTOS.leadCapture, PHOTOS.nurture]

/** Case-study films and posters (public/video). `portrait` films are 9:16 social clips; the rest are landscape. */
export const CASE_STUDY_FILMS = [
  { video: '/video/case-study.mp4', poster: '/video/case-study-poster.webp', portrait: true },
  { video: '/video/case-study-2.mp4', poster: '/video/case-study-2-poster.webp', portrait: true },
  { video: '/video/imtiaz.mp4', poster: '/video/imtiaz-poster.webp', portrait: true },
  { video: '/video/bch-clb.mp4', poster: '/video/bch-clb-poster.webp', portrait: true },
  { video: '/video/desert-classic.mp4', poster: '/video/desert-classic-poster.webp', portrait: true },
]


/** Team portraits (public/team), 600 px square. */
export const TEAM_PHOTOS: Record<string, string> = Object.fromEntries(['simon', 'gareth', 'dean', 'pavan', 'olivia', 'bobbie'].map((n) => [n, `/team/${n}.webp`]))
