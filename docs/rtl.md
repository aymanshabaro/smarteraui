# RTL support

Right-to-left languages — Arabic, Hebrew, Persian, Urdu — are supported without a separate theme or a forked component
tree. Two things do the work:

1. **React Aria** handles direction-aware behaviour: arrow-key navigation, slider and carousel gestures, popover
   placement, date-picker field order. Wrap the app in `I18nProvider` and it follows the locale.
2. **CSS logical properties** handle layout: `ms-*` / `me-*` / `ps-*` / `pe-*` / `start-*` / `end-*` / `text-start`
   resolve relative to text direction, so a single `dir="rtl"` flips the layout with no conditional styling.

> **Status.** React Aria behaviour is complete. The style layer is mid-migration: many components already use logical
> utilities throughout, but physical ones (`ml-*`, `pr-*`, `text-left`) still appear in parts of the library, mostly in
> the marketing sections and page examples. If you hit a component that does not mirror correctly, please
> [open an issue](https://github.com/properui/properui/issues) — it is a bug, not a design decision.

## Setting it up

Add `dir="rtl"` to `<html>` (or to any container) and wrap the tree in React Aria's `I18nProvider`:

```tsx
// app/layout.tsx
import { I18nProvider } from "react-aria-components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <body>
                <I18nProvider locale="ar-AE">{children}</I18nProvider>
            </body>
        </html>
    );
}
```

`locale` drives number, date and collation formatting. `dir` drives layout. Set them independently — an app can be
laid out RTL while formatting numbers for another locale.

For part of a page only, put `dir="rtl"` on that container and wrap it in its own `I18nProvider`. Logical properties
inherit direction from the nearest ancestor with a `dir` attribute.

## The utilities

| Physical    | Logical      | LTR                   | RTL                   |
| ----------- | ------------ | --------------------- | --------------------- |
| `ml-4`      | `ms-4`       | `margin-left: 1rem`   | `margin-right: 1rem`  |
| `mr-4`      | `me-4`       | `margin-right: 1rem`  | `margin-left: 1rem`   |
| `pl-4`      | `ps-4`       | `padding-left: 1rem`  | `padding-right: 1rem` |
| `pr-4`      | `pe-4`       | `padding-right: 1rem` | `padding-left: 1rem`  |
| `left-0`    | `start-0`    | `left: 0`             | `right: 0`            |
| `right-0`   | `end-0`      | `right: 0`            | `left: 0`             |
| `text-left` | `text-start` | left-aligned          | right-aligned         |
| `rounded-l` | `rounded-s`  | left corners          | right corners         |
| `border-l`  | `border-s`   | left border           | right border          |

Symmetrical utilities — `px-4`, `mx-4`, `p-4`, `m-4`, `gap-4` — already apply to both sides and need no logical
equivalent.

Migrating an LTR codebase is safe and backwards-compatible: `ms-4` compiles to exactly `margin-left: 1rem` under
`dir="ltr"`. The only behavioural difference appears in RTL.

## What has no logical equivalent

CSS transforms and keyframe-based slide animations are physical by nature — `translateX`, `scaleX`,
`slide-in-from-right`. For these, add an `rtl:` variant alongside the original class rather than replacing it:

```diff
- <div className="slide-in-from-right-4" />
+ <div className="slide-in-from-right-4 rtl:slide-in-from-left-4" />
```

## Directional icons

Icons that encode direction must mirror; icons that do not, must not.

**Mirror** — arrows, chevrons meaning "next"/"back", breadcrumb separators, the icon in a "return" button:

```tsx
import { ArrowRight } from "@properui/icons";

<ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />;
```

Since `Button` takes a component reference for `iconLeading` / `iconTrailing`, wrap the flip once and reuse it:

```tsx
import { ArrowRight } from "@properui/icons";
import { cx } from "@/utils/cx";

const DirectionalArrow = (props: React.ComponentProps<typeof ArrowRight>) => <ArrowRight {...props} className={cx("rtl:-scale-x-100", props.className)} />;

<Button iconTrailing={DirectionalArrow}>Continue</Button>;
```

**Do not mirror** — play buttons, search glyphs, checkmarks, trash cans, brand logos, flags, avatars, or any icon
containing letters (a "PDF" file badge). Mirroring these makes them look broken, or in the case of a flag, wrong.

The same rule applies if you swap in a different icon set.

## Testing

- Toggle `dir` on `<html>` in devtools — the fastest check while building.
- Pay particular attention to sliders, breadcrumbs, carousels, date pickers, drawers and anything with a leading or
  trailing icon; those are where direction affects both layout and interaction.
- Run the a11y tests (`pnpm test`); they catch the structural problems that often accompany a mis-mirrored layout.

## FAQ

**Do I have to migrate every `ml-` and `pl-` in my own code?** Only if you want RTL. The logical equivalents render
identically in LTR, so migrating early costs nothing.

**Do React Aria components handle RTL?** Yes — modals, popovers, menus, date pickers and selects all read direction
from `I18nProvider` and the `dir` attribute.

**Can one page mix directions?** Yes. Put `dir="rtl"` on the container and wrap it in `I18nProvider`; the rest of the
page is unaffected.
