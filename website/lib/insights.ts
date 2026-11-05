/** Insights: working-draft articles for the blog. Replace with the team's own writing. */
export type Article = {
  slug: string
  title: string
  dek: string
  category: 'Before the show' | 'On the stand' | 'After the show' | 'Inside Standout'
  date: string
  readMinutes: number
  /** Key into PHOTOS for the cover picture. */
  photo: 'stand' | 'shellScheme' | 'dashboard' | 'handshake' | 'leadCapture' | 'ads' | 'photographer' | 'hostess' | 'landing' | 'presentation' | 'print' | 'email' | 'nurture'
  body: string[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'three-seconds-from-the-aisle',
    title: 'You have three seconds from the aisle. Spend them well.',
    dek: 'Most shell schemes are read, judged and passed in the time it takes to walk past. Here is what the panels need to say, and in what order.',
    category: 'Before the show',
    date: '2026-10-14',
    readMinutes: 5,
    photo: 'shellScheme',
    body: [
      'Walk any hall and watch where visitors look. Eyes go to the fascia first, then to whatever is at standing height on the back wall, then to the people. By the time they have taken that in, they have decided whether to slow down. That is the whole window a shell scheme gets.',
      'So the fascia carries the name and one phrase that says what you do for whom. Not a strapline, a sentence a stranger can repeat. The back wall carries the proof: one product, one number or one picture that makes the phrase believable. Everything else, the long copy, the logos, the certifications, goes on the counter or in the hand-out, where someone who has already stopped can read it.',
      'The mistake we see most is treating the panels as a brochure. A panel is a poster. It works at six metres, in bad light, for someone walking. Design it for that and the stand does its job before anyone on it says a word.',
      'The second mistake is the floor plan. A corner stand reads from two aisles, an inline stand from one, and the panel that faces the main flow of traffic is the one that matters. We start every stand graphics job from the organiser’s floor plan for exactly this reason.',
    ],
  },
  {
    slug: 'the-pre-show-email-that-fills-the-diary',
    title: 'The pre-show email sequence that fills the meeting diary.',
    dek: 'Registered visitors plan their route in the fortnight before doors open. Three emails, sent in the right order, put your stand on that plan.',
    category: 'Before the show',
    date: '2026-09-30',
    readMinutes: 4,
    photo: 'email',
    body: [
      'An exhibition visitor list is one of the few audiences that has already told you where they will be and when. The job of pre-show email is simply to give them a reason to add your stand to the route they are already planning.',
      'Three sends do the work. A save-the-date four weeks out, short, with the stand number and one line on what is new. An invitation two weeks out with a reason to visit: a launch, a demo slot, a product they can only see on the stand. And a reminder in show week with a link to book a fifteen-minute meeting, because a booked meeting is the difference between a visit and a chance encounter.',
      'Segment by role. A specifier wants the technical demo; a buyer wants the commercial conversation; a partner wants the people. The same show, three different invitations.',
      'Report weekly. Opens tell you the subject line worked, clicks tell you the offer worked, bookings tell you the show will. By the time the stand goes up you should know who is coming and what they want to see.',
    ],
  },
  {
    slug: 'what-a-good-host-does',
    title: 'What a good host actually does on a stand.',
    dek: 'Hosts and hostesses are not decoration. Briefed well, they are the first conversation every visitor has with your brand, and the reason your sales team only talks to the right people.',
    category: 'On the stand',
    date: '2026-09-09',
    readMinutes: 4,
    photo: 'hostess',
    body: [
      'The best stand teams we work with have one rule: the sales people never stand at the edge. A host does that. They welcome, they ask what the visitor is looking for, they scan the badge, and they either hand over to the right colleague or give the visitor what they came for and let them go.',
      'That takes a brief. Who are you hoping to meet, what are the three things a visitor should leave knowing, who on the team handles which conversation, and what counts as a lead worth following up. We write it, we rehearse it on the morning of day one, and we keep a short line for the end of each conversation so nothing is lost.',
      'Multilingual matters in Dubai. Arabic, English and one or two of Hindi, Russian or Mandarin, depending on the show. We staff for the audience the organiser reports, not for the brochure.',
      'At the end of each day the hand-over sheet goes to the sales lead: every conversation, who it was with, what they wanted, and what was promised. That sheet is what makes the post-show follow-up possible.',
    ],
  },
  {
    slug: 'the-first-48-hours-after-the-show',
    title: 'The first 48 hours after the show decide the whole return.',
    dek: 'Leads cool fast. A follow-up sequence written before the show, and sent within two days of it, is the single biggest lever on pipeline.',
    category: 'After the show',
    date: '2026-08-21',
    readMinutes: 5,
    photo: 'handshake',
    body: [
      'A badge scan is a promise: someone gave you their details because they were interested in that moment. Two days later the interest is still warm. Two weeks later they have been back at work for a fortnight and your stand is a blur among forty others.',
      'So the first email is written before the show. It thanks them, names the thing they looked at, and offers one next step: a sample, a call, a visit. It goes out within 48 hours, segmented by what each visitor asked about on the stand, which is why the capture form matters so much.',
      'Then a short sequence. A piece of content that answers the question they raised, a case study from their sector, and an invitation to meet. Spaced over three weeks, stopped the moment they reply.',
      'Report replies, meetings and pipeline, not opens. The question the board asks is whether the show paid for itself. The sequence is how you get to answer yes.',
    ],
  },
  {
    slug: 'what-to-capture-on-the-stand',
    title: 'What to capture on the stand, and what to leave out.',
    dek: 'A lead form with twelve fields gets filled in badly or not at all. Four questions, asked well, give the sales team everything they need.',
    category: 'On the stand',
    date: '2026-07-30',
    readMinutes: 3,
    photo: 'leadCapture',
    body: [
      'The badge scan gives you name, company and email. The form only needs to add what the badge cannot: what they are interested in, when they are buying, who else is involved, and what was promised. Four questions, two of them pick-lists, done in under a minute.',
      'Put the form on any tablet, with the scan at the top so the host never types a name. Make the interest list match your product lines, so the segment for the follow-up falls out of the capture rather than being added later.',
      'Export at close of each day, not at the end of the show. The sales lead can start the warm calls on the Tuesday while the team is still on the stand for day two.',
    ],
  },
  {
    slug: 'one-team-before-during-after',
    title: 'Why we run before, during and after the show as one job.',
    dek: 'Exhibitors usually buy a stand from one supplier, a campaign from another and nothing at all for the follow-up. The gaps between them are where the return leaks out.',
    category: 'Inside Standout',
    date: '2026-07-08',
    readMinutes: 4,
    photo: 'stand',
    body: [
      'Ask an exhibitor who handled their last show and you will usually hear four names: the contractor, the designer, the agency that did the emails, and the sales team who were meant to follow up. Each did their job. Nobody owned the result.',
      'The pre-show campaign promises a demo that the stand is not laid out for. The stand captures leads in a format the CRM cannot read. The follow-up goes out three weeks late because nobody wrote it before the show. None of these are big failures. Together they halve the return.',
      'Standout exists to close those gaps. One brief, one team, one plan that runs from the invitation to the final report. The stand graphics, the campaign, the hosts, the coverage, the capture and the nurture are designed together, so each one sets the next up to work.',
      'That is what we mean by one team for everything before, during and after the show. It is not a slogan. It is the only way we have found to make an exhibition pay.',
    ],
  },
]

export const CATEGORIES = ['All', 'Before the show', 'On the stand', 'After the show', 'Inside Standout'] as const

export function articleFor(slug: string) {
  const index = ARTICLES.findIndex((a) => a.slug === slug)
  return index === -1 ? null : { index, article: ARTICLES[index] }
}

export const formatDate = (iso: string) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
