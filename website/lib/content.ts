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
    code: 'S/01', name: 'Stand Graphics & Branding', short: 'Stand graphics', phase: 'Before the show',
    line: 'Artwork that turns a standard shell scheme into a branded space visitors notice from the aisle.',
    deliverables: ['Panel, fascia and counter artwork to the organiser’s spec', 'Print-ready files checked against the exhibitor manual', 'Your brand applied consistently across every surface'],
  },
  {
    code: 'S/02', name: 'Marketing Collateral', short: 'Collateral', phase: 'Before the show',
    line: 'Portfolio books, brochures, company profiles and cards that keep selling after the visitor has left your stand.',
    deliverables: ['Portfolio books and company profiles', 'Brochures and flyers', 'Visiting cards'],
  },
  {
    code: 'S/03', name: 'Email & LinkedIn Marketing System', short: 'Email & LinkedIn', phase: 'Before the show',
    line: 'We find the right people, reach them by email and LinkedIn, and book meetings at your stand before the show opens.',
    deliverables: ['Targeted contact list built for your show', 'Email and LinkedIn outreach sequences', 'Meetings booked into your stand diary'],
  },
  {
    code: 'S/04', name: 'Digital Advertising', short: 'Digital ads', phase: 'Before the show',
    line: 'Organic posts, social ads and Google ads that tell your market you’re exhibiting and bring them to the stand.',
    deliverables: ['Organic posting before the event', 'Social media ads', 'Google ads', 'Event advertising'],
  },
  {
    code: 'S/05', name: 'Social Media Management', short: 'Social media', phase: 'At the show',
    line: 'Your channels run live from the show floor: stories, posts and replies while the event is happening.',
    deliverables: ['Live posting and stories from the stand', 'Community management and replies', 'Content calendar before, during and after the show'],
  },
  {
    code: 'S/06', name: 'Digital Decks', short: 'Digital decks', phase: 'At the show',
    line: 'Screen content that holds attention on the stand, from the stand screens to the video wall.',
    deliverables: ['Looping stand-screen content', 'Tablet versions for the aisle and counter', 'Content for video walls and LED screens'],
  },
  {
    code: 'S/07', name: 'Exhibition Hosts and Hostesses', short: 'Hostesses', phase: 'At the show',
    line: 'Hosts trained on your product and industry, briefed on your goals, who engage visitors and capture their details.',
    deliverables: ['Hosts trained on your product and industry', 'Briefed on your objectives and goals', 'Visitor engagement and data capture'],
  },
  {
    code: 'S/08', name: 'Photography, Video & Content Creation', short: 'Photo, video & content', phase: 'At the show',
    cardName: 'Photography, Video & Content',
    line: 'Professional photo and video, interviews on the stand and mobile content for social media, all from one crew.',
    deliverables: ['Professional videographers and photographers', 'Interviews at the event', 'Mobile-shot content for social media'],
  },
  {
    code: 'S/09', name: 'Lead Capture Systems', short: 'Lead capture', phase: 'At the show',
    line: 'Capture every conversation on a tablet, with the details your sales team actually needs.',
    deliverables: ['Custom capture form on tablet or phone', 'Lead qualification questions', 'Clean export to your CRM after the show'],
  },
  {
    code: 'S/10', name: 'Post-Event Lead Nurturing', short: 'Nurture', phase: 'After the show',
    line: 'Follow-up sequences that reach every contact while the conversation is still fresh.',
    deliverables: ['Segmented follow-up sequences', 'Content matched to each lead’s interest', 'Reporting on replies, meetings and pipeline'],
  },
]

export type Package = { id: string; name: string; line: string; includes: number[]; tag?: string }

/** Example inclusions for the prototype. Final package contents are still to be confirmed. */
export const PACKAGES: Package[] = [
  { id: 'essentials', name: 'Essentials', line: 'Foundations for visual impact on-site.', includes: [0, 1, 5] },
  { id: 'marketing', name: 'Marketing', line: 'Full-funnel visitor attraction before and after the show.', includes: [0, 1, 2, 3, 4, 5, 9] },
  { id: '360', name: '360', line: 'End to end: every service, joined up for full dominance.', includes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], tag: 'Everything, joined up' },
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
