# Releases

Proper UI ships on a dated, two-week cadence. This page describes what goes into a release, how the
version and changelog get generated, and what a release announcement contains. The mechanism
described here (the `release` workflow, the changeset pipeline, the bump rules) is exactly what's
already wired up in `.github/workflows/release.yml` and `.changeset/config.json`. The **cadence and
announcement format** are the proposed rhythm this page introduces; no release has gone out under it
yet (neither `packages/ui` nor `packages/cli` has a `CHANGELOG.md` yet, which is what the first
"Version Packages" PR will create).

## Cadence

A release goes out roughly every two weeks. There's no hard deadline that blocks a release for a
half-finished feature: if nothing has landed since the last one, the cadence just slips a few days
rather than shipping an empty release. The exception is a security fix or a build-breaking
regression, which goes out immediately rather than waiting for the next window.

## What a release contains

Every PR that changes `packages/ui` or `packages/cli` carries a changeset, a small Markdown file
under `.changeset/`, added with `pnpm changeset` (see the "Changesets" section of
[CONTRIBUTING.md](../CONTRIBUTING.md#changesets)). `apps/docs` is excluded from releases
(`.changeset/config.json`'s `"ignore": ["docs"]`), so docs-only PRs don't need one.

A release is: every changeset merged to `main` since the previous release, bundled into one version
bump per affected package.

## How the mechanism works

This is exactly what `.github/workflows/release.yml` runs, end to end:

1. **Every push to `main`** triggers the `release` job.
2. `changesets/action@v1` looks for pending changeset files in `.changeset/`.
    - If there are any, it opens (or updates) a pull request titled **"chore: version packages"**. That
      PR runs `pnpm changeset version`, which consumes every pending changeset, bumps the affected
      package(s) `package.json` version per [semver rules each changeset declares](#bump-rules), and
      writes the changelog entries into each package's `CHANGELOG.md`.
    - This "Version Packages" PR is not merged automatically: a maintainer reviews and merges it,
      the same as any other PR.
3. **Once the Version Packages PR is merged**, the next push to `main` finds no pending changesets, so
   the action instead runs `pnpm release` (`changeset publish`), which publishes the newly-versioned
   packages to npm under the `properui` and `@properui/ui` names, using `NPM_TOKEN`.

So "cutting a release" in practice means: merge the accumulated PRs for two weeks, then merge the
"Version Packages" PR that's been quietly tracking them the whole time. There's no separate manual
release script.

### Bump rules

From `CONTRIBUTING.md`:

- **patch**: a bug fix, a style correction, an a11y fix that does not change the API.
- **minor**: a new component, a new prop, a new variant.
- **major**: a renamed or removed prop, changed default behaviour, a dropped export.

`.changeset/config.json` sets `updateInternalDependencies: "patch"`, so if `@properui/ui` bumps,
anything in the workspace that depends on it (today, nothing published does) would get at least a
patch bump too, and `access: "public"`, meaning both packages publish to the public npm registry, matching
the "MIT and stays free" project position: there is no private/paid package hiding behind this
release process.

### What the changelog actually looks like

`.changeset/config.json` sets `"changelog": "@changesets/cli/changelog"`, which resolves to
`@changesets/changelog-git`, **not** `@changesets/changelog-github`. `changelog-git`'s `getReleaseLine`
would prefix a line with the short commit hash if `changeset.commit` were set, but nothing in the
installed `@changesets/read`/`@changesets/cli` pipeline populates that field (verified by reading
`node_modules/@changesets/cli`'s bundled source: the `config.commit` boolean only controls whether the
CLI makes its own git commits, it does not attach a hash to each changeset). In practice, a changelog
entry is just the changeset's summary sentence, verbatim, one bullet per changeset:

```
## 0.2.0

### Minor Changes

- Add ComboBox with async loading and empty states.
```

There is no automatic "Thanks @username!" line and no commit hash: that's a `changelog-github`-specific
feature this repo doesn't use, and this repo's config does not enable commit tracking either. A
contributor's name is attached to the change only through the PR and commit history on GitHub, not
inline in `CHANGELOG.md`. Write your changeset summary as the exact sentence you'd want a consumer to
read in the changelog. It goes in verbatim, with no attribution added around it.

## Release announcement

Each two-week release gets a short announcement, posted to
[GitHub Discussions](https://github.com/properui/properui/discussions), already the project's
designated venue for community conversation (see `.github/ISSUE_TEMPLATE/config.yml`'s "Questions and
ideas" link). The announcement covers:

- **The version and date**: e.g. "0.3.0 - March 14".
- **What's new**, in plain language, one line per notable change: new components, new variants, any
  breaking change called out explicitly at the top (mirroring the "major" bump entries in that
  release's changelogs).
- **Who contributed**: the PRs merged into that release, credited by GitHub handle from the PR list
  itself (since, as above, the changelog text alone doesn't carry a handle).
- **A link to the full changelog** for both packages (`packages/ui/CHANGELOG.md`,
  `packages/cli/CHANGELOG.md`) for anyone who wants the complete, unfiltered list.

Because there's no paid tier and no roadmap gated behind a subscription, a release announcement never
has a pricing or plan-change section: every release is the same free MIT drop for every user.

## Where to see what's next

[ROADMAP.md](../ROADMAP.md) lists what's deliberately not built yet, and
[`.github/GOOD-FIRST-ISSUES.md`](../.github/GOOD-FIRST-ISSUES.md) lists scoped tasks: including
several that land in a package's `CHANGELOG.md` on the very next release once merged.
