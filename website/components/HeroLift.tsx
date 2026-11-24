/**
 * A small, quiet echo of the homepage hero for the inner-page header: faint nodes and lines in the
 * shape of a stand seen in perspective, with one orange node lifted out of it, floating slowly (the
 * same lift as the logo's raised O). Decorative only; hidden on small screens.
 */
const W = 440
const H = 300

// A shell-scheme stand drawn as a node grid: back wall (top), two side walls and the floor edge.
const cols = 6
const rows = 4
const nodes: { x: number; y: number }[] = []
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const t = c / (cols - 1)
    const depth = r / (rows - 1) // 0 = back wall, 1 = front edge
    const spread = 0.62 + depth * 0.38
    const x = W / 2 + (t - 0.5) * W * 0.86 * spread
    const y = 92 + depth * 168 - Math.sin(t * Math.PI) * 6 * (1 - depth)
    nodes.push({ x, y })
  }
}
const at = (r: number, c: number) => nodes[r * cols + c]
const lines: [number, number, number, number][] = []
for (let r = 0; r < rows; r++)
  for (let c = 0; c < cols; c++) {
    const a = at(r, c)
    if (c < cols - 1) { const b = at(r, c + 1); lines.push([a.x, a.y, b.x, b.y]) }
    if (r < rows - 1) { const b = at(r + 1, c); lines.push([a.x, a.y, b.x, b.y]) }
  }
// The lifted node rises from the middle of the back wall.
const from = at(0, 2)
const LIFT = { x: (at(0, 2).x + at(0, 3).x) / 2, y: 30 }

export function HeroLift({ className = '' }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`pointer-events-none ${className}`} aria-hidden="true" fill="none">
      <g stroke="rgb(227 232 244 / 0.09)" strokeWidth="1">
        {lines.map(([x1, y1, x2, y2], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />)}
      </g>
      <g fill="rgb(227 232 244 / 0.35)">
        {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={i % 5 === 0 ? 2.6 : 2} className="hero-node" style={{ animationDelay: `${(i % 7) * 0.6}s` }} />)}
      </g>
      {/* The lift: a dashed thread from the stand to the orange node above it. */}
      <line x1={from.x} y1={from.y} x2={LIFT.x} y2={LIFT.y + 14} stroke="rgb(255 90 31 / 0.35)" strokeWidth="1" strokeDasharray="3 5" />
      <g className="hero-lift">
        <circle cx={LIFT.x} cy={LIFT.y} r="16" fill="rgb(255 90 31 / 0.10)" />
        <circle cx={LIFT.x} cy={LIFT.y} r="7" fill="none" stroke="#FF5A1F" strokeWidth="3" />
      </g>
    </svg>
  )
}
