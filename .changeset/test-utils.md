---
"@properui/ui": minor
---

Adds `src/utils/jsdom-setup.ts` (`npx @properui/cli@latest add jsdom-setup`), a side-effect module that shims the six browser APIs React Aria Components needs and jsdom 25 doesn't implement: `matchMedia`, `ResizeObserver`, `IntersectionObserver`, `Element.prototype.scrollIntoView`, the three `*PointerCapture` methods, and `HTMLElement.prototype.inert`. `packages/ui/vitest.setup.ts` now imports it, so this repo's own test suite dogfoods the shipped file; every existing shim keeps the same behavior as before.

Adds executable jsdom recipes for the interaction patterns that were previously undocumented and silently broke under the standard `userEvent` recipe: opening a `Select` popover (`select-popover.test.tsx`), driving `Select.ComboBox` (`combobox-popover.test.tsx`), and targeting date-field segments plus driving a `usePress` component under fake timers (`date-picker-interaction.test.tsx`).

Adds a new "Testing" docs page (`apps/docs/content/docs/testing.mdx`) covering the six shims, a per-component "how to open this in a test" table, the `Table` accessible-role note, the `isLoading`/`aria-disabled` distinction, accessible-name guidance for `Label`/`Select`/`Checkbox`, `onDropFiles` and jsdom's missing `DataTransfer`, a Playwright portalled-overlay note, and a shared-checkout warning about running `next build` alongside a sibling `next dev` server.

No existing component source changed.
