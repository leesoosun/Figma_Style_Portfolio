import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Page, Frame, Reveal } from '../components.js'
import { caseStudies, archivedProjects, workFilters } from '../data.js'
import '../styles/work.css'

export default function Work() {
  const [filter, setFilter] = useState('all')
  useEffect(() => { document.title = 'Work — Mahendra Mili' }, [])

  // Case studies first (they have pages), then archived entries. The old static
  // page hand-maintained this grid; it is now derived from data.
  const all = useMemo(
    () => [
      ...caseStudies.map((c) => ({ ...c, href: `/work/${c.slug}` })),
      ...archivedProjects.map((p) => ({ ...p, href: null })),
    ],
    []
  )

  const visible = all.filter((p) => filter === 'all' || p.category === filter)

  return (
    <Page file="mahendra-mili.fig — work" note={`${visible.length} frame${visible.length === 1 ? '' : 's'}`}>
      <section className="wrap work-head">
        <Frame tag="Work / All projects">
          <h1>Everything I've shipped, prototyped, or broken along the way.</h1>
        </Frame>
        <p>
          A mix of shipped product work, personal explorations, and case studies. Filter by
          type, or just scroll — each project opens into its own page.
        </p>
        <div className="filters">
          {workFilters.map((f) => (
            <button
              key={f.key}
              className={`filter-pill${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="project-grid">
          {visible.map((p, i) => {
            const inner = (
              <>
                <div className="thumb thumb-placeholder">
                  {p.featured ? 'IMAGE PLACEHOLDER — featured project' : 'IMAGE PLACEHOLDER'}
                </div>
                <div className="row">
                  <div>
                    <h3>{p.shortTitle}</h3>
                    <div className="role">{p.roleLine}</div>
                  </div>
                  <div className="year">{p.year}</div>
                </div>
                <div className="tags">
                  {p.tags.map((t) => <span className="pill" key={t}>{t}</span>)}
                  {!p.href ? <span className="soon">Write-up in progress</span> : null}
                </div>
              </>
            )
            const cls = `pcard${p.featured ? ' featured' : ''}${p.href ? '' : ' pending'}`
            return (
              <Reveal key={p.shortTitle} delay={i * 70}>
                {p.href
                  ? <Link to={p.href} className={cls}>{inner}</Link>
                  : <div className={cls}>{inner}</div>}
              </Reveal>
            )
          })}
        </div>
      </section>
    </Page>
  )
}
