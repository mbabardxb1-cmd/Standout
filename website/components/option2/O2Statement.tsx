import { Reveal } from './Reveal'

export function O2Statement() {
  return (
    <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
      <Reveal className="md:col-span-4">
        <p className="font-mono text-[12px] uppercase text-slate">Why exhibitors work with us</p>
      </Reveal>
      <div className="flex flex-col gap-10 md:col-span-8">
        <Reveal as="h2" className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
          An exhibition is the most expensive three days in your marketing year. We make sure the right people turn up, stop, and come
          back as customers.
        </Reveal>
      </div>
    </section>
  )
}
