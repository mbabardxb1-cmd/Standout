/**
 * Links that differ between the Next.js site and the single-file preview. In Next, services and
 * the other pages are real routes (/services/<slug>, /packages, /contact …). In the preview (one
 * HTML file) each opens in place from the hash (#service-<slug>, #page-packages …), and the home
 * sections are plain #ids.
 */
declare global {
  interface Window {
    __STANDOUT_PROTO__?: boolean
  }
}
const proto = () => typeof window !== 'undefined' && window.__STANDOUT_PROTO__ === true
export const serviceHref = (slug: string) => (proto() ? `#service-${slug}` : `/services/${slug}`)
export const homeHref = (section?: string) => (proto() ? (section ? `#${section}` : '#top') : section ? `/#${section}` : '/')

export type PageName = 'contact' | 'insights' | 'packages' | 'case-studies' | 'about'
export const PAGE_NAMES: PageName[] = ['contact', 'insights', 'packages', 'case-studies', 'about']
export const pageHref = (name: PageName) => (proto() ? `#page-${name}` : `/${name}`)
export const articleHref = (slug: string) => (proto() ? `#insight-${slug}` : `/insights/${slug}`)

/** The service slug named by the current hash in the preview, else null. */
export const serviceFromHash = (hash: string) => (hash.startsWith('#service-') ? hash.slice('#service-'.length) : null)
/** The page named by the current hash in the preview, else null. */
export const pageFromHash = (hash: string): PageName | null => {
  const n = hash.startsWith('#page-') ? hash.slice('#page-'.length) : ''
  return (PAGE_NAMES as string[]).includes(n) ? (n as PageName) : null
}
/** The article slug named by the current hash in the preview, else null. */
export const articleFromHash = (hash: string) => (hash.startsWith('#insight-') ? hash.slice('#insight-'.length) : null)
/** True when the hash names a page or article rather than a home section. */
export const isPageHash = (hash: string) => hash.startsWith('#service-') || hash.startsWith('#page-') || hash.startsWith('#insight-')
