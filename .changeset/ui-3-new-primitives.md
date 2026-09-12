---
"@properui/ui": minor
---

Adds six new primitives requested in the DrivenSellers feedback pass (docs/spec/feedback/2026-09-11-agent-feedback-map.md
item 2.18, DrivenSellers §4): `Skeleton`/`SkeletonText` for loading placeholders, `DescriptionList` for term/details
key-value content, a free-form `Popover` built on React Aria's `DialogTrigger`/`Popover`/`Dialog` that never binds its
width to the trigger, `ConfirmDialog` (composed from the existing `modals` parts) for a controlled "are you sure?"
prompt with an async `onConfirm` and a loading state, tone-tinted `Callout` for inline tips and notices, and a
standalone `ToggleChip` built on React Aria's `ToggleButton`, colored from the badge palette.

`Callout`'s `warning` and `success` tones fall back to the neutral `border-secondary` token: dedicated
`border-warning`/`border-success` tokens do not exist in `theme.css` yet.
