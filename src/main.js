import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import './styles/global.css'
import './styles/animation.css'

// `basename` must match `base` in vite.config.js — this is a GitHub Pages
// project site, so every route is nested under the repo name.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Figma_Style_Portfolio">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
