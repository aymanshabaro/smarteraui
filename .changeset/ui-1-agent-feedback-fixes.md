---
"@properui/ui": minor
---

Fixes and additive props across metrics, modals, notifications, pagination, table, file-upload,
loading-indicator, progress-steps, alerts, app-navigation, and `CloseButton`, addressing item
2.1, 2.4, 2.9, 2.12, 2.18, 2.19 and part of 2.5 from `docs/spec/feedback/2026-09-11-agent-feedback-map.md`.

- **Metrics**: `change` is now optional on every metric card. `MetricChangeIndicator` only
  renders when `change` is a non-empty string, so a plain metric (no change to report) no longer
  shows an empty green pill.
- **Modals**: `ModalHeader`'s close button now actually closes the dialog (it carries React
  Aria's default `slot="close"` again). Added `onClose` and `closeLabel` (default `"Close"`) to
  `ModalHeader`. `hasBackgroundPattern` now defaults to `true` only when an `icon` is given (was
  unconditionally `true`); pass it explicitly to opt in/out with a bare `media`. `ModalOverlay`'s
  doc comment now spells out that `isDismissable` covers pointer dismissal only and
  `isKeyboardDismissDisabled` covers Escape. Added a "confirm dialog" composition demo.
- **Labels / i18n**: added override props with English defaults for every previously hardcoded
  user-visible string in the touched groups — `FileUploadDropZone` (`uploadLabel`,
  `uploadLabelMobileSuffix`, `dragAndDropLabel`), pagination (`previousLabel`, `nextLabel`,
  `pageLabel` format function, `aria-label` on `Pagination.Root`), and app-navigation
  (`MobileNavigationHeader`'s `labels` prop covering "Mobile navigation" / "Expand navigation
  menu" / "Close navigation menu" / "Navigation menu"; `SidebarNavigationSimple`'s `ariaLabel` /
  `searchLabel`; `SidebarNavigationSlim`'s `ariaLabel`). `Pagination`'s `PrevTrigger`/`NextTrigger`
  `asChild` clone no longer overwrites an `aria-label` when the child already has its own visible
  text or `aria-label`. `Notification`'s `closeLabel` and `CloseButton`'s `label` were already
  correct — verified, not forced to English.
- **Sidebar/nav**: `SidebarNavigationSimple` gained `logo` (default `<ProperLogo>`) and `search`
  (`boolean | ReactNode`, default `true`) slots. `SidebarNavigationSlim` gained `logo` and
  `mobileLogo` slots. `NavItemBase` gained `className` (merged last) and `classNames` (`{ root?,
rootSelected? }`) to restyle the selected-row treatment without forking the component.
- **Loading indicator**: added an `xs` (16px) size and an `inline` prop that lays the spinner and
  label out side by side instead of stacked. Documented that a spinner inside a `Button` should
  use the button's own `isLoading` prop instead.
- **ProgressSteps**: added `onStepPress?(id)` (steps render as buttons when provided), a
  `"locked"` status (looks like `incomplete`, stays disabled even with `onStepPress`), and a
  per-step `children` slot. Default static rendering is unchanged.
- **Cursor pagination**: added `PaginationCursor`, a `hasNext`/`hasPrevious` previous/next pair
  for unknown-total feeds — no "Page X of Y".
- **Table**: documented (JSDoc + `tables.mdx`) that `Table` renders an ARIA `grid`
  (`getByRole('table')` will not match; use `getByRole('grid')`), the static-children usage
  contract (explicit `aria-label`, an `id` per `Row`, omit `selectionMode`), a visually-hidden
  column label recipe, and that `Table.Row`'s existing `href` support does not render a real
  `<a>`. Added "Static usage" and "Visually hidden column label" demos.
- **Alerts**: documented (JSDoc + `alerts.mdx`) that `Alert` is an inline banner, not an alert
  dialog — compose `Modal` for a confirm dialog. `role` was already overridable via
  `HTMLAttributes` and is now called out explicitly.
- Prefixed the two unused `event` parameters in `file-upload/draggable.tsx` with `_` for
  `noUnusedParameters`.

No public export was renamed or removed; every change above is additive.
