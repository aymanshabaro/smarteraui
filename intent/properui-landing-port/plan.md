---
slug: properui-landing-port
status: approved
updated: 2026-09-11
approved_by: aymanshabaro (chat instruction, 2026-09-11)
---

# Plan (executed; recorded after the fact — see proof.md for what actually ran)

Single Sonnet session, no sub-agents, no git. Self-contained: an engineer who has never seen the
chat can redo this from this file plus spec.md.

## Files

**Added**

- `apps/docs/components/landing/landing.css` — the supplied `styles.css`, scoped under
  `.pui-landing` (see spec.md's "CSS scoping approach").
- `apps/docs/components/landing/stats.ts` — registry-derived numbers (replaces `content.ts`).
- `apps/docs/components/landing/copy-button.tsx` — client component, ports `[data-copy]` behavior.
- `apps/docs/components/landing/setup-guides.ts` — the four platforms' guide data, ported from
  `script.js`'s `setupGuides` object, copy unchanged.
- `apps/docs/components/landing/setup-dialog.tsx` — client component, native `<dialog>`.
- `apps/docs/components/landing/agent-platforms.tsx` — client component: the 4 platform cards,
  "set up every agent" command, "how it works" strip, and the shared dialog they open.
- `apps/docs/components/landing/brand-mark.tsx` — the wordmark glyph (header + inverted footer).
- `apps/docs/public/{claude,codex,cursor,lovable,favicon}.svg` — copied verbatim from the source.

**Rewritten**

- `apps/docs/app/page.tsx` — full port of `index.html`'s body, `Metadata` export updated to the
  supplied page's title/description, JSON-LD block ported, `icons: { icon: "/favicon.svg" }`
  added to this route's metadata only (the docs site had no favicon at all before this).

**Deleted** (confirmed via repo-wide grep that nothing else imports them first)

- `apps/docs/components/landing/{content.ts,landing-agents.tsx,landing-cta.tsx,landing-faq.tsx,
  landing-features.tsx,landing-footer.tsx,landing-header.tsx,landing-hero.tsx,landing-layers.tsx,
  landing-logo.tsx,landing-metrics.tsx,landing-theming.tsx}`.

**Edited**

- `packages/registry/src/build.ts` — one comment updated (`content.ts` → `stats.ts`) since the
  comment named the file this plan deletes.

**Untouched, deliberately**

- `apps/docs/app/layout.tsx` — no change needed; body classes/ThemeProvider/RouterProvider stay.

## Order

1. Read every supplied source file in full (HTML/CSS/JS + both briefs).
2. Read the current `page.tsx`, `layout.tsx`, and all `components/landing/*` to know the delta.
3. Grep the whole repo for imports of each `landing-*` file and `content.ts` before deleting
   anything.
4. Copy the SVGs into `apps/docs/public/` verbatim.
5. Write a small Node/postcss script to scope `styles.css` mechanically (hand-transforming ~350
   rules is error-prone); special-case `:root`/`body`/`html`/`*`/`a`/`button,a,summary`; rename
   `@keyframes dialog-in` to avoid collisions. Run it, `prettier --write` the result, spot-check.
6. Build the React components (data files first, then leaf client components, then the page).
7. Delete the old landing components.
8. Fix the one factual error in the install command.
9. Run every check in spec.md's requirement 1, fix what fails, re-run.

## Tests / verification

- `pnpm -F docs type-check`, `pnpm -F docs lint`, `pnpm exec prettier --check .`,
  `pnpm exec turbo run build --filter=docs...`.
- `pnpm visual:check` — expect only `home/*` to differ; every other route must be unchanged.
  Known limitation (documented in `tests/visual/README.md`): this always shows noise on every
  route when run on macOS, so also verified with the Linux baseline via
  `mcr.microsoft.com/playwright:v<version>-noble` per that README's documented procedure.
- Live browser check (both 1280 and 390 widths): no horizontal overflow, every link, every copy
  button (via a headless clipboard mock + DOM assertions, since the sandboxed browser pane
  couldn't be driven interactively in this session), all 4 dialog variants, reopening the same
  dialog after closing it, backdrop-click-to-close, native-`<dialog>` Escape/focus guarantees.

## Risks

- **CSS leak into the other 25 routes** — mitigated by scoping (spec.md) and verified two ways:
  network-request inspection (the landing stylesheet is a separate chunk Next only loads for `/`)
  and the Linux `visual:check` baseline (0.00% diff on every non-home route).
- **Dark mode half-applying to a fixed-light design** — mitigated by never using the docs'
  semantic tokens in the ported CSS; verified by grep.
- **Registry numbers drifting from the real count** — mitigated by reading
  `packages/registry/dist/stats.json` instead of hard-coding.
