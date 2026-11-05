import type React from 'react'
// Same exports as lib/assets.ts, but imported so Vite inlines them into the single file.
import WORDMARK from '@/public/standout-wordmark-reversed.svg'
import WORDMARK_COLOUR from '@/public/standout-wordmark-colour.svg'
import prepare from '@/public/icons/how-prepare.png'
import promote from '@/public/icons/how-promote.png'
import perform from '@/public/icons/how-perform.png'
import profit from '@/public/icons/how-profit.png'
import stand from '@/public/icons/services/svc-stand.webp'
import print from '@/public/icons/services/svc-print.webp'
import email from '@/public/icons/services/svc-email.webp'
import ads from '@/public/icons/services/svc-ads.webp'
import landing from '@/public/icons/services/svc-landing.webp'
import screen from '@/public/icons/services/svc-screen.webp'
import hostsIcon from '@/public/icons/services/svc-hosts.webp'
import camera from '@/public/icons/services/svc-camera.webp'
import capture from '@/public/icons/services/svc-capture.webp'
import nurture from '@/public/icons/services/svc-nurture.webp'
import photoStand from '@/public/photos/stand.webp'
import shellScheme from '@/public/photos/shell-scheme.webp'
import dashboard from '@/public/photos/dashboard.webp'
import handshake from '@/public/photos/handshake.webp'
import leadCapture from '@/public/photos/lead-capture.webp'
import photoAds from '@/public/photos/ads.webp'
import photographer from '@/public/photos/photographer.webp'
import hostess from '@/public/photos/hostess.webp'
import photoLanding from '@/public/photos/landing.webp'
import presentation from '@/public/photos/presentation.webp'
import printPhoto from '@/public/photos/print.webp'
import emailPhoto from '@/public/photos/email.webp'
import nurturePhoto from '@/public/photos/nurture.webp'
import serviceBand from '@/public/photos/service-band.webp'
export const PHOTOS = { stand: photoStand, shellScheme, dashboard, handshake, leadCapture, ads: photoAds, photographer, hostess, landing: photoLanding, presentation, print: printPhoto, email: emailPhoto, nurture: nurturePhoto, serviceBand }
export const SERVICE_PHOTOS: string[] = [shellScheme, printPhoto, emailPhoto, photoAds, photoLanding, presentation, hostess, photographer, leadCapture, nurturePhoto]
export { WORDMARK, WORDMARK_COLOUR }
export const HOW_ICONS = { prepare, promote, perform, profit }
export const SERVICE_RENDERS: string[] = [stand, print, email, ads, landing, screen, hostsIcon, camera, capture, nurture]
import cs1p from '@/public/video/case-study-poster.webp'
import cs2p from '@/public/video/case-study-2-poster.webp'
import cs3p from '@/public/video/imtiaz-poster.webp'
import cs4p from '@/public/video/bch-clb-poster.webp'
import cs5p from '@/public/video/desert-classic-poster.webp'
// Films are published beside the page (prototype/build-option3/video/), not inlined, to keep the file small.
export const CASE_STUDY_FILMS = [
  { video: 'video/case-study.mp4', poster: cs1p, portrait: true },
  { video: 'video/case-study-2.mp4', poster: cs2p, portrait: true },
  { video: 'video/imtiaz.mp4', poster: cs3p, portrait: true },
  { video: 'video/bch-clb.mp4', poster: cs4p, portrait: true },
  { video: 'video/desert-classic.mp4', poster: cs5p, portrait: true },
]
export const SERVICE_PHOTO_FIT: Record<number, { fit: 'contain'; bg: string }> = { 1: { fit: 'contain', bg: '#e2e4ea' } }
export const SERVICE_PHOTO_POS: Record<number, string> = { 4: '40% 50%', 9: '78% 50%' }
export const servicePhotoStyle = (i: number): React.CSSProperties =>
  SERVICE_PHOTO_FIT[i] ? { objectFit: 'contain', backgroundColor: SERVICE_PHOTO_FIT[i].bg } : SERVICE_PHOTO_POS[i] ? { objectPosition: SERVICE_PHOTO_POS[i] } : {}
import t_simon from '@/public/team/simon.webp'
import t_gareth from '@/public/team/gareth.webp'
import t_dean from '@/public/team/dean.webp'
import t_pavan from '@/public/team/pavan.webp'
import t_olivia from '@/public/team/olivia.webp'
import t_bobbie from '@/public/team/bobbie.webp'
export const TEAM_PHOTOS: Record<string, string> = { simon: t_simon, gareth: t_gareth, dean: t_dean, pavan: t_pavan, olivia: t_olivia, bobbie: t_bobbie }
