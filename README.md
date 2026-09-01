# Figma-style portfolio

A static portfolio site for **Mahendra Mili**, product designer. The visual language
borrows from the Figma canvas: a dot-grid background, selection boxes with corner
handles and live dimension labels, a floating toolbar for navigation, and a custom
cursor built from the Figma pointer glyph.

No build step, no dependencies, no framework. Plain HTML and one stylesheet — open
`index.html` in a browser and it works.

> [!IMPORTANT]
> **All project content is sample content.** The case studies, metrics, and personal
> copy are realistic-sounding demo filler written to show the layout, not real
> projects. Every page carries a black banner saying so. See
> [Replacing the sample content](#replacing-the-sample-content) before you share
> this with anyone.

---

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page — hero, horizontal work strip, selected work, capabilities grid, personal note, contact |
| `work.html` | Full project index with working category filters |
| `case-study-1.html` | Case study — product design / mobile / 0→1 |
| `case-study-2.html` | Case study — design systems |
| `case-study-3.html` | Case study — research-led |
| `ai.html` | "How I use AI" — tooling, workflow, a sample prompt, and stated limits |
| `case-study.html` | **Template.** Not linked from the site and marked `noindex` |
| `404.html` | Not-found page, styled to match |
| `styles.css` | All shared tokens and components |

## Structure

Design tokens and every shared component live in `styles.css` — colours, type scale,
the toolbar, the top bar, buttons, section headers, the placeholder thumbnail
treatment, the footer, and the whole case-study layout. Page-specific layout stays in
a `<style>` block in the page that needs it.

That split matters: the case-study CSS used to be copy-pasted into all four case-study
files, so a change to the layout meant four identical edits. It's now defined once
under `Case-study page components` in `styles.css`.

## Running it locally

Open `index.html` directly, or serve the folder so that relative paths and the 404
behave like they do in production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

A GitHub Actions workflow (`.github/workflows/pages.yml`) publishes the repo root to
GitHub Pages on every push to `main`. It needs one manual step, once:

1. Go to **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**

The site then goes live at `https://leesoosun.github.io/Figma_Style_Portfolio/`, and
redeploys on each push. You can watch runs under the **Actions** tab.

Prefer not to use Actions? Delete the workflow and set **Source** to *Deploy from a
branch* → `main` / `/ (root)` instead. The `.nojekyll` file is already present so
Jekyll won't try to process anything.

---

## Replacing the sample content

### 1. Contact details

Every page footer currently reads `your-email@example.com`, and the social and resume
links point at `#` with a `title` attribute describing what belongs there. Search for
these and replace across all pages:

- `your-email@example.com` — footer text, plus the `mailto:` on the `index.html` contact button
- `title="Add your LinkedIn URL"` and the sibling X / Dribbble links
- `title="Add resume.pdf to the repo and link it here"` — drop a `resume.pdf` in the repo root and point these at it

### 2. Case studies

Rewrite `case-study-1.html`, `case-study-2.html`, and `case-study-3.html` with your
real projects. Each follows the same four-part spine: **Problem → Process → Solution →
Outcome**, with a metadata row (role, timeline, team, tools) and three outcome stats.

To add a fourth, copy `case-study.html`, fill it in, and add a card for it in the
`.project-grid` in `work.html`.

The three archived cards in `work.html` are marked `class="pcard pending"` with a
*Write-up in progress* chip. Once a write-up exists, turn the `<div>` back into an
`<a href="...">` and delete the `pending` class and the `soon` chip.

### 3. Images

Every image is a striped `.thumb-placeholder` block labelled with what belongs there
(`IMAGE PLACEHOLDER — hero shot`, `— sketch/flow`, and so on). Replace each with an
`<img>` and keep the surrounding container so the sizing holds.

### 4. Remove the banner

Once nothing on the site is fake, delete:

- the `<div class="sample-banner">…</div>` line from each page
- the `Sample-content banner` block in `styles.css`, including the `body { padding-top }`
  and `.topbar { top }` offsets it introduces

## Accessibility and browser notes

- The custom cursor is set with an SVG `data:` URI and falls back to `auto` / `pointer`.
- `prefers-reduced-motion` is **not** yet handled; transitions are short (.15–.35s) but
  if you add larger motion, gate it behind that media query.
- The site is light-mode only. There is no dark palette defined — adding one means
  extending the `:root` token block in `styles.css`.

## Licence

No licence file is included, so all rights are reserved by default. If you want others
to be able to reuse the markup and CSS, add one (MIT is the usual pick).
