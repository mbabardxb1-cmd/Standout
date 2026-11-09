/** Working-draft copy for the prototype. Replace with approved lines. */

export type Service = {
  code: string
  name: string
  short: string
  phase: string
  line: string
  deliverables: string[]
  /** Shorter name for the services cards, where headings must fit two lines. */
  cardName?: string
}

export const SERVICES: Service[] = [
  {
    code: 'S/01', name: 'Stand Graphics & Branding', short: 'Stand graphics', phase: 'Pre',
    line: 'Artwork that turns a standard shell scheme into a branded space visitors notice from the aisle.',
    deliverables: ['Panel, fascia and counter artwork to the organiser’s spec', 'Print-ready files checked against the exhibitor manual', 'Your brand applied consistently across every surface'],
  },
  {
    code: 'S/02', name: 'Marketing Collateral', short: 'Collateral', phase: 'Pre',
    line: 'Take-away print that keeps selling after the visitor has left your stand.',
    deliverables: ['Brochures, flyers and product sheets', 'Business cards and handouts', 'Print management and delivery to the venue'],
  },
  {
    code: 'S/03', name: 'Targeted Email Marketing', short: 'Email', phase: 'Pre',
    line: 'Invitations to registered visitors, so the right people plan a stop at your stand.',
    deliverables: ['Campaign plan built around the show dates', 'Invitation and reminder emails', 'Open, click and booking reporting'],
  },
  {
    code: 'S/04', name: 'Digital Advertising', short: 'Digital ads', phase: 'Pre',
    line: 'Paid campaigns aimed at attendees and your target accounts in the weeks before the show.',
    deliverables: ['Audience targeting by role, sector and location', 'Ad creative in every required format', 'Weekly budget and performance reporting'],
  },
  {
    code: 'S/05', name: 'Exhibition Landing Pages', short: 'Landing pages', phase: 'Pre · At',
    line: 'A home for your show: meeting bookings, launches and the offer behind every QR code.',
    deliverables: ['Responsive landing page or microsite', 'Meeting booking and enquiry forms', 'Tracking for every channel and QR code'],
  },
  {
    code: 'S/06', name: 'Digital Decks', short: 'Digital decks', phase: 'At',
    line: 'Screen content and sales decks that hold attention on the stand and in meetings.',
    deliverables: ['Looping stand-screen content', 'Sales and product presentations', 'Versions for screens, tablets and print'],
  },
  {
    code: 'S/07', name: 'Exhibition Hosts and Hostesses', short: 'Hostesses', phase: 'At',
    line: 'Trained, briefed hosts who welcome, register and engage every visitor, so your team can focus on the leads that matter.',
    deliverables: ['Professional hosts, hostesses and brand ambassadors', 'Visitor welcoming, registration and badge scanning', 'On-stand engagement, staffing and coordination for every show day'],
  },
  {
    code: 'S/08', name: 'Photography and Event Videography', short: 'Photo & video', phase: 'At',
    line: 'Coverage of your stand, team and key moments, ready to use while the show is still on.',
    deliverables: ['Stand, product and team photography', 'Highlight video and social clips', 'Same-day selects for live posting'],
  },
  {
    code: 'S/09', name: 'Lead Capture Systems', short: 'Lead capture', phase: 'At · Post',
    line: 'Capture every conversation on a tablet, with the details your sales team actually needs.',
    deliverables: ['Custom capture form on tablet or phone', 'Lead qualification questions', 'Clean export to your CRM after the show'],
  },
  {
    code: 'S/10', name: 'Post-Event Lead Nurturing', short: 'Nurture', phase: 'Post',
    line: 'Follow-up sequences that reach every contact while the conversation is still fresh.',
    deliverables: ['Segmented follow-up sequences', 'Content matched to each lead’s interest', 'Reporting on replies, meetings and pipeline'],
  },
  {
    code: 'S/11', name: 'Content Creation', short: 'Content', phase: 'Pre · At · Post',
    line: 'Social content, reels and posts that build interest before the show and keep it going after.',
    deliverables: ['Social content plan for the show', 'Reels, stories and posts shot on the day', 'Copy and captions for LinkedIn and Instagram'],
  },
]

export type Package = { id: string; name: string; line: string; includes: number[]; tag?: string }

/** Example inclusions for the prototype. Final package contents are still to be confirmed. */
export const PACKAGES: Package[] = [
  { id: 'essentials', name: 'Essentials', line: 'Foundations for visual impact on-site.', includes: [0, 1, 5] },
  { id: 'marketing', name: 'Marketing', line: 'Full-funnel visitor attraction before and after the show.', includes: [0, 1, 2, 3, 4, 5, 9] },
  { id: '360', name: '360', line: 'End to end: every service, joined up for full dominance.', includes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], tag: 'Everything, joined up' },
]

/** Contact details. */
export const CONTACT = {
  email: 'hello@standout.ae',
  phone: '+971 4 442 6518',
  phoneHref: 'tel:+97144426518',
  address: ['1207/1208 Mazaya BB2', 'Jumeirah Lakes Towers, Dubai'],
  /** Embed view of the office for the contact page (no key needed). */
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.990087615076!2d55.145085099999996!3d25.0683251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6ca73e9134b5%3A0x279ae8d8d63a71a5!2sUnited%20SEO!5e0!3m2!1sen!2sae!4v1793865199131!5m2!1sen!2sae',
  /** Social profiles; replace with the real links. */
  linkedin: 'https://www.linkedin.com/',
  instagram: 'https://www.instagram.com/',
  mapHref: 'https://maps.google.com/?cid=2853849331897364901',
}
