import { FieldLayer } from '@/components/field/FieldLayer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Cursor } from '@/components/Cursor'
import { InstantNav } from '@/components/InstantNav'

/** Option 1: the WebGL field, custom cursor and inertial scroll wrap the main homepage only. */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* One persistent field behind the whole site. Never unmounts. */}
      <FieldLayer />
      <Cursor />
      <InstantNav />
      <SmoothScroll>
        <div className="relative z-10">{children}</div>
      </SmoothScroll>
    </>
  )
}
