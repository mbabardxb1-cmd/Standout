import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Option2Page } from '@/components/option2/Option2Page'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Option2Page />
  </React.StrictMode>,
)
