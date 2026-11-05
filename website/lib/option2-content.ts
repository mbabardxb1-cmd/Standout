/** Homepage option 2 copy. Hero and service lists are from the brief; the rest is working draft. */

export const O2_HERO = {
  eyebrow: 'Exhibition marketing agency',
  headline: 'Make Every Exhibition Count.',
  support:
    'We help exhibitors attract the right audience, create meaningful connections and turn exhibition participation into measurable business opportunities.',
  primary: 'Discuss Your Next Exhibition',
  secondary: 'Explore Our Services',
  photo: 'International trade exhibition, wide: a branded stand with visitors in conversation and the hall beyond',
  src: 'stand' as const,
}

export const O2_SECTORS = ['Healthcare', 'Technology', 'Construction', 'Energy', 'Food & hospitality', 'Education', 'Manufacturing']

export type O2Service = {
  n: string
  name: string
  intro: string
  items: string[]
  photo: string
  /** Key into PHOTOS (lib/assets.ts). */
  src: 'stand' | 'ads' | 'hostess' | 'photographer' | 'leadCapture' | 'dashboard' | 'shellScheme' | 'print' | 'email' | 'handshake'
}

export const O2_SERVICES: O2Service[] = [
  {
    n: '01',
    name: 'Exhibition Stand Branding & Design',
    intro:
      'Your stand has a few seconds to earn a visitor’s attention from the aisle. We design the graphics, print and screen content that make a standard shell scheme look like it belongs to a market leader.',
    items: ['Shell-scheme exhibition stand graphic design', 'Stand branding and visual communication', 'Brochures and flyers', 'Marketing collateral', 'Digital presentations'],
    photo: 'Shell-scheme stand with full-height branded panels, counter and screen, photographed from the aisle',
    src: 'shellScheme',
  },
  {
    n: '02',
    name: 'Digital Marketing & Advertising',
    intro:
      'The visitors you most want to meet decide their route before the doors open. We put your stand on their plan with email, LinkedIn and Google campaigns and a landing page built for the show.',
    items: ['Email marketing to relevant exhibition databases', 'LinkedIn advertising', 'Google advertising', 'Exhibition landing pages', 'Campaign microsites'],
    photo: 'Marketing team reviewing a show campaign on screen, with the exhibition landing page open',
    src: 'ads',
  },
  {
    n: '03',
    name: 'Exhibition Hosts & Hostesses',
    intro:
      'A warm, professional welcome turns passing traffic into conversations. Our trained hosts and hostesses greet, register and engage visitors so your team can focus on the leads that matter.',
    items: ['Professional exhibition hostesses', 'Exhibition hosts', 'Brand ambassadors', 'Visitor welcoming and registration', 'On-stand visitor engagement', 'Event staffing and coordination'],
    photo: 'Hosts in branded uniform welcoming visitors at a stand reception desk',
    src: 'hostess',
  },
  {
    n: '04',
    name: 'Photography & Videography',
    intro:
      'Three days on the floor should keep working for months. We capture the stand, the people and the product so your sales and social channels have real content from the show.',
    items: ['Professional exhibition photography', 'Event videography', 'Product photography', 'Brand coverage', 'Social media content creation'],
    photo: 'Photographer shooting a product demonstration on a busy stand',
    src: 'photographer',
  },
  {
    n: '05',
    name: 'Lead Capture & Data Collection',
    intro:
      'Business cards in a fishbowl are not a pipeline. We set up digital capture on the stand so every conversation is recorded, qualified and ready for follow-up before the show closes.',
    items: ['Digital visitor data collection', 'Lead capture systems', 'Visitor registration', 'Enquiry management', 'Lead qualification', 'Database organisation'],
    photo: 'Visitor badge being scanned on a tablet at the stand, lead form on screen',
    src: 'leadCapture',
  },
  {
    n: '06',
    name: 'Post-Event Marketing & Lead Nurturing',
    intro:
      'Most exhibition leads go cold within a fortnight. We follow up while the conversation is still fresh, segment the database and keep nurturing until the lead is ready for your sales team.',
    items: ['Post-event email campaigns', 'Lead follow-up', 'Database segmentation', 'CRM integration', 'Lead nurturing campaigns'],
    photo: 'Sales team reviewing qualified leads on a CRM dashboard after the show',
    src: 'dashboard',
  },
]

export const O2_APPROACH = [
  { phase: 'Before the show', line: 'Stand design, print, campaigns and landing pages, so the right visitors plan to see you.', services: ['01', '02'] },
  { phase: 'On the floor', line: 'Hosts, photography and digital lead capture, so every conversation is welcomed and recorded.', services: ['03', '04', '05'] },
  { phase: 'After the show', line: 'Fast follow-up, segmentation and nurturing, so leads become meetings and meetings become revenue.', services: ['06'] },
]

/** Example figures for the layout. Replace with the client’s real results. */
export const O2_OUTCOMES = [
  { value: '2.4×', label: 'more qualified leads', note: 'with digital capture versus collecting cards by hand' },
  { value: '48 h', label: 'to first follow-up', note: 'every captured lead contacted within two days of the show' },
  { value: '68%', label: 'stand visits planned', note: 'visitors who said they came to the stand because of pre-show contact' },
  { value: '1 team', label: 'from brief to follow-up', note: 'one point of contact across design, staffing, capture and nurture' },
]

export const O2_STEPS = [
  { n: '1', title: 'Brief', line: 'Tell us the show, the stand and what a good result looks like. We come back with a plan and a quote.' },
  { n: '2', title: 'Build', line: 'We design the stand graphics and collateral, set up the campaigns and prepare the capture system.' },
  { n: '3', title: 'Show', line: 'Our hosts, photographer and capture team work alongside yours for every hour the hall is open.' },
  { n: '4', title: 'Follow up', line: 'Leads are qualified, segmented and nurtured, and you get a report on what the show delivered.' },
]
