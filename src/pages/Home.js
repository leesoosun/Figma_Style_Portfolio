import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Page, Frame, Thumb, SectionHead, Eyebrow, Btn, Reveal, glyphs,
  useReveal, useAutoScrollReel,
} from '../components.js'
import { caseStudies, glimpse, brands, capabilities, aboutParagraphs, owner } from '../data.js'
import { FloatingTools } from '../floatingTools.js'
import '../styles/home.css'

// How many times the 5-logo set repeats inside one reel group. Needs to be
// wide enough that a group's rendered width beats the widest realistic
// browser window — see the comment at its usage below for why that matters.
const BRAND_REPEAT = 4

export default function Home() {
  useEffect(() => { document.title = `${owner.name} — ${owner.role}` }, [])
  const revealRef = useReveal()
  const { viewportRef, trackRef, groupRef } = useAutoScrollReel()
  const brandsRevealRef = useReveal()
  const brandsReel = useAutoScrollReel({ speedScreensPerSec: 0.05 })

  return (
    <Page file="mahendra-mili.fig — landing" note="100%">
      {/* ---------------- Hero ---------------- */}
      <section className="hero wrap">
        <FloatingTools />
        <Eyebrow>// {owner.name} - {owner.role}</Eyebrow>
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
            From early explorations to shipped experiences — here’s a look around.
          </SectionHead>
        </div>
        {/* The track holds two identical groups so the reel can loop seamlessly:
            once the first group has scrolled fully past, useAutoScrollReel
            rebases scrollLeft back by exactly one group's width. The clone is
            aria-hidden so screen readers and the accessibility tree only ever
            see one copy. Auto-advances via rAF, and can be dragged by hand —
            mouse-drag on desktop, native touch/trackpad scroll elsewhere. */}
        <div
          className="glimpse-viewport reveal"
          ref={(el) => { revealRef.current = el; viewportRef.current = el }}
        >
          <div className="glimpse-track" ref={trackRef}>
            {[0, 1].map((copy) => (
              <div
                className="glimpse-group"
                key={copy}
                ref={copy === 0 ? groupRef : undefined}
                aria-hidden={copy === 1 ? 'true' : undefined}
              >
                {glimpse.map((g) => (
                  <div className="gcard" key={g.title}>
                    {g.image
                      ? <img className="thumb thumb-img" src={g.image} alt={g.title} draggable="false" loading="lazy" />
                      : <Thumb className="thumb" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
                {cs.previewImage
                  ? <img className="thumb-img" src={cs.previewImage} alt={cs.shortTitle} draggable="false" loading="lazy" />
                  : 'IMAGE PLACEHOLDER'}
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
          <Btn to="/work" variant="ghost">View all works</Btn>
        </Reveal>
      </section>

      {/* ---------------- Brands ---------------- */}
      <section id="brands">
        <div className="wrap">
          <SectionHead num="03" title="Brands I've worked with" />
        </div>
        {/* Same two-group loop as the glimpse reel above (see its comment),
            just a smaller, calmer strip with its own reel instance and speed.
            Five logos are far narrower than a wide desktop viewport, so one
            group repeats the set BRAND_REPEAT times — otherwise a group is
            narrower than the browser's own scrollable width can shrink to,
            and native scrollLeft silently clamps well short of the wrap
            point, making the reel visibly stall for most of each cycle. */}
        <div
          className="brands-viewport reveal"
          ref={(el) => { brandsRevealRef.current = el; brandsReel.viewportRef.current = el }}
        >
          <div className="brands-track" ref={brandsReel.trackRef}>
            {[0, 1].map((copy) => (
              <div
                className="brands-group"
                key={copy}
                ref={copy === 0 ? brandsReel.groupRef : undefined}
                aria-hidden={copy === 1 ? 'true' : undefined}
              >
                {Array.from({ length: BRAND_REPEAT }).map((_, rep) => (
                  brands.map((b) => (
                    <div
                      className="brand-chip"
                      key={`${b.name}-${rep}`}
                      aria-hidden={rep > 0 || copy === 1 ? 'true' : undefined}
                    >
                      <img src={b.logo} alt={b.name} draggable="false" loading="lazy" />
                    </div>
                  ))
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- What I bring ---------------- */}
      <section id="bring" className="wrap">
        <SectionHead num="04" title="What I bring to the table">
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
        <SectionHead num="05" title="Behind the canvas">
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
        <Eyebrow>06 · Let's talk</Eyebrow>
        <Reveal as="h2">Got a project in mind? I'd love to hear about it.</Reveal>
        <p className="sub">Open to full-time roles</p>
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
