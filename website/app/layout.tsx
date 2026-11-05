import type { Metadata, Viewport } from 'next'
import { Funnel_Display, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const funnel = Funnel_Display({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-funnel' })
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Standout — Exhibition marketing, end to end',
  description:
    'Stand graphics, campaigns, coverage, data capture and post-show nurture from one team, so every exhibition earns its place.',
}

export const viewport: Viewport = { themeColor: '#050A18' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${funnel.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(!sessionStorage.getItem('standout-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-wait')}catch(e){}setTimeout(function(){document.documentElement.classList.remove('intro-wait')},8000)",
          }}
        />
        {children}
      </body>
    </html>
  )
}
