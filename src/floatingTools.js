/**
 * A handful of tool marks that float loosely around the hero — a texture
 * detail, not a software showcase. Everything here is scoped to the hero's
 * existing top/bottom padding (see home.css), so it adds no new layout
 * height and can't collide with the headline, sub-line, or CTAs at any
 * viewport width.
 *
 * The marks below are simplified, single-file redraws in each brand's real
 * colors — close enough to read instantly at the small, semi-transparent
 * size they're shown at, but not traced from official brand assets. Swap
 * in the real SVGs from each company's brand kit if pixel-perfect logos
 * ever matter more than they do at this scale.
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
      <rect width="24" height="24" rx="6" fill="#DA1F26" />
      <path
        d="M12 6.2c-3.2 0-5.8 2.6-5.8 5.8 0 1.15.33 2.22.9 3.13a.85.85 0 0 0 1.44-.9A4.13 4.13 0 0 1 7.7 12c0-2.37 1.93-4.3 4.3-4.3s4.3 1.93 4.3 4.3c0 .84-.24 1.63-.66 2.3a.85.85 0 0 0 1.44.9c.57-.9.9-1.98.9-3.13 0-3.2-2.6-5.8-5.8-5.8Z"
        fill="#fff"
      />
    </svg>
  )
}

function ProcreateMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="7" fill="#12100E" />
      <g transform="translate(12 12)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-4.6"
            rx="2.3"
            ry="4.2"
            fill={['#FF6A3D', '#FF3D77', '#B23DFF', '#4D7CFF', '#FF9A3D'][i]}
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
    </svg>
  )
}

function ClaudeMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <g fill="#CC785C">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <polygon key={deg} points="12,3.2 13.1,10.2 12,12 10.9,10.2" transform={`rotate(${deg} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="2.1" fill="#CC785C" />
    </svg>
  )
}

/**
 * Each entry's position is expressed against the hero's own top/bottom
 * padding bands, never the middle where the title, sub-line, and CTAs
 * live — see the file comment. `depth` scales how far the cursor-parallax
 * effect nudges that icon, so they don't all move in lockstep.
 */
const TOOLS = [
  {
    name: 'Figma', Icon: FigmaMark,
    pos: { top: 46, left: '9%' }, size: 30, rot: -9, scale: 0.95,
    dur: 7.4, delay: 0, depth: 1,
  },
  {
    name: 'Adobe Creative Cloud', Icon: AdobeMark,
    pos: { top: 88, right: '11%' }, size: 34, rot: 7, scale: 1.05,
    dur: 8.6, delay: 1.1, depth: 0.7,
  },
  {
    name: 'Procreate', Icon: ProcreateMark,
    pos: { bottom: 34, left: '15%' }, size: 30, rot: 11, scale: 0.92,
    dur: 6.9, delay: 0.5, depth: 1.2,
  },
  {
    name: 'Claude', Icon: ClaudeMark,
    pos: { bottom: 62, right: '8%' }, size: 32, rot: -6, scale: 1.08,
    dur: 7.8, delay: 1.7, depth: 0.85,
  },
]

/**
 * Nudges every descendant carrying `data-parallax-depth` by a small amount
 * as the cursor moves, scaled by that element's own depth — mouse/trackpad
 * only (matches the rest of the site's hover-only-on-fine-pointer
 * convention), and skipped entirely under prefers-reduced-motion.
 */
function useCursorParallax(containerRef, strength = 12) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container || reduced) return
    if (typeof window === 'undefined' || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return

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
      const rect = container.getBoundingClientRect()
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
    container.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [containerRef, reduced, strength])
}

export function FloatingTools() {
  const containerRef = useRef(null)
  useCursorParallax(containerRef)

  return (
    <div className="floating-tools" ref={containerRef} aria-hidden="true">
      {TOOLS.map((t) => (
        <div key={t.name} className="tool-parallax" style={t.pos} data-parallax-depth={t.depth}>
          <div className="tool-float" style={{ '--dur': `${t.dur}s`, '--delay': `${t.delay}s` }}>
            <div
              className="tool-icon"
              style={{ width: t.size, height: t.size, '--rot': `${t.rot}deg`, '--scale': t.scale }}
            >
              <t.Icon />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
