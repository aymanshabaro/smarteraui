---
slug: properui-landing-port
status: shipped
origin: chat
originator: aymanshabaro@gmail.com
created: 2026-09-11
updated: 2026-09-11
approved_by: aymanshabaro (chat instruction, 2026-09-11 — the instruction itself was a complete,
    self-contained spec/plan; see spec.md and plan.md, which record it rather than re-deriving it)
---

# Intent — port the supplied landing page design onto apps/docs

**What:** replace `apps/docs`'s current homepage (`app/page.tsx` + `components/landing/*`) with a
faithful port of a supplied static design (`site/index.html` + `styles.css` + `script.js`,
handed off in `CLAUDE_IMPLEMENTATION.md`), reusing the supplied real product-logo SVGs verbatim.

**Why:** the author supplied a finished landing-page design (copy, layout, agent-setup flow,
verified product numbers) to replace the current marketing homepage, with an explicit
implementation brief: port faithfully, do not redesign, ask before any material product/copy/
visual change, and fix only one verified factual error (`add button` → `add buttons` in the
install command — `button` is not a registry entry).

**How:** single Sonnet session, no sub-agents (explicit instruction), no git commands (explicit
instruction). Highest-risk part: `styles.css` has page-global selectors (`:root`, `*`, `html`,
`body`, `a`, …) that would leak into the rest of the Tailwind v4 docs site if imported naively —
these had to be scoped under one wrapper class without changing the visual result.

**Out of scope:** any product/copy/visual change beyond the one verified factual fix; changing the
root layout, the docs' theme tokens, or any other route.
