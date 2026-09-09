# smarteraui

The CLI for [Smartera UI](https://github.com/aymanshabaro/smarteraui) — an accessible React 19 component library built on React Aria Components and Tailwind CSS v4.

It copies component **source** into your project (shadcn-style) instead of adding a dependency: you own the files, you can edit them, and `smarteraui diff` still tells you what you changed relative to upstream. If you would rather consume the library as a package, install [`@smarteraui/ui`](https://www.npmjs.com/package/@smarteraui/ui) and skip the CLI.

## Usage

No install needed:

```bash
npx smarteraui@latest init
npx smarteraui@latest add button
```

Or add it to the project: `pnpm add -D smarteraui`.

Requires Node 20+ and a Tailwind CSS v4 project (v3 is rejected with upgrade instructions).

Global flags: `--cwd <dir>` runs against another directory; every command accepts `-y, --yes` (accept defaults, never prompt) and `--registry <source>` (a registry base URL **or** a local directory). The registry is resolved in this order: `--registry` → `REGISTRY_URL` → the `registry` field in `components.json` → the built-in default. Set `SMARTERAUI_DEBUG=1` to print stack traces.

## `init`

Configures the current project: detects the framework, TypeScript vs JavaScript, a `src/` folder, the import alias from `tsconfig.json` paths, the Tailwind version and the package manager — then writes `components.json`, `styles/theme.css`, the `cx` utility, the Tailwind `@source` scan line and a `ThemeProvider` in the app entry point.

```bash
npx smarteraui@latest init              # auto-detect everything
npx smarteraui@latest init --nextjs     # force the Next.js layout
npx smarteraui@latest init --vite       # force the Vite layout
npx smarteraui@latest init --manual     # write the files, leave the entry point alone
npx smarteraui@latest init --overwrite  # replace components.json and existing files
npx smarteraui@latest init --yes        # non-interactive (CI)
```

`components.json` — read by every other command:

```json
{
    "$schema": "https://smarteraui.com/schema.json",
    "style": "default",
    "tsx": true,
    "tailwind": { "css": "app/globals.css", "theme": "src/styles/theme.css", "prefix": "" },
    "aliases": { "components": "@/components", "utils": "@/utils", "ui": "@/components/base", "hooks": "@/hooks" },
    "registry": "https://smarteraui.com/r"
}
```

## `add`

Resolves each component plus its registry dependencies recursively, copies the files to the targets from `components.json`, rewrites `@/` imports to your alias, installs any missing npm packages and prints exactly what changed. Running it twice without `--overwrite` reports no changes.

```bash
npx smarteraui add button                     # one component
npx smarteraui add button input select table  # several at once
npx smarteraui add table --overwrite          # replace files that already exist
npx smarteraui add table --dry-run            # print the plan, write nothing
npx smarteraui add badges --path src/ui       # ignore the alias, write here
npx smarteraui add --all                      # every component in the registry
```

Unknown names are matched fuzzily, so a typo comes back as a suggestion rather than a stack trace.

## `add example`

Adds a whole page example — a dashboard, a settings page, a login screen, a pricing section — together with every component it uses.

```bash
npx smarteraui add example settings-01
npx smarteraui add example hero-split-image-01
```

## `list`

Lists what the registry holds, with layer and description.

```bash
npx smarteraui list
npx smarteraui list --layer base          # base · application · marketing · …
npx smarteraui list --type example        # component · example · util · hook · style
npx smarteraui list --json                # raw index rows, for scripts
```

## `search`

Fuzzy search over component names, descriptions and example names.

```bash
npx smarteraui search "date"
npx smarteraui search "empty state" --limit 5
```

## `diff`

Shows how the files in your project differ from the registry version — the upgrade path once you have edited copied-in code.

```bash
npx smarteraui diff            # everything already installed
npx smarteraui diff button     # just this component
```

## `login`

Only needed for a private registry; the public one is anonymous. Stores the token at `~/.smarteraui/auth.json`.

```bash
npx smarteraui login
npx smarteraui login --token <token>   # non-interactive
```

## License

MIT © Ayman Shabaro. See [LICENSE](./LICENSE).
