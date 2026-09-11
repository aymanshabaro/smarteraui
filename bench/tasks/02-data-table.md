# Task 02: Data table with filters and pagination

## Prompt

Paste this verbatim into the agent, in a fresh project with either Proper UI or the shadcn/ui baseline already installed (see `../baseline/README.md`).

> Build a customers table for an admin dashboard. Show at least 25 sample rows with columns for name, email, status (e.g. Active/Invited/Suspended), and a joined date. Above the table, add a search input and a status filter. Below the table, add pagination controls. The status column should use a visually distinct badge per status. Rows should be selectable with checkboxes, including a "select all" in the header. The table should work on mobile, tablet, and desktop, and should be fully usable from the keyboard.

## Acceptance criteria

- [ ] The table renders at least 25 rows of realistic sample data with the four columns described.
- [ ] The search input filters the visible rows (client-side filtering against the sample data is fine; no backend is required).
- [ ] The status filter narrows rows to a selected status (or "All").
- [ ] Status is rendered as a badge whose color/style differs meaningfully per status value.
- [ ] Each row has a checkbox; a header checkbox selects/deselects all currently visible rows, and shows an indeterminate state when some but not all rows are selected.
- [ ] Pagination controls are present and change which page of rows is visible (page size does not need to be configurable, but it must be stated somewhere, e.g. "10 per page").
- [ ] The page builds and renders with no console errors at all three viewports below.
- [ ] At Mobile, the table does not force horizontal scrolling of the entire page (a horizontally-scrollable table container, or a card-based row layout, are both acceptable).

## Ideal registry entries an ideal answer would reuse

There's no single composed page example for this in the registry. The closest grounding is the `table` component itself plus the two application-layer companions the prompt explicitly asks for (filters, pagination). Their combined dependency list is the "ideal reuse" set for scoring:

```
table, filter-bar, pagination,
badges, buttons, checkbox, dropdown, input, tooltip, select, button-group
```

- `table` (`application` layer): the table primitive itself; its own registry dependencies are `badges, buttons, checkbox, dropdown, input, pagination, tooltip`.
- `filter-bar` (`application` layer): the search/filter row; depends on `badges, buttons`.
- `pagination` (`application` layer): the page controls; depends on `button-group, buttons, input, select`.

An answer that hand-rolls its own table markup instead of composing `table` is still gradeable: score exact reuse against the list above regardless (a 0/11 is a legitimate, informative result, not a scoring error).

## Viewports

| Name    | Size       |
| ------- | ---------- |
| Mobile  | 375 × 812  |
| Tablet  | 768 × 1024 |
| Desktop | 1440 × 900 |

## Task-specific keyboard checklist additions

(In addition to the universal checklist in `../rubric.md` §5.)

- [ ] Row checkboxes and the header "select all" checkbox are operable with `Space`.
- [ ] Pagination controls (next/previous/page number) are reachable via `Tab` and operable via `Enter`/`Space`.
- [ ] The search input and status filter are both reachable and usable without a mouse (a native `<select>` or an accessible listbox/combobox for the filter, not a mouse-only custom dropdown).
