/* eslint-disable @next/next/no-img-element */

/** Client logos (public/logos), white on transparent. `h` evens out their visual weight. */
const LOGOS = [
  { src: '/logos/imtiaz.webp', name: 'Imtiaz Developments', h: 38 },
  { src: '/logos/topgolf.webp', name: 'Topgolf', h: 26 },
  { src: '/logos/dubai-london.webp', name: 'Dubai London Clinics & Hospitals', h: 42 },
  { src: '/logos/dataflow.webp', name: 'Dataflow', h: 30 },
  { src: '/logos/prescott.webp', name: 'Prescott', h: 26 },
  { src: '/logos/nandos.webp', name: 'Nando’s', h: 28 },
  { src: '/logos/amaya.webp', name: 'Amaya Dubai', h: 38 },
  { src: '/logos/sanipex.webp', name: 'Sanipex Group', h: 26 },
  { src: '/logos/eco-drive.webp', name: 'Eco Drive', h: 28 },
  { src: '/logos/citron.webp', name: 'Citron', h: 46 },
]

/**
 * Clients: a slow, endless strip of logos with soft fading edges. Two copies of the list move as
 * one loop; it pauses on hover, and stands still with reduced motion.
 */
export function ClientLogos() {
  const row = (copy: number) => (
    <ul className="client-track flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24" aria-hidden={copy > 0 || undefined}>
      {LOGOS.map((l) => (
        <li key={l.src} className="flex h-14 shrink-0 items-center">
          <img src={l.src} alt={copy > 0 ? '' : l.name} style={{ height: l.h }} className="w-auto opacity-60 transition-opacity duration-300 hover:opacity-100" loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Our clients" className="relative px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[14px] font-medium text-steel">Our clients</p>
          <h2 className="max-w-[22ch] font-display text-[clamp(1.7rem,3vw,2.8rem)] font-extrabold leading-[1] tracking-[-0.03em] [text-wrap:balance]">Trusted by brands across the region.</h2>
        </div>
        <div className="client-strip group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </section>
  )
}
