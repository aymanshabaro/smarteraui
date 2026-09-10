# Task 05 — Dashboard with charts and activity feed

## Prompt

Paste this verbatim into the agent, in a fresh project with either Proper UI or the shadcn/ui baseline already installed (see `../baseline/README.md`).

> Build an analytics dashboard page. Show three or four key metrics at the top (e.g. total users, revenue, active sessions), each with a number and a trend indicator versus the previous period. Below that, add a chart showing a trend over time (e.g. daily signups over the last 30 days). Next to or below the chart, add an activity feed showing the 5 most recent events (e.g. "Jane Doe upgraded to Pro — 2 hours ago"), each with an actor, an action, and a relative timestamp. The page should work on mobile, tablet, and desktop, and should be fully usable from the keyboard.

## Acceptance criteria

- [ ] At least three metric tiles are shown, each with a label, a value, and a visible trend indicator (e.g. "+12%" with an up/down arrow or color).
- [ ] A chart renders with plausible sample data across a time range (line, bar, or area — any of these satisfy "trend over time").
- [ ] An activity feed shows at least 5 entries, each with a distinguishable actor (name and/or avatar), an action description, and a relative timestamp (e.g. "2 hours ago").
- [ ] The chart has a text alternative available to assistive technology (e.g. an accessible summary, a visually-hidden data table, or at minimum accessible axis/series labels) — a chart that is only a `<canvas>`/SVG with no text equivalent fails this.
- [ ] The page builds and renders with no console errors at all three viewports below.
- [ ] No layout breakage (overlap, clipping, horizontal scroll) at any of the three viewports below, and the chart does not overflow its container.

## Ideal registry entries an ideal answer would reuse

The closest composed example is **`dashboards-02`** ("Dashboards with header navigation", `app-examples` layer) — it's the one dashboard collection in the registry whose dependencies include `activity-feed` alongside `charts`. Its full dependency list:

```
activity-feed, app-navigation, avatar, background-patterns, badges, breadcrumbs, button-group,
buttons, carousel, charts, countries, credit-card, cx, date-picker, demo-assets, dot-icon,
dropdown, featured-icon, file-upload, filter-bar, input, metrics, pagination, payment-icons,
progress-indicators, rating, section-headers, select, table, tabs
```

That's a full multi-page dashboard shell, more than this single-page prompt needs. For scoring exact reuse against _this_ task specifically, use the trimmed, weighted subset that's actually asked for:

```
metrics, charts, activity-feed, app-navigation, section-headers, badges, avatar, buttons, dropdown, date-picker, tabs
```

`metrics` (`application` layer) is the metric-tile component; `charts` (`application` layer, despite the generic name — its registry title is "Activity gauge components") is the trend/gauge visualization; `activity-feed` (`application` layer) is the recent-events list. Those three are the entries most central to this prompt; the rest (`app-navigation`, `section-headers`, `badges`, `avatar`, `buttons`, `dropdown`, `date-picker`, `tabs`) are the surrounding dashboard chrome that `dashboard-01`..`dashboard-19` all share and a reasonable answer will likely include some of.

## Viewports

| Name    | Size       |
| ------- | ---------- |
| Mobile  | 375 × 812  |
| Tablet  | 768 × 1024 |
| Desktop | 1440 × 900 |

## Task-specific keyboard checklist additions

(In addition to the universal checklist in `../rubric.md` §5.)

- [ ] If the chart has interactive elements (tooltips on hover, a legend that toggles series), an equivalent exists for keyboard users (e.g. tooltip-on-focus for data points, a focusable legend).
- [ ] Metric tiles and activity feed entries are in a sensible reading/tab order (metrics before the feed, or grouped in a way that matches their visual layout) rather than an order that only makes sense visually.
