/**
 * The "Behind the canvas" photo composition — four rotated-square photos
 * arranged in a diamond, each auto-flipping to a second photo on its own
 * timer so the wall feels alive without anyone touching it. The four run
 * on staggered phases so they never all flip at once. Hovering a diamond
 * (or, on touch, pressing down on one) pauses just that one so a visitor
 * can actually look at whichever face is showing instead of it flipping
 * away mid-look — release and it picks the cycle back up. Clicking (or
 * tapping) a diamond flips it immediately, on top of all that.
 */

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './components.js'
import badminton from './assets/canvas/badminton.png'
import beer from './assets/canvas/beer.png'
import guitar from './assets/canvas/guitar.png'
import tanjiroKamado from './assets/canvas/tanjiro-kamado.png'
import nezuko from './assets/canvas/nezuko.png'
import tanjiroFire from './assets/canvas/tanjiro-fire.png'
import sungJinWoo from './assets/canvas/sung-jin-woo.png'
import boruto from './assets/canvas/boruto.png'

const FACES = [
  { key: 'badminton', pos: 'top', front: badminton, frontAlt: 'On the badminton court', back: beer, backAlt: 'Post-match beer' },
  { key: 'guitar', pos: 'left', front: guitar, frontAlt: 'Playing guitar', back: tanjiroKamado, backAlt: 'Tanjiro Kamado fan art' },
  { key: 'sketch', pos: 'right', front: nezuko, frontAlt: 'Nezuko fan art', back: tanjiroFire, backAlt: 'Tanjiro fan art' },
  { key: 'anime', pos: 'bottom', front: sungJinWoo, frontAlt: 'Sung Jin-Woo fan art', back: boruto, backAlt: 'Boruto fan art' },
]

const FLIP_INTERVAL_MS = 4000

export function PhotoDiamonds() {
  const reduced = usePrefersReducedMotion()
  const [flipped, setFlipped] = useState(() => new Set())
  // A ref, not state — pausing shouldn't trigger a re-render, it just
  // tells the next tick of that diamond's timer to skip itself.
  const pausedRef = useRef(new Set())

  const toggle = (key) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  useEffect(() => {
    if (reduced) return
    const timeoutIds = []
    const intervalIds = []
    FACES.forEach((f, i) => {
      const phaseOffset = (i * FLIP_INTERVAL_MS) / FACES.length
      const timeoutId = window.setTimeout(() => {
        if (!pausedRef.current.has(f.key)) toggle(f.key)
        intervalIds.push(window.setInterval(() => {
          if (!pausedRef.current.has(f.key)) toggle(f.key)
        }, FLIP_INTERVAL_MS))
      }, phaseOffset)
      timeoutIds.push(timeoutId)
    })
    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id))
      intervalIds.forEach((id) => window.clearInterval(id))
    }
  }, [reduced])

  const pause = (key) => pausedRef.current.add(key)
  const resume = (key) => pausedRef.current.delete(key)

  return (
    <div className="diamonds">
      {FACES.map((f) => (
        <div key={f.key} className={`diamond diamond-${f.pos}`}>
          <div className="diamond-inner">
            <div
              className={`diamond-flip${flipped.has(f.key) ? ' is-flipped' : ''}`}
              onMouseEnter={() => pause(f.key)}
              onMouseLeave={() => resume(f.key)}
              onTouchStart={() => pause(f.key)}
              onTouchEnd={() => resume(f.key)}
              onFocus={() => pause(f.key)}
              onBlur={() => resume(f.key)}
              onClick={() => toggle(f.key)}
              role="button"
              tabIndex={0}
              aria-label={flipped.has(f.key) ? f.backAlt : f.frontAlt}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(f.key) } }}
            >
              <img className="diamond-face diamond-front" src={f.front} alt={f.frontAlt} draggable="false" />
              <img className="diamond-face diamond-back" src={f.back} alt={f.backAlt} draggable="false" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
