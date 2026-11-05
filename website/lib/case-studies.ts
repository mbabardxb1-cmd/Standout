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
  /** Shown in the homepage section. */
  home?: boolean
}

export const CASES: CaseStudy[] = [
  {
    client: 'Imtiaz Developments',
    show: 'Luxor by Imtiaz · launch event, Dubai',
    sector: 'Real estate',
    line: 'Event film for the Luxor launch: the arrivals, the press wall, the guests and the first look at the project.',
    stat: { value: '0:36', label: 'launch film' },
    services: [7, 6, 5],
    film: 2,
    duration: '0:36',
    home: true,
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
    home: true,
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
