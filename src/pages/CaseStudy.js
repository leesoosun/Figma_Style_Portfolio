import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  Page, Thumb, Eyebrow, Reveal, MetaRow, StatRow, CaseBlock, Paras,
} from '../components.js'
import { caseStudies } from '../data.js'

/**
 * One component renders all case studies from data. Adding a project means
 * appending an object to `caseStudies` in data.js — no new file.
 */
export default function CaseStudy() {
  const { slug } = useParams()
  const index = caseStudies.findIndex((c) => c.slug === slug)
  const cs = caseStudies[index]

  useEffect(() => {
    if (cs) document.title = `${cs.shortTitle} — Mahendra Mili`
  }, [cs])

  // Unknown slug falls through to the 404 route rather than rendering blank.
  if (!cs) return <Navigate to="/nonexistent" replace />

  // Wrap around to the first project after the last one.
  const next = caseStudies[(index + 1) % caseStudies.length]
  const isLast = index === caseStudies.length - 1

  return (
    <Page file={cs.fileLabel} note={cs.topNote} back>
      <section className="wrap cs-head">
        <Eyebrow>// Case study</Eyebrow>
        <Reveal as="h1">{cs.title}</Reveal>
        <Reveal as="p" className="dek" delay={80}>{cs.dek}</Reveal>
        <MetaRow items={cs.meta} />
      </section>

      <div className="wrap">
        <Reveal>
          <Thumb className="cs-hero-img" label="IMAGE PLACEHOLDER — hero shot" />
        </Reveal>
      </div>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <CaseBlock label="01 — Problem">
          <Paras items={cs.problem} />
        </CaseBlock>

        <CaseBlock label="02 — Process">
          <Paras items={cs.process} />
          <div className="cs-img-row">
            {cs.processImages.map((t) => (
              <Thumb key={t} label={`IMAGE PLACEHOLDER — ${t}`} />
            ))}
          </div>
          <h4>{cs.decisionTitle}</h4>
          <Paras items={cs.decision} />
        </CaseBlock>

        <CaseBlock label="03 — Solution">
          <Paras items={cs.solution} />
          <div className="cs-img-single">
            <Thumb label={`IMAGE PLACEHOLDER — ${cs.solutionImage}`} />
          </div>
        </CaseBlock>

        <CaseBlock label="04 — Outcome">
          <Paras items={cs.outcome} />
          <StatRow stats={cs.stats} />
        </CaseBlock>

        <div className="next-project">
          <Link to={isLast ? '/work' : `/work/${next.slug}`}>
            <span className="n-label">{isLast ? 'Back to index' : 'Next project'}</span>
            <span className="n-title">{isLast ? 'All work' : next.shortTitle}</span>
          </Link>
          <span className="n-arrow">→</span>
        </div>
      </section>
    </Page>
  )
}
