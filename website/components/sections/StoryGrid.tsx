import { GRID } from '@/lib/formations'
import { HOW_ICONS } from '@/lib/assets'

const STEPS = [
  { n: '01', icon: HOW_ICONS.prepare, title: 'Prepare', line: 'Stand graphics, print and presentations, made right first time.' },
  { n: '02', icon: HOW_ICONS.promote, title: 'Promote', line: 'Email, LinkedIn and Google campaigns that fill your stand before doors open.' },
  { n: '03', icon: HOW_ICONS.perform, title: 'Perform', line: 'Photography, video and live data capture on the day.' },
  { n: '04', icon: HOW_ICONS.profit, title: 'Profit', line: 'Post-show nurture that turns scans into sales calls.' },
]


/**
 * Section 2 landing zone for Intersection 1: a shell-scheme floor plan seen from above.
 * Cells are placed on the same 13 x 9 cell grid the nodes form.
 */
export function StoryGrid() {
  return (
    <div className="relative h-svh min-h-[640px] w-full">
      {/* Solid ground: fades in once the nodes have landed. */}
      <div className="story-bg absolute inset-0 bg-hall" aria-hidden="true" />

      <div
        className="absolute grid gap-0 max-md:top-[84px]!"
        style={{
          inset: `${GRID.inset * 100}%`,
          gridTemplateColumns: `repeat(${GRID.cols - 1}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID.rows - 1}, minmax(0, 1fr))`,
        }}
      >
        <div className="story-head col-span-12 col-start-1 row-span-3 row-start-1 flex flex-col justify-end gap-2 p-2 md:col-span-7 md:gap-4 md:p-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-steel">How we work</p>
          <h2 className="font-display text-[clamp(1.6rem,4.4vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            One team. One joined-up show.
          </h2>
        </div>

        <ol className="col-span-13 col-start-1 row-span-5 row-start-4 grid grid-cols-2 gap-2 p-2 sm:gap-3 md:grid-cols-4 md:gap-0 md:p-0">
          {STEPS.map((s) => (
            <li
              key={s.n}
              tabIndex={0}
              className="story-cell group m-0 flex flex-col justify-start gap-3 border border-mist/15 bg-night p-3.5 sm:gap-5 sm:p-5 md:m-3 md:gap-8 md:p-7"
            >
              <span className="font-mono text-[12px] tracking-[0.14em] text-steel">{s.n}</span>
              <div className="flex flex-col gap-2 sm:gap-3">
                {/* Line icon, coloured by CSS through a mask so it can light up orange. */}
                <span
                  aria-hidden="true"
                  className="mb-1 block h-10 w-10 bg-mist transition-colors duration-300 group-hover:bg-signal group-focus-visible:bg-signal sm:mb-2 sm:h-14 sm:w-14 md:h-16 md:w-16 xl:h-20 xl:w-20"
                  style={{
                    WebkitMaskImage: `url(${s.icon})`,
                    maskImage: `url(${s.icon})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'left center',
                    maskPosition: 'left center',
                  }}
                />
                <h3 className="font-display text-[clamp(1.2rem,2.4vw,2.25rem)] font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="text-[13px] leading-snug text-mist/75 sm:text-[15px] sm:leading-relaxed">{s.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
