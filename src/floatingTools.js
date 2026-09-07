/**
 * A small cluster of tool marks floating just below the hero — a texture
 * detail, not a "tools I use" showcase. Confined to the hero's own bottom
 * padding (see home.css), so it adds no new layout height and can't collide
 * with the headline, sub-line, or CTAs at any viewport width.
 */

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './components.js'
import figmaLogo from './assets/tools/figma.png'
import adobeLogo from './assets/tools/adobe-cc.png'
import procreateLogo from './assets/tools/procreate.png'
import claudeLogo from './assets/tools/claude.png'

/**
 * `depth` scales how far the cursor-parallax effect nudges that icon, so
 * the cluster doesn't move in lockstep. `yOffset`/`dur`/`delay` give each
 * badge its own float phase so the row feels organic rather than a single
 * rigid block bobbing up and down together. `fit` sizes the logo within
 * its badge — Procreate's mark already includes its own rounded-square
 * tile, so it reads better a touch smaller than the transparent glyphs.
 */
const TOOLS = [
  { name: 'Figma', logo: figmaLogo, size: 48, fit: '58%', yOffset: -2, dur: 7.2, delay: 0, depth: 1 },
  { name: 'Adobe Creative Cloud', logo: adobeLogo, size: 52, fit: '56%', yOffset: 3, dur: 8.4, delay: 0.6, depth: 0.7 },
  { name: 'Procreate', logo: procreateLogo, size: 48, fit: '52%', yOffset: -3, dur: 6.8, delay: 1.3, depth: 1.15 },
  { name: 'Claude', logo: claudeLogo, size: 50, fit: '58%', yOffset: 2, dur: 7.8, delay: 0.4, depth: 0.85 },
]

/**
 * Nudges every descendant carrying `data-parallax-depth` by a small amount
 * as the cursor moves, scaled by that element's own depth — mouse/trackpad
 * only (matches the rest of the site's hover-only-on-fine-pointer
 * convention), and skipped entirely under prefers-reduced-motion.
 */
function useCursorParallax(containerRef, strength = 10) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container || reduced) return
    if (typeof window === 'undefined' || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return

    // Track against the whole hero, not this row's own small bounding box —
    // the icons should drift with the cursor across the full hero area,
    // not snap to huge offsets the moment the mouse nears the short strip
    // they actually sit in.
    const bounds = container.closest('.hero') || container

    let raf = null
    let x = 0
    let y = 0

    const apply = () => {
      raf = null
      container.querySelectorAll('[data-parallax-depth]').forEach((el) => {
        const depth = parseFloat(el.dataset.parallaxDepth) || 0
        el.style.transform = `translate3d(${(x * depth).toFixed(2)}px, ${(y * depth).toFixed(2)}px, 0)`
      })
    }
    const onMove = (e) => {
      const rect = bounds.getBoundingClientRect()
      x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * strength
      y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * strength
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      x = 0
      y = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    bounds.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      bounds.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [containerRef, reduced, strength])
}

export function FloatingTools() {
  const containerRef = useRef(null)
  useCursorParallax(containerRef)

  return (
    <div className="floating-tools" ref={containerRef} aria-hidden="true">
      <div className="tool-row">
        {TOOLS.map((t) => (
          <div key={t.name} className="tool-parallax" data-parallax-depth={t.depth}>
            <div
              className="tool-float"
              style={{ '--dur': `${t.dur}s`, '--delay': `${t.delay}s`, '--y0': `${t.yOffset}px` }}
            >
              <div className="tool-item">
                <div className="tool-badge" style={{ width: t.size, height: t.size }}>
                  <img src={t.logo} alt={t.name} draggable="false" style={{ width: t.fit, height: t.fit }} />
                </div>
                <span className="tool-tip">{t.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
