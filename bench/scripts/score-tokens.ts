#!/usr/bin/env -S pnpm exec tsx
/**
 * Token-compliance scanner for AgentBench (see ../rubric.md, metric 3).
 *
 * Scans a directory tree for three families of non-semantic Tailwind class literals:
 *   - arbitrary-color : bg-[#1a1a2e], text-[rgba(10,10,10,0.5)], border-[hsl(0,0%,10%)]
 *   - arbitrary-px    : top-[13px], w-[257px], text-[14px]
 *   - raw-palette     : bg-gray-500, text-blue-600, border-red-300/50, bg-brand-600
 *
 * The exact regexes are also documented in ../rubric.md (metric 3) — the two must stay
 * in sync. If you change one, change the other.
 *
 * Usage:
 *   pnpm exec tsx bench/scripts/score-tokens.ts <directory>
 *
 * If <directory> contains a file named "expected.json" (shape: { byRule, total }, see
 * ../fixtures/expected.json), the scan result is compared against it after printing, and
 * the process exits non-zero on any mismatch. This is what makes the fixtures under
 * ../fixtures a real regression test: `pnpm exec tsx bench/scripts/score-tokens.ts bench/fixtures`
 * fails the moment the scanner's behavior drifts from the pinned expectation.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

type RuleId = "arbitrary-color" | "arbitrary-px" | "raw-palette";

interface Rule {
    id: RuleId;
    description: string;
    pattern: RegExp;
}

interface Violation {
    ruleId: RuleId;
    file: string;
    line: number;
    match: string;
}

interface ExpectedResult {
    byRule: Record<string, number>;
    total: number;
}

// A Tailwind utility "property" prefix that can take a color value.
const PROP = String.raw`(?:bg|text|border|ring(?:-offset)?|fill|stroke|from|via|to|divide|outline|decoration|caret|accent|shadow|placeholder|selection)`;

// Zero or more Tailwind variant prefixes, e.g. "dark:", "hover:", "lg:dark:".
const VARIANT_PREFIX = String.raw`(?:[\w-]+:)*`;

// Not preceded by a word character or hyphen, so we match whole class-name tokens.
const NOT_WORD_BEFORE = String.raw`(?<![\w-])`;

/**
 * Deliberate exclusion: Proper UI's own `utility-*` color family (e.g.
 * `bg-utility-blue-50`, `text-utility-blue-700`) is a sanctioned semantic-adjacent token
 * family that appears verbatim in shipped component source (see
 * packages/ui/src/components/base/badges/badges.tsx). An agent that copies those classes
 * by composing an existing component is doing exact reuse, not bypassing the token system.
 * The raw-palette rule's family group excludes "utility" as a standalone family segment by
 * requiring the family to NOT be exactly "utility" when followed by another word segment —
 * in practice this is handled by the pattern shape itself: "utility-blue-500" does not match
 * `PROP-[a-z]+-<shade>` at the right alignment because "utility" is followed by "-blue-500",
 * not directly by a shade number. See ../rubric.md, metric 3, for the full explanation.
 */
const RULES: Rule[] = [
    {
        id: "arbitrary-color",
        description: "Tailwind arbitrary-value color literal (hex/rgb/hsl) instead of a design-system token",
        pattern: new RegExp(`${NOT_WORD_BEFORE}${VARIANT_PREFIX}${PROP}-\\[(#[0-9a-fA-F]{3,8}|rgba?\\([^\\]]*\\)|hsla?\\([^\\]]*\\))\\]`, "g"),
    },
    {
        id: "arbitrary-px",
        description: "Arbitrary pixel dimension on a Tailwind utility instead of a spacing/size token",
        pattern: new RegExp(`${NOT_WORD_BEFORE}[a-zA-Z][\\w-]*-\\[[0-9]+(?:\\.[0-9]+)?px\\]`, "g"),
    },
    {
        id: "raw-palette",
        description: "Raw Tailwind color-scale class used directly instead of a semantic token",
        pattern: new RegExp(`${NOT_WORD_BEFORE}${VARIANT_PREFIX}${PROP}-[a-z]+-(?:50|100|200|300|400|500|600|700|800|900|950)(?:/[0-9]{1,3})?\\b`, "g"),
    },
];

const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".html", ".vue", ".astro"]);
const IGNORE_DIRS = new Set(["node_modules", ".git", ".next", ".turbo", "dist", "build", "storybook-static", ".open-next", ".wrangler", "coverage", ".vercel"]);

function walk(dir: string, files: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        if (IGNORE_DIRS.has(entry)) continue;
        const full = join(dir, entry);
        const stat = statSync(full);
        if (stat.isDirectory()) {
            walk(full, files);
        } else if (stat.isFile() && SCAN_EXTENSIONS.has(extname(entry))) {
            files.push(full);
        }
    }
    return files;
}

function scanFile(path: string): Violation[] {
    const violations: Violation[] = [];
    const lines = readFileSync(path, "utf8").split("\n");
    lines.forEach((line, index) => {
        for (const rule of RULES) {
            rule.pattern.lastIndex = 0;
            for (const match of line.matchAll(rule.pattern)) {
                violations.push({
                    ruleId: rule.id,
                    file: path,
                    line: index + 1,
                    match: match[0],
                });
            }
        }
    });
    return violations;
}

function main() {
    const targetArg = process.argv[2];
    if (!targetArg) {
        console.error("Usage: pnpm exec tsx bench/scripts/score-tokens.ts <directory>");
        process.exit(2);
    }

    const targetStat = statSync(targetArg, { throwIfNoEntry: false });
    if (!targetStat || !targetStat.isDirectory()) {
        console.error(`Not a directory: ${targetArg}`);
        process.exit(2);
    }

    const files = walk(targetArg);
    const violations = files.flatMap(scanFile);

    const byRule: Record<RuleId, number> = {
        "arbitrary-color": 0,
        "arbitrary-px": 0,
        "raw-palette": 0,
    };

    console.log(`Scanned ${files.length} file(s) under ${targetArg}\n`);

    for (const rule of RULES) {
        const ruleViolations = violations.filter((v) => v.ruleId === rule.id);
        byRule[rule.id] = ruleViolations.length;
        console.log(`## ${rule.id} — ${rule.description}`);
        if (ruleViolations.length === 0) {
            console.log("  (none)");
        } else {
            for (const v of ruleViolations) {
                console.log(`  ${relative(process.cwd(), v.file)}:${v.line}  ${v.match.trim()}`);
            }
        }
        console.log("");
    }

    const total = violations.length;
    console.log("## Summary");
    for (const rule of RULES) {
        console.log(`  ${rule.id}: ${byRule[rule.id]}`);
    }
    console.log(`  total: ${total}`);

    const expectedPath = join(targetArg, "expected.json");
    if (existsSync(expectedPath)) {
        const expected: ExpectedResult = JSON.parse(readFileSync(expectedPath, "utf8"));
        const mismatches: string[] = [];

        if (expected.total !== total) {
            mismatches.push(`total: expected ${expected.total}, got ${total}`);
        }
        for (const ruleId of Object.keys(expected.byRule)) {
            const expectedCount = expected.byRule[ruleId];
            const actualCount = byRule[ruleId as RuleId] ?? 0;
            if (expectedCount !== actualCount) {
                mismatches.push(`${ruleId}: expected ${expectedCount}, got ${actualCount}`);
            }
        }

        console.log("\n## Fixture check (expected.json found)");
        if (mismatches.length === 0) {
            console.log("  PASS — actual counts match expected.json");
        } else {
            console.log("  FAIL — regression detected:");
            for (const m of mismatches) console.log(`    - ${m}`);
            process.exitCode = 1;
        }
    }
}

main();
