/**
 * Shared component library for the whole site.
 *
 * Everything that appeared in more than one page of the old static site lives
 * here: the Figma-style toolbar and topbar, the selection-box frame, the footer,
 * placeholder thumbnails, section headers, buttons, and the scroll-reveal
 * animation primitives.
 */

import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { owner, SAMPLE_CONTENT } from './data.js'

/* ============================================================
   Animation primitives
   ============================================================ */

/** True when the visitor has asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * Adds `.is-in` to an element the first time it scrolls into view, which the CSS
 * animates. Returns a ref to attach.
 *
 * Reveals once and then unobserves — re-animating on every scroll past is
 * distracting. If the visitor prefers reduced motion, or IntersectionObserver
 * is unavailable, the element is marked visible immediately so content is never
 * hidden behind an animation that will not run.
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }
    // Already on screen at mount (above the fold) — reveal on the next frame so
    // the transition still plays rather than snapping.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, threshold, rootMargin])

  return ref
}

/**
 * Wraps children in a element that fades and slides up when scrolled into view.
 * `stagger` offsets the transition so a row of cards cascades.
 */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Scrolls to top on route change, and respects reduced motion. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }, [pathname, reduced])
  return null
}

/* ============================================================
   Chrome — banner, topbar, toolbar, footer
   ============================================================ */

export function SampleBanner({ children }) {
  if (!SAMPLE_CONTENT) return null
  return (
    <div className="sample-banner">
      {children || (
        <>
          SAMPLE CONTENT&nbsp;&nbsp;<b>—</b>&nbsp;&nbsp;demo copy and invented metrics. Replace before sharing.
        </>
      )}
    </div>
  )
}

export function TopBar({ file, note }) {
  return (
    <div className="topbar">
      <div className="dotstat">{file}</div>
      {note ? <div className="placeholder-note">{note}</div> : null}
    </div>
  )
}

export function BackLink({ to = '/work', children = '← Back to work' }) {
  return (
    <Link to={to} className="back-link">
      {children}
    </Link>
  )
}

const CursorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 2 L4 21 L9 17 L12.5 24 L15.5 22.5 L12 15.5 L18 15.5 Z" fill="currentColor" />
  </svg>
)
const WorkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
    />
  </svg>
)
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3v13M6 11l6 6 6-6M4 21h16"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

/**
 * The floating Figma-style toolbar. `active` is derived from the route, so no
 * page has to declare which tab it is.
 */
export function Toolbar() {
  const { pathname } = useLocation()
  const isWork = pathname === '/work' || pathname.startsWith('/work/')
  const resumeHint = 'Add resume.pdf to /public and link it here'

  return (
    <nav className="toolbar">
      <Link to="/" className={pathname === '/' ? 'active' : undefined}>
        <CursorIcon /> Home
      </Link>
      <div className="sep" />
      <Link to="/work" className={isWork ? 'active' : undefined}>
        <WorkIcon /> Work
      </Link>
      <Link to="/ai" className={pathname === '/ai' ? 'active' : undefined}>
        <SparkIcon /> How I use AI
      </Link>
      <div className="sep" />
      <a href="#" title={resumeHint} onClick={(e) => e.preventDefault()}>
        <DownloadIcon /> Resume
      </a>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="wrap">
      <div className="foot-row">
        <div className="name">
          {owner.name}
          <span>
            {owner.role} — {owner.email}
          </span>
        </div>
        <div className="foot-links">
          {owner.socials.map((s) => (
            <a key={s.label} href={s.href} title={s.hint}>
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   Content primitives
   ============================================================ */

/**
 * The Figma selection box. `live` turns on the width × height readout, which
 * tracks the wrapped element on resize.
 */
export function Frame({ tag, dim, live = false, children }) {
  const boxRef = useRef(null)
  const [size, setSize] = useState(dim || '')

  useEffect(() => {
    if (!live) return
    const el = boxRef.current
    if (!el) return
    const target = el.firstElementChild || el
    const measure = () => {
      const r = target.getBoundingClientRect()
      setSize(`${Math.round(r.width)} × ${Math.round(r.height)}`)
    }
    measure()
    // ResizeObserver catches font-load reflow, which a resize listener misses.
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(target)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [live])

  return (
    <div className="frame show" ref={boxRef}>
      {children}
      {tag ? <span className="tag">{tag}</span> : null}
      <div className="box">
        <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
      </div>
      {size ? <span className="dim">{size}</span> : null}
    </div>
  )
}

/** Striped placeholder standing in for a real screenshot. */
export function Thumb({ label = 'IMAGE PLACEHOLDER', className = '', ...rest }) {
  return (
    <div className={`thumb-placeholder ${className}`.trim()} {...rest}>
      {label}
    </div>
  )
}

export function SectionHead({ num, title, children }) {
  return (
    <Reveal className="section-head">
      {num ? <span className="num">{num}</span> : null}
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </Reveal>
  )
}

export function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

/** Button that renders as a router Link, a mailto/external anchor, or a stub. */
export function Btn({ to, href, variant = 'primary', title, children }) {
  const cls = `btn ${variant}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls} title={title}>{children}</a>
  return (
    <a href="#" className={cls} title={title} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  )
}

export function MetaRow({ items }) {
  return (
    <Reveal className="meta-row">
      {items.map(([label, value]) => (
        <div key={label}>
          <div className="m-label">{label}</div>
          <div className="m-value">{value}</div>
        </div>
      ))}
    </Reveal>
  )
}

export function StatRow({ stats }) {
  return (
    <div className="stat-row">
      {stats.map(([num, label], i) => (
        <Reveal key={label} className="stat-cell" delay={i * 90}>
          <div className="num">{num}</div>
          <div className="label">{label}</div>
        </Reveal>
      ))}
    </div>
  )
}

/** One labelled block of a case study (01 — Problem, 02 — Process, …). */
export function CaseBlock({ label, children }) {
  return (
    <div className="cs-block">
      <div className="b-label">{label}</div>
      <Reveal className="b-body">{children}</Reveal>
    </div>
  )
}

export const Paras = ({ items }) => items.map((t, i) => <p key={i}>{t}</p>)

/* ============================================================
   Capability glyphs, keyed by name from data.js
   ============================================================ */

const B = '#0D99FF'
export const glyphs = {
  grid: (
    <svg className="glyph" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke={B} strokeWidth="1.6" />
      <path d="M8 12h8M12 8v8" stroke={B} strokeWidth="1.6" />
    </svg>
  ),
  clock: (
    <svg className="glyph" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={B} strokeWidth="1.6" />
      <path d="M12 7v5l3 3" stroke={B} strokeWidth="1.6" />
    </svg>
  ),
  bars: (
    <svg className="glyph" viewBox="0 0 24 24" fill="none">
      <path d="M4 20V10M12 20V4M20 20v-7" stroke={B} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg className="glyph" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" stroke={B} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  panels: (
    <svg className="glyph" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16v6H4zM4 14h10v6H4z" stroke={B} strokeWidth="1.6" />
    </svg>
  ),
  heart: (
    <svg className="glyph" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-7-4.5-9.3-9C1.2 8.5 3 5 6.5 5c2 0 3.3 1.2 5.5 3.6C14.2 6.2 15.5 5 17.5 5 21 5 22.8 8.5 21.3 12 19 16.5 12 21 12 21z" stroke={B} strokeWidth="1.6" />
    </svg>
  ),
}

/** Shared page shell: banner + topbar + content + footer + toolbar. */
export function Page({ file, note, back = false, children, footer = true }) {
  return (
    <>
      <SampleBanner />
      {back ? <BackLink /> : null}
      <TopBar file={file} note={note} />
      <main className="page-fade">{children}</main>
      {footer ? <Footer /> : null}
      <Toolbar />
    </>
  )
}
