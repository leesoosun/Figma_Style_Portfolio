import { useEffect } from 'react'
import { Page, SectionHead, Eyebrow, Reveal } from '../components.js'
import { aiStack, aiFlow, aiCaveats, aiQuote, owner } from '../data.js'
import '../styles/ai.css'

export default function AI() {
  useEffect(() => { document.title = 'How I use AI — Mahendra Mili' }, [])

  return (
    <Page file="mahendra-mili.fig — how-i-use-ai" note="100%">
      <section className="wrap page-head">
        <Eyebrow>// A note on process</Eyebrow>
        <Reveal as="h1">How I actually use AI in my design work</Reveal>
        <Reveal as="p" delay={80}>
          Not a hype page. A real, specific breakdown of where AI tools sit in my
          process — and where they don't.
        </Reveal>
      </section>

      <section className="wrap" style={{ paddingTop: 60 }}>
        <SectionHead num="01" title="The stack">
          The tools I reach for most, and what each one is actually for.
        </SectionHead>
        <div className="stack-grid">
          {aiStack.map((s, i) => (
            <Reveal className="stack-cell" key={s.name + s.role} delay={i * 70}>
              <div className="role">{s.role}</div>
              <h4>{s.name}</h4>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <SectionHead num="02" title="Where it fits in my process">
          AI shows up at specific points — not as a layer over the whole workflow.
        </SectionHead>
        <div className="flow">
          {aiFlow.map((f, i) => (
            <Reveal className="flow-step" key={f.title}>
              <div className="fnum">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <SectionHead num="03" title="A real prompt I use">
          One example, so this page isn't just abstract claims.
        </SectionHead>
        <Reveal className="prompt-panel">
          <div className="prompt-head">
            <div className="dot" /><div className="dot" /><div className="dot" />
            <span>prompt.txt</span>
          </div>
          <div className="prompt-body">
            <span className="blue">You:</span> Here are 12 interview quotes about our
            onboarding flow. Group them into themes, attach the supporting quote to each,
            and flag anything that <i>contradicts</i> our assumption that users want fewer
            steps rather than more guidance. If a theme rests on only one quote, say so.
            <br /><br />
            <span className="blue">Why this works:</span> the default output of a
            summarisation prompt is a tidy narrative, which is exactly the thing that makes
            bad research feel finished. Asking for disconfirming evidence and for
            weakly-supported themes to be labelled turns it from a summary into something I
            can actually argue with.
          </div>
        </Reveal>
      </section>

      <section className="wrap philosophy">
        <Reveal as="blockquote">“{aiQuote}”</Reveal>
        <cite>— {owner.name}</cite>
      </section>

      <section className="wrap">
        <SectionHead num="04" title="What I don't hand off">
          Being specific about limits is more credible than pretending there aren't any.
        </SectionHead>
        <div className="caveat-list">
          {aiCaveats.map((c, i) => (
            <Reveal className="caveat" key={c.title} delay={i * 70}>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  )
}
