/**
 * The "Behind the canvas" photo composition — four rotated-square photos
 * arranged in a diamond, each flipping to a second photo, plus a fifth,
 * non-flipping photo anchoring the center.
 *
 * Flip trigger: real hover (mouse/trackpad) flips on :hover via CSS, gated
 * to (hover:hover) and (pointer:fine) — touch devices instead get a tap-to-
 * toggle via React state, so a phone tap can never leave a card stuck
 * flipped the way a synthetic CSS :hover would (see the glimpse-reel
 * pause bug earlier in this project for exactly that failure mode).
 */

import { useState } from 'react'
import badminton from './assets/canvas/badminton.png'
import beer from './assets/canvas/beer.png'
import guitar from './assets/canvas/guitar.png'
import myself from './assets/canvas/myself.jpg'
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

const CENTER = { key: 'center', img: myself, alt: 'Mahendra Mili' }

export function PhotoDiamonds() {
  const [flipped, setFlipped] = useState(() => new Set())

  const toggle = (key) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  // On a mouse/trackpad, CSS :hover already flips the card — a click there
  // would toggle the React `flipped` state on top of it, and once the mouse
  // moves away the hover style clears but the toggled class doesn't, so the
  // card was getting stuck flipped after any click. Clicking is only meant
  // to be the touch substitute for hover, so skip it entirely on devices
  // that already have real hover. Enter/Space (keyboard) always toggles —
  // a keyboard user can't hover regardless of what the device supports.
  const handleClick = (key) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches) return
    toggle(key)
  }

  return (
    <div className="diamonds">
      <div className="diamond diamond-center">
        <div className="diamond-inner">
          <img className="diamond-face" src={CENTER.img} alt={CENTER.alt} draggable="false" />
        </div>
      </div>
      {FACES.map((f) => (
        <div key={f.key} className={`diamond diamond-${f.pos}`}>
          <div className="diamond-inner">
            <div
              className={`diamond-flip${flipped.has(f.key) ? ' is-flipped' : ''}`}
              onClick={() => handleClick(f.key)}
              role="button"
              tabIndex={0}
              aria-label={`${f.frontAlt} — tap to flip`}
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
