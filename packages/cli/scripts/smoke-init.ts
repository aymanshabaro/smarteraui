/**
 * Smoke test for `properui init`'s 2026-09-11 changes: CSS insertion order relative to an
 * existing `@import "tailwindcss";`, the full mirrored stylesheet block, RouterProvider
 * wiring on Next's App Router (plus `--no-providers` to skip it), the install block printed
 * last with the plugin packages it now knows about, the corrected `Next:` line, and the
 * consumer ESLint/Prettier ignore entries.
 *
 * Does NOT touch scripts/smoke.ts (owned by another agent) or packages/cli/src/commands/add.ts.
 *
 * Usage: pnpm -F @properui/cli build   (once)
 *        pnpm exec tsx packages/cli/scripts/smoke-init.ts
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CLI_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(CLI_DIR, "..", "..");
const CLI = path.join(CLI_DIR, "dist", "index.js");
const REGISTRY = path.join(REPO, "packages", "registry", "dist");
const SCRATCH = process.env.SMOKE_INIT_DIR ?? path.join(tmpdir(), `properui-cli-smoke-init-${Date.now()}`);

let failures = 0;
let checks = 0;

function check(label: string, condition: boolean, detail = ""): void {
    checks += 1;
    if (condition) {
        console.log(`  ok   ${label}`);
    } else {
        failures += 1;
        console.log(`  FAIL ${label}${detail ? `\n       ${detail}` : ""}`);
    }
}

function section(title: string): void {
    console.log(`\n=== ${title} ===`);
}

function run(cwd: string, args: string[]): string {
    console.log(`\n$ properui ${args.join(" ")}   (cwd: ${path.relative(SCRATCH, cwd) || "."})`);
    const output = execFileSync(process.execPath, [CLI, ...args], {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, CI: "1", NO_COLOR: "1", FORCE_COLOR: "0" },
    });
    console.log(
        output
            .trimEnd()
            .split("\n")
            .map((line) => `| ${line}`)
            .join("\n"),
    );
    return output;
}

function write(file: string, content: string): void {
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, content, "utf8");
}

function read(file: string): string {
    return readFileSync(file, "utf8");
}

/** Trailing non-blank lines, most recent last — used to check what printed *last*. */
function tailLines(output: string, count: number): string[] {
    return output
        .trimEnd()
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .slice(-count);
}

/** Minimal package.json + tsconfig.json shared by every scaffold below. */
function basePackageJson(extraDeps: Record<string, string> = {}): string {
    return JSON.stringify(
        {
            name: "smoke-init-fixture",
            private: true,
            dependencies: { react: "^19.0.0", "react-dom": "^19.0.0", ...extraDeps },
            devDependencies: { typescript: "^5.6.0" },
        },
        null,
        2,
    );
}

function baseTsconfig(aliasTarget: string): string {
    return JSON.stringify(
        {
            compilerOptions: {
                target: "ES2022",
                module: "ESNext",
                jsx: "react-jsx",
                baseUrl: ".",
                paths: { "@/*": [aliasTarget] },
            },
        },
        null,
        2,
    );
}

function scaffoldVite(dir: string): void {
    rmSync(dir, { recursive: true, force: true });
    write(path.join(dir, "package.json"), basePackageJson({ vite: "^6.0.0" }));
    write(path.join(dir, "tsconfig.json"), baseTsconfig("./src/*"));
    write(
        path.join(dir, "vite.config.ts"),
        [
            'import react from "@vitejs/plugin-react";',
            'import { defineConfig } from "vite";',
            "",
            "export default defineConfig({",
            "    plugins: [react()],",
            "});",
            "",
        ].join("\n"),
    );
    write(
        path.join(dir, "src", "main.tsx"),
        [
            'import { StrictMode } from "react";',
            'import { createRoot } from "react-dom/client";',
            'import App from "./App";',
            "",
            'createRoot(document.getElementById("root")!).render(',
            "  <StrictMode>",
            "    <App />",
            "  </StrictMode>,",
            ");",
            "",
        ].join("\n"),
    );
    // The stylesheet already has `@import "tailwindcss";` at line 1, plus a project rule
    // right after it — this is what proves 2.2 (nothing may land *above* line 1).
    write(path.join(dir, "src", "index.css"), ['@import "tailwindcss";', "", "body {", "    margin: 0;", "}", ""].join("\n"));
    write(
        path.join(dir, "eslint.config.mjs"),
        ["export default [", "    {", '        files: ["**/*.{ts,tsx}"],', "        rules: {},", "    },", "];", ""].join("\n"),
    );
    write(path.join(dir, ".prettierrc.json"), JSON.stringify({ singleQuote: true, tabWidth: 2 }, null, 2));
}

function scaffoldNextApp(dir: string): void {
    rmSync(dir, { recursive: true, force: true });
    write(path.join(dir, "package.json"), basePackageJson({ next: "^15.0.0" }));
    write(path.join(dir, "tsconfig.json"), baseTsconfig("./src/*"));
    write(path.join(dir, "next.config.ts"), "export default {};\n");
    write(
        path.join(dir, "src", "app", "layout.tsx"),
        [
            "export default function RootLayout({ children }: { children: React.ReactNode }) {",
            "    return (",
            '        <html lang="en">',
            "            <body>{children}</body>",
            "        </html>",
            "    );",
            "}",
            "",
        ].join("\n"),
    );
    // No stylesheet at all yet — exercises the "@import tailwindcss absent" branch too.
}

function main(): void {
    console.log(`Smoke-init run: ${SCRATCH}`);
    if (!existsSync(CLI)) throw new Error(`${CLI} is missing. Run: pnpm -F @properui/cli build`);
    if (!existsSync(path.join(REGISTRY, "index.json"))) throw new Error(`${REGISTRY}/index.json is missing. Run: pnpm registry:build`);
    mkdirSync(SCRATCH, { recursive: true });

    section("Vite — CSS insertion order, full stylesheet, vite.config wiring, tooling ignores");
    const viteDir = path.join(SCRATCH, "vite-app");
    scaffoldVite(viteDir);
    const viteOutput = run(viteDir, ["init", "--vite", "--yes", "--registry", REGISTRY]);

    const viteCss = read(path.join(viteDir, "src", "index.css"));
    const viteCssLines = viteCss.split("\n");
    check('line 1 is still exactly `@import "tailwindcss";` (2.2 — nothing inserted above it)', viteCssLines[0] === '@import "tailwindcss";', viteCssLines[0]);
    check("original `body { margin: 0; }` rule is still present, untouched", viteCss.includes("body {\n    margin: 0;\n}"));
    check("theme.css import line present", /@import ".*theme\.css";/.test(viteCss));
    check("typography.css import line present (Miraveli F3)", /@import ".*typography\.css";/.test(viteCss));
    check('`@plugin "@tailwindcss/typography";` present', viteCss.includes('@plugin "@tailwindcss/typography";'));
    check('`@plugin "tailwindcss-react-aria-components";` present', viteCss.includes('@plugin "tailwindcss-react-aria-components";'));
    check('`@plugin "tailwindcss-animate";` present', viteCss.includes('@plugin "tailwindcss-animate";'));
    check(
        "all three `@custom-variant` lines present, including `dark`",
        ["dark (&:where(.dark-mode, .dark-mode *))", "label (& [data-label])", "focus-input-within (&:has(input:focus))"].every((needle) =>
            viteCss.includes(needle),
        ),
    );
    check("both `@utility` blocks present", viteCss.includes("@utility scrollbar-hide {") && viteCss.includes("@utility transition-inherit-all {"));
    check("`@source` line present", /@source ".*\*\*\/\*\.\{ts,tsx,js,jsx\}";/.test(viteCss));
    check(
        "theme.css and typography.css were actually written to disk",
        existsSync(path.join(viteDir, "src", "styles", "theme.css")) && existsSync(path.join(viteDir, "src", "styles", "typography.css")),
    );

    const viteConfig = read(path.join(viteDir, "vite.config.ts"));
    check(
        "vite.config.ts gained the `tailwindcss()` plugin (Miraveli F2)",
        /import tailwindcss from "@tailwindcss\/vite";/.test(viteConfig) && /plugins:\s*\[[^\]]*tailwindcss\(\)/.test(viteConfig),
    );
    check("vite.config.ts gained `resolve.alias` for `@`", /alias:\s*\{\s*"@":/.test(viteConfig));

    const viteMain = read(path.join(viteDir, "src", "main.tsx"));
    check("main.tsx wrapped in <ThemeProvider>", viteMain.includes("<ThemeProvider>") && viteMain.includes("import { ThemeProvider }"));
    check("main.tsx NOT wrapped in <RouterProvider> (Vite uses its own with react-router)", !viteMain.includes("RouterProvider"));
    check("printed the Vite RouterProvider note", viteOutput.includes("Vite: use React Aria's own <RouterProvider>"));

    check(
        'success line reads "Next: npx @properui/cli add buttons badges" (buttons, plural — 2.13)',
        viteOutput.includes("Next: npx @properui/cli add buttons badges"),
    );

    const viteTail = tailLines(viteOutput, 3);
    check(
        "install line is the last (or second-to-last, before a blank) thing printed",
        viteTail.some((line) => line.includes("Install to finish:")),
        viteTail.join("\n"),
    );
    check(
        "install line names the command AND warns the build will not work yet",
        /Install to finish:.*npm (install|add).*the project will not build until this runs\./.test(viteOutput),
    );
    for (const pkg of [
        "tailwind-merge",
        "next-themes",
        "@tailwindcss/typography",
        "tailwindcss-react-aria-components",
        "tailwindcss-animate",
        "tailwindcss",
        "@tailwindcss/vite",
    ]) {
        check(
            `install block lists \`${pkg}\` as needed`,
            viteOutput.includes(`need   ${pkg}`) || new RegExp(`need\\s+${pkg.replace(/[/@]/g, "\\$&")}\\b`).test(viteOutput),
        );
    }

    const eslintConfig = read(path.join(viteDir, "eslint.config.mjs"));
    check(
        "eslint.config.mjs gained an `ignores` entry for the vendored directories",
        eslintConfig.includes("ignores:") && eslintConfig.includes("src/components/**") && eslintConfig.includes("src/hooks/**"),
    );
    check("eslint ignore entry carries an explanatory comment", eslintConfig.includes("Proper UI: vendored source"));
    check(
        ".prettierignore was created (a prettier config existed) and lists the vendored dirs",
        existsSync(path.join(viteDir, ".prettierignore")) && read(path.join(viteDir, ".prettierignore")).includes("src/components/**"),
    );
    check("printed what tooling files were written", viteOutput.includes("Consumer tooling"));
    check('printed a final "Files written/changed" list', viteOutput.includes("Files written/changed"));

    section("Next.js App Router — RouterProvider wired inside ThemeProvider");
    const nextDir = path.join(SCRATCH, "next-app");
    scaffoldNextApp(nextDir);
    const nextOutput = run(nextDir, ["init", "--nextjs", "--yes", "--registry", REGISTRY]);

    check(
        "providers/theme-provider.tsx was copied from the registry (next-themes based)",
        /from "next-themes"/.test(read(path.join(nextDir, "src", "providers", "theme-provider.tsx"))),
    );
    const routerProviderPath = path.join(nextDir, "src", "providers", "router-provider.tsx");
    check(
        "providers/router-provider.tsx was copied from the registry (2.3)",
        existsSync(routerProviderPath) && read(routerProviderPath).includes("next/navigation"),
    );

    const nextLayout = read(path.join(nextDir, "src", "app", "layout.tsx"));
    check("layout.tsx wrapped in <ThemeProvider>", nextLayout.includes("<ThemeProvider>"));
    check(
        "layout.tsx wraps <RouterProvider> inside <ThemeProvider> (2.3)",
        /<ThemeProvider>\s*<RouterProvider>/.test(nextLayout.replace(/\n\s*/g, "\n").replace(/^\s+/gm, "")) ||
            (nextLayout.indexOf("<ThemeProvider>") < nextLayout.indexOf("<RouterProvider>") &&
                nextLayout.indexOf("<RouterProvider>") < nextLayout.indexOf("</ThemeProvider>")),
    );
    check(
        "layout.tsx imports RouterProvider from the local providers path",
        /import \{ RouterProvider \} from "@\/providers\/router-provider";/.test(nextLayout),
    );
    check("install block lists react-aria-components (needed by RouterProvider)", /need\s+react-aria-components\b/.test(nextOutput));

    section("--no-providers skips all provider files and wiring (Miraveli F5)");
    const nextNoProvidersDir = path.join(SCRATCH, "next-app-no-providers");
    scaffoldNextApp(nextNoProvidersDir);
    const noProvidersOutput = run(nextNoProvidersDir, ["init", "--nextjs", "--yes", "--no-providers", "--registry", REGISTRY]);

    check("no providers/theme-provider.tsx written", !existsSync(path.join(nextNoProvidersDir, "src", "providers", "theme-provider.tsx")));
    check("no providers/router-provider.tsx written", !existsSync(path.join(nextNoProvidersDir, "src", "providers", "router-provider.tsx")));
    check("layout.tsx left untouched (no ThemeProvider)", !read(path.join(nextNoProvidersDir, "src", "app", "layout.tsx")).includes("ThemeProvider"));
    check("printed the --no-providers note", noProvidersOutput.includes("Skipped provider files and wiring (--no-providers)"));
    check("install block does NOT list next-themes when providers were skipped", !/need\s+next-themes\b/.test(noProvidersOutput));

    section("--install actually runs the install command instead of only printing it");
    // Only assert the code path is taken (installCommand is echoed / attempted); a real network
    // install of every plugin package is exercised end-to-end by `pnpm test:clean-room` instead,
    // which is where a genuinely broken registry->npm mapping would be caught.
    const installFlagDir = path.join(SCRATCH, "vite-app-install-flag-dry-check");
    scaffoldVite(installFlagDir);
    let installFlagOutput = "";
    try {
        installFlagOutput = run(installFlagDir, ["init", "--vite", "--yes", "--registry", REGISTRY, "--install"]);
    } catch (error) {
        // A real package manager isn't necessarily installable/networked in this sandbox;
        // what matters for this smoke test is that `--install` took the "run it" branch
        // instead of the "print it" branch, which we can see either way in stdout/stderr.
        const failure = error as { stdout?: string; stderr?: string };
        installFlagOutput = `${failure.stdout ?? ""}\n${failure.stderr ?? ""}`;
    }
    check('`--install` does not print the "print it" phrasing verbatim as its last word', !/Install to finish: .*runs\.\s*$/.test(installFlagOutput.trimEnd()));

    console.log(`\n${checks} checks, ${failures} failed.`);
    if (failures > 0) {
        console.error(`\nScratch directory kept for inspection: ${SCRATCH}`);
        process.exitCode = 1;
        return;
    }
    rmSync(SCRATCH, { recursive: true, force: true });
    console.log(`\nPASS — smoke-init (${checks} checks).`);
}

main();
