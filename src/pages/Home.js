import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Page, Frame, Thumb, SectionHead, Eyebrow, Btn, Reveal, glyphs,
} from '../components.js'
import {
  caseStudies, archivedProjects, glimpse, capabilities, aboutParagraphs, owner,
} from '../data.js'
import '../styles/home.css'

export default function Home() {
  useEffect(() => { document.title = `${owner.name} — ${owner.role}` }, [])

  return (
    <Page file="mahendra-mili.fig — landing" note="100%">
      {/* ---------------- Hero ---------------- */}
      <section className="hero wrap">
        <Eyebrow>// Product Designer</Eyebrow>
        <Frame tag="Hero / Headline" live>
          <h1>
            Turning Ideas Into <span>Experiences</span>.
          </h1>
        </Frame>
        <p className="sub">
          I turn complex problems into simple product experiences. Currently exploring
          where AI and product design intersect.
        </p>
        <div className="actions">
          <Btn href="#work">View selected work</Btn>
          <Btn variant="ghost" title="Add resume.pdf to /public and link it here">
            Download resume
          </Btn>
        </div>
      </section>

      {/* ---------------- Glimpse reel ---------------- */}
      <section id="glimpse">
        <div className="wrap">
          <SectionHead num="01" title="A glimpse of my work">
            A slow reel of screens, explorations and shipped features. Hover to pause.
          </SectionHead>
        </div>
        {/* The track holds two identical groups so the marquee can loop seamlessly:
            when the first group has scrolled fully out of frame, the second sits
            exactly where it started. The clone is aria-hidden so screen readers
            and the accessibility tree only ever see one copy. */}
        <Reveal className="glimpse-viewport">
          <div className="glimpse-track">
            {[0, 1].map((copy) => (
              <div
                className="glimpse-group"
                key={copy}
                aria-hidden={copy === 1 ? 'true' : undefined}
              >
                {glimpse.map((g) => (
                  <div className="gcard" key={g.title}>
                    <Thumb className="thumb" />
                    <div className="label">{g.title}</div>
                    <div className="tag">{g.tag}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- Selected work ---------------- */}
      <section id="work" className="wrap">
        <SectionHead num="02" title="Selected work">
          A handful of case studies, chosen for the range of problems, not just the polish.
        </SectionHead>
        <div className="work-list">
          {caseStudies.map((cs, i) => (
            <Reveal className="work-row" key={cs.slug}>
              <Link to={`/work/${cs.slug}`} className="thumb thumb-placeholder">
                IMAGE PLACEHOLDER
              </Link>
              <div className="info">
                <span className="index">Case study {String(i + 1).padStart(2, '0')}</span>
                <h3>{cs.shortTitle}</h3>
                <p className="desc">{cs.cardDesc}</p>
                <div className="meta">
                  {cs.pills.map((p) => <span className="pill" key={p}>{p}</span>)}
                </div>
                <Link to={`/work/${cs.slug}`} className="go">View case study →</Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="work-cta">
          <Btn to="/work" variant="ghost">
            See all {caseStudies.length + archivedProjects.length} projects →
          </Btn>
        </Reveal>
      </section>

      {/* ---------------- What I bring ---------------- */}
      <section id="bring" className="wrap">
        <SectionHead num="03" title="What I bring to the table">
          The parts of the process I care about most.
        </SectionHead>
        <div className="bring-grid">
          {capabilities.map((c, i) => (
            <Reveal className="bring-cell" key={c.title} delay={i * 60}>
              {glyphs[c.icon]}
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Behind the canvas ---------------- */}
      <section id="behind" className="wrap">
        <SectionHead num="04" title="Behind the canvas">
          A bit about how I work, and what I'm like outside of Figma.
        </SectionHead>
        <div className="canvas-section">
          <Reveal className="canvas-photo">IMAGE PLACEHOLDER</Reveal>
          <Reveal className="canvas-text" delay={90}>
            {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section className="wrap conclude">
        <Eyebrow>05 · Let's talk</Eyebrow>
        <Reveal as="h2">Got a project in mind? I'd love to hear about it.</Reveal>
        <p className="sub">Open to full-time roles and select freelance work.</p>
        <div className="actions">
          <Btn href={`mailto:${owner.email}`}>{owner.email}</Btn>
          <Btn variant="ghost" title="Add resume.pdf to /public and link it here">
            Download resume
          </Btn>
        </div>
      </section>
    </Page>
  )
}
