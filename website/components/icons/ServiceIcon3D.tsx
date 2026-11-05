import { SERVICE_RENDERS } from '@/lib/assets'

/**
 * A rendered 3D model of each service (made with three.js in STANDOUT colours, saved as
 * transparent images). It floats gently; when `active` (card hovered or focused) it lifts
 * and grows a little, and its floor glow warms to orange.
 */
export function ServiceIcon3D({ index, size = 120, active = false, className = '' }: { index: number; size?: number | string; active?: boolean; className?: string }) {
  return (
    <span className={`svc3d relative inline-block ${active ? 'is-active' : ''} ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <style href="svc3d" precedence="default">{CSS}</style>
      <span className="svc3d-glow absolute bottom-[2%] left-1/2 block h-[16%] w-[70%] rounded-[50%]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SERVICE_RENDERS[index]} alt="" width={360} height={360} draggable={false} className="svc3d-img relative block h-full w-full object-contain" />
    </span>
  )
}

const CSS = `
.svc3d .svc3d-img { transition: transform 600ms cubic-bezier(.16,1,.3,1), filter 600ms; filter: drop-shadow(0 14px 18px rgba(0,0,0,.45)); }
.svc3d .svc3d-glow { transform: translateX(-50%); background: radial-gradient(closest-side, rgba(227,232,244,.10), transparent); transition: background 600ms; }
.svc3d.is-active .svc3d-img { transform: translateY(-8px) scale(1.07); filter: drop-shadow(0 22px 22px rgba(0,0,0,.5)); }
.svc3d.is-active .svc3d-glow { background: radial-gradient(closest-side, rgba(255,90,31,.35), transparent); }
@media (prefers-reduced-motion: no-preference) {
  .svc3d { animation: svc3d-float 5s ease-in-out infinite; }
  .svc3d.is-active { animation-play-state: paused; }
}
@media (prefers-reduced-motion: reduce) { .svc3d .svc3d-img { transition: none; } }
@keyframes svc3d-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
`
