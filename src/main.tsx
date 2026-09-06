import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Stop the browser restoring a stale scroll position on refresh/back-forward —
// without this, reloading a scrolled page can render content behind the fixed header.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)
window.addEventListener('pageshow', () => window.scrollTo(0, 0))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
