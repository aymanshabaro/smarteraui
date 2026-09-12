---
"@properui/ui": minor
---

Field API and accessible-name fixes from the agent feedback map (docs/spec/feedback/2026-09-11-agent-feedback-map.md
items 2.17, 2.20, 2.22, and the JSDoc half of 2.11), batched across `input`, `select`, `checkbox`, `radio-buttons`,
`badges`, `toggle`, `tags`, `buttons/button`, `date-picker`, `page-headers`, and `foundations/featured-icon`:

- **Button.** Accepts a native `title` (applied via a ref, since React Aria's own `filterDOMProps` allowlist drops
  it); exports `LinkProps` alongside `ButtonProps`; widens `iconLeading`/`iconTrailing` from `FC<{className}>` to
  `ComponentType<{className}> | ReactNode`; documents the React Server Component icon form
  (`iconLeading={<Icon data-icon="leading" />}`).
- **Input/TextField.** Passes through `min`/`max`/`step`; adds a `hintProps` escape hatch (e.g.
  `hintProps={{ role: "alert" }}`) and `prefix`/`suffix` slots; documents that `onChange` hands back a plain string.
- **Label (2.20).** The required `*` indicator is omitted from the DOM entirely when `isRequired={false}` (previously
  only CSS-hidden, which doesn't apply in jsdom), so a non-required field's accessible name exactly matches its label
  text.
- **Select (2.20).** The trigger's accessible name is now exactly the label, not React Aria's default
  "value, label" concatenation — fixed by giving the trigger an explicit `aria-labelledby` pointing at the label
  alone. Along the way, fixed a real bug this surfaced: `Label`'s tooltip button had no `slot`, so inside `Select`
  it silently absorbed the trigger's own `ButtonContext` (duplicate `id`, `aria-haspopup`, `aria-expanded`) — it now
  opts out with `slot={null}`.
- **Checkbox (2.20).** The hint now renders outside the `<label>`, linked via `aria-describedby`, so the accessible
  name equals just the label instead of "label + hint".
- **NativeSelect (2.17).** Honours a caller `id` (falls back to `useId`; label/select/hint ids are always distinct —
  fixed a latent id collision), accepts a `readonly` options array, and renders an optional `placeholder` as a
  disabled first option. Also applies each option's `disabled` flag, which was accepted but never used.
- **Badge family + Tag (2.17).** `Badge`, `BadgeWithDot`, `BadgeWithIcon`, `BadgeWithFlag`, `BadgeWithImage`,
  `BadgeWithButton`, `BadgeIcon`, and `Tag` all spread unrecognized props onto their root element now, instead of
  silently dropping them.
- **Toggle (2.17).** New `labelPosition?: "start" | "end"` (default `"end"`).
- **DatePicker / DateRangePicker (2.17).** New `label`, `hint`, `tooltip`, `isRequired` props matching the other
  field components; documents that clearing every segment emits `null`, and that segment order comes from the
  ambient `I18nProvider` locale.
- **ComboBox (2.17).** Exposes `menuTrigger` (defaults to the existing `"focus"` behavior) and `allowsEmptyCollection`
  as documented props; documents that RAC's own filter still applies unless `defaultFilter={() => true}` is passed.
- **FeaturedIcon (2.17).** `icon` widened from `FC<{className}>` to `ComponentType<{className}> | ReactNode`.
- **PageHeader (2.17).** New `gutter?: boolean` (default `true`); `gutter={false}` also disables the banner's
  edge-to-edge negative margin, since there's no longer a gutter to break out of.
- **Dev-mode warnings (2.22).** New `utils/warn-dom-props.ts`: in development, warns once per component + prop when
  a native DOM prop name is used where React Aria expects its own (`onClick` -> `onPress`, `disabled` ->
  `isDisabled`, `checked` -> `isSelected`, `readOnly` -> `isReadOnly`, `required` -> `isRequired`); a no-op in
  production. Wired into `Button`, `Input`, `Checkbox`, `Toggle`, `RadioGroup`, `Select`.
- **Testing pointers.** `Select` and `ComboBox` carry a JSDoc note that opening their popover in a jsdom test needs
  `fireEvent.click(trigger)` or `focus` + `ArrowDown` — `userEvent.click` alone toggles it shut.

Skipped: `TextArea` is not owned by this change (not present under the owned globs), so the `onChange`-returns-a-string
doc note and the dev-mode warning were not added there. `title` still does not reach the DOM on `Tag` specifically —
React Aria's `useTag` hook filters it out at a lower layer than any prop we spread; `data-*`/`aria-*` do pass through.
