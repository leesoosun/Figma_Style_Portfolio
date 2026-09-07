/**
 * A small cluster of tool marks floating just below the hero — a texture
 * detail, not a "tools I use" showcase. Confined to the hero's own bottom
 * padding (see home.css), so it adds no new layout height and can't collide
 * with the headline, sub-line, or CTAs at any viewport width.
 *
 * The marks below are simplified, single-file redraws in each brand's real
 * colors — close enough to read instantly at this small scale, but not
 * traced from official brand assets. Swap in the real SVGs from each
 * company's brand kit if pixel-perfect logos ever matter more than they do
 * here.
 */

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './components.js'

function FigmaMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="1" width="9" height="9" rx="2.5" fill="#F24E1E" />
      <circle cx="16.5" cy="8" r="5.5" fill="#A259FF" />
      <circle cx="9" cy="15.5" r="5.5" fill="#1ABCFE" />
      <circle cx="17" cy="18.5" r="4" fill="#0ACF83" />
    </svg>
  )
}

function AdobeMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="adobeGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF5B4A" />
          <stop offset=".55" stopColor="#B24BFF" />
          <stop offset="1" stopColor="#4B7BFF" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#adobeGrad)" />
      <path d="M5.5 15.5c2-6 4.2-9 6.5-9s4.5 3 6.5 9" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" opacity=".9" />
      <path d="M8 16.8c1.7-4 3-6 4-6s2.3 2 4 6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
    </svg>
  )
}

function ProcreateMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <g transform="translate(12 12)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-5"
            rx="3"
            ry="5.4"
            fill={['#FF6A3D', '#FF3D77', '#B23DFF', '#4D7CFF', '#FF9A3D'][i]}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="2.4" fill="#1A1A1A" />
      </g>
    </svg>
  )
}

function ClaudeMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <g fill="#CC785C">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect key={deg} x="11.1" y="2.6" width="1.8" height="7.6" rx="0.9" transform={`rotate(${deg} 12 12)`} />
        ))}
      </g>
    </svg>
  )
}

/**
 * `depth` scales how far the cursor-parallax effect nudges that icon, so
 * the cluster doesn't move in lockstep. `yOffset`/`dur`/`delay` give each
 * badge its own float phase so the row feels organic rather than a single
 * rigid block bobbing up and down together.
 */
const TOOLS = [
  { name: 'Figma', Icon: FigmaMark, size: 48, yOffset: -2, dur: 7.2, delay: 0, depth: 1 },
  { name: 'Adobe Creative Cloud', Icon: AdobeMark, size: 52, yOffset: 3, dur: 8.4, delay: 0.6, depth: 0.7 },
  { name: 'Procreate', Icon: ProcreateMark, size: 48, yOffset: -3, dur: 6.8, delay: 1.3, depth: 1.15 },
  { name: 'Claude', Icon: ClaudeMark, size: 50, yOffset: 2, dur: 7.8, delay: 0.4, depth: 0.85 },
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
              <div className="tool-badge" style={{ width: t.size, height: t.size }}>
                <t.Icon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
