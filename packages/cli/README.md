# properui

The CLI for [Proper UI](https://github.com/properui/properui) — an accessible React 19 component library built on React Aria Components and Tailwind CSS v4.

It copies component **source** into your project (shadcn-style) instead of adding a dependency: you own the files, you can edit them, and `properui diff` still tells you what you changed relative to upstream. If you would rather consume the library as a package, install [`@properui/ui`](https://www.npmjs.com/package/@properui/ui) and skip the CLI.

## Usage

No install needed:

```bash
npx properui@latest init
npx properui@latest add button
```

Or add it to the project: `pnpm add -D properui`.

Requires Node 20+ and a Tailwind CSS v4 project (v3 is rejected with upgrade instructions).

Global flags: `--cwd <dir>` runs against another directory; every command accepts `-y, --yes` (accept defaults, never prompt) and `--registry <source>` (a registry base URL **or** a local directory). The registry is resolved in this order: `--registry` → `REGISTRY_URL` → the `registry` field in `components.json` → the built-in default. Set `PROPERUI_DEBUG=1` to print stack traces.

## `init`

Configures the current project: detects the framework, TypeScript vs JavaScript, a `src/` folder, the import alias from `tsconfig.json` paths, the Tailwind version and the package manager — then writes `components.json`, `styles/theme.css`, the `cx` utility, the Tailwind `@source` scan line and a `ThemeProvider` in the app entry point.

```bash
npx properui@latest init              # auto-detect everything
npx properui@latest init --nextjs     # force the Next.js layout
npx properui@latest init --vite       # force the Vite layout
npx properui@latest init --manual     # write the files, leave the entry point alone
npx properui@latest init --overwrite  # replace components.json and existing files
npx properui@latest init --yes        # non-interactive (CI)
```

`components.json` — read by every other command:

```json
{
    "$schema": "https://properui.dev/schema.json",
    "style": "default",
    "tsx": true,
    "tailwind": { "css": "app/globals.css", "theme": "src/styles/theme.css", "prefix": "" },
    "aliases": { "components": "@/components", "utils": "@/utils", "ui": "@/components/base", "hooks": "@/hooks" },
    "registry": "https://properui.dev/r"
}
```

## `add`

Resolves each component plus its registry dependencies recursively, copies the files to the targets from `components.json`, rewrites `@/` imports to your alias, installs any missing npm packages and prints exactly what changed. Running it twice without `--overwrite` reports no changes.

```bash
npx properui add button                     # one component
npx properui add button input select table  # several at once
npx properui add table --overwrite          # replace files that already exist
npx properui add table --dry-run            # print the plan, write nothing
npx properui add badges --path src/ui       # ignore the alias, write here
npx properui add --all                      # every component in the registry
```

Unknown names are matched fuzzily, so a typo comes back as a suggestion rather than a stack trace.

## `add example`

Adds a whole page example — a dashboard, a settings page, a login screen, a pricing section — together with every component it uses.

```bash
npx properui add example settings-01
npx properui add example hero-split-image-01
```

## `list`

Lists what the registry holds, with layer and description.

```bash
npx properui list
npx properui list --layer base          # base · application · marketing · …
npx properui list --type example        # component · example · util · hook · style
npx properui list --json                # raw index rows, for scripts
```

## `search`

Fuzzy search over component names, descriptions and example names.

```bash
npx properui search "date"
npx properui search "empty state" --limit 5
```

## `diff`

Shows how the files in your project differ from the registry version — the upgrade path once you have edited copied-in code.

```bash
npx properui diff            # everything already installed
npx properui diff button     # just this component
```

## `login`

Only needed for a private registry; the public one is anonymous. Stores the token at `~/.properui/auth.json`.

```bash
npx properui login
npx properui login --token <token>   # non-interactive
```

## License

MIT © Ayman Shabaro. See [LICENSE](./LICENSE).
