import { Routes, Route, Navigate } from 'react-router-dom'
import { ScrollToTop } from './components.js'
import Home from './pages/Home.js'
import Work from './pages/Work.js'
import AI from './pages/AI.js'
import CaseStudy from './pages/CaseStudy.js'
import NotFound from './pages/NotFound.js'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/ai" element={<AI />} />

        {/* The static site shipped .html URLs. Anyone holding an old link
            still lands in the right place instead of on the 404. */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/work.html" element={<Navigate to="/work" replace />} />
        <Route path="/ai.html" element={<Navigate to="/ai" replace />} />
        <Route path="/case-study-1.html" element={<Navigate to="/work/kryptos-portfolio-management" replace />} />
        <Route path="/case-study-2.html" element={<Navigate to="/work/one-system-four-surfaces" replace />} />
        <Route path="/case-study-3.html" element={<Navigate to="/work/what-the-churn-data-hid" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
