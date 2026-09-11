---
slug: properui-landing-port
status: approved
updated: 2026-09-11
approved_by: aymanshabaro (chat instruction, 2026-09-11)
---

# Spec

Source design (read in full before any code was written):
`properui-landing-claude/{README.md,CLAUDE_IMPLEMENTATION.md,site/{index.html,styles.css,script.js,claude.svg,codex.svg,cursor.svg,lovable.svg,favicon.svg}}`.

## Requirements

1. **Visual result equivalent** to the supplied static page at desktop (1280) and mobile (390),
   no horizontal overflow, no redesign.
2. **Reuse the real SVG marks verbatim** (`claude.svg`, `codex.svg`, `cursor.svg`, `lovable.svg`,
   `favicon.svg`) — do not substitute generic icons.
3. **Script behaviour ported to React:**
    - every copy control copies to clipboard, shows "Copied" for 1600ms, falls back to
      "Select & copy" on failure (native `[data-copy]` buttons in the source);
    - the step-by-step setup dialog (4 variants: claude/codex/cursor/lovable) — native `<dialog>`
      or an equally accessible dialog, Escape closes it, focus is visible and contained;
    - Lovable's card stays a URL-to-copy-into-Project-Knowledge, never a CLI command (it cannot
      read local skill files) — the one hard content distinction the brief calls out by name.
4. **One factual fix, and only one:** the install command's `add button` → `add buttons`
   (`button` is not a registry entry; `input` and `select` are). Applied to both the visible
   `<code>` and the copied value. No other copy/product claim in the source was found to be wrong.
5. **CSS must not leak.** `apps/docs` is Tailwind v4 with its own semantic token system and 25
   other routes with a committed visual baseline (`pnpm visual:check`). The source stylesheet's
   page-global selectors (`:root`, `*`, `html`, `body`, `a`, `button, a, summary`) must be scoped
   so **only** the new route is affected. The source page's colors are fixed light (not
   theme-aware) — the docs `ThemeProvider`'s dark mode must not be able to partially apply to it.
6. **Delete now-unused old landing components**, but only after confirming nothing else in the
   repo imports them.
7. **Metadata:** keep the existing `Metadata`-object mechanism in `page.tsx`, update
   title/description to the supplied page's, port the JSON-LD `SoftwareSourceCode` block, keep
   canonical `https://properui.dev/`.
8. **Numbers from the registry, not hand-typed**, mirroring the old `content.ts`'s approach:
   read `packages/registry/dist/stats.json` rather than hard-coding 797/69/679/19/32/18/233/118 —
   except "0 detected axe violations", which is not a stats.json field (it is definitionally zero
   whenever the axe suites pass) and stays a literal `0`.

## Decisions made during implementation (not pre-specified, recorded here for the next reader)

- **CSS scoping approach:** wrap the whole page in one `<div className="pui-landing">`, prefix
  all ~350 rules in `styles.css` with `.pui-landing ` (a small Node/postcss script did this
  mechanically — see `apps/docs/components/landing/landing.css`'s header comment for the exact
  rules), fold `:root` custom properties and `body` declarations onto `.pui-landing` itself, and
  rewrite `html { scroll-behavior; scroll-padding-top }` (including its
  `prefers-reduced-motion` override) as `:root:has(.pui-landing) { … }` so it only ever applies
  while this route is mounted. The stylesheet is imported only from `page.tsx`, so Next's
  per-route CSS chunking means non-home routes never even fetch it — verified over the network,
  not just asserted (see proof.md).
- **Dark-mode containment:** the ported CSS never uses the docs' semantic Tailwind tokens
  (`bg-primary`, `text-primary`, `dark:` variants); every color is the source's own hardcoded hex/
  rgb value scoped under `.pui-landing`. The docs' `.dark-mode` class (which swaps
  `--color-bg-primary` etc.) has no effect because nothing in the landing page's CSS or markup
  reads those custom properties — confirmed by inspecting `packages/ui/src/styles/theme.css`'s
  `.dark-mode { … }` block and grepping the new landing files for `bg-primary`/`text-primary`/
  `dark:` (none found).
- **Dialog implementation:** native `<dialog>` (not a React Aria dialog) — the source CSS
  targets `.setup-dialog[open]`, `.setup-dialog::backdrop` and relies on native focus-trap +
  Escape-to-close, all of which a real `<dialog>` gives for free with zero CSS changes.
- **Bug found and fixed during testing (not in the original script.js's scope, but a correctness
  requirement of "port the behaviour faithfully"):** an initial React implementation keyed the
  `showModal()` effect on `guideKey` alone, so re-clicking the _same_ platform's trigger after
  closing the dialog did nothing (state didn't change value, so the effect didn't re-fire). Fixed
  with an ever-incrementing `openToken` the effect is keyed on instead — see
  `apps/docs/components/landing/setup-dialog.tsx`.
