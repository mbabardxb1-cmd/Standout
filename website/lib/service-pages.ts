import type { StepIconName } from '@/components/ui/StepIcon'

/** A titled item with one line: what's included, goals. */
export type Item = { title: string; line: string }

/** Single-service page content, one entry per service in SERVICES (same order). Working draft. */
export type ServicePage = {
  slug: string
  eyebrow: string
  headline: string
  intro: string
  /** A second paragraph under the intro. */
  introMore?: string
  /** What the service includes, shown as cards. */
  included: Item[]
  /** The process, in order. Any number of steps. */
  steps: { icon: StepIconName; title: string; line: string }[]
  /** Optional: what the service sets out to achieve, with its own heading. */
  goals?: { title: string; items: Item[] }
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
    introMore: 'We start from your stand plan and the exhibitor manual, then design every surface as one system: back walls, fascia, counters, screens and the floor. You see each panel in place before anything is printed, and we deliver files your contractor can produce without questions.',
    included: [
      { title: 'Wall and panel graphics', line: 'Full-height panels designed around your stand plan, readable from the aisle.' },
      { title: 'Fascia and header boards', line: 'Your name and message where visitors look first, sized to the organiser’s spec.' },
      { title: 'Counter and furniture wraps', line: 'Reception counters, plinths and display units in the same brand system.' },
      { title: 'Screen artwork', line: 'Static and looping screen graphics that match the walls around them.' },
      { title: 'Floor and wayfinding', line: 'Floor graphics, directional signs and hanging banners where the hall allows.' },
      { title: 'Print-ready files', line: 'Every file checked against the exhibitor manual and delivered to your contractor.' },
    ],
    steps: [
      { icon: 'floorplan', title: 'Brief and floor plan', line: 'We work from your stand position, the exhibitor manual and what you want visitors to do when they stop.' },
      { icon: 'layout', title: 'Concept', line: 'One clear idea for the stand: the message from the aisle, the story on the walls and where the eye lands.' },
      { icon: 'pen', title: 'Design and proof', line: 'Panel, fascia and counter artwork, with one consistent message from the aisle to the counter, proofed with you.' },
      { icon: 'fileCheck', title: 'Print-ready delivery', line: 'Files checked against the manual and delivered to your contractor or ours, on time for build-up.' },
    ],
    stat: { value: '3 s', label: 'to earn a glance from the aisle' },
    related: [1, 5, 6],
  },
  {
    slug: 'print-collateral',
    eyebrow: 'Before the show',
    headline: 'Print that keeps selling after the visitor has left.',
    intro: 'Everything a visitor takes away from your stand, designed in the same system as the stand itself: from the portfolio book on the meeting table to the card in their pocket.',
    introMore: 'From the portfolio book on the meeting table to the visiting card in a buyer’s pocket, every piece is written and designed in the same look as your stand. We plan what each item is for, who takes it and when, so nothing gets printed that visitors leave behind.',
    included: [
      { title: 'Portfolio book', line: 'A printed showcase of your best work and projects, made for the meeting table.' },
      { title: 'Brochures and flyers', line: 'Product and service brochures, flyers and one-page sheets to hand out on the stand.' },
      { title: 'Company profile', line: 'Who you are, what you do and who you do it for, in a profile buyers keep.' },
      { title: '3D stand printing', line: 'Large-format and dimensional printing for the stand: 3D lettering, logos and display pieces.' },
      { title: 'Visiting cards', line: 'Cards for everyone on the stand, matched to the rest of the collateral.' },
    ],
    steps: [
      { icon: 'bag', title: 'What visitors take away', line: 'We decide what each piece is for: a quick take-away, a profile for the buyer, a portfolio for the meeting.' },
      { icon: 'pen', title: 'Copy and content', line: 'The words and pictures for each piece, written for the people you want to reach.' },
      { icon: 'layers', title: 'Design in the stand’s system', line: 'The same type, colour and tone as the stand, so everything from the fascia to the card is one brand.' },
      { icon: 'fileCheck', title: 'Proofs and samples', line: 'Digital proofs for every piece and printed samples where the finish matters.' },
      { icon: 'truck', title: 'Print and delivery to the venue', line: 'Printed to the right quantities and delivered to the hall before doors open.' },
    ],
    stat: { value: '1 system', label: 'from fascia to visiting card' },
    related: [0, 5, 6],
  },
  {
    slug: 'email-linkedin-marketing',
    eyebrow: 'Before the show',
    headline: 'Meetings booked at your stand before the doors open.',
    intro: 'A complete outreach system for the weeks before the show. We find the people you want to meet, set up the email and LinkedIn channels to reach them, run the campaign, and book their visit into your stand diary.',
    introMore: 'We research the companies and decision makers you want to meet, then run personalised email and LinkedIn sequences in the weeks before the show. Every reply is followed up, and every interested contact gets a time slot at your stand, so your team arrives with a diary that is already full.',
    included: [
      { title: 'Data scraping and research', line: 'We build a list of the decision makers you want to meet: exhibitors, registered visitors and your target accounts.' },
      { title: 'Verified contact list', line: 'Names, roles, companies, emails and LinkedIn profiles, cleaned and checked before anything is sent.' },
      { title: 'Email set-up', line: 'Sending domains and inboxes set up and warmed up, so your emails land in the inbox, not spam.' },
      { title: 'LinkedIn outreach', line: 'Profiles optimised, connection requests and messages sent alongside the emails.' },
      { title: 'Campaign sequences', line: 'Personalised invitations, follow-ups and show-week reminders, each with a reason to visit.' },
      { title: 'Appointment booking', line: 'A booking link and calendar for the show, so replies turn straight into stand meetings.' },
    ],
    steps: [
      { icon: 'target', title: 'Define the audience', line: 'We agree who you want to meet at the show: sectors, company sizes, job titles and named accounts.' },
      { icon: 'filter', title: 'Scrape and research', line: 'We scrape and research the contacts that match, from exhibitor lists, registrations, LinkedIn and industry sources.' },
      { icon: 'clipboard', title: 'Establish the system', line: 'Sending domains, inboxes and LinkedIn profiles set up and warmed up, and your booking calendar connected.' },
      { icon: 'mail', title: 'Send email and LinkedIn', line: 'Personalised sequences go out on both channels in the weeks before the show, with follow-ups to anyone who doesn’t reply.' },
      { icon: 'pin', title: 'Book the appointment', line: 'Interested contacts book a time at your stand. Each meeting lands in your diary with their details and what they want to discuss.' },
      { icon: 'chart', title: 'Report', line: 'Weekly numbers on contacts reached, replies and meetings booked, so you know who is coming before you set up.' },
    ],
    stat: { value: 'Booked', label: 'meetings in your stand diary before day one' },
    related: [3, 9, 8],
  },
  {
    slug: 'paid-advertising',
    eyebrow: 'Before the show',
    headline: 'Tell your market you’re exhibiting, and bring them to the stand.',
    intro: 'A campaign across organic social, paid social and Google in the weeks before the show, so the people you want to meet know where to find you and have a reason to come.',
    introMore: 'Your own channels announce the show, the stand number and what you’re launching, while paid social and Google campaigns reach attendees and target accounts you can’t reach by email. We build the creative in your stand’s look and move budget each week to whatever brings people to the stand.',
    included: [
      { title: 'Organic posting before the event', line: 'A run of posts on your own channels announcing the show, the stand number and what you’re launching.' },
      { title: 'Social ads', line: 'LinkedIn, Instagram and Facebook ads aimed at attendees and your target accounts.' },
      { title: 'Google ads', line: 'Search and display ads that catch people searching for the show and for what you sell.' },
      { title: 'Event advertising', line: 'Promoting your presence at the event itself: your stand number, times and what visitors will see.' },
      { title: 'Ad creative', line: 'Images, video and copy in the stand’s look, in every size each platform needs.' },
      { title: 'Reporting', line: 'Weekly reports on reach, clicks and cost per visit booked.' },
    ],
    steps: [
      { icon: 'target', title: 'Audience and goal', line: 'Who you want at the stand and what you want them to do: book a meeting, see a launch or visit the stand.' },
      { icon: 'list', title: 'Content plan', line: 'An organic posting calendar for your channels, counting down to the show.' },
      { icon: 'layout', title: 'Ad creative', line: 'Ads that carry the stand’s look, in the sizes and formats each platform needs.' },
      { icon: 'send', title: 'Launch', line: 'Social and Google campaigns go live four weeks out, and run through the show days.' },
      { icon: 'trend', title: 'Optimise and report', line: 'Budget moved to what works each week, with a clear report on cost per visit booked.' },
    ],
    stat: { value: '4 wks', label: 'typical campaign run-up' },
    related: [2, 4, 9],
  },
  {
    slug: 'social-media-management',
    eyebrow: 'At the show',
    headline: 'Your channels live from the show floor.',
    intro: 'A social media manager on the stand, posting while the event is happening: stories, posts and reels that show your market what they’re missing and bring them to the stand.',
    introMore: 'We agree the plan before the show, then post from the floor every day: the launches, the visitors and the moments your market should see. Stories and reels are cut on the spot, and a recap after the show keeps your channels working once the hall has closed.',
    included: [
      { title: 'Content calendar', line: 'What goes out before, during and after the show, on every channel, agreed in advance.' },
      { title: 'Live posting', line: 'Posts and stories from the stand every show day, while the moment is still happening.' },
      { title: 'Stories and reels', line: 'Short vertical content of the stand, the team and the visitors, cut on the spot.' },
      { title: 'Post-show recap', line: 'A round-up of the show and a run of posts afterwards that keeps the conversation going.' },
    ],
    steps: [
      { icon: 'list', title: 'Plan', line: 'A content calendar for the show and access to your channels, set up before the event.' },
      { icon: 'camera', title: 'Capture', line: 'Our manager captures the stand, launches, visitors and team moments throughout each day.' },
      { icon: 'send', title: 'Post live', line: 'Posts, stories and reels go out during the show, with captions written on the spot.' },
      { icon: 'chart', title: 'Recap and report', line: 'A post-show recap and a report on reach and engagement.' },
    ],
    stat: { value: 'Live', label: 'posting every show day' },
    related: [7, 3, 6],
  },
  {
    slug: 'presentations',
    eyebrow: 'At the show',
    headline: 'Screen content that holds attention on a busy floor.',
    intro: 'Looping stand screens, content for video walls and tablet versions for the aisle, all made to be understood in seconds and consistent with the stand.',
    introMore: 'Most visitors give a stand screen a few seconds from the aisle. We design looping content that tells your story in that time, without sound, and versions for tablets and video walls, all tested on your hardware before the doors open.',
    included: [
      { title: 'Stand-screen loops', line: 'Motion content for the stand screens, made to work without sound.' },
      { title: 'Tablet versions', line: 'Interactive versions for tablets in the aisle and at the counter.' },
      { title: 'Video walls and LED', line: 'Content sized for video walls and LED screens of any shape.' },
    ],
    steps: [
      { icon: 'book', title: 'Story', line: 'The three things a visitor should know before they talk to you, told without sound.' },
      { icon: 'pen', title: 'Design', line: 'Motion and stills for the stand screens, the video wall and a version for tablets.' },
      { icon: 'fileCheck', title: 'Review', line: 'Every screen and slide reviewed with you, and changes made before the files are final.' },
      { icon: 'monitor', title: 'Delivery', line: 'Files in every size and format your screens need, tested on the hardware before the show.' },
    ],
    stat: { value: '0:45', label: 'typical screen loop' },
    related: [0, 1, 6],
  },
  {
    slug: 'hosts-and-hostesses',
    eyebrow: 'At the show',
    headline: 'Hosts who know your product, and know what you came for.',
    intro: 'Hosts and hostesses trained on your product and your industry, briefed on the objectives and goals of your show, who engage every visitor and capture their details for your sales team.',
    introMore: 'Before the show, every host learns your products, your industry and what a good visitor looks like for you. On the stand they welcome people, start the right conversations and record each visitor’s details, so your specialists spend their time on the leads that matter.',
    included: [
      { title: 'Product training', line: 'Hosts learn your products and services, so they can answer questions and qualify visitors.' },
      { title: 'Industry briefing', line: 'The language of your sector and the visitors you’ll meet, so conversations sound informed.' },
      { title: 'Objectives and goals', line: 'Every host knows what a good visitor looks like and what the show has to achieve.' },
      { title: 'Visitor engagement', line: 'Hosts stop visitors in the aisle, start conversations and bring the right ones to your team.' },
      { title: 'Data capture', line: 'Visitor details captured on tablets or badge scanners, with notes on what they want.' },
    ],
    steps: [
      { icon: 'users', title: 'Select the team', line: 'Hosts and hostesses chosen for your brand, your audience and the languages you need.' },
      { icon: 'book', title: 'Train on product and industry', line: 'A training session on your products, your sector and your competitors before the show.' },
      { icon: 'target', title: 'Brief on goals', line: 'Your objectives for the show, who to look for, and how to hand a hot lead to your team.' },
      { icon: 'pin', title: 'Engage on the stand', line: 'Welcome, conversation and demos for every hour the hall is open.' },
      { icon: 'scan', title: 'Capture data', line: 'Every conversation recorded with the visitor’s details and interests.' },
      { icon: 'send', title: 'Hand over', line: 'Leads passed to your team each day, ready for the follow-up.' },
    ],
    goals: {
      title: 'What your hosts are there to do',
      items: [
        { title: 'Know the product', line: 'Answer the first questions with confidence, so your specialists only take the serious ones.' },
        { title: 'Work to your goals', line: 'Every host knows the show’s targets: meetings, demos, sign-ups or leads.' },
        { title: 'Capture the data', line: 'No conversation leaves the stand without a name, a company and a reason to follow up.' },
        { title: 'Engage every visitor', line: 'A warm welcome and a reason to stay, from the first minute to the last.' },
      ],
    },
    stat: { value: '100%', label: 'of stand hours covered' },
    related: [8, 7, 5],
  },
  {
    slug: 'photography-video',
    eyebrow: 'At the show',
    headline: 'Your show, filmed, photographed and posted.',
    intro: 'One crew for everything you need to capture at the event: professional videographers and photographers, interviews on the stand, and mobile content shot for social media, edited fast so it’s live while the show is still on.',
    introMore: 'Our photographers, videographers and a mobile creator work the stand together. They cover the stand, the team, the launches and interviews with your leaders and clients, and edit on the day so your channels have real content while the show is still on.',
    included: [
      { title: 'Professional videographers', line: 'Cinema-quality cameras and crew for your event film and highlight video.' },
      { title: 'Event photography', line: 'The stand, the team, the product, the visitors and the key moments.' },
      { title: 'Interviews at the event', line: 'Your leaders, clients and partners interviewed on the stand, lit and miked properly.' },
      { title: 'Mobile content for social media', line: 'Vertical reels and stories shot on mobile, made for Instagram, TikTok and LinkedIn.' },
      { title: 'Highlight film', line: 'A finished film of the show, for your website, sales team and next year’s pitch.' },
      { title: 'Same-day selects', line: 'The best photos and clips edited on the day, ready to post while the show is on.' },
    ],
    steps: [
      { icon: 'list', title: 'Shot list and plan', line: 'Agreed before the show: the stand, the team, the product, the interviews and the moments you want to remember.' },
      { icon: 'users', title: 'Interviews set up', line: 'Who we interview, the questions and a quiet corner of the stand with the right light and sound.' },
      { icon: 'camera', title: 'Shoot on the day', line: 'Videographers and photographers on the stand, with a mobile creator shooting vertical content for social.' },
      { icon: 'film', title: 'Same-day edit', line: 'Selects and short clips edited on the day, so your channels have real content while the show is on.' },
      { icon: 'download', title: 'Final delivery', line: 'The highlight film, interviews, social cuts and full photo gallery, in every format you need.' },
    ],
    stat: { value: 'Same day', label: 'content ready to post' },
    related: [4, 6, 9],
  },
  {
    slug: 'lead-capture',
    eyebrow: 'At the show',
    headline: 'No conversation leaves the stand unrecorded.',
    intro: 'A capture system on tablets and phones at the stand: badge scan, the qualification questions your sales team chose, and a clean export the moment the show closes.',
    introMore: 'Paper cards and business cards get lost. We set up a capture form with the questions your sales team chose, on tablets and phones at the stand, so every conversation is recorded with the visitor’s details, interests and notes, and exported cleanly the moment the show closes.',
    included: [
      { title: 'Custom capture form', line: 'A form built around the questions your sales team actually needs answered.' },
      { title: 'Badge scanning', line: 'Scan the visitor’s badge or enter details in seconds on any tablet or phone.' },
      { title: 'Lead qualification', line: 'Interest, budget, timing and product, scored so hot leads stand out.' },
      { title: 'Notes and follow-up tags', line: 'What was discussed and what was promised, recorded on the spot.' },
      { title: 'Live dashboard', line: 'Leads captured per day and per host, visible while the show is on.' },
      { title: 'CRM export', line: 'A clean, segmented list to your CRM at the close of the show.' },
    ],
    steps: [
      { icon: 'form', title: 'Form and questions', line: 'The details your sales team actually needs, agreed before the show and built into the capture form.' },
      { icon: 'monitor', title: 'Devices set up', line: 'Tablets and phones set up and tested, and your team shown how to use them.' },
      { icon: 'scan', title: 'Capture on the stand', line: 'Badge scan or quick entry on any device, with notes, so nothing is lost in a busy hour.' },
      { icon: 'download', title: 'Export', line: 'A clean, segmented list to your CRM at close of show, ready for the follow-up.' },
    ],
    stat: { value: '2.4×', label: 'more qualified leads than cards by hand' },
    related: [6, 9, 2],
  },
  {
    slug: 'lead-nurturing',
    eyebrow: 'After the show',
    headline: 'Follow up while the conversation is still warm.',
    intro: 'Segmented email and LinkedIn sequences that reach every contact within days of the show, matched to what they were interested in, and kept going until the lead is ready for your sales team.',
    introMore: 'Most leads go cold in the week after a show. We group your contacts by what they were interested in, send a personal first email within 48 hours, and keep the conversation going with content matched to each group over the following weeks.',
    included: [
      { title: 'Lead segmentation', line: 'Leads grouped by interest, stage and what was promised on the stand.' },
      { title: 'First follow-up in 48 hours', line: 'A personal thank-you with what they asked for, while they still remember you.' },
      { title: 'Nurture sequences', line: 'Content matched to each group over the following weeks, by email and LinkedIn.' },
    ],
    steps: [
      { icon: 'filter', title: 'Segment', line: 'Leads grouped by interest, stage and what was promised on the stand.' },
      { icon: 'mail', title: 'First follow-up', line: 'A first email within 48 hours of the show, personal to each group.' },
      { icon: 'send', title: 'Nurture', line: 'Content matched to each group over the following weeks, by email and LinkedIn.' },
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
