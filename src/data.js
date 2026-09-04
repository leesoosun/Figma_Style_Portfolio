/**
 * All site content in one place.
 *
 * In the old static site each case study was its own ~140-line HTML file, all
 * three structurally identical. Here they are data, rendered by a single
 * <CaseStudy> component — so adding a fourth project means appending one object
 * to `caseStudies` below. No new file, no copy-pasted markup.
 *
 * SAMPLE CONTENT: the copy and every metric below are demo filler, not real
 * projects. Replace before sharing. See README.md.
 */

import kryptosDashboard from './assets/glimpse/kryptos-dashboard.png'

export const SAMPLE_CONTENT = true

export const owner = {
  name: 'Mahendra Mili',
  role: 'Product Designer',
  // Placeholders on purpose — a public repo shouldn't leak a real address until
  // you decide to. Swap these two and the socials below when you're ready.
  email: 'your-email@example.com',
  socials: [
    { label: 'LinkedIn', href: '#', hint: 'Add your LinkedIn URL' },
    { label: 'Twitter / X', href: '#', hint: 'Add your X / Twitter URL' },
    { label: 'Dribbble', href: '#', hint: 'Add your Dribbble URL' },
    { label: 'Resume', href: '#', hint: 'Add resume.pdf to /public and link it here' },
  ],
}

/* ---------------- Landing page ---------------- */

/**
 * The auto-scrolling reel on the landing page. Captions are no longer rendered
 * under the cards, so `title` now serves as the React key and as the natural
 * alt text once real screenshots replace the placeholders.
 */
export const glimpse = [
  { title: 'Kryptos dashboard', tag: 'Web app · 2026', image: kryptosDashboard },
  { title: 'Splitting the bill', tag: 'Mobile · 2026' },
  { title: 'Reporting rebuild', tag: 'Web app · 2025' },
  { title: 'One system, four surfaces', tag: 'Design system · 2025' },
  { title: 'Ops console v2', tag: 'Dashboard · 2024' },
  { title: 'Fieldnote identity', tag: 'Branding · 2024' },
]

export const capabilities = [
  {
    title: 'Systems thinking',
    body: 'I design components, not just screens — so the product stays consistent as it grows.',
    icon: 'grid',
  },
  {
    title: 'Fast, honest iteration',
    body: 'Rough prototypes early, real user feedback often, polish last — not first.',
    icon: 'clock',
  },
  {
    title: 'Data-informed calls',
    body: 'Opinions are a starting point. I like closing the loop with usage data and metrics.',
    icon: 'bars',
  },
  {
    title: 'AI-native workflows',
    body: 'I use AI tools daily to move faster from idea to tested prototype — more on that below.',
    icon: 'spark',
  },
  {
    title: 'Cross-functional fluency',
    body: "Comfortable in the room with engineers and PMs — I speak enough of both languages.",
    icon: 'panels',
  },
  {
    title: 'Craft with empathy',
    body: "The details matter, but only in service of someone else's actual day.",
    icon: 'heart',
  },
]

export const aboutParagraphs = [
  'I came to design sideways, through front-end work, and I think it shows in how I work: I would rather build a rough thing on Monday and be wrong about it by Friday than defend a beautiful static mock for three weeks. Most of my strongest opinions started as something I was sure about and then watched a real person struggle with.',
  'The principle I keep coming back to is that the interesting problem is almost never the one on the ticket. A pricing complaint is usually a value problem; a “we need a dashboard” request is usually one unanswered question. Finding the real problem is most of the job.',
  'Outside of Figma I cook badly and read about infrastructure — bridges, water systems, power grids. Both are useful for the same reason: they are systems where the failure modes are visible and the constraints are honest.',
]

/* ---------------- Case studies ---------------- */

export const caseStudies = [
  {
    slug: 'kryptos-portfolio-management',
    title: 'Kryptos — Crypto Portfolio Management',
    shortTitle: 'Kryptos — Crypto Portfolio Management',
    dek:
      "Kryptos's core portfolio management experience, built from the ground up and refined through multiple rounds of user research and iteration.",
    cardDesc:
      "Kryptos's core portfolio management experience, built from the ground up and refined through multiple rounds of user research and iteration.",
    fileLabel: 'kryptos-portfolio.fig — featured',
    topNote: 'Featured case study',
    year: '2026',
    category: 'product',
    roleLine: 'Lead product designer · 0→1',
    featured: true,
    tags: ['Product design', 'Mobile', '0→1'],
    pills: ['Product design', '0→1', '2026'],
    meta: [
      ['Role', 'Product Designer'],
      ['Team', '1 designer (me), 2 engineers, and stakeholders'],
      ['Impact', 'Active 40+ users · Funded by Binance'],
    ],
    overview: [
      'Kryptos is a crypto intelligence and financial management platform that consolidates data from exchanges, wallets, and other sources into a single place. Portfolio management sits at the core of the product: users connect their accounts and wallets, consolidate them into one unified portfolio, and monitor performance and holdings from there. Additional layers — tax reporting, AI-driven insights, and enterprise workflows — are all built on top of this same portfolio data.',
    ],
    ownership: [
      'Research — user interviews, stakeholder discussions, and analysis of support tickets/user feedback',
      'UI design',
      'Prototyping',
      'Usability testing',
      'End-to-end ownership of the design process, from problem discovery to shipped solution',
    ],
    trigger: [
      "Unlike a lot of feature work, this project didn't start as a top-down stakeholder request or a predefined roadmap item. It emerged from joint research — myself and stakeholders looking together at user feedback, support conversations, and direct research into how crypto users actually manage their assets day to day.",
    ],
    hypothesisLabel: 'Working hypothesis',
    hypothesis:
      "If users can see all their crypto data in one place — instead of manually checking multiple exchanges and wallets and cross-referencing between them — they'll trust the product more and use it as their primary source of truth for their portfolio.",
    triggerFollowup: [
      "This wasn't a rigorously tested hypothesis with a control group; it was the directional bet that shaped where I focused research first.",
    ],
    process: [
      'We started by reading tickets rather than guessing. Eleven interviews with people who had done a manual split in the previous month, plus a read of the transfer graph looking for the signature of a faked group: several transfers between the same cluster of people within a short window.',
      'The interviews reframed the problem. Nobody asked for a splitting calculator. What they wanted was to stop being the person who chases friends for money — the social cost of following up was the real pain, and the arithmetic was incidental.',
    ],
    processImages: ['affinity map from 11 interviews', 'early flow sketches'],
    decisionTitle: 'The decision: a shared ledger, not a payment request',
    decision: [
      'The obvious build was a bulk payment request — pick people, split an amount, send. We prototyped it and watched it fail in testing for a specific reason: it put the organiser in the position of invoicing their friends, which is exactly the social cost they wanted to avoid.',
      'So we inverted it. A group is a running ledger that anyone can add an expense to, and it stays open until it nets to zero. The organiser stops being a debt collector and becomes just another participant. We rejected the request-based model even though it was about three weeks cheaper to ship.',
    ],
    solution: [
      'The shipped flow has three moves: create a group from an existing chat thread, drop an expense into it with a photo of the receipt, and settle when someone chooses to. The split defaults to even and can be edited per person, but the default holds for the large majority of expenses, so most people never touch it.',
      'The one screen we spent the most time on is the balance summary. It answers a single question — am I owed, or do I owe, and by how much — before it shows any itemised detail.',
    ],
    solutionImage: 'final group ledger and settle-up screens',
    outcome: [
      'Rolled out to 10% of users for three weeks, then to everyone. The numbers below are illustrative sample figures, not measured results.',
      'The thing I would do differently: we shipped without a way to leave a group that still had an open balance, and it became the top request within days. An obvious gap in hindsight, and one a fourth round of testing would have caught.',
    ],
    stats: [
      ['+34%', 'Group transfers per active user'],
      ['−41%', '“Where did my money go” tickets'],
      ['2.1×', 'Week-4 retention vs. solo-only cohort'],
    ],
  },
  {
    slug: 'one-system-four-surfaces',
    title: 'One system, four surfaces',
    shortTitle: 'One system, four surfaces',
    dek: 'Four teams had quietly built four button components. Consolidating them was less a design problem than a migration problem.',
    cardDesc: 'Four teams had quietly built four button components. Consolidating them was less a design problem than a migration problem.',
    fileLabel: 'design-system.fig — library',
    topNote: 'Design systems case study',
    year: '2025',
    category: 'system',
    roleLine: 'Design systems lead',
    tags: ['Design system', 'Scale'],
    pills: ['Design system', 'Scale', '2025'],
    meta: [
      ['Role', 'Design systems lead'],
      ['Timeline', '6 months, ongoing'],
      ['Team', '3 designers, 6 engineers'],
      ['Tools', 'Figma, Storybook, Chromatic'],
    ],
    problem: [
      'An audit turned up 41 distinct button styles, 17 shades of the same brand blue, and three separate date pickers with three different keyboard behaviours. None of this was anyone’s fault — four product teams had shipped fast under separate roadmaps, and a shared component had never been cheaper than a local one.',
      'The visible symptom was inconsistency. The expensive symptom was accessibility: because each team rebuilt inputs, each team rediscovered focus management and label association independently, and two of the four surfaces failed contrast on their primary action.',
    ],
    process: [
      'I started with the audit rather than a proposal, because the argument for a system is much easier to make with 41 screenshots of the same button than with a manifesto. That audit became the shared artefact that got the four leads into a room.',
      'From there we worked in the order of least resistance: tokens first, then the primitives everyone already agreed on, then the contested components. Colour and spacing tokens were adopted in weeks because they let teams delete code without changing behaviour.',
    ],
    processImages: ['button audit — 41 variants', 'token architecture diagram'],
    decisionTitle: 'The decision: no big-bang migration',
    decision: [
      'There was real appetite for a coordinated cutover — freeze features, migrate everything, unfreeze. I argued against it. A freeze puts the system in competition with every roadmap in the company, and the system loses that fight the first time a launch slips.',
      'Instead each component shipped alongside its old version, with a lint rule that warned on the deprecated import and a dashboard showing per-team adoption. Slower on paper, but adoption never depended on anyone’s permission. Eighteen months on, that call is the reason the system still exists.',
    ],
    solution: [
      'The system is three layers: primitive tokens that name raw values, semantic tokens that name intent, and components that only ever consume semantic tokens. A component is not allowed to reference a hex code, which is what makes theming and the contrast fixes tractable at all.',
      'Every component ships with its Figma variant set, its coded implementation, and its accessibility notes in the same pull request. Documentation that lives apart from the component goes stale, so it doesn’t live apart.',
    ],
    solutionImage: 'component library overview in Figma',
    outcome: [
      'The figures below are illustrative sample numbers. What is worth taking seriously is the shape of the result: the win was in time-to-first-screen and in accessibility defects that stopped recurring, not in visual consistency, which was only ever the presenting symptom.',
      'What I underestimated: the system needed a person, not a process. Adoption stalled twice, both times in a quarter when nobody owned it.',
    ],
    stats: [
      ['41 → 1', 'Button implementations'],
      ['−63%', 'New-screen build time'],
      ['98%', 'WCAG AA contrast compliance'],
    ],
  },
  {
    slug: 'what-the-churn-data-hid',
    title: 'What the churn data hid',
    shortTitle: 'What the churn data hid',
    dek: 'The dashboard said users churned because of price. Eight interviews said something the dashboard could not see.',
    cardDesc: 'The dashboard said accounts churned because of price. Eight interviews said something the dashboard could not see.',
    fileLabel: 'churn-research.fig — research',
    topNote: 'Research-led case study',
    year: '2025',
    category: 'research',
    roleLine: 'UX researcher + designer',
    tags: ['Research', 'B2B'],
    pills: ['UX research', 'B2B', '2025'],
    meta: [
      ['Role', 'UX researcher & designer'],
      ['Timeline', '5 weeks'],
      ['Team', '1 researcher, 1 PM, 2 engineers'],
      ['Tools', 'Figma, Dovetail, Looker'],
    ],
    problem: [
      'A B2B analytics tool was losing about 6% of accounts a month. The exit survey pointed at price, and the roadmap had responded accordingly — a cheaper tier was already scoped and estimated.',
      'Something did not fit. Churn was concentrated in accounts that had upgraded voluntarily, which is a strange population to be price-sensitive. I asked for five weeks before the cheaper tier got built.',
    ],
    process: [
      'Exit surveys are answered by people who have already decided to leave, and “too expensive” is the most socially frictionless box to tick. So I went after the accounts instead: eight interviews with churned admins, and a funnel analysis of what those accounts had done in their final 30 days.',
      'The funnel told the story before the interviews confirmed it. Churned accounts had normal login activity and near-zero report-sharing activity. They were using the product, but only ever alone.',
    ],
    processImages: ['churn funnel — sharing vs. retention', 'interview theme clusters'],
    decisionTitle: 'The decision: kill the cheaper tier',
    decision: [
      'The interviews were consistent. Admins bought the tool to answer their team’s questions, could not get anyone else to open a report, and eventually could not justify a line item that only they used. Price was the language they used for a value problem: the tool had never become visible to anyone but the buyer.',
      'A cheaper tier would have made that failure cheaper, not rarer — and permanently lowered revenue on the healthy accounts too. We cancelled it and spent the quarter on making a report shareable in one click to someone without an account.',
    ],
    solution: [
      'The work reduced to one flow: sending a report to a colleague who has never logged in. That meant a view-only public link with no signup wall, a preview that renders in the message before anyone clicks, and a prompt to the admin at the moment a report is first saved rather than buried in settings.',
      'None of it is visually interesting, which is part of the point. The research reframed a pricing project as a distribution project, and the design work that followed was deliberately small.',
    ],
    solutionImage: 'share flow and recipient view',
    outcome: [
      'Sample figures below, illustrative only. The durable outcome was methodological: the exit survey stayed in place but stopped being treated as a cause, and every subsequent churn question started from behavioural data.',
      'The honest caveat: eight interviews is a small base, and we were fortunate that the funnel analysis pointed the same direction. Had the two disagreed, five weeks would not have been enough to resolve it.',
    ],
    stats: [
      ['6% → 3.4%', 'Monthly account churn'],
      ['3.8×', 'Reports shared per account'],
      ['1 quarter', 'Discount tier avoided'],
    ],
  },
]

/** Projects with no write-up yet — rendered as non-clickable cards on /work. */
export const archivedProjects = [
  {
    shortTitle: 'Ops console v2',
    roleLine: 'Product designer',
    year: '2024',
    category: 'product',
    tags: ['Web app', 'Dashboard'],
  },
  {
    shortTitle: 'Fieldnote identity',
    roleLine: 'Personal project',
    year: '2024',
    category: 'personal',
    tags: ['Branding', 'Side project'],
  },
  {
    shortTitle: 'Referral loop teardown',
    roleLine: 'Product designer',
    year: '2023',
    category: 'product',
    tags: ['Product design', 'Growth'],
  },
]

export const workFilters = [
  { key: 'all', label: 'All' },
  { key: 'product', label: 'Product design' },
  { key: 'system', label: 'Design systems' },
  { key: 'research', label: 'Research' },
  { key: 'personal', label: 'Personal' },
]

/* ---------------- How I use AI ---------------- */

export const aiStack = [
  { role: 'Research', name: 'Claude', body: 'Synthesizing interview notes, spotting patterns across research, first-draft user stories.' },
  { role: 'Prototyping', name: 'Figma AI', body: 'Turning rough wireframes into higher-fidelity explorations faster, without skipping the thinking.' },
  { role: 'Copy', name: 'Claude / ChatGPT', body: 'Drafting UI copy and microcopy variants to react to — a starting point, never shipped untouched.' },
  { role: 'Dev handoff', name: 'v0 / Claude Code', body: 'Quick functional prototypes so engineers can feel an interaction, not just read a spec.' },
]

export const aiFlow = [
  {
    title: 'Synthesizing research',
    body: 'After a round of interviews I paste anonymised transcripts in and ask for candidate themes with the supporting quotes attached. The quotes are the point: a theme I can’t trace back to something someone actually said gets dropped. I still do my own pass first, then compare — where the model and I disagree is usually where the interesting ambiguity is.',
  },
  {
    title: 'Exploring more directions, faster',
    body: 'Early on, the constraint is rarely quality — it’s how many genuinely different directions I can afford to sketch before I commit. I’ll ask for eight approaches to a flow, throw out six immediately, and usually find that one of the remaining two is something I wouldn’t have reached on my own. The bad options are cheap and they still narrow the space.',
  },
  {
    title: 'Stress-testing a decision',
    body: 'Before a design review I ask for the strongest argument against the thing I’m about to present, and for the edge cases I’ve probably skipped — empty states, slow networks, the user who has 400 of something. It’s much less painful to hear a weak spot from a model on Tuesday than from a staff engineer on Wednesday.',
  },
  {
    title: 'Closing the gap to engineering',
    body: 'For anything with real interaction behaviour — drag ordering, optimistic updates, a multi-step form that can fail halfway — I build a working prototype instead of annotating a static frame. Engineers can open it, break it, and tell me what I got wrong about the states, which is a much faster conversation than a spec document.',
  },
]

export const aiCaveats = [
  { title: 'Taste and final calls', body: 'AI widens the option set; it has no stake in the outcome. Deciding which of eight directions is actually right for this product and these users is a judgement call, and I’d rather own a wrong one than inherit an unowned one.' },
  { title: 'Talking to real users', body: 'Synthesis can be assisted. The interview itself can’t. Most of what I learn in a session is in the hesitation before the answer, and none of that survives into a transcript.' },
  { title: 'Anything shipped without review', body: 'Nothing generated reaches a user without me reading every word of it. This is less about quality than accountability: if it ships under my name, I have to be able to defend each decision in it.' },
  { title: 'The strategic “why”', body: 'Choosing which problem is worth a quarter of the team’s time depends on context that mostly isn’t written down — politics, history, what we tried in 2023. That’s the part of the work I’d least want automated.' },
]

export const aiQuote =
  'AI has made it much cheaper to produce work, and no cheaper at all to know whether the work is right. The second part is still the job.'
