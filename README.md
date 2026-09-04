# Figma-style portfolio

A portfolio site for **Mahendra Mili**, product designer, built with **React + Vite**.
The visual language borrows from the Figma canvas: a dot-grid background, selection
boxes with corner handles and a live dimension readout, a floating toolbar for
navigation, and a cursor drawn from the Figma pointer glyph.

**Live:**
- Vercel (primary) — https://figma-style-portfolio-sung12.vercel.app
- GitHub Pages (mirror) — https://leesoosun.github.io/Figma_Style_Portfolio/

> [!IMPORTANT]
> **All project content is sample content.** The case studies, metrics, and personal
> copy are realistic-sounding demo filler written to show the layout, not real
> projects. Every page carries a banner saying so. See
> [Replacing the sample content](#replacing-the-sample-content) before sharing this.

---

## Quick start

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

Requires Node 20 or newer.

## Project structure

```
index.html               Vite entry — <head> metadata and the SPA path-restore script
vite.config.js           per-host base path, JSX-in-.js loader, build options
vercel.json              Vercel SPA rewrite + asset caching
public/
  404.html               GitHub Pages SPA fallback (see Routing below)
  favicon.svg
  .nojekyll
src/
  main.js                React root + BrowserRouter
  App.js                 Route table, including redirects from the old .html URLs
  components.js          Shared component library + animation primitives
  data.js                All site content
  pages/
    Home.js  Work.js  CaseStudy.js  AI.js  NotFound.js
  styles/
    global.css           Design tokens and every shared component
    animation.css        Scroll reveals, route transitions, hover motion
    home.css  work.css  ai.css  notfound.css
```

### Why content lives in `data.js`

The static version of this site had three case-study HTML files that were
structurally identical — same four-part spine, same markup, different words. A layout
change meant editing three files.

Now `src/data.js` holds the content and a single `<CaseStudy>` component renders any
of it. **Adding a project is appending one object to `caseStudies`** — no new file, no
duplicated markup, and it appears on the work grid and in the next/previous
navigation automatically.

### `components.js`

Everything used by more than one page:

| Export | Purpose |
| --- | --- |
| `Page` | Page shell — banner, topbar, content, footer, toolbar |
| `Toolbar` | Floating nav; derives its active tab from the current route |
| `TopBar`, `SampleBanner`, `Footer`, `BackLink` | Site chrome |
| `Frame` | Figma selection box; `live` adds the width × height readout |
| `Thumb`, `SectionHead`, `Eyebrow`, `Btn`, `MetaRow`, `StatRow`, `CaseBlock`, `Paras` | Content primitives |
| `Reveal`, `useReveal`, `usePrefersReducedMotion`, `ScrollToTop` | Animation |
| `glyphs` | The capability icons, keyed by name |

## Animations

Motion is deliberately small — it should make the page feel responsive, not
choreographed.

- **Scroll reveal.** `useReveal` adds `.is-in` via `IntersectionObserver` the first
  time an element enters the viewport, then unobserves it. Passing `delay` to
  `<Reveal>` staggers a row of cards.
- **Route transition.** A short fade-and-rise on the page container.
- **Hero selection box.** The Figma frame fades in and its four corner handles pop in
  sequence, then the dimension label appears.
- **Hover motion.** Card lift, toolbar icon rotate, footer link nudge, button press.

All of it is gated behind `prefers-reduced-motion: reduce`, which collapses every
duration and forces revealed elements to their final state — so content is never
hidden behind an animation that will not play.

## Routing

Routes are `/`, `/work`, `/work/:slug`, `/ai`, and a catch-all 404. Old
`*.html` URLs from the static version redirect to their new equivalents.

GitHub Pages has no server-side rewrites, so a deep link like `/work/splitting-the-bill`
would normally 404 on a hard refresh. `public/404.html` encodes the path into a query
string and bounces to `index.html`, whose inline script restores the real URL before
React Router mounts. That pair is what makes deep links work — if you change
`base` in `vite.config.js`, keep `basename` in `src/main.js` and
`pathSegmentsToKeep` in `public/404.html` in sync with it.

## Deployment

The site deploys to **two hosts**, which serve it from different paths:

| Host | URL | Base path |
| --- | --- | --- |
| Vercel | `*.vercel.app` | `/` |
| GitHub Pages | `leesoosun.github.io/Figma_Style_Portfolio/` | `/Figma_Style_Portfolio/` |

A hardcoded `base` breaks one of them — the built HTML would request
`/Figma_Style_Portfolio/assets/…`, which does not exist at a domain root. So
`vite.config.js` resolves it per environment:

```js
const base = process.env.VITE_BASE ?? (process.env.VERCEL ? '/' : '/Figma_Style_Portfolio/')
```

Vercel sets `VERCEL=1` in its build container, so it self-detects. `src/main.js` reads
`import.meta.env.BASE_URL` for the router `basename`, so the router follows
automatically. Set `VITE_BASE` to override for any other target.

> [!WARNING]
> Vercel reports a deploy **green** even when the base path is wrong, because the
> *build* succeeded — it cannot know the runtime asset URLs are broken. If you see a
> blank page on Vercel, check the base path first.

### Vercel

`vercel.json` rewrites everything except real files to `/index.html`. Because Vercel
does true server-side rewrites, deep links return a real **200** — so
`public/404.html` is never used there, and shared links preview correctly in Slack,
LinkedIn and X.

If deployments show a Vercel login screen instead of the site, that is **Deployment
Protection**: Project → Settings → Deployment Protection → Vercel Authentication →
Disabled. It looks fine while you are logged in, which makes it easy to miss.

Share the **production alias** (`figma-style-portfolio-sung12.vercel.app`) or a custom
domain — not a per-deployment URL like `figma-style-portfolio-1cj1a99ox-sung12.vercel.app`,
which is pinned to one immutable build and will not update.

### GitHub Pages

`.github/workflows/pages.yml` runs `npm ci && npm run build` and publishes `dist/` on
every push to `main`. **Settings → Pages → Source** is set to **GitHub Actions**.

Pages has no server-side rewrites, so deep links go through the `public/404.html`
query-string bounce described under [Routing](#routing). They render correctly but
return a 404 *status* first, which some crawlers and link-preview bots will not follow.
That is the main reason to treat Vercel as the primary URL.

---

## Replacing the sample content

Almost everything is in `src/data.js`.

### 1. Contact details

`owner` at the top of `data.js` holds the name, role, email, and social links.
LinkedIn is a real link; the `Resume` social still points at `#` with a `hint`
naming what belongs there. To wire it up, drop `resume.pdf` into `public/` and
point the `Resume` social — and the two `Download resume` buttons in
`pages/Home.js` — at `/Figma_Style_Portfolio/resume.pdf`.

### 2. Case studies

Rewrite the three objects in `caseStudies`. Each has `problem`, `process`,
`decision`, `solution`, and `outcome` arrays (one string per paragraph), a `meta`
table, and three `stats`. `slug` becomes the URL.

`archivedProjects` are the entries with no write-up yet — they render as
non-clickable cards with a *Write-up in progress* chip. Move one into `caseStudies`
when it's written.

### 3. Images

Every image is a striped `<Thumb>` labelled with what belongs there. Put real files
in `public/` and swap `<Thumb …/>` for an `<img>`, keeping the wrapper so sizing holds.

### 4. Remove the sample banner

Set `SAMPLE_CONTENT = false` in `src/data.js`. That hides the banner everywhere. Then
delete the `Sample-content banner` block in `src/styles/global.css`, including the
`body { padding-top }` and `.topbar { top }` offsets it introduces.

## Notes

- **Light mode only.** There is no dark palette; adding one means extending the
  `:root` token block in `global.css`.
- **Client-rendered.** The HTML shell ships without content, so the page needs JS.
  Fine for a portfolio; if you ever want the copy in the initial HTML for SEO, that
  means adding prerendering or moving to a framework with SSG.
- **The static HTML version** this replaced is tagged
  [`static-site-v1`](https://github.com/leesoosun/Figma_Style_Portfolio/tree/static-site-v1).

## Licence

No licence file is included, so all rights are reserved by default. Add one (MIT is
the usual pick) if you want others to reuse the markup and CSS.
