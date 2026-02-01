import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import { DeviceProvider } from './context/DeviceContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <App />
    </DeviceProvider>
  </StrictMode>,
)