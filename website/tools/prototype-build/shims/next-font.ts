// Stand-in for next/font/google: fonts come from a Google Fonts <link> in index.html
// and the CSS variables are set on :root there.
type Opts = { variable?: string; subsets?: string[]; weight?: string | string[] }
const make = (family: string) => (opts: Opts = {}) => ({
  className: '',
  variable: '',
  style: { fontFamily: family },
})
export const Funnel_Display = make('Funnel Display')
export const Geist = make('Geist')
export const Geist_Mono = make('Geist Mono')
