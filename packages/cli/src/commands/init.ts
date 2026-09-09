/**
 * `smarteraui init` — configure an existing project.
 *
 * Detects framework / TypeScript / `src` / alias / Tailwind version / package manager,
 * writes components.json, copies styles/theme.css, wires the `@source` scan line and the
 * ThemeProvider, and creates utils/cx.ts.
 *
 * Spec: docs/cli.md
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CONFIG_SCHEMA_URL, type ComponentsConfig, configPath, readConfig, writeConfig } from "../config.js";
import { FRAMEWORK_LABEL, type Framework, type ProjectInfo, defaultCssFile, detectProject } from "../detect.js";
import { type WriteResult, writeSourceFile } from "../files.js";
import { ask, confirm } from "../prompt.js";
import { DEFAULT_REGISTRY_URL, Registry, resolveRegistrySource } from "../registry.js";
import { CX_TS_FALLBACK, THEME_CSS_PLACEHOLDER, THEME_PROVIDER_JSX, THEME_PROVIDER_TSX } from "../templates.js";
import { kleur, log, spinner } from "../ui.js";

export interface InitOptions {
    nextjs?: boolean;
    vite?: boolean;
    manual?: boolean;
    yes?: boolean;
    overwrite?: boolean;
    registry?: string;
    cwd?: string;
}

/** Tailwind v3 is not supported — the token layer is written entirely in v4 `@theme` syntax. */
const TAILWIND_V3_MESSAGE = [
    "Smartera UI requires Tailwind CSS v4. This project is on v3.",
    "",
    "  1. npx @tailwindcss/upgrade@latest",
    "  2. Replace tailwind.config.js content with the v4 CSS-first setup:",
    '       @import "tailwindcss";',
    "  3. Re-run: npx smarteraui init",
    "",
    "Upgrade guide: https://tailwindcss.com/docs/upgrade-guide",
].join("\n");

function frameworkOverride(options: InitOptions): Framework | undefined {
    if (options.nextjs) return "next-app";
    if (options.vite) return "vite";
    return undefined;
}

/** POSIX-style relative import path, always prefixed with `./` when it stays inside `from`. */
function relativeCssPath(from: string, to: string): string {
    const relative = path.relative(path.dirname(from), to).split(path.sep).join("/");
    return relative.startsWith(".") ? relative : `./${relative}`;
}

/**
 * Appends whatever is missing to the project's global stylesheet: the Tailwind import, the
 * theme token import and the `@source` line that makes Tailwind scan the copied components.
 */
function wireStylesheet(cwd: string, config: ComponentsConfig, dryRun: boolean): { file: string; added: string[] } {
    const cssFile = path.resolve(cwd, config.tailwind.css);
    const existing = existsSync(cssFile) ? readFileSync(cssFile, "utf8") : "";

    const themeImport = `@import "${relativeCssPath(cssFile, path.resolve(cwd, config.tailwind.theme))}";`;
    const componentsDir = path.resolve(cwd, config.tailwind.theme, "..", "..", "components");
    const sourceLine = `@source "${relativeCssPath(cssFile, componentsDir)}/**/*.{ts,tsx,js,jsx}";`;

    const wanted = ['@import "tailwindcss";', themeImport, sourceLine];
    const added = wanted.filter((line) => !existing.includes(line));
    if (added.length === 0) return { file: cssFile, added };

    const header = existing.trim().length > 0 ? `${added.join("\n")}\n\n${existing.replace(/^\uFEFF/, "")}` : `${added.join("\n")}\n`;
    if (!dryRun) {
        mkdirSync(path.dirname(cssFile), { recursive: true });
        writeFileSync(cssFile, header, "utf8");
    }
    return { file: cssFile, added };
}

/** Candidate root files to wrap in `<ThemeProvider>`, most specific first. */
function entryCandidates(project: ProjectInfo): string[] {
    const roots = project.srcDir ? ["src", "."] : [".", "src"];
    const names =
        project.framework === "next-app"
            ? ["app/layout.tsx", "app/layout.jsx"]
            : project.framework === "next-pages"
              ? ["pages/_app.tsx", "pages/_app.jsx"]
              : ["main.tsx", "main.jsx", "index.tsx", "index.jsx"];
    return roots.flatMap((root) => names.map((name) => path.join(project.cwd, root, name)));
}

/**
 * Re-indents a block of JSX to `indent`, preserving its own relative indentation. The first
 * line is already trimmed by the caller, so the common prefix is measured on the rest.
 */
function reindent(block: string, indent: string): string {
    const lines = block.replace(/\s+$/, "").split("\n");
    const rest = lines.slice(1).filter((line) => line.trim());
    const common = rest.length > 0 ? Math.min(...rest.map((line) => (/^\s*/.exec(line)?.[0] ?? "").length)) : 0;
    return lines.map((line, index) => (index === 0 ? `${indent}${line.trim()}` : line.trim() ? `${indent}${line.slice(common)}` : "")).join("\n");
}

/**
 * Wraps the app's root element in `<ThemeProvider>`. Conservative on purpose: if the entry
 * does not match a shape we recognise, nothing is touched and the caller prints a snippet.
 */
function wireThemeProvider(project: ProjectInfo, config: ComponentsConfig, dryRun: boolean): { file: string; changed: boolean } | null {
    const entry = entryCandidates(project).find((candidate) => existsSync(candidate));
    if (!entry) return null;

    const source = readFileSync(entry, "utf8");
    if (source.includes("ThemeProvider")) return { file: entry, changed: false };

    const importPath = `${config.aliases.components.replace(/\/components$/, "")}/providers/theme-provider`;
    const importLine = `import { ThemeProvider } from "${importPath}";`;

    let next: string | null = null;

    // Next.js layouts: wrap the children of <body>.
    const bodyMatch = /^([ \t]*)(<body[^>]*>)([\s\S]*?)(<\/body>)/m.exec(source);
    const renderStart = source.indexOf(".render(");

    if (bodyMatch?.[2] && bodyMatch[3]?.trim() && bodyMatch[4]) {
        const indent = bodyMatch[1] ?? "";
        const inner = bodyMatch[3].trim();
        const wrapped = inner.includes("\n")
            ? `${indent}    <ThemeProvider>\n${reindent(inner, `${indent}        `)}\n${indent}    </ThemeProvider>`
            : `${indent}    <ThemeProvider>${inner}</ThemeProvider>`;
        next = source.replace(bodyMatch[0], `${indent}${bodyMatch[2]}\n${wrapped}\n${indent}${bodyMatch[4]}`);
    } else if (renderStart !== -1) {
        // Vite / CRA entries: wrap the tree handed to createRoot(...).render(...).
        const open = renderStart + ".render(".length;
        const close = source.lastIndexOf(")");
        const inner = close > open ? source.slice(open, close).trim().replace(/,$/, "") : "";
        if (inner) {
            next = `${source.slice(0, open)}\n    <ThemeProvider>\n${reindent(inner, "        ")}\n    </ThemeProvider>,\n${source.slice(close)}`;
        }
    }

    if (!next) return { file: entry, changed: false };

    const withImport = /^(["']use client["'];?\s*\n)?/.exec(next);
    const insertAt = withImport?.[0]?.length ?? 0;
    next = `${next.slice(0, insertAt)}${importLine}\n${next.slice(insertAt)}`;

    if (!dryRun) writeFileSync(entry, next, "utf8");
    return { file: entry, changed: true };
}

export async function runInit(options: InitOptions): Promise<void> {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const project = detectProject(cwd, frameworkOverride(options));

    log.title("Configuring this project for Smartera UI");
    log.step(`Framework       ${FRAMEWORK_LABEL[project.framework]}`);
    log.step(`Language        ${project.typescript ? "TypeScript" : "JavaScript"}`);
    log.step(`Source folder   ${project.srcDir ? "src/" : "project root"}`);
    log.step(`Import alias    ${project.aliasPrefix}${project.aliasDeclared ? "" : kleur.yellow(" (not declared in tsconfig paths)")}`);
    log.step(`Tailwind        ${project.tailwindVersion ? `v${project.tailwindVersion}` : "not installed"}`);
    log.step(`Package manager ${project.packageManager}`);
    log.plain();

    if (project.tailwindVersion === 3) {
        log.error(TAILWIND_V3_MESSAGE);
        process.exitCode = 1;
        return;
    }
    if (!project.aliasDeclared) {
        log.warn(`No \`paths\` mapping found. Add this to tsconfig.json so \`${project.aliasPrefix}\` resolves:`);
        log.plain(kleur.dim(`        "baseUrl": ".", "paths": { "${project.aliasPrefix}*": ["./${project.srcDir ? "src/" : ""}*"] }`));
        log.plain();
    }

    const existingConfig = readConfig(cwd);
    if (existingConfig && !options.overwrite) {
        const proceed = await confirm(`${path.basename(configPath(cwd))} already exists. Overwrite it?`, { yes: options.yes, fallback: false });
        if (!proceed) {
            log.info("Keeping the existing components.json; only missing files will be written.");
        }
    }

    const baseRelative = path.relative(cwd, project.aliasBase).split(path.sep).join("/");
    const withBase = (target: string) => (baseRelative && baseRelative !== "." ? `${baseRelative}/${target}` : target);

    const cssFile = await ask("Where is your global stylesheet?", {
        yes: options.yes,
        initial: existingConfig?.tailwind.css ?? project.cssFile ?? defaultCssFile(project.framework, project.srcDir),
    });
    const registrySource = resolveRegistrySource(options.registry, existingConfig?.registry);
    const alias = project.aliasPrefix;

    const config: ComponentsConfig = {
        $schema: CONFIG_SCHEMA_URL,
        style: "default",
        tsx: project.typescript,
        tailwind: {
            css: cssFile,
            theme: withBase("styles/theme.css"),
            prefix: "",
        },
        aliases: {
            components: `${alias}components`,
            utils: `${alias}utils`,
            ui: `${alias}components/base`,
            hooks: `${alias}hooks`,
        },
        registry: registrySource.startsWith("http") ? registrySource : (existingConfig?.registry ?? DEFAULT_REGISTRY_URL),
    };

    if (!existingConfig || options.overwrite) writeConfig(cwd, config);

    const registry = new Registry(registrySource);
    const writes: WriteResult[] = [];
    const writeOptions = { cwd, overwrite: Boolean(options.overwrite), dryRun: false };

    // styles/theme.css — from the registry when reachable, placeholder otherwise.
    const themeSpinner = spinner(`Fetching theme tokens from ${registry.describe()}`);
    let themeCss = THEME_CSS_PLACEHOLDER;
    let themeFromRegistry = false;
    let cxSource = CX_TS_FALLBACK;
    try {
        const styles = await registry.item("styles");
        themeCss = styles.files.find((file) => file.target.endsWith("theme.css"))?.content ?? themeCss;
        themeFromRegistry = true;
        cxSource = (await registry.item("cx")).files[0]?.content ?? cxSource;
        themeSpinner.succeed("Fetched theme tokens and utils/cx from the registry.");
    } catch (error) {
        themeSpinner.stop();
        log.warn(`Registry unavailable (${(error as Error).message}).`);
        log.warn("Wrote placeholder theme tokens — run `smarteraui add styles --overwrite` once the registry is reachable.");
    }

    writes.push(writeSourceFile(path.resolve(cwd, config.tailwind.theme), themeCss, writeOptions));
    writes.push(writeSourceFile(path.resolve(project.aliasBase, config.tsx ? "utils/cx.ts" : "utils/cx.js"), cxSource, writeOptions));
    writes.push(
        writeSourceFile(
            path.resolve(project.aliasBase, config.tsx ? "providers/theme-provider.tsx" : "providers/theme-provider.jsx"),
            config.tsx ? THEME_PROVIDER_TSX : THEME_PROVIDER_JSX,
            writeOptions,
        ),
    );

    const stylesheet = wireStylesheet(cwd, config, false);
    const wiring = options.manual ? null : wireThemeProvider(project, config, false);

    log.plain();
    log.title("Changes");
    log.step(`${kleur.green("write")} ${path.relative(cwd, configPath(cwd))}`);
    for (const result of writes) log.step(`${statusLabel(result.status)} ${result.relative}`);
    if (stylesheet.added.length > 0) {
        log.step(
            `${kleur.green("write")} ${path.relative(cwd, stylesheet.file)} (+${stylesheet.added.length} line${stylesheet.added.length === 1 ? "" : "s"})`,
        );
        for (const line of stylesheet.added) log.plain(kleur.dim(`        ${line}`));
    } else {
        log.step(`${kleur.dim("keep ")} ${path.relative(cwd, stylesheet.file)} (already wired)`);
    }

    if (wiring?.changed) {
        log.step(`${kleur.green("write")} ${path.relative(cwd, wiring.file)} (wrapped in <ThemeProvider>)`);
    } else {
        const importPath = `${config.aliases.components.replace(/\/components$/, "")}/providers/theme-provider`;
        log.plain();
        log.info(options.manual ? "Manual mode — wrap your app yourself:" : "Could not wire the provider automatically. Wrap your app root yourself:");
        log.plain(kleur.dim(`        import { ThemeProvider } from "${importPath}";`));
        log.plain(kleur.dim("        <ThemeProvider>{children}</ThemeProvider>"));
    }

    log.plain();
    if (!themeFromRegistry) log.warn("Theme tokens are a placeholder — see the note above.");
    log.success("Project configured. Next: npx smarteraui add button badges");
}

function statusLabel(status: WriteResult["status"]): string {
    if (status === "created") return kleur.green("write");
    if (status === "updated") return kleur.yellow("updat");
    if (status === "skipped") return kleur.dim("skip ");
    return kleur.dim("keep ");
}
