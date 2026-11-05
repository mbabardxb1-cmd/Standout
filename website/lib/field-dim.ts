/**
 * Several sections ask for the background field to go dark while they are on screen. Each holds
 * its own key, and the html class stays on while any key is held, so a section leaving never
 * switches the field back on under its neighbour.
 */
const held = new Set<string>()
export function dimField(key: string, on: boolean) {
  if (typeof document === 'undefined') return
  if (on) held.add(key)
  else held.delete(key)
  document.documentElement.classList.toggle('field-dim', held.size > 0)
}
