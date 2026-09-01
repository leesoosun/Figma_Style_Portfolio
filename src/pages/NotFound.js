import { useEffect } from 'react'
import { Page, Frame, Eyebrow, Btn } from '../components.js'
import '../styles/notfound.css'

export default function NotFound() {
  useEffect(() => { document.title = '404 — Mahendra Mili' }, [])

  return (
    <Page file="mahendra-mili.fig — 404" note="Frame not found" footer={false}>
      <section className="wrap nf">
        <Eyebrow>// 404</Eyebrow>
        <Frame tag="Missing frame">
          <h1>This frame doesn't exist on the canvas.</h1>
        </Frame>
        <p>
          The page you're after has been moved, renamed, or was never here in the
          first place.
        </p>
        <div className="actions">
          <Btn to="/">Back to home</Btn>
          <Btn to="/work" variant="ghost">See the work</Btn>
        </div>
      </section>
    </Page>
  )
}
