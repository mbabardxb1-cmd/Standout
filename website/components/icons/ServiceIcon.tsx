/**
 * Custom line icons for the nine services. One system: 48 px grid, 2 px stroke,
 * square caps, one orange accent per icon (the element that "stands out").
 */

const INK = 'currentColor'
const ACCENT = '#FF5A1F'

type P = { size?: number; className?: string }

function Frame({ size = 48, className, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={INK}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

/** S/01 Shell-scheme stand graphics: a booth in perspective with its fascia name board lit. */
const Stand = (p: P) => (
  <Frame {...p}>
    <path d="M6 12l9 5v19l-9 5z" />
    <path d="M42 12l-9 5v19l9 5z" />
    <rect x="15" y="17" width="18" height="19" />
    <path d="M20 36v-7h8v7" />
    <rect x="6" y="6" width="36" height="6" stroke={ACCENT} />
  </Frame>
)

/** S/02 Brochures and collateral: a tri-fold leaflet. */
const Brochure = (p: P) => (
  <Frame {...p}>
    <path d="M7 12l11-3v30l-11 3z" />
    <path d="M18 9l12 3v30l-12-3z" />
    <path d="M30 12l11-3v30l-11 3z" />
    <path d="M22 18h5M22 23h5" stroke={ACCENT} />
  </Frame>
)

/** S/03 Email to exhibition databases: an envelope with a targeted point. */
const Email = (p: P) => (
  <Frame {...p}>
    <rect x="6" y="13" width="30" height="22" />
    <path d="M6 13l15 12 15-12" />
    <circle cx="38" cy="12" r="4" stroke={ACCENT} />
  </Frame>
)

/** S/04 LinkedIn and Google ads: a rising campaign bar chart with a pointer. */
const Ads = (p: P) => (
  <Frame {...p}>
    <path d="M8 40h32" />
    <path d="M12 34v-6M20 34V22M28 34V16" />
    <path d="M36 34V9" stroke={ACCENT} />
    <path d="M32 13l4-4 4 4" stroke={ACCENT} />
  </Frame>
)

/** S/05 Landing pages and microsites: a browser window with a QR corner. */
const Landing = (p: P) => (
  <Frame {...p}>
    <rect x="6" y="9" width="36" height="30" />
    <path d="M6 16h36" />
    <path d="M11 22h14M11 27h10" />
    <rect x="30" y="25" width="7" height="7" stroke={ACCENT} />
  </Frame>
)

/** S/06 Digital presentations: a screen on a stand with a play mark. */
const Presentation = (p: P) => (
  <Frame {...p}>
    <rect x="7" y="8" width="34" height="23" />
    <path d="M24 31v9M17 40h14" />
    <path d="M21 15v9l7-4.5z" stroke={ACCENT} strokeLinejoin="round" />
  </Frame>
)

/** S/07 Photography and video: a camera with a recording dot. */
const Camera = (p: P) => (
  <Frame {...p}>
    <path d="M6 16h9l3-5h12l3 5h9v22H6z" />
    <circle cx="24" cy="26" r="7" />
    <circle cx="36" cy="21" r="1.5" stroke={ACCENT} fill={ACCENT} />
  </Frame>
)

/** S/08 Interactive data collection: a tablet capturing a badge. */
const Capture = (p: P) => (
  <Frame {...p}>
    <rect x="12" y="6" width="24" height="36" />
    <path d="M21 37h6" />
    <rect x="18" y="14" width="12" height="9" stroke={ACCENT} />
    <path d="M18 28h12M18 32h8" />
  </Frame>
)

/** S/09 Post-event nurture: a follow-up loop that ends in a lead. */
const Nurture = (p: P) => (
  <Frame {...p}>
    <path d="M36.1 17A14 14 0 1 0 37.2 28.8" />
    <path d="M32.6 31.8L37.2 28.8 38.9 34" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="4" stroke={ACCENT} />
  </Frame>
)

const ICONS = [Stand, Brochure, Email, Ads, Landing, Presentation, Camera, Capture, Nurture]

export function ServiceIcon({ index, ...p }: P & { index: number }) {
  const Icon = ICONS[index] ?? Stand
  return <Icon {...p} />
}
