# Summary

<!-- What does this change, and why? One or two sentences. Link the issue it closes: "Closes #123". -->

## Type of change

<!-- Tick everything that applies. -->

- [ ] Bug fix (no API change)
- [ ] New component
- [ ] New variant or example of an existing component
- [ ] New prop or API change
- [ ] Theming / tokens
- [ ] CLI
- [ ] Documentation
- [ ] Tooling / CI

## How was this verified?

<!--
What did you actually run and look at? For a component, say which demos you exercised and how.
For the CLI, the commands you ran against a real project.
-->

## Screenshots

<!--
Required for anything visual. Light and dark mode, please, and RTL if the change touches layout.
Before / after in a table is ideal.
-->

| Light | Dark |
| ----- | ---- |
|       |      |

## Checklist

- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm prettier` run (CI checks formatting)
- [ ] `pnpm test` passes, including the axe a11y tests
- [ ] `pnpm build` passes
- [ ] A changeset is included (`pnpm changeset`); required for changes to `packages/ui` or `packages/cli`

For a component change, additionally:

- [ ] Files are kebab-case; exports are PascalCase
- [ ] `react-aria-components` imports are aliased with an `Aria` prefix
- [ ] Styles live in a `styles = sortCx({})` object and are applied with `cx()`
- [ ] Only semantic tokens are used: no raw palette classes, no `dark:` for anything a token handles
- [ ] Logical properties (`ms-*`, `ps-*`, `text-start`) used for anything direction-dependent
- [ ] Demo, story, test and docs page are all present and updated
- [ ] Generated files were regenerated with `pnpm gen:all`, not hand-edited
- [ ] Correct in both light and dark mode

## Breaking changes

<!-- Renamed or removed props, changed defaults, dropped exports. Say "None" if there are none, and include the migration if there are. -->

None.

## Notes for reviewers

<!-- Anything you want a second opinion on, trade-offs you made, or follow-up work you deliberately left out. -->
