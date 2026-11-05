import { WORDMARK_COLOUR } from '@/lib/assets'
import { CONTACT } from '@/lib/content'

export function O2Footer() {
  return (
    <footer className="border-t border-night/10">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-14 md:grid-cols-12 md:px-10">
        <div className="flex flex-col gap-5 md:col-span-5">
          <img src={WORDMARK_COLOUR} alt="Standout" width={168} height={26} className="h-[24px] w-auto" />
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-slate">
            Exhibition marketing, end to end. Stand branding, campaigns, hosts, coverage, lead capture and follow-up from one team.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">Contact</p>
          <ul className="flex flex-col gap-2 text-[15px] text-night/80">
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-signal">{CONTACT.email}</a></li>
            <li><a href={CONTACT.phoneHref} className="hover:text-signal">{CONTACT.phone}</a></li>
            <li>
              <a href={CONTACT.mapHref} target="_blank" rel="noreferrer" className="leading-relaxed hover:text-signal">
                {CONTACT.address[0]}
                <br />
                {CONTACT.address[1]}
              </a>
            </li>
          </ul>
        </div>
        {[
          ['Explore', ['Services', 'Approach', 'Results']],
          ['Follow', ['LinkedIn [link to come]', 'Instagram [link to come]']],
        ].map(([h, items]) => (
          <div key={h as string} className="flex flex-col gap-3 md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">{h}</p>
            <ul className="flex flex-col gap-2 text-[15px] text-night/80">
              {(items as string[]).map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap justify-between gap-3 border-t border-night/10 px-5 py-5 text-[13px] text-slate md:px-10">
        <span>© 2026 Standout</span>
        <span>Homepage option 2. Copy, figures and photography are placeholders to confirm.</span>
      </div>
    </footer>
  )
}
