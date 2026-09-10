/**
 * Clean-room release test for the smarteraui CLI.
 *
 * Proves a stranger can go from nothing to a building app using only the documented path:
 * scaffold a blank Next.js/Vite app with the framework's own official CLI, run
 * `smarteraui init` and `smarteraui add` against the *built* registry (no shortcuts, no
 * fixtures), let real `npm install`s happen for the components' dependencies, and run the
 * app's own `npm run build`.
 *
 * Unlike packages/cli/scripts/smoke.ts (which passes `--yes` in a sense that never installs
 * anything, by design, to stay fast), this script performs real npm installs end to end so a
 * dependency that resolves in components.json/registry metadata but does not actually exist
 * on npm — like the bug fixed in packages/cli/src/deps.ts, where component source imports the
 * bare specifier `@smarteraui/icons` but the package published to npm is `@untitledui/icons`
 * — gets caught before it reaches a real user.
 *
 * Usage: pnpm test:clean-room   (builds packages/registry first if their dist/ is missing)
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = path.join(REPO, "packages", "cli", "dist", "index.js");
const REGISTRY = path.join(REPO, "packages", "registry", "dist");
const RUN_ROOT = path.join(tmpdir(), `smarteraui-clean-room-${Date.now()}`);

/**
 * The registry entries this run adds, chosen to touch every layer the task asked for plus a
 * hook: `badges` (base), `alerts` (application), `social-proof-sections` (marketing) and
 * `use-clipboard` (hook) via one `add`, then `settings-17` (app-examples) via `add example`.
 * `badges` and `settings-17` both pull in `@smarteraui/icons`, so the npm-alias install path
 * gets exercised twice, once per framework.
 */
const COMPONENTS = ["badges", "alerts", "social-proof-sections", "use-clipboard"];
const EXAMPLE = "settings-17";

let currentStep = "startup";

function section(title: string): void {
    console.log(`\n${"=".repeat(3)} ${title} ${"=".repeat(3)}`);
}

/** Runs a command to completion, printing what it did and failing loudly with full output. */
function run(cwd: string, cmd: string, args: string[], options: { timeout?: number; env?: NodeJS.ProcessEnv } = {}): string {
    currentStep = `${cmd} ${args.join(" ")} (in ${cwd})`;
    console.log(`\n$ ${cmd} ${args.join(" ")}\n  (cwd: ${cwd})`);
    try {
        const output = execFileSync(cmd, args, {
            cwd,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
            timeout: options.timeout ?? 8 * 60 * 1000,
            maxBuffer: 1024 * 1024 * 128,
            env: { ...process.env, CI: "1", NO_COLOR: "1", FORCE_COLOR: "0", ...options.env },
        });
        console.log(output.trimEnd());
        return output;
    } catch (error) {
        const failure = error as { stdout?: string; stderr?: string; message: string };
        console.error(`\n!!! FAILED: ${cmd} ${args.join(" ")}`);
        if (failure.stdout) console.error(`--- stdout ---\n${failure.stdout}`);
        if (failure.stderr) console.error(`--- stderr ---\n${failure.stderr}`);
        throw new Error(`Clean-room failed at: ${cmd} ${args.join(" ")}\n${failure.message}`);
    }
}

/** Builds packages/registry dist output when it is missing, exactly like CI does from scratch. */
function ensureBuilt(): void {
    if (existsSync(CLI) && existsSync(path.join(REGISTRY, "index.json"))) {
        console.log(`Using existing build: ${CLI}\nUsing existing registry: ${REGISTRY}`);
        return;
    }
    section("Prereq — building packages and registry (dist missing)");
    run(REPO, "pnpm", ["build:packages"]);
    run(REPO, "pnpm", ["registry:build"]);
    if (!existsSync(CLI)) throw new Error(`${CLI} still missing after build:packages.`);
    if (!existsSync(path.join(REGISTRY, "index.json"))) throw new Error(`${REGISTRY}/index.json still missing after registry:build.`);
}

function readJson<T>(file: string): T {
    return JSON.parse(readFileSync(file, "utf8")) as T;
}

function walk(dir: string): string[] {
    if (!existsSync(dir)) return [];
    return readdirSync(dir).flatMap((name) => {
        if (name === "node_modules" || name === ".git") return [];
        const full = path.join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : [full];
    });
}

/**
 * Strips `//` and `/* *\/` comments while leaving string/template literals alone, so a
 * comment that happens to *mention* an import specifier (e.g. a "not ported yet" TODO) is
 * not mistaken for a real one.
 */
function stripComments(source: string): string {
    return source.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|(\/\/.*)|(\/\*[\s\S]*?\*\/)/g, (match, lineComment, blockComment) =>
        lineComment || blockComment ? "" : match,
    );
}

/**
 * Every `from "@/something"` import found under `srcRoot` must resolve to a real file.
 * This is what actually proves the CLI's alias rewriting/registry copy left no dangling
 * import behind — `npm run build`/`tsc` would also catch this, but the assertion is cheap,
 * explicit and independent of whichever build tool a given framework uses.
 */
function findDanglingAliasImports(appDir: string, srcRoot: string): string[] {
    const problems: string[] = [];
    const importRe = /from\s+["'](@\/[^"']+)["']/g;
    for (const file of walk(path.join(appDir, srcRoot))) {
        if (!/\.(tsx?|jsx?)$/.test(file)) continue;
        const content = stripComments(readFileSync(file, "utf8"));
        for (const match of content.matchAll(importRe)) {
            const specifier = match[1];
            if (!specifier) continue;
            const target = path.join(appDir, srcRoot, specifier.slice(2));
            const candidates = [
                target,
                `${target}.ts`,
                `${target}.tsx`,
                `${target}.js`,
                `${target}.jsx`,
                path.join(target, "index.ts"),
                path.join(target, "index.tsx"),
            ];
            if (!candidates.some((candidate) => existsSync(candidate))) {
                problems.push(`${path.relative(appDir, file)}: "${specifier}" does not resolve (looked for ${path.relative(appDir, target)}.*)`);
            }
        }
    }
    return problems;
}

/** `@smarteraui/icons` must resolve to real installed code, via the `npm:@untitledui/icons@...` alias. */
function assertIconsAliasInstalled(appDir: string): void {
    const pkg = readJson<{ dependencies?: Record<string, string> }>(path.join(appDir, "package.json"));
    const aliasSpec = pkg.dependencies?.["@smarteraui/icons"];
    if (!aliasSpec || !aliasSpec.startsWith("npm:@untitledui/icons")) {
        throw new Error(`package.json is missing the @smarteraui/icons npm alias (found: ${aliasSpec ?? "nothing"}).`);
    }
    const resolved = execFileSync(process.execPath, ["-e", "console.log(require.resolve('@smarteraui/icons'))"], {
        cwd: appDir,
        encoding: "utf8",
    }).trim();
    if (!resolved.includes(`${path.sep}node_modules${path.sep}@smarteraui${path.sep}icons${path.sep}`)) {
        throw new Error(`require.resolve('@smarteraui/icons') resolved somewhere unexpected: ${resolved}`);
    }
    console.log(`  ok   @smarteraui/icons installed via alias, resolves to ${resolved}`);
}

interface Target {
    name: "vite" | "next";
    /** Scaffolds the blank app at `appDir` using the framework's own official CLI. */
    scaffold: (appDir: string) => void;
    initFlag: "--vite" | "--nextjs";
    srcRoot: string;
}

const VITE: Target = {
    name: "vite",
    initFlag: "--vite",
    srcRoot: "src",
    scaffold(appDir: string) {
        const parent = path.dirname(appDir);
        run(parent, "npm", ["create", "vite@latest", path.basename(appDir), "--", "--template", "react-ts"]);
        run(appDir, "npm", ["install"]);

        // README "Quick start > React + Vite" documents Tailwind v4 for consumers of the npm
        // package; `init` does not install Tailwind itself for the copy-the-source workflow
        // either, so a real user hits the same two steps by hand. Do them the same way here.
        section("vite — installing Tailwind v4 + @tailwindcss/vite (README step, done by hand)");
        run(appDir, "npm", ["install", "-D", "tailwindcss", "@tailwindcss/vite"]);

        const viteConfigPath = path.join(appDir, "vite.config.ts");
        writeFileSync(
            viteConfigPath,
            [
                'import path from "node:path";',
                'import { fileURLToPath } from "node:url";',
                'import tailwindcss from "@tailwindcss/vite";',
                'import react from "@vitejs/plugin-react";',
                'import { defineConfig } from "vite";',
                "",
                "const dirname = path.dirname(fileURLToPath(import.meta.url));",
                "",
                "// https://vite.dev/config/",
                "export default defineConfig({",
                "    plugins: [react(), tailwindcss()],",
                "    resolve: {",
                '        alias: { "@": path.resolve(dirname, "./src") },',
                "    },",
                "});",
                "",
            ].join("\n"),
        );

        // Undocumented-but-necessary gap: Vite has no built-in tsconfig-paths support, so the
        // `@/*` alias `init` needs (and warns about when missing) has to be wired into both
        // tsconfig *and* the bundler, not just tsconfig as the CLI's own warning implies.
        const tsconfigAppPath = path.join(appDir, "tsconfig.app.json");
        const tsconfigApp = readFileSync(tsconfigAppPath, "utf8").replace(
            /"compilerOptions":\s*\{/,
            '"compilerOptions": {\n    "paths": { "@/*": ["./src/*"] },',
        );
        writeFileSync(tsconfigAppPath, tsconfigApp);
    },
};

const NEXT: Target = {
    name: "next",
    initFlag: "--nextjs",
    srcRoot: "src",
    scaffold(appDir: string) {
        const parent = path.dirname(appDir);
        // Flags verified against `npx create-next-app@latest --help` on 2026-09-10: there is
        // no `--no-eslint`, only an opt-in `--eslint` (ESLint is scaffolded by default either
        // way and does not affect the build we care about, so it is left alone).
        run(parent, "npx", [
            "--yes",
            "create-next-app@latest",
            path.basename(appDir),
            "--ts",
            "--app",
            "--tailwind",
            "--src-dir",
            "--import-alias",
            "@/*",
            "--use-npm",
            "--yes",
            "--disable-git",
        ]);
        // create-next-app already installs dependencies, wires the `@/*` alias in tsconfig.json
        // and ships Tailwind v4 pre-configured — nothing to do by hand for this framework.
    },
};

function assertPackageJsonAlias(appDir: string): void {
    const pkg = readJson<{ dependencies?: Record<string, string> }>(path.join(appDir, "package.json"));
    if (!pkg.dependencies?.["@smarteraui/icons"]) throw new Error("package.json never gained a @smarteraui/icons dependency.");
}

function runTarget(target: Target): void {
    section(`Target: ${target.name}`);
    const appDir = path.join(RUN_ROOT, target.name, "app");
    mkdirSync(path.dirname(appDir), { recursive: true });

    section(`${target.name} — scaffold`);
    target.scaffold(appDir);

    section(`${target.name} — smarteraui init`);
    run(appDir, "node", [CLI, "init", target.initFlag, "--yes", "--registry", REGISTRY]);
    if (!existsSync(path.join(appDir, "components.json"))) throw new Error("init did not write components.json.");

    section(`${target.name} — smarteraui add (${COMPONENTS.join(", ")})`);
    // `--yes` does NOT skip the install like it might for other tools — packages/cli/src/commands/add.ts
    // resolves the dependency-install confirmation with `fallback: Boolean(options.yes)`, and
    // confirm() only prompts when both stdin/stdout are TTYs, which a spawned child process
    // never is. So `--yes` here means "yes, install for real", which is exactly what this test
    // needs — no separate flag or manual install-command run required.
    const addOutput = run(appDir, "node", [CLI, "add", ...COMPONENTS, "--yes", "--registry", REGISTRY]);
    if (!addOutput.includes("Installed with `npm")) throw new Error("`add` did not report a real npm install for the new dependencies.");

    section(`${target.name} — smarteraui add example ${EXAMPLE}`);
    const exampleOutput = run(appDir, "node", [CLI, "add", "example", EXAMPLE, "--yes", "--registry", REGISTRY]);
    if (!existsSync(path.join(appDir, target.srcRoot, "components", "app-examples", "settings-pages", `${EXAMPLE}.tsx`))) {
        throw new Error(`add example ${EXAMPLE} did not write the expected file.`);
    }
    void exampleOutput;

    section(`${target.name} — assertions`);
    assertPackageJsonAlias(appDir);
    assertIconsAliasInstalled(appDir);
    const dangling = findDanglingAliasImports(appDir, target.srcRoot);
    if (dangling.length > 0) throw new Error(`Dangling @/ imports found:\n  ${dangling.join("\n  ")}`);
    console.log(`  ok   no dangling @/ imports under ${target.srcRoot}/`);

    section(`${target.name} — npm run build`);
    run(appDir, "npm", ["run", "build"], { timeout: 10 * 60 * 1000 });

    if (existsSync(path.join(appDir, "tsconfig.json"))) {
        section(`${target.name} — tsc --noEmit`);
        run(appDir, "npx", ["tsc", "--noEmit"], { timeout: 5 * 60 * 1000 });
    }

    console.log(`\nPASS — ${target.name} clean-room run succeeded (${appDir}).`);
}

function main(): void {
    console.log(`Clean-room run: ${RUN_ROOT}`);
    mkdirSync(RUN_ROOT, { recursive: true });
    ensureBuilt();

    const targets = [VITE, NEXT];
    for (const target of targets) {
        try {
            runTarget(target);
        } catch (error) {
            console.error(`\nFAIL — clean-room failed for target "${target.name}" during: ${currentStep}`);
            console.error((error as Error).message);
            console.error(`\nScratch directory kept for inspection: ${RUN_ROOT}`);
            process.exitCode = 1;
            return;
        }
    }

    rmSync(RUN_ROOT, { recursive: true, force: true });
    console.log(`\nPASS — all ${targets.length} clean-room targets (${targets.map((target) => target.name).join(", ")}) succeeded.`);
}

main();
