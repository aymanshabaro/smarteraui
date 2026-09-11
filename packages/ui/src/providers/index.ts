export { ThemeProvider, useTheme } from "./theme-provider";

/**
 * `RouterProvider` is deliberately NOT re-exported here. It imports
 * `next/navigation`, and `next` is an optional peer — so any bundler resolving this
 * barrel without Next installed fails on a specifier it cannot satisfy. Vite turns it
 * into an empty stub and the build dies with
 * `"useRouter" is not exported by "__vite-optional-peer-dep:next/navigation"`, which
 * broke the Vite quick-start in the README as well as every root-barrel import.
 *
 * Next.js projects import it from its own subpath instead:
 *
 *     import { RouterProvider } from "@properui/ui/providers/router-provider";
 */
