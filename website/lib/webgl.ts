/** True when the browser can create a WebGL context. Checked once, on the client only. */
let cached: boolean | null = null
export function hasWebGL(): boolean {
  if (typeof window === 'undefined') return true
  if (cached !== null) return cached
  try {
    const c = document.createElement('canvas')
    cached = !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    cached = false
  }
  return cached
}
