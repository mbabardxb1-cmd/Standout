import type { StepIconName } from '@/components/ui/StepIcon'

/** Single-service page content, one entry per service in SERVICES (same order). Working draft. */
export type ServicePage = {
  slug: string
  eyebrow: string
  headline: string
  intro: string
  steps: { icon: StepIconName; title: string; line: string }[]
  stat: { value: string; label: string }
  /** Indexes into SERVICES of services often taken together. */
  related: number[]
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'stand-graphics',
    eyebrow: 'Before the show',
    headline: 'A shell scheme that reads like a flagship stand.',
    intro: 'Most exhibitors get a white shell scheme and a fascia. We design the panel, counter and screen artwork that turns that box into a branded space visitors notice from the aisle, built to the organiser’s spec so it goes up right first time.',
    steps: [
      { icon: 'floorplan', title: 'Brief and floor plan', line: 'We work from your stand position, the exhibitor manual and what you want visitors to do when they stop.' },
      { icon: 'pen', title: 'Design and proof', line: 'Panel, fascia and counter artwork, with one consistent message from the aisle to the counter.' },
      { icon: 'fileCheck', title: 'Print-ready delivery', line: 'Files checked against the manual and delivered to your contractor or ours, on time for build-up.' },
    ],
    stat: { value: '3 s', label: 'to earn a glance from the aisle' },
    related: [1, 5, 6],
  },
  {
    slug: 'print-collateral',
    eyebrow: 'Before the show',
    headline: 'Print that keeps selling after the visitor has left.',
    intro: 'Brochures, flyers, product sheets and cards that match the stand and carry the conversation home. Designed to be picked up, kept and passed on.',
    steps: [
      { icon: 'bag', title: 'What visitors take away', line: 'We decide what each piece is for: a quick take-away, a product sheet for the specifier, a leave-behind for the buyer.' },
      { icon: 'layers', title: 'Design in the stand’s system', line: 'The same type, colour and tone as the stand, so everything from the fascia to the flyer is one brand.' },
      { icon: 'truck', title: 'Print and delivery to the venue', line: 'Stock, finish and quantities managed for you, delivered to the hall before doors open.' },
    ],
    stat: { value: '1 system', label: 'from fascia to flyer' },
    related: [0, 5, 9],
  },
  {
    slug: 'email-campaigns',
    eyebrow: 'Before the show',
    headline: 'Put your stand on the visitor’s plan before they arrive.',
    intro: 'Registered visitors decide their route in the weeks before the show. We send the invitations, reminders and meeting offers that make your stand a planned stop, not a chance encounter.',
    steps: [
      { icon: 'users', title: 'Audience and list', line: 'The exhibition’s registered visitor list, your own contacts and target accounts, segmented by role and sector.' },
      { icon: 'mail', title: 'Invitation sequence', line: 'A save-the-date, an invitation with a reason to visit, and a reminder in show week, each with a meeting link.' },
      { icon: 'chart', title: 'Reporting', line: 'Opens, clicks and meetings booked, reported weekly so you know who is coming before you set up.' },
    ],
    stat: { value: '68%', label: 'of stand visits planned in advance' },
    related: [3, 4, 9],
  },
  {
    slug: 'paid-advertising',
    eyebrow: 'Before the show',
    headline: 'Reach the attendees your email can’t.',
    intro: 'LinkedIn and Google campaigns aimed at people attending the show and at your target accounts, running in the weeks before and during the event.',
    steps: [
      { icon: 'target', title: 'Targeting', line: 'By job title, sector, company and location, matched to the show’s audience and your ideal customer.' },
      { icon: 'layout', title: 'Creative in every format', line: 'Ads that carry the stand’s look, in the sizes and formats each platform needs.' },
      { icon: 'trend', title: 'Weekly optimisation', line: 'Budget moved to what works, with a clear report on cost per visit booked.' },
    ],
    stat: { value: '4 wks', label: 'typical campaign run-up' },
    related: [2, 4, 9],
  },
  {
    slug: 'landing-pages',
    eyebrow: 'Before and at the show',
    headline: 'One home for your show, behind every link and QR code.',
    intro: 'A landing page or microsite built for the event: meeting booking, the launch, the offer, and tracking for every channel that points to it.',
    steps: [
      { icon: 'sitemap', title: 'Structure', line: 'What the page needs to do: book a meeting, register interest, download a sheet, or all three.' },
      { icon: 'code', title: 'Build', line: 'Responsive, fast, on your domain or ours, with forms that feed straight into your capture and follow-up.' },
      { icon: 'chart', title: 'Track', line: 'Every email, ad and QR code tagged, so you know which channel brought each visitor.' },
    ],
    stat: { value: '1 link', label: 'for every channel and QR code' },
    related: [2, 3, 8],
  },
  {
    slug: 'presentations',
    eyebrow: 'At the show',
    headline: 'Screen content that holds attention on a busy floor.',
    intro: 'Looping stand screens, sales decks for the meeting table and tablet versions for the aisle, all made to be understood in seconds and consistent with the stand.',
    steps: [
      { icon: 'book', title: 'Story', line: 'The three things a visitor should know before they talk to you, told without sound.' },
      { icon: 'pen', title: 'Design', line: 'Motion and stills for the stand screen, a presentation for meetings, and a version for tablets.' },
      { icon: 'monitor', title: 'Delivery', line: 'Files in every size and format your screens need, tested on the hardware before the show.' },
    ],
    stat: { value: '0:45', label: 'typical screen loop' },
    related: [0, 1, 6],
  },
  {
    slug: 'hosts-and-hostesses',
    eyebrow: 'At the show',
    headline: 'Every visitor welcomed. Every conversation started.',
    intro: 'Trained, briefed hosts and hostesses who greet visitors, handle registration and badge scanning, and keep the stand working, so your team can spend its time on the leads that matter.',
    steps: [
      { icon: 'clipboard', title: 'Brief', line: 'Your products, your offer and what a good visitor looks like, so hosts can open the right conversations.' },
      { icon: 'pin', title: 'On the stand', line: 'Welcome, registration, badge scanning, demos and the aisle, for every hour the hall is open.' },
      { icon: 'send', title: 'Hand-over', line: 'Every conversation recorded and passed to your team, with a short debrief at the end of each day.' },
    ],
    stat: { value: '100%', label: 'of stand hours covered' },
    related: [8, 7, 5],
  },
  {
    slug: 'photography-video',
    eyebrow: 'At the show',
    headline: 'Three days on the floor that keep working for months.',
    intro: 'Photography and video of the stand, the team, the product and the key moments, edited fast so your sales and social channels have real content while the show is still on.',
    steps: [
      { icon: 'list', title: 'Shot list', line: 'Agreed before the show: stand, team, product, demos, visitors and the moments you want to remember.' },
      { icon: 'camera', title: 'Coverage', line: 'A photographer and videographer on the stand on the days that matter, with same-day selects.' },
      { icon: 'film', title: 'Edit and formats', line: 'A highlight film, social clips and stills, cut for LinkedIn, your website and sales decks.' },
    ],
    stat: { value: 'Same day', label: 'first selects for live posting' },
    related: [6, 5, 9],
  },
  {
    slug: 'lead-capture',
    eyebrow: 'At and after the show',
    headline: 'No conversation leaves the stand unrecorded.',
    intro: 'A capture system on tablets and phones at the stand: badge scan, the qualification questions your sales team chose, and a clean export the moment the show closes.',
    steps: [
      { icon: 'form', title: 'Form and questions', line: 'The details your sales team actually needs, agreed before the show and built into the capture form.' },
      { icon: 'scan', title: 'On the stand', line: 'Badge scan or quick entry on any tablet or phone, with notes, so nothing is lost in a busy hour.' },
      { icon: 'download', title: 'Export', line: 'A clean, segmented list to your CRM at close of show, ready for the follow-up.' },
    ],
    stat: { value: '2.4×', label: 'more qualified leads than cards by hand' },
    related: [6, 9, 4],
  },
  {
    slug: 'lead-nurturing',
    eyebrow: 'After the show',
    headline: 'Follow up while the conversation is still warm.',
    intro: 'Segmented email sequences that reach every contact within days of the show, matched to what they were interested in, and kept going until the lead is ready for your sales team.',
    steps: [
      { icon: 'filter', title: 'Segment', line: 'Leads grouped by interest, stage and what was promised on the stand.' },
      { icon: 'mail', title: 'Sequence', line: 'A first email within 48 hours, then content matched to each group over the following weeks.' },
      { icon: 'chart', title: 'Report', line: 'Replies, meetings and pipeline, so you can see what the show returned.' },
    ],
    stat: { value: '48 h', label: 'to first follow-up' },
    related: [8, 2, 4],
  },
]

export const pageFor = (slug: string) => {
  const i = SERVICE_PAGES.findIndex((p) => p.slug === slug)
  return i < 0 ? null : { index: i, page: SERVICE_PAGES[i] }
}
