/**
 * Small icon set for the case-study "journey map" and "pain point" visual
 * blocks (see CaseStudy.js). Kept separate from the site-wide `glyphs` in
 * components.js since these are narrative-specific rather than reused
 * across the whole site.
 */

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const journeyIcons = {
  connect: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M14 10a4 4 0 0 0-5.66 0l-2 2a4 4 0 0 0 5.66 5.66l1-1" />
      <path d="M10 14a4 4 0 0 0 5.66 0l2-2a4 4 0 0 0-5.66-5.66l-1 1" />
    </svg>
  ),
  consolidate: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  ),
  understand: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 17l5-5 4 3 7-8" />
      <path d="M15 6h5v5" />
    </svg>
  ),
  manage: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2.5 12h3M18.5 12h3M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9 12.5h6M9 16.5h6" />
    </svg>
  ),
}

export const warningIcon = (
  <svg viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5" />
    <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
)
