# Good first issues

A seeded list of real, scoped tasks — each one checked against the current state of the repo, not
imagined. Pick one, open an issue using the "Good first issue" template (or comment on the tracking
issue if a maintainer has already opened one for this list), and follow
[CONTRIBUTING.md](../CONTRIBUTING.md).

Every task below names exact files and an exact verification command. If the repo has moved on since
this list was written and a task no longer applies, say so in the issue instead of forcing it.

## How the manifest tasks work

`packages/registry/manifest/<layer>/<name>.json` files are hand-authored metadata merged into the
built registry (`packages/registry/dist/index.json`) by `packages/registry/src/build.ts`. They are
**optional** — an entry with no manifest file still builds fine, just without the richer fields — so
adding one is additive and cannot break an existing consumer.

The schema (see `packages/registry/src/build.ts`, `SemanticManifest` type, and any file under
`packages/registry/manifest/base/` or `packages/registry/manifest/application/` for a worked
example — `packages/registry/manifest/application/table.json` is a good one to copy the shape from):

```json
{
    "intent": "One sentence: what this component/section is for.",
    "avoid_when": ["a situation where a different component is the better choice", "..."],
    "composes_with": ["other-registry-names", "this-one-is-typically-used-with"],
    "a11y_contract": ["what the component gets for free from React Aria, and what the caller still owns"],
    "responsive_contract": ["how it behaves across breakpoints, if that's non-obvious"],
    "requires_data": ["what data/props the caller must supply for it to render meaningfully"]
}
```

All fields are optional; write the ones that are actually true. `responsive_contract` is the one
most entries omit — only add it if there's a real breakpoint-driven behavior change to document.

**To verify a manifest task:** run `pnpm registry:build` and confirm the new fields appear on the
matching entry in `packages/registry/dist/index.json` (`grep -A5 '"name": "<name>"' packages/registry/dist/index.json`),
then `pnpm exec prettier --check packages/registry/manifest/<layer>/<name>.json`.

Verified gap, repo-wide: `packages/registry/manifest/` currently has only `base/` (19 files) and
`application/` (32 files) subdirectories — confirmed with `ls packages/registry/manifest/`. The
`marketing` (18 groups), `foundations` (9 groups) and `shared-assets` (6 groups) layers have zero
manifest files, confirmed by grepping `"intent"` for each name in `packages/registry/dist/index.json`
and finding `null`. Every task in the first three sections below is one of those gaps.

---

## Marketing section manifests (18 tasks)

Each of these is a family of ready-made marketing page sections in `packages/ui/src/components/marketing/<name>/`,
registered in the CLI/registry but with no semantic metadata — an AI assistant or a human skimming
the registry JSON gets a bare list of variant names and no guidance on when to reach for one.

### 1. `banners`

**Files:** new `packages/registry/manifest/marketing/banners.json`
**Context:** Dismissible top-of-page strips — countdown, dual-action, single-action, slim, and
text-field variants, each in `-brand`/`-default` and `-full-width`/contained flavors
(`packages/ui/src/components/marketing/banners/banner-*.tsx`). Composes with `buttons`, `form`,
`input`, `featured-icon` per the derived `composes_with` already in the registry.
**Verify:** `pnpm registry:build`, then check the `banners` entry in `packages/registry/dist/index.json` has a non-null `intent`.

### 2. `blog-sections`

**Files:** new `packages/registry/manifest/marketing/blog-sections.json`
**Context:** Blog listing headers and layouts — alt layouts, featured-post headers, sidebar headers,
carousel and split blog sections (`packages/ui/src/components/marketing/blog-sections/blog-*.tsx`).
**Verify:** `pnpm registry:build`; confirm `blog-sections` has `intent` in `packages/registry/dist/index.json`.

### 3. `careers-sections`

**Files:** new `packages/registry/manifest/marketing/careers-sections.json`
**Context:** Job-listing cards and careers page sections in four numbered variants, each with a
`-brand` counterpart (`packages/ui/src/components/marketing/careers-sections/careers-*.tsx`).
**Verify:** `pnpm registry:build`; check the entry's `intent` field.

### 4. `contact-sections`

**Files:** new `packages/registry/manifest/marketing/contact-sections.json`
**Context:** Contact page sections — form-and-image, form-and-map, icon-cards, and map-only layouts
(`packages/ui/src/components/marketing/contact-sections/contact-*.tsx`). Registry already derives
`composes_with: [badges, buttons, checkbox, countries, form, input, select, social-icons, textarea]`.
**Verify:** `pnpm registry:build`; check `intent` on the `contact-sections` entry.

### 5. `content-rich-text-sections`

**Files:** new `packages/registry/manifest/marketing/content-rich-text-sections.json`
**Context:** Long-form content layouts for docs/blog bodies — alternating layout, large-image, and
rich-text section variants (`packages/ui/src/components/marketing/content-rich-text-sections/content-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 6. `cta-sections`

**Files:** new `packages/registry/manifest/marketing/cta-sections.json`
**Context:** Call-to-action blocks — abstract-image, card (horizontal/vertical), iPhone-mockup,
screen-mockup, simple, split-image, and split-image-with-quote variants
(`packages/ui/src/components/marketing/cta-sections/cta-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 7. `faq-sections`

**Files:** new `packages/registry/manifest/marketing/faq-sections.json`
**Context:** FAQ accordions and simple Q&A layouts, four numbered variants each with a `-brand`
counterpart (`packages/ui/src/components/marketing/faq-sections/faq-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 8. `features-sections`

**Files:** new `packages/registry/manifest/marketing/features-sections.json`
**Context:** Feature-highlight layouts — alternating, center-mockup, icon-cards, icons-and-image,
icons-and-mockup, integrations, large-screen-mockup, and tabs-mockup variants
(`packages/ui/src/components/marketing/features-sections/features-*.tsx`). This is the largest
marketing group (dozens of files) — worth being precise about `avoid_when` (e.g. "more than ~6
features" points elsewhere).
**Verify:** `pnpm registry:build`; check `intent`.

### 9. `footers`

**Files:** new `packages/registry/manifest/marketing/footers.json`
**Context:** Site footers in large (16 numbered variants) and small (4 numbered variants) sizes,
each with a `-brand` counterpart (`packages/ui/src/components/marketing/footers/footer-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 10. `header-navigations`

**Files:** new `packages/registry/manifest/marketing/header-navigations.json`
**Context:** Site header/nav bars — 2/3/4-column, dropdown mega-menus, and floating variants, with
shared pieces in `header-navigations/base-components/`
(`packages/ui/src/components/marketing/header-navigations/*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 11. `header-sections`

**Files:** new `packages/registry/manifest/marketing/header-sections.json`
**Context:** Page-top header sections — centered, left-aligned, space-between layouts, each with
buttons/email/search/tabs sub-variants and `-brand` counterparts
(`packages/ui/src/components/marketing/header-sections/header-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 12. `hero-header-sections`

**Files:** new `packages/registry/manifest/marketing/hero-header-sections.json`
**Context:** Above-the-fold hero sections — abstract-angles, card-mockup, color-card, geometric-shapes,
iPhone/screen-mockup, simple-text, and split-form/split-image variants
(`packages/ui/src/components/marketing/hero-header-sections/hero-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 13. `metrics-sections`

**Files:** new `packages/registry/manifest/marketing/metrics-sections.json`
**Context:** Stat/KPI display sections — card, image-with-cards, minimal-centered-text,
accent-line, and split-image variants, several with `-brand` counterparts
(`packages/ui/src/components/marketing/metrics-sections/metrics-*.tsx`). `avoid_when` should point at
the `metrics` **application** component (`packages/ui/src/components/application/metrics`) for
dashboard/product-UI stat tiles, since this marketing group is for landing pages.
**Verify:** `pnpm registry:build`; check `intent`.

### 14. `newsletter-cta-sections`

**Files:** new `packages/registry/manifest/marketing/newsletter-cta-sections.json`
**Context:** Email-capture CTA blocks — card (horizontal/vertical), iPhone/screen-mockup, and simple
layouts (`packages/ui/src/components/marketing/newsletter-cta-sections/newsletter-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 15. `pricing-sections`

**Files:** new `packages/registry/manifest/marketing/pricing-sections.json`
**Context:** Pricing tables and cards — abstract-angles, dual-action, gray-badge, large-table,
primary-card, and featured/simple card sections
(`packages/ui/src/components/marketing/pricing-sections/pricing-*.tsx`). Registry already derives
`composes_with: [badges, buttons, featured-icon, slider, tabs, toggle, tooltip]` — a real `intent`/`avoid_when`
pair adds a lot here since there are ~30 files in this group.
**Verify:** `pnpm registry:build`; check `intent`.

### 16. `social-proof-sections`

**Files:** new `packages/registry/manifest/marketing/social-proof-sections.json`
**Context:** Logo walls and press-mention strips — card, full-width (plain/dual/masked), and press
variants, several with `-brand` counterparts
(`packages/ui/src/components/marketing/social-proof-sections/social-proof-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 17. `team-sections`

**Files:** new `packages/registry/manifest/marketing/team-sections.json`
**Context:** "Meet the team" sections — image-card, image-collage, image-glass, and simple layouts
(`packages/ui/src/components/marketing/team-sections/team-section-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

### 18. `testimonial-sections`

**Files:** new `packages/registry/manifest/marketing/testimonial-sections.json`
**Context:** Customer-quote sections — abstract-image, card (with `-brand` and split-image variants),
case-study cards, glassmorphic cards, simple-centered/left-aligned, social cards, and split-image
(`packages/ui/src/components/marketing/testimonial-sections/testimonial-*.tsx`).
**Verify:** `pnpm registry:build`; check `intent`.

---

## Foundations manifests (5 tasks, covering all 9 foundations groups)

`packages/registry/manifest/foundations/` does not exist yet — none of the 9 foundations entries in
the registry (`dot-icon`, `featured-icon`, `integration-icons`, `logo`, `payment-icons`,
`play-button-icon`, `rating`, `social-icons`, `typography`) have a manifest, confirmed by grepping
each name's `intent` field in `packages/registry/dist/index.json` (all `null`).

### 19. `featured-icon`

**Files:** new `packages/registry/manifest/foundations/featured-icon.json`
**Context:** A small square/circle icon container with color and size variants, used as a visual
anchor above headings in marketing sections and empty states
(`packages/ui/src/components/foundations/featured-icon/featured-icon.tsx`). Registry derives
`composes_with: [cx, is-react-component]`.
**Verify:** `pnpm registry:build`; check `intent` on `featured-icon`.

### 20. `rating`

**Files:** new `packages/registry/manifest/foundations/rating.json`
**Context:** Two display-only rating primitives — `rating-stars.tsx` (star row) and `rating-badge.tsx`
(numeric badge) — used inside testimonial and content sections
(`packages/ui/src/components/foundations/rating/`).
**Verify:** `pnpm registry:build`; check `intent` on `rating`.

### 21. `typography`

**Files:** new `packages/registry/manifest/foundations/typography.json`
**Context:** The type-scale reference (`display-2xl` down through the text sizes) shown only as a
demo page — `packages/ui/src/components/foundations/typography/typography.demo.tsx` is the only file
in this group (no `.tsx` component, no story, no test — see task 32 below for the separate gap in
test/story coverage).
**Verify:** `pnpm registry:build`; check `intent` on `typography`.

### 22. `dot-icon` + `play-button-icon`

**Files:** new `packages/registry/manifest/foundations/dot-icon.json` and
`packages/registry/manifest/foundations/play-button-icon.json`
**Context:** Two tiny single-file SVG primitives —
`packages/ui/src/components/foundations/dot-icon.tsx` (a status dot) and
`packages/ui/src/components/foundations/play-button-icon.tsx` (a video-overlay play button, used by
`video-player` and `testimonial-sections`). Small enough to do both manifests in one PR.
**Verify:** `pnpm registry:build`; check `intent` on both `dot-icon` and `play-button-icon`.

### 23. Icon-set foundations: `integration-icons`, `logo`, `payment-icons`, `social-icons`

**Files:** new `packages/registry/manifest/foundations/integration-icons.json`,
`packages/registry/manifest/foundations/logo.json`,
`packages/registry/manifest/foundations/payment-icons.json`,
`packages/registry/manifest/foundations/social-icons.json`
**Context:** Four flat collections of brand-mark SVG components — `integration-icons` (17 files:
ChatGPT, Claude, Figma, GitHub, Next.js, React, Vite, etc.), `logo` (the Proper UI wordmark, 2 files),
`payment-icons` (57 files — Visa/Mastercard/etc.), `social-icons` (23 files — X, LinkedIn, etc.), all
under `packages/ui/src/components/foundations/<name>/`. Same shape of task four times over — a
newcomer can do one or all four in a single PR.
**Verify:** `pnpm registry:build`; check `intent` on each of the four entries.

---

## Shared-assets manifests (6 tasks)

`packages/registry/manifest/shared-assets/` does not exist yet either — same verification method as
above, all 6 entries confirmed `intent: null` in `packages/registry/dist/index.json`.

### 24. `background-patterns`

**Files:** new `packages/registry/manifest/shared-assets/background-patterns.json`
**Context:** Decorative SVG backgrounds — `circle.tsx`, `grid.tsx`, `grid-check.tsx`, `square.tsx`
(`packages/ui/src/components/shared-assets/background-patterns/`). Registry derives
`composes_with: [cx]`; a real `avoid_when` should note these are purely decorative and carry no
semantics of their own (screen readers should never see them).
**Verify:** `pnpm registry:build`; check `intent` on `background-patterns`.

### 25. `credit-card`

**Files:** new `packages/registry/manifest/shared-assets/credit-card.json`
**Context:** A stylized credit-card illustration with network icons
(`packages/ui/src/components/shared-assets/credit-card/credit-card.tsx` + `icons.tsx`), used in
`radio-buttons` payment-method demos and marketing hero/header sections.
**Verify:** `pnpm registry:build`; check `intent` on `credit-card`.

### 26. `illustrations`

**Files:** new `packages/registry/manifest/shared-assets/illustrations.json`
**Context:** Four decorative illustration components — `box.tsx`, `cloud.tsx`, `credit-card.tsx`,
`documents.tsx` (`packages/ui/src/components/shared-assets/illustrations/`) — used in empty states
and marketing content sections.
**Verify:** `pnpm registry:build`; check `intent` on `illustrations`.

### 27. `mockups`

**Files:** new `packages/registry/manifest/shared-assets/mockups.json`
**Context:** A single iPhone device-frame component,
`packages/ui/src/components/shared-assets/mockups/iphone-mockup.tsx`, used throughout the
`hero-header-sections`, `cta-sections`, and `newsletter-cta-sections` marketing groups to frame a
screenshot. See task 31 below for the separate gap in this group's test coverage.
**Verify:** `pnpm registry:build`; check `intent` on `mockups`.

### 28. `qr-code`

**Files:** new `packages/registry/manifest/shared-assets/qr-code.json`
**Context:** A single QR-code display component,
`packages/ui/src/components/shared-assets/qr-code/qr-code.tsx`.
**Verify:** `pnpm registry:build`; check `intent` on `qr-code`.

### 29. `section-divider`

**Files:** new `packages/registry/manifest/shared-assets/section-divider.json`
**Context:** The smallest component in the library — a horizontal rule wrapped in the container
max-width (`packages/ui/src/components/shared-assets/section-divider.tsx`, 12 lines). Good first PR
for someone who wants to see the manifest → registry pipeline work end-to-end without also reading a
large component.
**Verify:** `pnpm registry:build`; check `intent` on `section-divider`.

---

## Missing demo/story/test coverage (4 tasks)

Every other component in `base` and `application` ships all three of `<name>.demo.tsx`,
`<name>.story.tsx`, `<name>.test.tsx` — verified by running, for every folder under
`packages/ui/src/components/base/*/` and `packages/ui/src/components/application/*/`:
`ls <folder>/*.demo.tsx <folder>/*.story.tsx <folder>/*.test.tsx`. These four groups are the
exceptions.

### 30. `base/form` has no demo, story, or test

**Files:** new `packages/ui/src/components/base/form/form.demo.tsx`,
`packages/ui/src/components/base/form/form.story.tsx`,
`packages/ui/src/components/base/form/form.test.tsx`
**Context:** `Form`, `FormField`, and `HookForm` are exported from the public API
(`packages/ui/src/index.ts` lines 47–48: `export { Form } from "./components/base/form/form"` and
`export { FormField, HookForm } from "./components/base/form/hook-form"`) and already have a
hand-authored manifest (`packages/registry/manifest/base/form.json`), but ship with zero test
coverage, no Storybook story, and no demo export — so there's also no docs page for it (no
`apps/docs/content/components/form*.mdx` exists). Follow the four-file pattern in
`packages/ui/src/components/base/checkbox/` (a similarly small base component) as a template: an
`axe` pass over each demo export per `CONTRIBUTING.md`'s accessibility section, plus assertions that
`Form` renders its children and that `HookForm`/`FormField` wire up `react-hook-form` validation
errors.
**Verify:** `pnpm test --filter @properui/ui -- form` (or `pnpm --filter @properui/ui exec vitest run src/components/base/form`), plus `pnpm storybook` and confirm a "Form" story appears in the sidebar.

### 31. `base/file-upload-trigger` has no demo, story, or test

**Files:** new `packages/ui/src/components/base/file-upload-trigger/file-upload-trigger.demo.tsx`,
`.story.tsx`, `.test.tsx`
**Context:** `FileTrigger` is exported from `packages/ui/src/index.ts` line 46
(`export { FileTrigger } from "./components/base/file-upload-trigger/file-upload-trigger"`) and has a
manifest (`packages/registry/manifest/base/file-upload-trigger.json`) describing it as a wrapper that
turns any pressable child into an OS file-picker trigger, but has no test/story/demo and no docs page.
Follow the pattern in `packages/ui/src/components/application/file-upload/` (a related, already
fully-covered component) for how file-selection demos are structured.
**Verify:** `pnpm --filter @properui/ui exec vitest run src/components/base/file-upload-trigger`, plus confirm a Storybook story renders.

### 32. `foundations/typography` has a demo but no story or test

**Files:** new `packages/ui/src/components/foundations/typography/typography.story.tsx`,
`packages/ui/src/components/foundations/typography/typography.test.tsx`
**Context:** `typography.demo.tsx` exists (13KB, the full type-scale reference) but there is no
`.story.tsx` or `.test.tsx` — every other `foundations/*` group has both (verified:
`integration-icons`, `logo`, `payment-icons`, `social-icons` each have a `.story.tsx` + `.test.tsx`
pair even without a demo file; `featured-icon` and `rating` have all three). Use
`packages/ui/src/components/foundations/social-icons/social-icons.story.tsx` as the closest template
for a foundations-layer story with no interactive demo behind it — the test can be a straightforward
`axe` pass over the demo's exports, same shape as any component test in `CONTRIBUTING.md`.
**Verify:** `pnpm --filter @properui/ui exec vitest run src/components/foundations/typography`, plus `pnpm storybook` and confirm a "Typography" story appears.

### 33. `shared-assets/mockups` has no demo, story, or test

**Files:** new `packages/ui/src/components/shared-assets/mockups/iphone-mockup.demo.tsx`, `.story.tsx`, `.test.tsx`
**Context:** `iphone-mockup.tsx` is the only file in this group (verified: `ls packages/ui/src/components/shared-assets/mockups/`
returns exactly one file) — no demo, no story, no test, unlike every sibling in `shared-assets`
(`credit-card`, `illustrations`, `qr-code` all have all three; `background-patterns` has story+test).
It's used heavily by marketing sections (`hero-header-sections`, `cta-sections`,
`newsletter-cta-sections` all list `mockups` in their derived `composes_with`), so a broken change
here has wide blast radius with no test to catch it. Use
`packages/ui/src/components/shared-assets/credit-card/` as the template.
**Verify:** `pnpm --filter @properui/ui exec vitest run src/components/shared-assets/mockups`, plus confirm a Storybook story renders.

---

## Documentation accuracy (1 task)

### 34. `ROADMAP.md`'s "Full RTL coverage" section is out of date

**Files:** `ROADMAP.md`
**Context:** `ROADMAP.md` currently says: _"What is still missing is verification: no RTL snapshot
exists, and `.storybook/preview.tsx` registers only the light/dark theme switcher, so there is no
direction toggle to eyeball a component in."_ That's no longer true —
`.storybook/preview.tsx` already defines a `direction` global with an LTR/RTL toolbar toggle and a
`withDirection` decorator that sets `dir` on the story container (verified by reading the file: it
exports `globalTypes.direction` with `items: [{value: "ltr", ...}, {value: "rtl", ...}]`, registered
alongside the existing `withThemeByClassName` decorator). Update the roadmap paragraph to say the
toolbar toggle exists and narrow the remaining gap to what's still actually missing (a committed RTL
snapshot / no automated check that flags a regression).
**Verify:** `pnpm exec prettier --check ROADMAP.md`; re-read `.storybook/preview.tsx` to confirm the new wording matches what's actually implemented.

---

## Tooling (1 task)

### 35. Generate and commit variant gallery thumbnails

**Files:** run `pnpm shots:thumbs` (`scripts/thumbs.ts`), commit the output under `apps/docs/public/thumbs/`
**Context:** `ROADMAP.md`'s "Variant gallery thumbnails" section says variant galleries render a
neutral placeholder because no thumbnail has ever been committed — verified: `ls apps/docs/public/thumbs`
returns nothing (directory is empty or absent). The `shots:thumbs` script
(`package.json` line 41: `"shots:thumbs": "tsx scripts/thumbs.ts"`) already renders each variant's
preview route and writes the images; it has just never been run and committed. Needs the docs site
running (`pnpm dev`) in another terminal first — check `scripts/thumbs.ts` for the exact preview URL
it hits before running it. This is the one task in this list that's more "run a script and review
its output" than "write code" — good for a contributor who wants a low-code-risk first PR.
**Verify:** after running the script, `git status` should show new files under `apps/docs/public/thumbs/`; spot-check a few in the docs site (`pnpm dev`) to confirm the gallery no longer shows the neutral placeholder for those variants.

---

## Checked, but not seeded (no real gap found)

So this list doesn't imply gaps that don't exist:

- **Docs pages missing an example the demo file has:** checked every `.mdx` page under
  `apps/docs/content/components/`, `apps/docs/content/marketing/`, `apps/docs/content/docs/`, and
  `apps/docs/content/integrations/` that declares `demoFile:` in its frontmatter, by diffing each
  demo file's `export const Name = () => …` exports against the `demo="file:Name"` references in the
  corresponding `.mdx`. The only two apparent mismatches were false positives: `radio-buttons.demo.tsx`
  is intentionally split across two docs pages (`radio-buttons.mdx` and `radio-groups.mdx`, together
  covering all 12 exports), and `code-snippet.demo.tsx`'s `collection`/`colors` "exports" the script
  matched are string constants inside a code-sample template literal, not components. No real gap here.
- **`cssVars` empty on every registry entry:** true (`grep -c '"cssVars": \[\]' packages/registry/dist/index.json` → 797), but per `ROADMAP.md` this is an intentional placeholder for a feature (per-component CSS custom properties) that doesn't exist yet — not a bug to fix piecemeal.
