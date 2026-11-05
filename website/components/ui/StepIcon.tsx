import type { SVGProps } from 'react'

/** Line icons for the "How it works" steps on service pages. 24px grid, drawn in the current colour. */
export type StepIconName =
  | 'floorplan' | 'pen' | 'fileCheck' | 'bag' | 'layers' | 'truck' | 'users' | 'mail' | 'chart'
  | 'target' | 'layout' | 'trend' | 'sitemap' | 'code' | 'book' | 'monitor' | 'clipboard' | 'pin'
  | 'send' | 'list' | 'camera' | 'film' | 'form' | 'scan' | 'download' | 'filter'

const PATHS: Record<StepIconName, string> = {
  floorplan: 'M3 3h18v18H3zM3 10h8M11 3v7M11 14v7M11 14h10M15 10h6',
  pen: 'M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10zM13 6l3 3M4 20l1-4.5',
  fileCheck: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 14l2 2 4-4',
  bag: 'M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5',
  truck: 'M2 7h12v9H2zM14 11h4l3 3v2h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 21a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 6.5M22 21a7 7 0 0 0-4-6.3',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  chart: 'M3 21h18M6 17V11M11 17V6M16 17v-4M21 17V9',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01M21 3l-6 6',
  layout: 'M3 4h18v16H3zM3 10h18M10 10v10',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  sitemap: 'M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  book: 'M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z',
  monitor: 'M3 4h18v12H3zM8 20h8M12 16v4M8 12l3-3 2 2 3-4',
  clipboard: 'M9 4h6v3H9zM9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M9 12h6M9 16h4',
  pin: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  send: 'M21 3L10 14M21 3l-7 18-4-7-7-4z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  camera: 'M3 8h4l2-3h6l2 3h4v11H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  film: 'M3 4h18v16H3zM7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4M7 12h10',
  form: 'M4 3h16v18H4zM8 8h8M8 12h8M8 16h5',
  scan: 'M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h2v2h-2zM15 15h2v2h-2z',
  download: 'M12 3v12M7 10l5 5 5-5M4 17v3h16v-3',
  filter: 'M3 5h18l-7 8v6l-4 2v-8z',
}

export function StepIcon({ name, ...rest }: { name: StepIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d={PATHS[name]} />
    </svg>
  )
}
