# Contributing to Proper UI

Thanks for taking the time. This guide covers setting the repo up, the conventions that matter when you touch a
component, and how a change gets from your machine to a release.

Please read the [Code of Conduct](./CODE_OF_CONDUCT.md) first. Security issues go to
[SECURITY.md](./SECURITY.md), not to a public issue.

## Getting set up

**Requirements:** Node 20+ and pnpm 9.

```bash
git clone https://github.com/properui/properui.git
cd properui
pnpm install
```

Then pick what you need:

```bash
pnpm dev          # docs site → http://localhost:3000
pnpm storybook    # Storybook  → http://localhost:6006
pnpm test         # type-check + lint + prettier + vitest/axe across the workspace
```

The docs site is the fastest way to see a component in context; Storybook is the fastest way to iterate on one in
isolation, and gives you a light/dark toolbar toggle.

## Finding a first task

[`.github/GOOD-FIRST-ISSUES.md`](./.github/GOOD-FIRST-ISSUES.md) is a seeded list of scoped, verifiable tasks —
missing semantic manifests in `packages/registry/manifest/`, component groups missing their demo/story/test files,
and a couple of small documentation fixes. Each entry names the exact files to touch and the exact command to verify
it. Pick one, open an issue from the "Good first issue" template (linked from the list, or from
[the issue chooser](https://github.com/properui/properui/issues/new/choose)) so two people don't work on the same
thing, and go.

If none of those fit, [ROADMAP.md](./ROADMAP.md) lists larger gaps, and the
[`good first issue`](https://github.com/properui/properui/labels/good%20first%20issue) and
[`help wanted`](https://github.com/properui/properui/labels/help%20wanted) labels on the issue tracker cover
everything else that's ready to pick up.

## Monorepo layout

```
apps/docs             Next.js 15 App Router docs site (MDX content in apps/docs/content)
packages/ui           @properui/ui — the component library
  src/components      base/ application/ marketing/ app-examples/
                      marketing-examples/ foundations/ shared-assets/ internal/
  src/styles          globals.css · theme.css · typography.css
  src/hooks           use-breakpoint, use-clipboard, use-resize-observer, use-active-item
  src/utils           cx, demo-assets, countries, timezones, …
  src/providers       ThemeProvider, RouterProvider
packages/cli          properui — the init/add CLI
packages/registry     build script + generated registry JSON the CLI consumes
scripts               generators (barrels, demos, nav, variants) and screenshot tooling
.storybook            Storybook config
```

pnpm workspaces + Turborepo. Root scripts fan out through `turbo`, so `pnpm test` at the root runs each package's own
`test` script.

## Component conventions

These are the ones an outside contributor is most likely to trip over.

**Kebab-case file names, PascalCase exports.** `date-picker.tsx`, `use-breakpoint.ts`, `button-utility.tsx`. The
exported component is `DatePicker`.

**Alias every React Aria import with an `Aria` prefix.**

```tsx
import { Button as AriaButton, DialogTrigger as AriaDialogTrigger } from "react-aria-components";
```

This keeps the library's own `Button` unambiguous in files that use both. Never hand-roll focus management, keyboard
navigation or ARIA — if React Aria has a primitive for it, use the primitive.

**Styles live in a `styles = sortCx({})` object** next to the component, applied with `cx()`:

```tsx
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    common: {
        root: "inline-flex items-center justify-center whitespace-nowrap transition duration-100",
        icon: "pointer-events-none size-5 shrink-0",
    },
    sizes: {
        sm: { root: "gap-1 rounded-lg px-3 py-2 text-sm font-semibold" },
        md: { root: "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold" },
    },
    colors: {
        primary: { root: "bg-brand-solid text-white hover:bg-brand-solid_hover" },
        secondary: { root: "bg-primary text-secondary ring-1 ring-primary ring-inset" },
    },
});
```

`sortCx` is an identity function — it exists only so Tailwind IntelliSense sorts classes inside the object. Keys follow
the same shape everywhere: `common`, `sizes`, `colors`, with per-slot `root` / `icon` / … keys underneath. No CSS
modules, no CSS-in-JS, and no inline `style` objects except for genuinely dynamic values (a computed height, a chart
series colour).

**Semantic tokens only.** Inside a component use `bg-primary`, `text-tertiary`, `border-secondary`, `bg-brand-solid`,
`text-fg-quaternary`, `shadow-xs`, `text-display-md`. Never a raw palette class (`bg-neutral-100`, `text-purple-600`) —
those belong in `theme.css` alone. The one exception is the `utility-*` scales, which badges, tags and charts use.

This is what makes dark mode and re-branding work without touching component files. See [docs/theming.md](./docs/theming.md).

**Dark mode is class-based.** `.dark-mode` on an ancestor flips every semantic token. Do not add `dark:` utilities for
anything a token already handles; reserve them for things tokens cannot express (swapping an image, inverting a logo)
and leave a comment saying why.

**Prefer logical properties.** `ms-*` / `me-*` / `ps-*` / `pe-*` / `start-*` / `end-*` / `text-start` rather than their
physical equivalents, so RTL works without a fork. See [docs/rtl.md](./docs/rtl.md).

**Every component ships four things beside it:**

| File                  | Purpose                                                                       |
| --------------------- | ----------------------------------------------------------------------------- |
| `component.tsx`       | The component (plus any sub-files it needs)                                   |
| `component.demo.tsx`  | One `export const Name = () => …` per documented example                      |
| `component.story.tsx` | Storybook stories, one per demo export, with a `storyName`                    |
| `component.test.tsx`  | Vitest: an `axe` pass over every demo, plus assertions on the component's API |

…and an MDX page under `apps/docs/content/`.

Demo exports **must** use the `export const Name = () =>` form — the demo generator only detects that shape. Demo
images and videos come from `@/utils/demo-assets`, flags from `@/utils/countries`; external image URLs fail CI
(`pnpm check:assets`).

**Accessibility is a test, not an intention.** Every demo is rendered through `vitest-axe`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./badges.demo";

describe("Badges", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});
```

Two failures come up often enough to call out: **do not skip heading levels** (an `<h4>` may only follow an `<h3>`;
promote the heading rather than suppressing the rule), and **every tab list needs panels** (render one
`Tabs.Panel id={…}` per tab id, even an empty one, or `aria-valid-attr-value` fails).

**Do not hand-edit generated files.** `packages/ui/src/index.ts`, the docs nav and `packages/registry/dist` are
generated. Run `pnpm gen:all` (or the narrower `pnpm gen:barrels`, `pnpm gen:demos`, `pnpm gen:nav`,
`pnpm registry:build`) instead.

For a full walkthrough of adding one, see [docs/contributing-components.md](./docs/contributing-components.md).

## Running the checks

Run this before pushing — it is the same set CI runs:

```bash
pnpm type-check     # tsc --noEmit everywhere
pnpm lint           # eslint
pnpm prettier       # format (CI runs prettier:check)
pnpm test           # vitest + axe
pnpm build          # every package and the docs site
```

Or the whole lot via the root `pnpm test`, which fans out through Turborepo.

Formatting is Prettier with the repo's `.prettierrc` — 4-space indent, 160-column width, double quotes, trailing
commas, plus the import-sort and Tailwind class-sort plugins. Do not fight it; run `pnpm prettier`.

CI additionally runs `pnpm check:assets` (no external image URLs) and `pnpm build-storybook`, and a non-blocking visual
job that screenshots the docs pages and pixel-diffs them.

## Changesets

Releases are managed with [changesets](https://github.com/changesets/changesets). Any PR that changes
`packages/ui` or `packages/cli` needs one:

```bash
pnpm changeset
```

Pick the affected packages, pick a bump, and write one sentence a consumer would understand — it goes into the
changelog verbatim. Commit the generated file in `.changeset/` with your PR.

Rough guide to the bump:

- **patch** — a bug fix, a style correction, an a11y fix that does not change the API.
- **minor** — a new component, a new prop, a new variant.
- **major** — a renamed or removed prop, changed default behaviour, a dropped export.

Docs-only and tooling-only changes don't need a changeset (`apps/docs` is excluded from releases).

**How this credits you.** The changelog generator is `@changesets/changelog-git`
(`.changeset/config.json`'s `changelog` field), which prints your changeset summary as a plain bullet in
`CHANGELOG.md` — there's no automatic commit hash or "Thanks @you!" line added around it (that's a
`changelog-github`-specific feature this repo doesn't use). Your name is attached to the change through the PR and
commit history on GitHub, and through the release announcement, which credits every contributor by handle — see
[docs/releases.md](./docs/releases.md#what-the-changelog-actually-looks-like) for exactly how that works. This is
also why the summary you write matters: it's the one line a consumer of the library actually reads.

Releases go out roughly every two weeks — see [docs/releases.md](./docs/releases.md) for the full cadence, what
triggers the "Version Packages" PR, and what a release announcement contains.

## Pull requests

1. **Open an issue first** for anything larger than a fix — a new component, an API change, a new dependency. It saves
   you building something that then needs reworking.
2. **Branch from `main`.** Name it `feat/…`, `fix/…`, `docs/…` or `chore/…`.
3. **Keep it focused.** One component, or one concern, per PR. Do not reformat unrelated files.
4. **Commit messages** follow the existing style: `feat(ui): base/badges — add BadgeWithFlag`,
   `fix(cli): resolve aliases without a slash`, `docs: clarify the @source line`.
5. **Fill in the PR template** — what changed, why, how you verified it, screenshots for anything visual (both light
   and dark).
6. **Green CI.** Type-check, lint, prettier, tests, assets check and build all have to pass.
7. **New dependencies** need justification in the PR description. The dependency surface is deliberately small.

Maintainers may push small fixups to your branch rather than round-tripping on nits. Everything is squash-merged.

## Contributor ladder

There's no formal application process for any of this — it's what naturally changes as a maintainer gets to know
your work.

**Your first PR.** Start from [`.github/GOOD-FIRST-ISSUES.md`](./.github/GOOD-FIRST-ISSUES.md) or a `good first
issue`-labeled issue. Expect a more detailed review than a repeat contributor gets — comments explaining _why_ a
convention exists, not just that it was missed, since you haven't internalized the patterns in
[Component conventions](#component-conventions) yet. Once it's merged, your name is in the git history for that
file, and the change ships in the next [dated release](./docs/releases.md).

**Repeat contributor (a few merged PRs in).** Review comments get terser — a maintainer will assume you know the
`sortCx`/semantic-token/`Aria`-prefix conventions by now. You can pick up issues without a `good first issue` label,
including ones that touch multiple files or add a new variant to an existing component. You'll start getting tagged
for review on PRs that touch areas you've worked in before, since you have the most relevant context.

**Ongoing.** Consistent contributors get invited to help triage incoming issues (the `needs triage` label every new
bug report and feature request starts with — see [`.github/ISSUE_TEMPLATE/`](./.github/ISSUE_TEMPLATE/)) and to
weigh in on [ROADMAP.md](./ROADMAP.md) priorities before they're turned into issues. There is no paid role, no
equity, and no path to one — Proper UI has no revenue to offer; what's on offer is design/architecture input on a
project other people will build on.

## Reporting bugs and asking for features

Use the issue templates — [bug report](https://github.com/properui/properui/issues/new?template=bug_report.yml) or
[feature request](https://github.com/properui/properui/issues/new?template=feature_request.yml). A minimal
reproduction (a StackBlitz, or the smallest component tree that shows it) gets a bug fixed far faster than a
description.

## License

By contributing you agree that your contributions are licensed under the MIT License, the same as the project.
