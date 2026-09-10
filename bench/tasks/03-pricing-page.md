# Task 03 — Pricing page

## Prompt

Paste this verbatim into the agent, in a fresh project with either Smart Era UI or the shadcn/ui baseline already installed (see `../baseline/README.md`).

> Build a pricing page with three plans: Starter, Pro, and Enterprise. Include a monthly/yearly billing toggle that changes the displayed price. Mark the Pro plan as the recommended option. Each plan should list its included features with checkmarks, and have its own call-to-action button. Below the plans, add a short FAQ section with at least four questions people ask before buying. The page should work on mobile, tablet, and desktop, and should be fully usable from the keyboard.

## Acceptance criteria

- [ ] Three pricing tiers are shown side by side (or stacked on mobile) with distinct names, prices, and feature lists.
- [ ] A monthly/yearly toggle exists and changes the displayed price for all three tiers when switched (a plausible discount for yearly, e.g. ~20%, is enough — exact numbers don't matter).
- [ ] The Pro tier is visually marked as recommended/popular (e.g. a badge, a border, or an elevated card) — a reader should be able to tell which plan is being pushed within a couple of seconds.
- [ ] Each tier lists at least 3 features with a checkmark or equivalent icon, and has its own visible call-to-action button.
- [ ] An FAQ section below the pricing tiers shows at least four question/answer pairs.
- [ ] The page builds and renders with no console errors at all three viewports below.
- [ ] No layout breakage (overlap, clipping, horizontal scroll) at any of the three viewports below.

## Ideal registry entries an ideal answer would reuse

The closest composed example in the registry is **`pricing-page-01`** (`marketing-examples` layer). Its dependency list is the grounded "ideal reuse" set:

```
header-navigations, pricing-sections, features-sections, faq-sections, cta-sections, footers
```

`pricing-sections` (the component group this task is actually about) itself depends on:

```
badges, buttons, featured-icon, slider, tabs, toggle, tooltip
```

For scoring, treat the union of both lists as the ideal set, but weight `pricing-sections`, `toggle` (the monthly/yearly switch), `badges` (the "Popular" marker), and `faq-sections` (or a specific `faq-accordion-*` entry) as the entries that matter most — a full pricing _page_ also reasonably includes a header and footer, but an answer that only builds the pricing section plus FAQ (skipping a full site header/footer, since the prompt doesn't ask for site chrome) should not be penalized for that.

## Viewports

| Name    | Size       |
| ------- | ---------- |
| Mobile  | 375 × 812  |
| Tablet  | 768 × 1024 |
| Desktop | 1440 × 900 |

## Task-specific keyboard checklist additions

(In addition to the universal checklist in `../rubric.md` §5.)

- [ ] The monthly/yearly toggle is operable with `Space`/`Enter` (or arrow keys, if implemented as a segmented control) and its current state is visually and programmatically clear (e.g. `aria-pressed` or `role="switch"` with `aria-checked`).
- [ ] The FAQ items, if implemented as an accordion, can be expanded/collapsed with `Enter`/`Space` and reflect state via `aria-expanded`.
