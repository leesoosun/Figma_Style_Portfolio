import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import './styles/global.css'
import './styles/animation.css'

// Vite sets BASE_URL from `base` in vite.config.js, which differs per host
// (/Figma_Style_Portfolio/ on GitHub Pages, / on Vercel). Reading it here keeps
// the router in step automatically instead of hardcoding one host's path.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
