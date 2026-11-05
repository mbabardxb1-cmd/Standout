import React, { Suspense, lazy } from 'react'
type Loader<P> = () => Promise<{ default: React.ComponentType<P> } | React.ComponentType<P>>
type Opts = { ssr?: boolean; loading?: React.ComponentType }
export default function dynamic<P extends object>(loader: Loader<P>, opts: Opts = {}) {
  const Lazy = lazy(async () => {
    const m: any = await loader()
    return 'default' in m ? m : { default: m }
  })
  const Loading = opts.loading
  return function Dynamic(props: P) {
    return (
      <Suspense fallback={Loading ? <Loading /> : null}>
        <Lazy {...(props as any)} />
      </Suspense>
    )
  }
}
