# Task 01 — Settings page (tabs + form)

## Prompt

Paste this verbatim into the agent, in a fresh project with either Proper UI or the shadcn/ui baseline already installed (see `../baseline/README.md`). Do not add any hints, framework names, or component names beyond what's written here — that's the point of a tool-agnostic prompt.

> Build a settings page for a SaaS product. It needs tabbed navigation between three sections: **Profile**, **Notifications**, and **Billing**.
>
> - **Profile**: a form with name, email, an avatar with an upload control, and a save button.
> - **Notifications**: a list of toggles for email and push notification preferences, each with a short description, and a save button.
> - **Billing**: the current plan name, the payment method on file, and a button to update it.
>
> Switching tabs should not reload the page. Saving a section should show the user that it saved. The page should work on mobile, tablet, and desktop, and should be fully usable from the keyboard.

## Acceptance criteria

- [ ] Three tabs are present, labeled Profile, Notifications, and Billing, and switching between them updates the visible panel without a full page navigation/reload.
- [ ] The Profile panel has labeled inputs for name and email, an avatar preview, and a way to upload/change the avatar image.
- [ ] The Notifications panel shows at least two distinct toggle controls, each with a visible label and a short description of what it controls.
- [ ] The Billing panel shows a plan name, a payment method (e.g. masked card number or "PayPal"), and a control to change it.
- [ ] Each panel has its own save action, and activating it produces a visible confirmation (toast, inline message, or button state change) — not just a silent state change.
- [ ] Every field has a programmatically associated label (not a placeholder used as a label).
- [ ] The tabs follow the WAI-ARIA tabs keyboard pattern (arrow keys move focus between tabs; the panel is reachable by `Tab`).
- [ ] The page builds and renders with no console errors at all three viewports below.
- [ ] No layout breakage (overlap, clipping, horizontal scroll) at any of the three viewports below.

## Ideal registry entries an ideal answer would reuse

The closest existing composed example in the registry is **`settings-02`** (`app-examples` layer, "Settings 02" — tabs + avatar/file-upload profile section + toggle-based notifications section). Its full dependency list, which is the grounded "ideal reuse" set for scoring:

```
app-navigation, avatar, badges, button-group, buttons, checkbox, featured-icon,
file-upload, form, input, select, tabs, textarea, toggle
```

(`countries`, `demo-assets`, `cx`, and `timezones` are also technical dependencies of that example but are supporting utilities, not something a scored answer is expected to visibly "reuse" — don't count them in the exact-reuse percentage.)

The components that matter most for this specific prompt, in rough order of how central they are to the task: `tabs`, `form`, `input`, `toggle`, `file-upload`, `avatar`, `buttons`, `select` (for a plan or country field, if used), `checkbox` (if notifications use checkboxes instead of/alongside toggles), `badges` (e.g. a "Current plan" badge in Billing).

## Viewports

| Name    | Size       |
| ------- | ---------- |
| Mobile  | 375 × 812  |
| Tablet  | 768 × 1024 |
| Desktop | 1440 × 900 |

## Task-specific keyboard checklist additions

(In addition to the universal checklist in `../rubric.md` §5.)

- [ ] The avatar upload control is operable from the keyboard (a native `<input type="file">` or an accessible trigger button, not a click-only drop zone with no fallback).
- [ ] Toggles in the Notifications panel can be flipped with `Space` and their new state is visible.
