---
"@properui/ui": minor
---

`RouterProvider` moves to its own subpath: `@properui/ui/providers/router-provider`.

It imports `next/navigation`, and `next` is an optional peer. Re-exporting it from
`@properui/ui/providers` and from the root barrel meant any bundler resolving either one
without Next installed failed on a specifier it could not satisfy — Vite stubs the module and
the build dies with `"useRouter" is not exported by "__vite-optional-peer-dep:next/navigation"`.
That broke the Vite quick-start in the README, which tells Vite users to import `ThemeProvider`
from `@properui/ui/providers`.

Next.js projects update their import:

```diff
-import { RouterProvider, ThemeProvider } from "@properui/ui/providers";
+import { ThemeProvider } from "@properui/ui/providers";
+import { RouterProvider } from "@properui/ui/providers/router-provider";
```

Vite projects need no change and now build; they were already told to use React Aria's own
`RouterProvider`.
