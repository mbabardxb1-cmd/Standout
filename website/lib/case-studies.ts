/** Case studies. Films supplied by the client; lines and figures are drafts to confirm. */
export type CaseStudy = {
  client: string
  show: string
  sector: string
  line: string
  stat: { value: string; label: string }
  /** Indexes into SERVICES. */
  services: number[]
  /** Index into CASE_STUDY_FILMS. */
  film: number
  duration: string
  /** Position in the homepage section (1 = first); leave out to show it only on the Case Studies page. */
  home?: number
}

export const CASES: CaseStudy[] = [
  {
    client: 'DP World',
    show: 'DP World Tour',
    sector: 'Sport',
    line: 'Event film from the DP World Tour: the course, the players and the crowds.',
    stat: { value: '3:30', label: 'event film' },
    services: [7],
    film: 5,
    duration: '3:30',
    home: 3,
  },
  {
    client: 'Sobha',
    show: 'Sobha · Atlantis, Dubai',
    sector: 'Real estate',
    line: 'Event film from the Sobha evening at Atlantis: the arrivals, the guests and the moments that mattered.',
    stat: { value: '1:25', label: 'event film' },
    services: [7],
    film: 6,
    duration: '1:25',
    home: 2,
  },
  {
    client: '3DB',
    show: 'F1 The Movie · Abu Dhabi premiere',
    sector: 'Entertainment',
    line: 'From the build to the red carpet: the premiere at Yas, start to finish.',
    stat: { value: '1:05', label: 'highlight film' },
    services: [7],
    film: 7,
    duration: '1:05',
  },
  {
    client: 'Milkor',
    show: 'IDEX · Day 3, Abu Dhabi',
    sector: 'Defence',
    line: 'Day three at IDEX, on the water and on the stand.',
    stat: { value: '1:24', label: 'show film' },
    services: [7],
    film: 8,
    duration: '1:24',
  },
  {
    client: 'Dragon Racing',
    show: 'Ferrari experience · Abu Dhabi',
    sector: 'Motorsport',
    line: 'A day in the pit lane and on track at the Ferrari experience.',
    stat: { value: '1:11', label: 'event film' },
    services: [7],
    film: 9,
    duration: '1:11',
  },
  {
    client: 'TGP',
    show: 'TGP event',
    sector: 'Events',
    line: 'Event film: the stalls, the crowds and the atmosphere.',
    stat: { value: '0:56', label: 'event film' },
    services: [7],
    film: 10,
    duration: '0:56',
  },
  {
    client: 'TGP',
    show: 'PXB Wellness · rooftop session',
    sector: 'Wellness',
    line: 'A rooftop wellness session, cut for social.',
    stat: { value: '0:32', label: 'social film' },
    services: [7],
    film: 11,
    duration: '0:32',
  },
  {
    client: 'BCH:CLB',
    show: 'BCH:CLB · recap',
    sector: 'Hospitality',
    line: 'A quick recap of the day at the beach club, cut for social.',
    stat: { value: '0:20', label: 'recap film' },
    services: [7],
    film: 12,
    duration: '0:20',
  },
  {
    client: '3DB',
    show: 'Monster Jam',
    sector: 'Entertainment',
    line: 'A short social cut from Monster Jam.',
    stat: { value: '0:16', label: 'social film' },
    services: [7],
    film: 13,
    duration: '0:16',
  },
  {
    client: 'Imtiaz Developments',
    show: 'Luxor by Imtiaz · launch event, Dubai',
    sector: 'Real estate',
    line: 'Event film for the Luxor launch: the arrivals, the press wall, the guests and the first look at the project.',
    stat: { value: '0:36', label: 'launch film' },
    services: [7, 6, 5],
    film: 2,
    duration: '0:36',
    home: 1,
  },
  {
    client: 'BCH:CLB',
    show: 'BCH:CLB DXB · brand day, Dubai',
    sector: 'Hospitality',
    line: 'A day at the beach club cut for social: the pool, the DJ, the umbrellas and the crowd, with the brand everywhere.',
    stat: { value: '0:29', label: 'brand film' },
    services: [7, 5],
    film: 3,
    duration: '0:29',
    home: 4,
  },
  {
    client: '3DB',
    show: 'Hero Dubai Desert Classic · Emirates Golf Club',
    sector: 'Sport and hospitality',
    line: 'Four days at the Desert Classic cut into one highlight film: the golf, the crowds, the DJ sets and the live music, with 3DB at the centre of it.',
    stat: { value: '4', label: 'days of coverage' },
    services: [7, 5],
    film: 4,
    duration: '0:35',
  },
  {
    client: 'REFLO',
    show: 'Emirates Dubai 7s · Day 1',
    sector: 'Sport and retail',
    line: 'The day-one launch film for the official merch tent: how to find it, the walk in, and the limited editions on the rails.',
    stat: { value: 'Day 1', label: 'live as the gates opened' },
    services: [7],
    film: 0,
    duration: '0:28',
  },
  {
    client: 'REFLO',
    show: 'Emirates Dubai 7s · all weekend',
    sector: 'Sport and retail',
    line: 'Top picks from the collection, walked through on camera inside the tent and cut for social to run all weekend.',
    stat: { value: '1:08', label: 'collection walkthrough' },
    services: [7],
    film: 1,
    duration: '1:08',
  },
]
