/**
 * The "Behind the canvas" photo composition — four rotated-square photos
 * arranged in a diamond, each flipping to a second photo. Faces are
 * placeholders (matching the site's usual IMAGE PLACEHOLDER convention)
 * labelled after the bio above them — drop real photos into `FACES` below
 * once they exist.
 *
 * Flip trigger: real hover (mouse/trackpad) flips on :hover via CSS, gated
 * to (hover:hover) and (pointer:fine) — touch devices instead get a tap-to-
 * toggle via React state, so a phone tap can never leave a card stuck
 * flipped the way a synthetic CSS :hover would (see the glimpse-reel
 * pause bug earlier in this project for exactly that failure mode).
 */

import { useState } from 'react'

const FACES = [
  { key: 'badminton', pos: 'top', front: 'Badminton', back: 'Match day 🍺' },
  { key: 'guitar', pos: 'left', front: 'Guitar', back: 'Still learning' },
  { key: 'sketch', pos: 'right', front: 'Sketching', back: 'Anime art' },
  { key: 'anime', pos: 'bottom', front: 'Anime night', back: 'Currently watching' },
]

export function PhotoDiamonds() {
  const [flipped, setFlipped] = useState(() => new Set())

  const toggle = (key) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div className="diamonds">
      {FACES.map((f) => (
        <div key={f.key} className={`diamond diamond-${f.pos}`}>
          <div className="diamond-inner">
            <div
              className={`diamond-flip${flipped.has(f.key) ? ' is-flipped' : ''}`}
              onClick={() => toggle(f.key)}
              role="button"
              tabIndex={0}
              aria-label={`${f.front} — tap to flip`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(f.key) } }}
            >
              <div className="diamond-face diamond-front thumb-placeholder">{f.front}</div>
              <div className="diamond-face diamond-back thumb-placeholder">{f.back}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
