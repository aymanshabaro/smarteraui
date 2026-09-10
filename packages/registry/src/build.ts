/**
 * Builds the component registry consumed by the CLI and the docs variant gallery.
 * Spec: docs/spec/00-foundation/09-cli-and-distribution.md
 *
 * Walks packages/ui/src/components, derives internal deps (registryDependencies)
 * and external deps (dependencies) from imports, and writes:
 *   packages/registry/dist/index.json
 *   packages/registry/dist/<name>.json
 * Fails if a component imports a package not in the allow-list.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const UI_SRC = path.join(REPO, "packages", "ui", "src");
const SRC = path.join(UI_SRC, "components");
const CONTENT = path.join(REPO, "apps", "docs", "content");
const OUT = path.join(REPO, "packages", "registry", "dist");
const SCHEMA_FILE = path.join(REPO, "packages", "registry", "schema.json");

/** Layers walked by the build, in the order they appear in the index. */
const LAYERS = ["base", "application", "marketing", "app-examples", "marketing-examples", "foundations", "shared-assets"] as const;
type Layer = (typeof LAYERS)[number];

/** Layers whose per-variant files each become their own `example` entry (AGENT-BRIEF §5). */
const EXAMPLE_LAYERS = new Set<string>(["marketing", "marketing-examples", "app-examples"]);

/**
 * Allowed external imports: every runtime dependency of `packages/ui`, plus the React /
 * Next peers. Read from packages/ui/package.json so the two can never drift.
 */
const uiPackageJson = JSON.parse(readFileSync(path.join(REPO, "packages", "ui", "package.json"), "utf8")) as {
    dependencies?: Record<string, string>;
};
const ALLOWED = new Set<string>([...Object.keys(uiPackageJson.dependencies ?? {}), "react", "react-dom", "next"]);

type FileType = "component" | "util" | "hook" | "style";
type EntryType = "component" | "example" | "util" | "hook" | "style";

type RegistryFile = {
    path: string;
    target: string;
    type: FileType;
    content: string;
};

type RegistryEntry = {
    name: string;
    layer: string;
    type: EntryType;
    title: string;
    description: string;
    files: RegistryFile[];
    registryDependencies: string[];
    dependencies: string[];
    cssVars: string[];
    examples: string[];
    docs?: string;
};

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const isDir = (target: string) => existsSync(target) && statSync(target).isDirectory();

const listDir = (dir: string) => (isDir(dir) ? readdirSync(dir).sort() : []);

/** Every file under `dir`, depth-first, as absolute paths. */
const walkFiles = (dir: string): string[] =>
    listDir(dir).flatMap((name) => {
        const full = path.join(dir, name);
        return statSync(full).isDirectory() ? walkFiles(full) : [full];
    });

const isDemoOrTest = (file: string) => /\.(demo|story|stories|test|spec)\.[jt]sx?$/.test(path.basename(file));

const stripExtension = (value: string) => value.replace(/\.[jt]sx?$/, "");

/** `packages/ui/src/components/base/badges/badges.tsx` → `components/base/badges/badges.tsx`. */
const uiRelative = (absolute: string) => path.relative(UI_SRC, absolute).split(path.sep).join("/");

const fileTypeFor = (relative: string): FileType => {
    if (relative.startsWith("hooks/")) return "hook";
    if (relative.startsWith("utils/")) return "util";
    if (relative.startsWith("styles/")) return "style";
    return "component";
};

/** `PillColor` → `pill-color`, `WithCloseXBadgeColor` → `with-close-x-badge-color`. */
const kebab = (value: string) =>
    value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();

/** `badge-groups` → `Badge groups`. Only used when no MDX page supplies a title. */
const titleize = (value: string) => {
    const words = value.split("-");
    const [first = "", ...rest] = words;
    return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" ");
};

const unique = (values: string[]) => [...new Set(values)].sort();

// ---------------------------------------------------------------------------
// Import parsing
// ---------------------------------------------------------------------------

type ParsedImport = { source: string; typeOnly: boolean };

/**
 * Extracts every module specifier a file references. Type-only imports are flagged so they
 * can be excluded from the runtime `dependencies` list (they erase at compile time).
 */
const parseImports = (rawCode: string): ParsedImport[] => {
    const found: ParsedImport[] = [];

    // Blank out template literals before scanning. Several demos embed sample source in a
    // template literal (e.g. a code-snippet panel), and those lines are not real imports.
    // Newlines are preserved so the `^`/`\n` anchors below still behave.
    const code = rawCode.replace(/`(?:\\[\s\S]|[^`\\])*`/g, (literal) => literal.replace(/[^\n]/g, " "));

    // `import … from "x"` / `export … from "x"` — the clause never contains ; " or '.
    const fromRe = /(?:^|[\n;}])[ \t]*(?:import|export)\s+([^;"']*?)\s*from\s*["']([^"']+)["']/g;
    for (let match = fromRe.exec(code); match; match = fromRe.exec(code)) {
        const clause = (match[1] ?? "").trim();
        const source = match[2];
        if (source) found.push({ source, typeOnly: clause === "type" || clause.startsWith("type ") || clause.startsWith("type{") });
    }

    // Side-effect imports: `import "./x.css"`.
    const bareRe = /(?:^|[\n;])[ \t]*import\s*["']([^"']+)["']/g;
    for (let match = bareRe.exec(code); match; match = bareRe.exec(code)) {
        if (match[1]) found.push({ source: match[1], typeOnly: false });
    }

    // Dynamic imports.
    const dynamicRe = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g;
    for (let match = dynamicRe.exec(code); match; match = dynamicRe.exec(code)) {
        if (match[1]) found.push({ source: match[1], typeOnly: false });
    }

    return found;
};

/** `motion/react` → `motion`, `@react-aria/utils/x` → `@react-aria/utils`. */
const packageRootOf = (specifier: string) => {
    const segments = specifier.split("/");
    return specifier.startsWith("@") ? segments.slice(0, 2).join("/") : (segments[0] ?? specifier);
};

/**
 * Resolves an internal specifier (`@/…` or `./…`) to a file inside packages/ui/src.
 * Returns undefined when nothing on disk matches, which the caller reports as a warning.
 */
const resolveInternal = (specifier: string, fromFile: string): string | undefined => {
    const base = specifier.startsWith("@/") ? path.join(UI_SRC, specifier.slice(2)) : path.resolve(path.dirname(fromFile), specifier);

    const candidates = [base, `${base}.tsx`, `${base}.ts`, path.join(base, "index.tsx"), path.join(base, "index.ts")];
    return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
};

/**
 * The registry entry a resolved file belongs to: the group folder (or single file) under
 * `components/<layer>/`, or the file basename for `utils/` and `hooks/`.
 */
const entryNameForFile = (absolute: string): string | undefined => {
    const relative = uiRelative(absolute);
    const segments = relative.split("/");
    if (segments[0] === "components") return segments[2] ? stripExtension(segments[2]) : undefined;
    if (segments[0] === "utils" || segments[0] === "hooks") return segments[1] ? stripExtension(segments[1]) : undefined;
    return undefined;
};

// ---------------------------------------------------------------------------
// Docs front-matter
// ---------------------------------------------------------------------------

type DocsPage = { title: string; description: string; docs: string };

/** MDX front-matter keyed by both the `install` slug and the file slug (spec 09 / AGENT-BRIEF §5). */
const readDocsPages = (): Map<string, DocsPage> => {
    const parsed: { slug: string; install?: string; sourceFolder?: string; page: DocsPage }[] = [];

    for (const area of ["components", "marketing"] as const) {
        for (const file of listDir(path.join(CONTENT, area))) {
            if (!file.endsWith(".mdx")) continue;
            const slug = file.replace(/\.mdx$/, "");
            const block = readFileSync(path.join(CONTENT, area, file), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
            const raw: Record<string, string> = {};
            for (const line of block?.[1]?.split(/\r?\n/) ?? []) {
                const separator = line.indexOf(":");
                if (separator === -1 || !line.trim() || line.trimStart().startsWith("#")) continue;
                const key = line.slice(0, separator).trim();
                const value = line
                    .slice(separator + 1)
                    .trim()
                    .replace(/^["']|["']$/g, "")
                    .trim();
                if (key && value) raw[key] = value;
            }

            parsed.push({
                slug,
                install: raw.install,
                // `source: packages/ui/src/components/base/badges` is the only front-matter key that
                // always names the group folder, so it catches pages whose slug is pluralised.
                sourceFolder: raw.source?.split("/").filter(Boolean).pop(),
                page: {
                    title: raw.title ?? titleize(slug),
                    description: raw.description ?? "",
                    docs: `/${area}/${slug}`,
                },
            });
        }
    }

    // Exact keys win over the folder fallback, so a page is never claimed by a sibling's `source`.
    const pages = new Map<string, DocsPage>();
    for (const { slug, page } of parsed) if (!pages.has(slug)) pages.set(slug, page);
    for (const { install, page } of parsed) if (install && !pages.has(install)) pages.set(install, page);
    for (const { sourceFolder, page } of parsed) if (sourceFolder && !pages.has(sourceFolder)) pages.set(sourceFolder, page);
    return pages;
};

// ---------------------------------------------------------------------------
// Entry discovery
// ---------------------------------------------------------------------------

type Group = { name: string; layer: Layer; dir: string; files: string[]; demoFiles: string[] };

const discoverGroups = (): Group[] => {
    const groups: Group[] = [];

    for (const layer of LAYERS) {
        const layerDir = path.join(SRC, layer);
        for (const name of listDir(layerDir)) {
            const full = path.join(layerDir, name);
            const directory = statSync(full).isDirectory();
            if (!directory && !/\.[jt]sx?$/.test(name)) continue;

            const all = directory ? walkFiles(full) : [full];
            groups.push({
                name: stripExtension(name),
                layer,
                dir: directory ? full : layerDir,
                files: all.filter((file) => !isDemoOrTest(file)),
                demoFiles: all.filter((file) => /\.demo\.[jt]sx?$/.test(path.basename(file))),
            });
        }
    }

    return groups;
};

/**
 * Variant slugs for an example group. `variants*.ts` (generated by `pnpm gen:variant-parts`)
 * is authoritative when present; otherwise every non-shared root-level `.tsx` counts.
 */
const variantSlugsFor = (group: Group): string[] => {
    const variantFiles = group.files.filter((file) => /^variants(\.[a-z0-9]+)?\.ts$/.test(path.basename(file)));
    if (variantFiles.length > 0) {
        const slugs = variantFiles.flatMap((file) => {
            const code = readFileSync(file, "utf8");
            const body = code.slice(code.indexOf("= {"));
            return [...body.matchAll(/["']([a-z0-9][a-z0-9-]*)["']\s*:/g)].flatMap((match) => (match[1] ? [match[1]] : []));
        });
        return unique(slugs);
    }

    // Fallback: plain kebab-cased root files. `charts.a.tsx` / `settings-shell.tsx` style part and
    // shell files are shared building blocks, not variants, so they stay out of the slug list.
    return unique(
        group.files
            .filter((file) => path.dirname(file) === group.dir && /^[a-z0-9][a-z0-9-]*\.tsx$/.test(path.basename(file)))
            .map((file) => stripExtension(path.basename(file)))
            .filter((slug) => slug !== group.name && slug !== "index" && !slug.includes("shared") && !slug.includes("shell") && !slug.startsWith("variants")),
    );
};

type ExampleCandidate = { slug: string; group: Group; entryFile: string; siblings: number };

const commonPrefixLength = (a: string, b: string) => {
    let length = 0;
    while (length < a.length && length < b.length && a[length] === b[length]) length += 1;
    return length;
};

/**
 * Two sibling groups occasionally ship the same variant slug while the library is being built in
 * parallel. Prefer the group whose name best matches the slug, then the more complete set, then
 * alphabetical order — deterministic, and the loser is reported rather than silently dropped.
 */
const preferredExample = (a: ExampleCandidate, b: ExampleCandidate): [ExampleCandidate, ExampleCandidate] => {
    const byPrefix = commonPrefixLength(b.group.name, b.slug) - commonPrefixLength(a.group.name, a.slug);
    if (byPrefix !== 0) return byPrefix < 0 ? [a, b] : [b, a];
    if (a.siblings !== b.siblings) return a.siblings > b.siblings ? [a, b] : [b, a];
    return a.group.name.localeCompare(b.group.name) <= 0 ? [a, b] : [b, a];
};

/** The variant file plus every file it pulls in relatively from the same group folder. */
const exampleFileSet = (entryFile: string, group: Group): string[] => {
    const seen = new Set<string>([entryFile]);
    const queue = [entryFile];

    while (queue.length > 0) {
        const current = queue.pop();
        if (!current) break;
        for (const { source } of parseImports(readFileSync(current, "utf8"))) {
            if (!source.startsWith(".")) continue;
            const resolved = resolveInternal(source, current);
            if (!resolved || seen.has(resolved) || !resolved.startsWith(`${group.dir}${path.sep}`)) continue;
            if (isDemoOrTest(resolved)) continue;
            seen.add(resolved);
            queue.push(resolved);
        }
    }

    return [...seen].sort();
};

// ---------------------------------------------------------------------------
// Dependency derivation
// ---------------------------------------------------------------------------

type Disallowed = { file: string; specifier: string };

type Derived = { registryDependencies: string[]; dependencies: string[]; disallowed: Disallowed[]; unresolved: string[] };

const deriveDependencies = (files: string[], selfName: string, knownEntries: Set<string>): Derived => {
    const registryDependencies = new Set<string>();
    const dependencies = new Set<string>();
    const disallowed: Disallowed[] = [];
    const unresolved: string[] = [];

    for (const file of files) {
        if (!/\.[jt]sx?$/.test(file)) continue;
        for (const { source, typeOnly } of parseImports(readFileSync(file, "utf8"))) {
            if (source.startsWith("@/") || source.startsWith(".")) {
                const resolved = resolveInternal(source, file);
                if (!resolved) {
                    unresolved.push(`${uiRelative(file)} → ${source}`);
                    continue;
                }
                const name = entryNameForFile(resolved);
                if (!name || name === selfName) continue;
                if (knownEntries.has(name)) registryDependencies.add(name);
                else unresolved.push(`${uiRelative(file)} → ${source} (no registry entry)`);
                continue;
            }

            const root = packageRootOf(source);
            // Type-only imports erase at compile time, so they never become runtime deps.
            if (typeOnly) continue;
            if (!ALLOWED.has(root)) {
                disallowed.push({ file: uiRelative(file), specifier: source });
                continue;
            }
            dependencies.add(root);
        }
    }

    return {
        registryDependencies: [...registryDependencies].sort(),
        dependencies: [...dependencies].sort(),
        disallowed,
        unresolved,
    };
};

const toRegistryFiles = (files: string[]): RegistryFile[] =>
    files.map((file) => {
        const relative = uiRelative(file);
        return { path: relative, target: relative, type: fileTypeFor(relative), content: readFileSync(file, "utf8") };
    });

/** Every `export const X` in the group's `.demo.tsx` files, kebab-cased into example ids. */
const exampleIdsFor = (group: Group): string[] =>
    unique(
        group.demoFiles.flatMap((file) =>
            [...readFileSync(file, "utf8").matchAll(/^export\s+const\s+([A-Za-z0-9_]+)/gm)].flatMap((match) => (match[1] ? [kebab(match[1])] : [])),
        ),
    );

// ---------------------------------------------------------------------------
// JSON schema + minimal validator (no new dependencies)
// ---------------------------------------------------------------------------

type Schema = {
    type?: string;
    enum?: string[];
    pattern?: string;
    required?: string[];
    properties?: Record<string, Schema>;
    additionalProperties?: boolean;
    items?: Schema;
};

const SCHEMA: Schema & { $schema: string; $id: string; title: string; description: string } = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://smarteraui.com/schema.json",
    title: "Smartera UI registry entry",
    description: "One component, example, util, hook or stylesheet as served from /r/<name>.json.",
    type: "object",
    required: ["name", "layer", "type", "title", "files", "registryDependencies", "dependencies", "cssVars", "examples"],
    additionalProperties: false,
    properties: {
        name: { type: "string", pattern: "^[a-z0-9][a-z0-9-]*$" },
        layer: { type: "string", enum: [...LAYERS, "utils", "hooks", "styles"] },
        type: { type: "string", enum: ["component", "example", "util", "hook", "style"] },
        title: { type: "string" },
        description: { type: "string" },
        docs: { type: "string" },
        files: {
            type: "array",
            items: {
                type: "object",
                required: ["path", "target", "type", "content"],
                additionalProperties: false,
                properties: {
                    path: { type: "string" },
                    target: { type: "string" },
                    type: { type: "string", enum: ["component", "util", "hook", "style"] },
                    content: { type: "string" },
                },
            },
        },
        registryDependencies: { type: "array", items: { type: "string" } },
        dependencies: { type: "array", items: { type: "string" } },
        cssVars: { type: "array", items: { type: "string" } },
        examples: { type: "array", items: { type: "string" } },
    },
};

/** Tiny draft-07 subset validator: type / required / properties / additionalProperties / items / enum / pattern. */
const validate = (value: unknown, schema: Schema, at = "$"): string[] => {
    const errors: string[] = [];

    if (schema.type === "array") {
        if (!Array.isArray(value)) return [`${at}: expected array`];
        if (schema.items) value.forEach((item, index) => errors.push(...validate(item, schema.items as Schema, `${at}[${index}]`)));
        return errors;
    }

    if (schema.type === "object") {
        if (typeof value !== "object" || value === null || Array.isArray(value)) return [`${at}: expected object`];
        const record = value as Record<string, unknown>;
        for (const key of schema.required ?? []) if (!(key in record)) errors.push(`${at}: missing required property "${key}"`);
        for (const [key, item] of Object.entries(record)) {
            const property = schema.properties?.[key];
            if (!property) {
                if (schema.additionalProperties === false) errors.push(`${at}: unexpected property "${key}"`);
                continue;
            }
            if (item !== undefined) errors.push(...validate(item, property, `${at}.${key}`));
        }
        return errors;
    }

    if (schema.type === "string") {
        if (typeof value !== "string") return [`${at}: expected string`];
        if (schema.enum && !schema.enum.includes(value)) errors.push(`${at}: "${value}" is not one of ${schema.enum.join(", ")}`);
        if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${at}: "${value}" does not match ${schema.pattern}`);
        return errors;
    }

    return errors;
};

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

const build = () => {
    if (!isDir(SRC)) {
        console.error(`registry:build — no component source at ${SRC}`);
        process.exit(1);
    }

    const docsPages = readDocsPages();
    const groups = discoverGroups();

    // Pass 1 — the set of names that can legally appear in registryDependencies.
    const knownEntries = new Set<string>(["styles", "providers"]);
    for (const group of groups) knownEntries.add(group.name);
    for (const directory of ["utils", "hooks"] as const) {
        for (const file of listDir(path.join(UI_SRC, directory))) {
            if (/\.[jt]sx?$/.test(file)) knownEntries.add(stripExtension(file));
        }
    }
    for (const group of groups) {
        if (!EXAMPLE_LAYERS.has(group.layer)) continue;
        for (const slug of variantSlugsFor(group)) knownEntries.add(slug);
    }

    const entries: RegistryEntry[] = [];
    const disallowed: Disallowed[] = [];
    const unresolved: string[] = [];

    const push = (entry: Omit<RegistryEntry, "docs"> & { docs?: string }, derived: Derived) => {
        disallowed.push(...derived.disallowed);
        unresolved.push(...derived.unresolved);
        entries.push(entry);
    };

    // Utils and hooks — referenced through `@/utils/*` and `@/hooks/*`, so they need entries
    // of their own for `registryDependencies` to resolve.
    for (const directory of ["utils", "hooks"] as const) {
        for (const file of listDir(path.join(UI_SRC, directory))) {
            if (!/\.[jt]sx?$/.test(file)) continue;
            const absolute = path.join(UI_SRC, directory, file);
            const name = stripExtension(file);
            const derived = deriveDependencies([absolute], name, knownEntries);
            push(
                {
                    name,
                    layer: directory,
                    type: directory === "utils" ? "util" : "hook",
                    title: titleize(name),
                    description: `Shared ${directory === "utils" ? "utility" : "hook"} used by Smartera UI components.`,
                    files: toRegistryFiles([absolute]),
                    registryDependencies: derived.registryDependencies,
                    dependencies: derived.dependencies,
                    cssVars: [],
                    examples: [],
                },
                derived,
            );
        }
    }

    // Stylesheets — what `smarteraui init` writes into a consuming project.
    const styleFiles = listDir(path.join(UI_SRC, "styles"))
        .filter((file) => file.endsWith(".css"))
        .map((file) => path.join(UI_SRC, "styles", file));
    if (styleFiles.length > 0) {
        entries.push({
            name: "styles",
            layer: "styles",
            type: "style",
            title: "Styles",
            description: "Theme tokens, globals and typography for Smartera UI.",
            files: toRegistryFiles(styleFiles),
            registryDependencies: [],
            dependencies: [],
            cssVars: [],
            examples: [],
        });
    }

    // Providers — `smarteraui init` wires these into the consuming app's root layout.
    const providerFiles = listDir(path.join(UI_SRC, "providers"))
        .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
        .map((file) => path.join(UI_SRC, "providers", file));
    if (providerFiles.length > 0) {
        const derivedProviders = deriveDependencies(providerFiles, "providers", knownEntries);
        entries.push({
            name: "providers",
            layer: "utils",
            type: "component",
            title: "Providers",
            description: "ThemeProvider and RouterProvider — the two providers a Smartera UI app wraps its root in.",
            files: toRegistryFiles(providerFiles),
            registryDependencies: derivedProviders.registryDependencies,
            dependencies: derivedProviders.dependencies,
            cssVars: [],
            examples: [],
        });
    }

    // One entry per group folder.
    for (const group of groups) {
        const derived = deriveDependencies(group.files, group.name, knownEntries);
        const page = docsPages.get(group.name);
        push(
            {
                name: group.name,
                layer: group.layer,
                type: "component",
                title: page?.title ?? titleize(group.name),
                description: page?.description ?? "",
                files: toRegistryFiles(group.files),
                registryDependencies: derived.registryDependencies,
                dependencies: derived.dependencies,
                cssVars: [],
                examples: exampleIdsFor(group),
                ...(page ? { docs: page.docs } : {}),
            },
            derived,
        );
    }

    // One entry per marketing / page-example variant file. Sibling groups sometimes declare the
    // same slug (see the collision report below), so candidates are resolved before they are written.
    const candidates: ExampleCandidate[] = [];
    for (const group of groups) {
        if (!EXAMPLE_LAYERS.has(group.layer)) continue;
        const slugs = variantSlugsFor(group);
        for (const slug of slugs) {
            const entryFile = group.files.find((file) => path.dirname(file) === group.dir && stripExtension(path.basename(file)) === slug);
            if (!entryFile) {
                unresolved.push(`${group.layer}/${group.name} → variant "${slug}" has no matching file`);
                continue;
            }
            candidates.push({ slug, group, entryFile, siblings: slugs.length });
        }
    }

    const taken = new Set(entries.map((entry) => entry.name));
    const winners = new Map<string, ExampleCandidate>();
    const shadowed: string[] = [];

    for (const candidate of candidates) {
        if (taken.has(candidate.slug)) {
            shadowed.push(`${candidate.group.layer}/${candidate.group.name}/${candidate.slug} (name already used by a component entry)`);
            continue;
        }
        const held = winners.get(candidate.slug);
        if (!held) {
            winners.set(candidate.slug, candidate);
            continue;
        }
        const [winner, loser] = preferredExample(held, candidate);
        winners.set(candidate.slug, winner);
        shadowed.push(`${loser.group.layer}/${loser.group.name}/${loser.slug} (shadowed by ${winner.group.layer}/${winner.group.name})`);
    }

    for (const { slug, group, entryFile } of [...winners.values()].sort((a, b) => a.slug.localeCompare(b.slug))) {
        const page = docsPages.get(group.name);
        const files = exampleFileSet(entryFile, group);
        const derived = deriveDependencies(files, slug, knownEntries);
        push(
            {
                name: slug,
                layer: group.layer,
                type: "example",
                title: titleize(slug),
                description: page ? `${page.title} — ${titleize(slug)} variant.` : "",
                files: toRegistryFiles(files),
                registryDependencies: derived.registryDependencies.filter((dependency) => dependency !== group.name),
                dependencies: derived.dependencies,
                cssVars: [],
                examples: [],
                ...(page ? { docs: `${page.docs}/${slug}` } : {}),
            },
            derived,
        );
    }

    // ---- Validation -------------------------------------------------------

    if (disallowed.length > 0) {
        console.error(`\nregistry:build — ${disallowed.length} disallowed import(s):\n`);
        for (const { file, specifier } of disallowed) console.error(`  ${file} → ${specifier}`);
        console.error(`\nAllowed: ${[...ALLOWED].sort().join(", ")}\n`);
        process.exit(1);
    }

    const duplicates = entries.map((entry) => entry.name).filter((name, index, all) => all.indexOf(name) !== index);
    if (duplicates.length > 0) {
        console.error(`registry:build — duplicate registry names: ${unique(duplicates).join(", ")}`);
        process.exit(1);
    }

    const schemaErrors = entries.flatMap((entry) => validate(entry, SCHEMA, entry.name));
    if (schemaErrors.length > 0) {
        console.error(`\nregistry:build — ${schemaErrors.length} schema violation(s):\n`);
        for (const error of schemaErrors.slice(0, 40)) console.error(`  ${error}`);
        process.exit(1);
    }

    // ---- Write ------------------------------------------------------------

    rmSync(OUT, { recursive: true, force: true });
    mkdirSync(OUT, { recursive: true });
    writeFileSync(SCHEMA_FILE, `${JSON.stringify(SCHEMA, null, 4)}\n`);

    for (const entry of entries) writeFileSync(path.join(OUT, `${entry.name}.json`), `${JSON.stringify(entry, null, 2)}\n`);

    const index = {
        $schema: "../schema.json",
        components: entries.map(({ files, ...rest }) => ({ ...rest, fileCount: files.length })),
    };
    writeFileSync(path.join(OUT, "index.json"), `${JSON.stringify(index, null, 2)}\n`);

    // ---- Stats --------------------------------------------------------------
    // Single generated source for every count quoted in the README and the landing page
    // (see apps/docs/components/landing/content.ts and README.md's `<!-- stats:start -->` block).
    // The four terms below are the only vocabulary those consumers are allowed to use.

    const groupCountByLayer = Object.fromEntries(
        LAYERS.map((layer) => [layer, entries.filter((entry) => entry.type === "component" && entry.layer === layer).length]),
    ) as Record<Layer, number>;

    const publishedGroups = groupCountByLayer.base + groupCountByLayer.application + groupCountByLayer.marketing;
    const allGroups = LAYERS.reduce((total, layer) => total + groupCountByLayer[layer], 0);

    const variantCount = entries.filter((entry) => entry.type === "example" && entry.layer === "marketing").length;
    const marketingPageExamples = entries.filter((entry) => entry.type === "example" && entry.layer === "marketing-examples").length;
    const appPageExamples = entries.filter((entry) => entry.type === "example" && entry.layer === "app-examples").length;

    const testSuiteFiles = walkFiles(SRC).filter((file) => /\.test\.tsx$/.test(file));
    const axeSuiteCount = testSuiteFiles.filter((file) => /toHaveNoViolations/.test(readFileSync(file, "utf8"))).length;

    const stats = {
        definitions: {
            entry: "One registry item of any type — component, example, hook, util or style. Every file written to packages/registry/dist/*.json.",
            group: 'One registry item of type "component": one folder under packages/ui/src/components/<layer>. `groups.published` counts the base, application and marketing layers only; `groups.all` counts every layer, including foundations, shared-assets, app-examples and marketing-examples.',
            variant: 'An "example" entry in the "marketing" layer — a single section variant.',
            example: 'An "example" entry in the "marketing-examples" or "app-examples" layer — a complete page.',
        },
        entries: entries.length,
        groups: {
            published: publishedGroups,
            all: allGroups,
            byLayer: {
                base: groupCountByLayer.base,
                application: groupCountByLayer.application,
                marketing: groupCountByLayer.marketing,
                appExamples: groupCountByLayer["app-examples"],
                marketingExamples: groupCountByLayer["marketing-examples"],
                foundations: groupCountByLayer.foundations,
                sharedAssets: groupCountByLayer["shared-assets"],
            },
        },
        variants: variantCount,
        examples: {
            marketing: marketingPageExamples,
            app: appPageExamples,
            total: marketingPageExamples + appPageExamples,
        },
        testSuites: testSuiteFiles.length,
        axeSuites: axeSuiteCount,
    };
    writeFileSync(path.join(OUT, "stats.json"), `${JSON.stringify(stats, null, 4)}\n`);

    // ---- Report -----------------------------------------------------------

    const components = entries.filter((entry) => entry.type === "component").length;
    const examples = entries.filter((entry) => entry.type === "example").length;
    const support = entries.length - components - examples;
    const fileCount = entries.reduce((total, entry) => total + entry.files.length, 0);

    if (unresolved.length > 0) {
        console.warn(`registry:build — ${unresolved.length} unresolved import(s):`);
        for (const item of unique(unresolved).slice(0, 20)) console.warn(`  ${item}`);
    }

    if (shadowed.length > 0) {
        console.warn(`registry:build — ${shadowed.length} duplicate variant slug(s) across sibling groups; kept one entry each:`);
        for (const item of unique(shadowed)) console.warn(`  ${item}`);
    }

    const out = path.relative(REPO, OUT).split(path.sep).join("/");
    console.log(
        `registry:build — ${entries.length} entries (${components} components, ${examples} examples, ${support} utils/hooks/styles), ${fileCount} files → ${out}`,
    );
};

build();
