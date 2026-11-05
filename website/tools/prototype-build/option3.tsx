import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { FieldLayer } from '@/components/field/FieldLayer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Cursor } from '@/components/Cursor'
import { App } from './App'

window.__STANDOUT_PROTO__ = true
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FieldLayer />
    <Cursor />
    <SmoothScroll>
      <div className="relative z-10">
        <App photos />
      </div>
    </SmoothScroll>
  </React.StrictMode>,
)

// Tell the boot poster the app has mounted.
requestAnimationFrame(() => {
  document.documentElement.dataset.app = 'ready'
})
