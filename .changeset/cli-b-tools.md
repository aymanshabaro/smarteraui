---
"@properui/cli": minor
---

Fixes the CLI honesty and dependency-hygiene gaps from the agent feedback map (2.6, 2.7, 2.8,
2.10, 2.13, 2.21):

- `info` probes the registry regardless of whether `components.json` exists yet, so
  `registryReachable` reflects the network instead of always being `false` on a fresh project
  (2.7). Its `installed` field now mirrors the new manifest below.
- `add` records every installed entry in `components.json` under
  `installed: { [name]: { version, files, installedAt } }`. `diff` and `info` read it instead of
  re-scanning the filesystem or the whole registry index. Two new commands use it too:
  `remove <entry...>` deletes an entry's files (only those not shared with another installed
  entry) and reports npm dependencies that may now be orphaned; `why <file|entry>` prints the
  dependency chain that brought something in.
- `add`'s install block always prints last. When npm dependencies are missing and neither
  `--yes` nor a TTY is available, it now exits non-zero with `Install to finish: <cmd>` as its
  final line instead of silently printing "Skipped install" with exit 0. `--yes` still installs.
  New `--no-optional` skips `optionalRegistryDependencies` (installed by default; the summary
  labels them `(optional)`). New `--with-demos` also writes an entry's `kind: "demo"` files when
  the registry publishes them. Missing npm dependencies are attributed to the specific file that
  needs them when the registry provides per-file `dependencies` (`need recharts
(metrics-chart.tsx)`).
- `search` applies a real score threshold and prints `no match for "x"` instead of forcing a
  weak match; it also indexes `exports.json` so a query like `combobox` finds `select` (which
  exports `ComboBox` but never says so in its name/title/description) and reports the actual
  file. Counts are now honest: `N docs examples · M files`, and 0-file entries never appear.
  New `icons <query>` (also `search --icons`) fuzzy-searches the icon export index and prints
  the import line.
- `list` hides 0-file entries and shows a file count per entry.
- New `check [dir]` scans `.ts`/`.tsx`/`.jsx` files for raw Tailwind palette classes, hardcoded
  `dark:` variants and arbitrary colour values, printing `file:line` and exiting non-zero on any
  hit; the regexes are documented in `--help`.

All of the above degrades gracefully against a registry built before these fields existed:
`optionalRegistryDependencies`, per-file `dependencies`/`kind`, `icons.json` and `exports.json`
are all optional.
