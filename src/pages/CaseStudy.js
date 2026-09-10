import { Fragment, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  Page, Thumb, Eyebrow, Reveal, MetaRow, StatRow, CaseBlock, Paras,
} from '../components.js'
import { caseStudies } from '../data.js'
import { journeyIcons, warningIcon } from '../caseStudyIcons.js'

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

  // Sections are data-driven per project: a case study with real background
  // (overview/ownership/trigger) shows those instead of the generic Problem
  // block, so this component still renders every project's own shape.
  let n = 0
  const num = () => String((n += 1)).padStart(2, '0')

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
          {cs.previewImage ? (
            <img
              className="cs-hero-img cs-hero-photo"
              src={cs.previewImage}
              alt={`${cs.shortTitle} — hero shot`}
              draggable="false"
              style={{ aspectRatio: cs.previewRatio }}
            />
          ) : (
            <Thumb className="cs-hero-img" label="IMAGE PLACEHOLDER — hero shot" />
          )}
        </Reveal>
      </div>

      <section className="wrap" style={{ paddingTop: 0 }}>
        {cs.overview && (
          <CaseBlock label={`${num()} — Overview`}>
            <Paras items={cs.overview} />
          </CaseBlock>
        )}

        {cs.ownership && (
          <CaseBlock label={`${num()} — My role`}>
            {cs.ownershipIntro && <Paras items={cs.ownershipIntro} />}
            <ul>
              {cs.ownership.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>
        )}

        {cs.trigger && (
          <CaseBlock label={`${num()} — The trigger`}>
            <Paras items={cs.trigger} />
            <div className="callout">
              <span className="callout-label">{cs.hypothesisLabel}</span>
              <p>{cs.hypothesis}</p>
            </div>
            <Paras items={cs.triggerFollowup} />
          </CaseBlock>
        )}

        {cs.problem && (
          <CaseBlock label={`${num()} — Problem`}>
            <Paras items={cs.problem} />
          </CaseBlock>
        )}

        {/* Freeform blocks for case studies whose real content doesn't fit
            the fixed problem/process/solution/outcome shape below — an
            ordered list of paragraphs, a bullet list, titled subsections,
            and a closing quote, in any combination. */}
        {cs.sections && cs.sections.map((s) => (
          <CaseBlock label={`${num()} — ${s.label}`} key={s.label}>
            {s.paragraphs && <Paras items={s.paragraphs} />}
            {s.bullets && (
              <ul>
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
            {s.quotes && (
              <div className="interview-quotes">
                {s.quotes.map((q) => (
                  <blockquote className="interview-quote" key={q}>
                    <p>{q}</p>
                  </blockquote>
                ))}
              </div>
            )}
            {s.journey && (
              <div className="cs-journey">
                {s.journey.map((step, i) => (
                  <Fragment key={step.title}>
                    {i > 0 ? <span className="cs-journey-arrow" aria-hidden="true">→</span> : null}
                    <div className="cs-journey-step">
                      <div className="cs-journey-icon">{journeyIcons[step.icon]}</div>
                      <h5>{step.title}</h5>
                      <p>{step.body}</p>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
            {s.painCards && (
              <>
                {s.painCardsLabel && <span className="cs-pain-label">{s.painCardsLabel}</span>}
                <div className="cs-pain-grid">
                  {s.painCards.map((c) => (
                    <div className="cs-pain-card" key={c.title}>
                      <div className="cs-pain-icon">{warningIcon}</div>
                      <h5>{c.title}</h5>
                      <p>{c.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            {s.subsections && s.subsections.map((sub) => (
              <div key={sub.title}>
                <h4>{sub.title}</h4>
                {sub.paragraphs && <Paras items={sub.paragraphs} />}
                {sub.bullets && (
                  <ul>
                    {sub.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {sub.imageRows && sub.imageRows.map((row, i) => (
                  <div className="cs-image-strip" key={i}>
                    {row.map((img, j) => (
                      <Fragment key={img.src}>
                        {j > 0 ? <span className="cs-image-arrow" aria-hidden="true">→</span> : null}
                        <figure className="cs-image-strip-item">
                          <img src={img.src} alt={img.alt} draggable="false" loading="lazy" />
                          {img.caption ? <figcaption>{img.caption}</figcaption> : null}
                        </figure>
                      </Fragment>
                    ))}
                  </div>
                ))}
                {sub.video && (
                  <figure className="cs-video">
                    <video
                      src={sub.video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                    {sub.video.caption ? <figcaption>{sub.video.caption}</figcaption> : null}
                  </figure>
                )}
              </div>
            ))}
            {s.stats && (
              <div className="stat-row impact-row">
                {s.stats.map((st, i) => (
                  <Reveal key={st.value + st.headline} className="stat-cell" delay={i * 90}>
                    <div className="num">{st.value}</div>
                    <div className="headline">{st.headline}</div>
                    {st.body ? <div className="desc">{st.body}</div> : null}
                  </Reveal>
                ))}
              </div>
            )}
            {s.quote && (
              <div className="callout">
                <span className="callout-label">{s.quote.label}</span>
                <p>{s.quote.text}</p>
              </div>
            )}
            {s.closing && <Paras items={s.closing} />}
          </CaseBlock>
        ))}

        {cs.process && (
          <CaseBlock label={`${num()} — Process`}>
            <Paras items={cs.process} />
            <div className="cs-img-row">
              {cs.processImages.map((t) => (
                <Thumb key={t} label={`IMAGE PLACEHOLDER — ${t}`} />
              ))}
            </div>
            <h4>{cs.decisionTitle}</h4>
            <Paras items={cs.decision} />
          </CaseBlock>
        )}

        {cs.solution && (
          <CaseBlock label={`${num()} — Solution`}>
            <Paras items={cs.solution} />
            <div className="cs-img-single">
              <Thumb label={`IMAGE PLACEHOLDER — ${cs.solutionImage}`} />
            </div>
          </CaseBlock>
        )}

        {cs.outcome && (
          <CaseBlock label={`${num()} — Outcome`}>
            <Paras items={cs.outcome} />
            <StatRow stats={cs.stats} />
          </CaseBlock>
        )}

        <div className="next-project">
          <Link to={isLast ? '/work' : `/work/${next.slug}`}>
            <span className="n-text">
              <span className="n-label">{isLast ? 'Back to index' : 'Next project'}</span>
              <span className="n-title">{isLast ? 'All work' : next.shortTitle}</span>
            </span>
            <span className="n-arrow">→</span>
          </Link>
        </div>
      </section>
    </Page>
  )
}
