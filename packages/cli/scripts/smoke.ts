/**
 * End-to-end smoke test for the smarteraui CLI.
 *
 * Builds a throwaway Vite + React + TypeScript project, runs `init` and `add badges`
 * against the on-disk registry (`packages/registry/dist`) and asserts the spec's
 * acceptance criteria: the files listed in `badges.json` are copied, `@/` imports are
 * rewritten to the project alias, and a second `add` reports no changes.
 *
 * Usage: pnpm -F smarteraui smoke   (run `pnpm -F smarteraui build` first)
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
const SCRATCH = process.env.SMOKE_DIR ?? path.join(tmpdir(), "smarteraui-cli-smoke");

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
    console.log(`\n$ smarteraui ${args.join(" ")}`);
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

/** Minimal Vite + React project skeleton: package.json, tsconfig paths, src entry, stylesheet. */
function scaffold(dir: string, aliasPrefix: string): void {
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(path.join(dir, "src"), { recursive: true });

    writeFileSync(
        path.join(dir, "package.json"),
        `${JSON.stringify(
            {
                name: path.basename(dir),
                private: true,
                type: "module",
                dependencies: { react: "^19.0.0", "react-dom": "^19.0.0" },
                devDependencies: { typescript: "^5.9.3", vite: "^6.0.0", tailwindcss: "^4.3.3" },
            },
            null,
            2,
        )}\n`,
    );
    writeFileSync(
        path.join(dir, "tsconfig.json"),
        `${JSON.stringify(
            {
                compilerOptions: {
                    target: "ES2022",
                    jsx: "react-jsx",
                    module: "ESNext",
                    moduleResolution: "Bundler",
                    strict: true,
                    baseUrl: ".",
                    paths: { [`${aliasPrefix}*`]: ["./src/*"] },
                },
                include: ["src"],
            },
            null,
            2,
        )}\n`,
    );
    writeFileSync(path.join(dir, "vite.config.ts"), 'import { defineConfig } from "vite";\n\nexport default defineConfig({});\n');
    writeFileSync(path.join(dir, "package-lock.json"), '{ "lockfileVersion": 3 }\n');
    writeFileSync(path.join(dir, "src", "index.css"), "body {\n    margin: 0;\n}\n");
    writeFileSync(path.join(dir, "src", "App.tsx"), 'export const App = () => <div className="bg-primary text-primary">Hello</div>;\n');
    writeFileSync(
        path.join(dir, "src", "main.tsx"),
        [
            'import { StrictMode } from "react";',
            'import { createRoot } from "react-dom/client";',
            'import { App } from "./App";',
            'import "./index.css";',
            "",
            'createRoot(document.getElementById("root")).render(',
            "    <StrictMode>",
            "        <App />",
            "    </StrictMode>,",
            ");",
            "",
        ].join("\n"),
    );
}

interface RegistryEntryShape {
    files: { target: string; content: string }[];
    registryDependencies: string[];
    dependencies: string[];
}

const readEntry = (name: string): RegistryEntryShape => JSON.parse(readFileSync(path.join(REGISTRY, `${name}.json`), "utf8"));

function main(): void {
    if (!existsSync(CLI)) throw new Error(`${CLI} not found — run \`pnpm -F smarteraui build\` first.`);
    if (!existsSync(REGISTRY)) throw new Error(`${REGISTRY} not found — the registry has to be built first.`);

    mkdirSync(SCRATCH, { recursive: true });
    console.log(`scratch: ${SCRATCH}`);

    // -------------------------------------------------------------- scenario 1
    section("Scenario 1 — Vite + TS project on the default @/ alias");
    const app = path.join(SCRATCH, "vite-app");
    scaffold(app, "@/");

    const initOutput = run(app, ["init", "--manual", "--yes"]);
    check("init detects Vite", initOutput.includes("Vite"));
    check("init detects TypeScript", initOutput.includes("TypeScript"));
    check("init detects the @/ alias", initOutput.includes("Import alias    @/"));
    check("init detects Tailwind v4", initOutput.includes("Tailwind        v4"));
    check("init detects the npm lockfile", initOutput.includes("Package manager npm"));

    const config = JSON.parse(readFileSync(path.join(app, "components.json"), "utf8"));
    check("components.json aliases", config.aliases.components === "@/components" && config.aliases.ui === "@/components/base", JSON.stringify(config.aliases));
    check("components.json tsx: true", config.tsx === true);
    check("components.json theme path", config.tailwind.theme === "src/styles/theme.css", String(config.tailwind.theme));
    check("components.json css path", config.tailwind.css === "src/index.css", String(config.tailwind.css));
    check("theme.css written", existsSync(path.join(app, "src", "styles", "theme.css")));
    check("utils/cx.ts created", existsSync(path.join(app, "src", "utils", "cx.ts")));
    check("ThemeProvider created", existsSync(path.join(app, "src", "providers", "theme-provider.tsx")));

    const css = readFileSync(path.join(app, "src", "index.css"), "utf8");
    check("stylesheet imports tailwind", css.includes('@import "tailwindcss";'));
    check("stylesheet imports theme tokens", css.includes('@import "./styles/theme.css";'));
    check("stylesheet has the @source scan line", css.includes('@source "./components/**/*.{ts,tsx,js,jsx}";'), css.split("\n").slice(0, 4).join(" / "));
    check("stylesheet keeps existing rules", css.includes("body {"));
    check("--manual left main.tsx alone", !readFileSync(path.join(app, "src", "main.tsx"), "utf8").includes("ThemeProvider"));

    // -------------------------------------------------------------- dry run
    section("add badges --dry-run");
    const badges = readEntry("badges");
    const dryRun = run(app, ["add", "badges", "--registry", REGISTRY, "--dry-run"]);
    check("dry run says nothing was written", dryRun.includes("dry run"));
    check(
        "dry run resolved registryDependencies",
        badges.registryDependencies.every((name) => dryRun.includes(name)),
        badges.registryDependencies.join(", "),
    );
    check(
        "dry run created no files",
        badges.files.every((file) => !existsSync(path.join(app, "src", file.target))),
    );

    // -------------------------------------------------------------- real run
    section("add badges");
    const added = run(app, ["add", "badges", "--registry", REGISTRY]);
    for (const file of badges.files) {
        const target = path.join(app, "src", file.target);
        check(`copied src/${file.target}`, existsSync(target));
        if (!existsSync(target)) continue;
        const local = readFileSync(target, "utf8");
        check(`src/${file.target} content matches the registry`, local === file.content);
        const specifiers = [...local.matchAll(/from "([^"]+)"/g)].map((match) => match[1] ?? "");
        check(
            `src/${file.target} internal imports use the project alias`,
            specifiers.filter((value) => value.startsWith("@/")).every((value) => value.startsWith(config.aliases.components.slice(0, 2))),
            specifiers.join(", "),
        );
    }
    for (const dependency of badges.registryDependencies) {
        const entry = readEntry(dependency);
        for (const file of entry.files) check(`dependency ${dependency}: src/${file.target}`, existsSync(path.join(app, "src", file.target)));
    }
    check("npm dependencies reported, not silently installed", added.includes("@smarteraui/icons") && added.includes("Skipped install"));

    // -------------------------------------------------------------- idempotency
    section("add badges (second run — must be a no-op)");
    const second = run(app, ["add", "badges", "--registry", REGISTRY]);
    check("second run reports no changes", second.includes("No changes"));
    check("second run added nothing", !second.includes("added  src/"));

    // -------------------------------------------------------------- diff/list/search
    section("diff / list / search");
    const diffClean = run(app, ["diff", "badges", "--registry", REGISTRY]);
    check("diff is clean right after add", diffClean.includes("No local modifications"));

    const firstBadgeFile = badges.files[0];
    if (!firstBadgeFile) throw new Error("badges.json has no files");
    const badgeFile = path.join(app, "src", firstBadgeFile.target);
    writeFileSync(badgeFile, `${readFileSync(badgeFile, "utf8")}\n// local tweak\n`);
    const diffDirty = run(app, ["diff", "badges", "--registry", REGISTRY]);
    check("diff detects a local modification", diffDirty.includes("differ from the registry") && diffDirty.includes("local tweak"));

    const list = run(app, ["list", "--layer", "base", "--registry", REGISTRY]);
    check("list --layer base filters by layer", list.includes("badges") && !list.includes("about-page-01"));

    const search = run(app, ["search", "badge", "--registry", REGISTRY]);
    check("search finds badges", search.includes("badges"));

    // -------------------------------------------------------------- scenario 2
    section("Scenario 2 — project on a ~/ alias (import rewriting)");
    const aliased = path.join(SCRATCH, "vite-app-tilde");
    scaffold(aliased, "~/");
    run(aliased, ["init", "--manual", "--yes", "--registry", REGISTRY]);

    const tildeConfig = JSON.parse(readFileSync(path.join(aliased, "components.json"), "utf8"));
    check("init picks up the ~/ alias", tildeConfig.aliases.components === "~/components", String(tildeConfig.aliases.components));
    check(
        "init pulled the real theme.css from the registry",
        readFileSync(path.join(aliased, "src", "styles", "theme.css"), "utf8").includes("--color-brand-600"),
    );

    run(aliased, ["add", "badges", "--registry", REGISTRY]);
    const rewritten = readFileSync(path.join(aliased, "src", "components", "base", "badges", "badges.tsx"), "utf8");
    check("imports rewritten to ~/", rewritten.includes('from "~/utils/cx"'), rewritten.split("\n").slice(0, 8).join(" / "));
    check("no @/ imports remain", !rewritten.includes('from "@/'));

    // -------------------------------------------------------------- scenario 3
    section("Scenario 3 — add example");
    const example = run(aliased, ["add", "example", "settings-01", "--registry", REGISTRY]);
    const settings = readEntry("settings-01");
    check(
        "example files copied",
        settings.files.every((file) => existsSync(path.join(aliased, "src", file.target))),
    );
    check(
        "example pulled in the components it uses",
        settings.registryDependencies.every((name) => example.includes(name)),
        settings.registryDependencies.join(", "),
    );

    // -------------------------------------------------------------- scenario 4
    section("Scenario 4 — ThemeProvider wiring without --manual");
    const wired = path.join(SCRATCH, "vite-app-wired");
    scaffold(wired, "@/");
    run(wired, ["init", "--vite", "--yes", "--registry", REGISTRY]);
    const mainTsx = readFileSync(path.join(wired, "src", "main.tsx"), "utf8");
    check("Vite entry imports the provider", mainTsx.includes('import { ThemeProvider } from "@/providers/theme-provider";'));
    check("Vite entry is wrapped", mainTsx.includes("<ThemeProvider>") && mainTsx.includes("</ThemeProvider>"));

    const nextApp = path.join(SCRATCH, "next-app");
    scaffold(nextApp, "@/");
    mkdirSync(path.join(nextApp, "src", "app"), { recursive: true });
    writeFileSync(
        path.join(nextApp, "src", "app", "layout.tsx"),
        [
            'import "./globals.css";',
            "",
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
    writeFileSync(path.join(nextApp, "src", "app", "globals.css"), "");
    run(nextApp, ["init", "--nextjs", "--yes", "--registry", REGISTRY]);
    const layout = readFileSync(path.join(nextApp, "src", "app", "layout.tsx"), "utf8");
    check("Next.js App Router layout is wrapped", layout.includes("<ThemeProvider>") && layout.includes("</ThemeProvider>"));
    check("Next.js theme import added", layout.includes('import { ThemeProvider } from "@/providers/theme-provider";'));

    // -------------------------------------------------------------- scenario 5
    section("Scenario 5 — info --json");
    const infoJson = run(app, ["info", "--json", "--registry", REGISTRY]);
    const info = JSON.parse(infoJson.slice(infoJson.indexOf("{")));
    check("info reports the detected framework", info.framework === "vite", String(info.framework));
    check("info reports Tailwind v4", info.tailwindVersion === 4, String(info.tailwindVersion));
    check("info reports the components.json aliases", info.config.aliases?.components === "@/components", JSON.stringify(info.config.aliases));
    check("info reports the theme CSS path", info.config.theme === "src/styles/theme.css", String(info.config.theme));
    check(
        "info lists badges as an installed entry",
        info.installed.some((entry: { name: string }) => entry.name === "badges"),
        JSON.stringify(info.installed.map((entry: { name: string }) => entry.name)),
    );

    const infoHuman = run(app, ["info", "--registry", REGISTRY]);
    check("info (human) reports the framework", infoHuman.includes("Framework"));
    check("info (human) lists installed entries", infoHuman.includes("badges"));

    // -------------------------------------------------------------- scenario 6
    section("Scenario 6 — agent init");
    const agentAll = run(app, ["agent", "init", "--client", "all", "--yes"]);
    check("agent init installs for claude", existsSync(path.join(app, ".claude", "skills", "smarteraui", "SKILL.md")));
    check("agent init installs for codex", existsSync(path.join(app, ".agents", "skills", "smarteraui", "SKILL.md")));
    check("agent init installs for cursor", existsSync(path.join(app, ".cursor", "rules", "smarteraui.mdc")));
    check("agent init prints the Lovable import URL", agentAll.includes("github.com/aymanshabaro/smarteraui/blob/main/skills/smarteraui/SKILL.md"));

    const claudeSkill = readFileSync(path.join(app, ".claude", "skills", "smarteraui", "SKILL.md"), "utf8");
    check("claude Skill has name frontmatter", claudeSkill.includes("name: smarteraui"));
    const codexSkill = readFileSync(path.join(app, ".agents", "skills", "smarteraui", "SKILL.md"), "utf8");
    check("codex Skill matches the claude Skill byte-for-byte", codexSkill === claudeSkill);

    const claudeMd = readFileSync(path.join(app, "CLAUDE.md"), "utf8");
    check("CLAUDE.md got a Smartera UI pointer", claudeMd.includes("smarteraui:skill:start") && claudeMd.includes(".claude/skills/smarteraui/SKILL.md"));
    const agentsMd = readFileSync(path.join(app, "AGENTS.md"), "utf8");
    check("AGENTS.md got a Smartera UI rules block", agentsMd.includes("smarteraui:agents:start") && agentsMd.includes(".agents/skills/smarteraui/SKILL.md"));
    const cursorRule = readFileSync(path.join(app, ".cursor", "rules", "smarteraui.mdc"), "utf8");
    check("cursor rule has alwaysApply: true", cursorRule.includes("alwaysApply: true"));

    // Idempotency: re-running with a pre-existing CLAUDE.md/AGENTS.md must update the marked
    // block in place, not duplicate it, and must never touch content outside the markers.
    writeFileSync(path.join(app, "CLAUDE.md"), `# My project\n\nSome existing notes.\n\n${claudeMd}`);
    run(app, ["agent", "init", "--client", "claude", "--yes"]);
    const claudeMdAgain = readFileSync(path.join(app, "CLAUDE.md"), "utf8");
    check("re-running agent init keeps pre-existing CLAUDE.md content", claudeMdAgain.includes("Some existing notes."));
    check("re-running agent init does not duplicate the marked block", claudeMdAgain.split("smarteraui:skill:start").length === 2);

    const agentLovable = run(app, ["agent", "init", "--client", "lovable", "--yes"]);
    check("agent init --client lovable writes no local skill file for lovable itself", !agentLovable.includes(".claude/skills"));
    check("agent init --client lovable points at the SKILL.md source", agentLovable.includes("skills/smarteraui/SKILL.md"));

    section("Skill source of truth");

    // The published CLI cannot read the monorepo, so agent-templates.ts carries a copy of
    // skills/smarteraui/SKILL.md. Nothing stops an edit to one from missing the other.
    const authored = readFileSync(path.join(REPO, "skills", "smarteraui", "SKILL.md"), "utf8").trim();
    const skillWritten = readFileSync(path.join(app, ".claude", "skills", "smarteraui", "SKILL.md"), "utf8").trim();
    check(
        "the Skill `agent init` writes matches skills/smarteraui/SKILL.md",
        skillWritten === authored,
        `authored ${authored.length} chars, written ${skillWritten.length}`,
    );

    console.log(`\n${failures === 0 ? "PASS" : "FAIL"} — ${checks - failures}/${checks} checks passed.`);
    if (failures > 0) process.exitCode = 1;
}

main();
