---
slug: properui-landing-port
status: complete
updated: 2026-09-11
---

# Proof

## Build / type-check / lint / format

```
$ pnpm -F docs type-check
> docs@0.0.0 type-check
> tsc --noEmit
(no output — clean)

$ pnpm -F docs lint
> docs@0.0.0 lint
> eslint app components lib
(no output — clean; one eslint-disable pair was added in setup-dialog.tsx for the
 backdrop-click-to-close handler on the <dialog> element itself, with a comment explaining why)

$ pnpm exec prettier --check apps/docs packages/registry/src/build.ts
Checking formatting...
All matched files use Prettier code style!

$ pnpm exec turbo run build --filter=docs...
...
docs:build:  ✓ Compiled successfully in 26.9s
docs:build:    Generating static pages (2660/2660)
 Tasks:    2 successful, 2 total
```

**Note on `pnpm exec prettier --check .` (repo-wide):** this currently reports ~586 pre-existing
files under `packages/ui/src/components/**` with import-order issues
(`@trivago/prettier-plugin-sort-imports`) — none of them touched by this change, none of them
under `apps/docs`. Spot-checked one (`testimonial-simple-centered-01.tsx`): a real, pre-existing
import-order mismatch unrelated to the landing page. Flagged separately rather than fixed here
(586 unrelated files is out of scope for a landing-page port); see the spawned follow-up task.

## Visual regression

macOS run (`pnpm visual:check`, this machine): all 106 captures reported "CHECK" — expected per
`tests/visual/README.md`, which documents 2.8–9.42% noise on **every** route from macOS-vs-Linux
font rasterization differences alone, with zero code changes. Not treated as a verdict.

Linux run (source of truth, `mcr.microsoft.com/playwright:v1.63.0-noble`, following
`tests/visual/README.md`'s documented container procedure exactly — build on host, install +
build + `pnpm visual:check` inside the container against the host-built site):

```
visual:check — 4/106 capture(s) failed. Diff images in tests/visual/.diff/
```

All 4 failures are `home/*` (desktop-light 9.71%, desktop-dark 93.85%, mobile-light 13.26%,
mobile-dark 88.63%) — expected, since the homepage's design changed entirely and is intentionally
not theme-aware (large dark-mode diff is the old theme-aware homepage vs. the new fixed-light
one, not a bug). **All other 102 captures: 0.00% differing pixels, exact match.** No CSS leak.

Additional leak check (network-level, not just pixel diff): on a non-home route
(`/docs/introduction`), the response HTML never references the landing stylesheet chunk, and
`.pui-landing` never appears in its markup — confirmed via `curl` + `grep`. The home route's own
response references three CSS chunks; only one of the three (verified by fetching it directly)
contains `.pui-landing` rules. Next's per-route CSS splitting means non-home routes never even
download the file, independent of the selector-scoping itself.

## Live browser verification (this session's sandboxed browser pane)

- Desktop 1280 and mobile 390: `document.documentElement.scrollWidth === clientWidth` at both
  (no horizontal overflow). Screenshots at both widths visually match the supplied design.
- `get_page_text` against the rendered page: full body copy matches the source exactly, including
  the corrected install command (`add buttons input select`) and the registry-derived numbers
  (797 / 69 / 679 / 0, and 19 / 32 / 18 / 233, and "118 axe suites").
- All 21 links/anchors enumerated and checked against the source's hrefs — exact match (`#top`,
  `#agents`, `#examples`, `#system`, `#install`, the GitHub/npm/license URLs).
- Copy button: clicked with a mocked `navigator.clipboard.writeText` — writes the exact install
  command, label flips to "Copied", reverts to "Copy" after ~1600ms.
- All 4 setup-dialog variants (claude/codex/cursor/lovable): open with correct name/title/
  copy-value/logo/step-count (3 steps each) for each platform.
- Native `<dialog>` confirmed (`tagName === "DIALOG"`) — Escape-to-close and focus-trap are
  browser-guaranteed for this element, not re-implemented in JS.
- Focus lands inside the dialog on open (`dialog.contains(document.activeElement)` — true).
- Backdrop click (event target === the `<dialog>` element itself) closes it — true.
- **Bug found and fixed:** closing a dialog (Escape/backdrop/× button) and then re-clicking the
  _same_ platform's trigger originally did nothing (see spec.md's "decisions" section for why).
  Fixed; re-verified for all 4 variants after the fix — each opens, closes, and reopens correctly.
- JSON-LD block present with exact supplied content; `<link rel="canonical" href="https://properui.dev">`;
  `<link rel="icon" href="/favicon.svg">`; meta description matches the supplied page's.

## Deletion safety

Repo-wide grep before deleting: no file outside `apps/docs/components/landing/` and
`apps/docs/app/page.tsx` imported any of the deleted `landing-*.tsx` files or `content.ts`
(one stale _comment_ in `packages/registry/src/build.ts` named `content.ts`'s path — updated to
name `stats.ts` instead, since that comment is now inaccurate otherwise).
