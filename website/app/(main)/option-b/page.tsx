import { redirect } from 'next/navigation'

/** Services option B is now the homepage; keep old links working. */
export default function OptionB() {
  redirect('/')
}
