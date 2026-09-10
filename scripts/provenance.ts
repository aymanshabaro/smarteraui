/**
 * File-level provenance map for packages/ui/src/components (+ sibling hooks/utils dirs)
 * against the public MIT-licensed Untitled UI React repo (https://github.com/untitleduico/react).
 *
 * This is mechanical evidence for a lawyer, not a legal opinion. It maps each of our source
 * files to the closest-matching file in a local clone of the upstream repo (or "no candidate"),
 * scores textual similarity, and classifies DERIVED / ADAPTED / ORIGINAL. It also flags any
 * import of / mention of "untitledui" outside the icon packages, and checks whether anything
 * under packages/ui/src references the local docs/spec/reference/ mirror or contains copy that
 * looks lifted from untitledui.com marketing pages.
 *
 * Usage:
 *   pnpm tsx scripts/provenance.ts [--upstream <path-to-clone>] [--out <report-path>]
 *
 * The upstream clone is NOT part of this repo. Clone it yourself first, e.g.:
 *   git clone --depth 1 https://github.com/untitleduico/react.git /tmp/untitledui-react
 * and pass --upstream /tmp/untitledui-react, or set UPSTREAM_REACT_PATH.
 *
 * Method (documented here so the numbers in the report are reproducible):
 *   1. Enumerate our files: every .ts/.tsx under the OUR_ROOTS below, EXCLUDING
 *      *.test.tsx, *.story.tsx, *.demo.tsx, and any file whose first 10 lines contain a
 *      "GENERATED" / "@generated" / "DO NOT EDIT" marker.
 *   2. Enumerate upstream files: every .ts/.tsx under the clone's components/, hooks/, utils/.
 *   3. For each of our files, find a candidate upstream file by, in order:
 *        (a) identical relative path after stripping each root prefix (trying both .ts/.tsx),
 *        (b) same basename anywhere in the upstream tree (best similarity among matches),
 *        (c) best content similarity against the ENTIRE upstream file set.
 *      Whichever tier produces a candidate, that candidate's similarity score is still computed
 *      (not assumed) and is what drives classification.
 *   4. Similarity = Jaccard index over token 3-gram shingles. Normalisation: read the file as
 *      utf8 text, collapse all whitespace runs to a single space, tokenise on
 *      `[A-Za-z0-9_$]+` (i.e. split on punctuation/operators/braces), then build the set of
 *      contiguous 3-token shingles ("word a b c" style windows over the token stream).
 *      Jaccard(A, B) = |A ∩ B| / |A ∪ B| over those shingle sets. This is case-sensitive and
 *      comment-inclusive (comments are just more tokens) — deliberately simple and reproducible.
 *   5. Classification: DERIVED >= 0.5, ADAPTED [0.2, 0.5), ORIGINAL < 0.2 or no candidate at all
 *      (empty upstream file set to compare against). No rounding up across a threshold boundary.
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REPO_ROOT = process.cwd();

function argVal(flag: string): string | undefined {
    const i = process.argv.indexOf(flag);
    return i >= 0 ? process.argv[i + 1] : undefined;
}

const UPSTREAM_ROOT =
    argVal("--upstream") ??
    process.env.UPSTREAM_REACT_PATH ??
    "/private/tmp/claude-501/-Users-aymanshabaro-SmartEraUI/8ebb12b7-426c-4849-8ef4-15de5d2537f0/scratchpad/untitledui-react";

const OUT_PATH = argVal("--out") ?? path.join(REPO_ROOT, "docs/spec/provenance.md");

// Our roots, mapped to the equivalent upstream root for the "identical relative path" tier.
const ROOT_PAIRS: { ours: string; upstream: string; label: string }[] = [
    { ours: "packages/ui/src/components", upstream: "components", label: "components" },
    { ours: "packages/ui/src/hooks", upstream: "hooks", label: "hooks" },
    { ours: "packages/ui/src/utils", upstream: "utils", label: "utils" },
];

const LAYER_ORDER = [
    "base",
    "application",
    "marketing",
    "app-examples",
    "marketing-examples",
    "foundations",
    "shared-assets",
    "internal",
    "examples",
    "hooks",
    "utils",
];

const EXCLUDE_SUFFIXES = [".test.tsx", ".test.ts", ".story.tsx", ".story.ts", ".demo.tsx", ".demo.ts"];

const DERIVED_THRESHOLD = 0.5;
const ADAPTED_THRESHOLD = 0.2;

// ---------------------------------------------------------------------------
// File walking
// ---------------------------------------------------------------------------

function walk(dir: string): string[] {
    if (!existsSync(dir)) return [];
    const out: string[] = [];
    for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        const st = statSync(full);
        if (st.isDirectory()) out.push(...walk(full));
        else if (/\.(tsx?|ts)$/.test(entry) && /\.(tsx|ts)$/.test(entry)) out.push(full);
    }
    return out;
}

function isGenerated(filePath: string): boolean {
    try {
        const head = readFileSync(filePath, "utf8").split("\n").slice(0, 10).join("\n");
        return /GENERATED|@generated|DO NOT EDIT/i.test(head);
    } catch {
        return false;
    }
}

function isExcludedByName(filePath: string): boolean {
    return EXCLUDE_SUFFIXES.some((suf) => filePath.endsWith(suf));
}

// ---------------------------------------------------------------------------
// Similarity: Jaccard over token 3-gram shingles
// ---------------------------------------------------------------------------

function tokenize(text: string): string[] {
    const normalised = text.replace(/\s+/g, " ").trim();
    return normalised.match(/[A-Za-z0-9_$]+/g) ?? [];
}

function shingles(tokens: string[], n = 3): Set<string> {
    const set = new Set<string>();
    if (tokens.length < n) {
        if (tokens.length > 0) set.add(tokens.join(" "));
        return set;
    }
    for (let i = 0; i <= tokens.length - n; i++) {
        set.add(tokens.slice(i, i + n).join(" "));
    }
    return set;
}

function jaccard(a: Set<string>, b: Set<string>): number {
    if (a.size === 0 && b.size === 0) return 0;
    let inter = 0;
    const [small, large] = a.size <= b.size ? [a, b] : [b, a];
    for (const x of small) if (large.has(x)) inter++;
    const union = a.size + b.size - inter;
    return union === 0 ? 0 : inter / union;
}

// ---------------------------------------------------------------------------
// Load our files
// ---------------------------------------------------------------------------

interface OurFile {
    absPath: string;
    relFromRepo: string; // relative to REPO_ROOT, forward-slash
    rootLabel: string; // which ROOT_PAIRS entry it came from
    relFromRoot: string; // relative to that root, forward-slash
    layer: string;
    shingleSet: Set<string>;
}

function toPosix(p: string): string {
    return p.split(path.sep).join("/");
}

function loadOurFiles(): OurFile[] {
    const files: OurFile[] = [];
    for (const rp of ROOT_PAIRS) {
        const rootAbs = path.join(REPO_ROOT, rp.ours);
        for (const abs of walk(rootAbs)) {
            if (isExcludedByName(abs) || isGenerated(abs)) continue;
            const relFromRoot = toPosix(path.relative(rootAbs, abs));
            const layer = rp.label === "components" ? relFromRoot.split("/")[0] : rp.label;
            files.push({
                absPath: abs,
                relFromRepo: toPosix(path.relative(REPO_ROOT, abs)),
                rootLabel: rp.label,
                relFromRoot,
                layer,
                shingleSet: shingles(tokenize(readFileSync(abs, "utf8"))),
            });
        }
    }
    return files;
}

// ---------------------------------------------------------------------------
// Load upstream files
// ---------------------------------------------------------------------------

interface UpstreamFile {
    absPath: string;
    rootLabel: string; // "components" | "hooks" | "utils"
    relFromRoot: string;
    shingleSet: Set<string>;
    byBasename: string; // basename for tier (b)
}

function loadUpstreamFiles(): UpstreamFile[] {
    const files: UpstreamFile[] = [];
    for (const rp of ROOT_PAIRS) {
        const rootAbs = path.join(UPSTREAM_ROOT, rp.upstream);
        for (const abs of walk(rootAbs)) {
            const relFromRoot = toPosix(path.relative(rootAbs, abs));
            files.push({
                absPath: abs,
                rootLabel: rp.label,
                relFromRoot,
                shingleSet: shingles(tokenize(readFileSync(abs, "utf8"))),
                byBasename: path.basename(abs),
            });
        }
    }
    return files;
}

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

type Classification = "DERIVED" | "ADAPTED" | "ORIGINAL";

interface MatchResult {
    upstreamRelPath: string | null; // "<rootLabel>/<relFromRoot>" or null
    similarity: number;
    tier: "path" | "basename" | "content" | "none";
    classification: Classification;
}

function classify(sim: number, hasCandidate: boolean): Classification {
    if (!hasCandidate) return "ORIGINAL";
    if (sim >= DERIVED_THRESHOLD) return "DERIVED";
    if (sim >= ADAPTED_THRESHOLD) return "ADAPTED";
    return "ORIGINAL";
}

function swapExt(p: string): string {
    if (p.endsWith(".tsx")) return p.slice(0, -4) + ".ts";
    if (p.endsWith(".ts")) return p.slice(0, -3) + ".tsx";
    return p;
}

function findMatch(our: OurFile, upstreamByRoot: Map<string, UpstreamFile[]>, upstreamAll: UpstreamFile[]): MatchResult {
    const upstreamInRoot = upstreamByRoot.get(our.rootLabel) ?? [];

    // Tier (a): identical relative path (try exact, then swapped extension).
    const exact = upstreamInRoot.find((u) => u.relFromRoot === our.relFromRoot);
    const swapped = !exact ? upstreamInRoot.find((u) => u.relFromRoot === swapExt(our.relFromRoot)) : undefined;
    const pathMatch = exact ?? swapped;
    if (pathMatch) {
        const sim = jaccard(our.shingleSet, pathMatch.shingleSet);
        return {
            upstreamRelPath: `${pathMatch.rootLabel}/${pathMatch.relFromRoot}`,
            similarity: sim,
            tier: "path",
            classification: classify(sim, true),
        };
    }

    // Tier (b): same basename anywhere upstream; pick best similarity among matches.
    const basename = path.basename(our.absPath);
    const basenameMatches = upstreamAll.filter((u) => u.byBasename === basename);
    if (basenameMatches.length > 0) {
        let best = basenameMatches[0]!;
        let bestSim = jaccard(our.shingleSet, best.shingleSet);
        for (const cand of basenameMatches.slice(1)) {
            const sim = jaccard(our.shingleSet, cand.shingleSet);
            if (sim > bestSim) {
                best = cand;
                bestSim = sim;
            }
        }
        return {
            upstreamRelPath: `${best.rootLabel}/${best.relFromRoot}`,
            similarity: bestSim,
            tier: "basename",
            classification: classify(bestSim, true),
        };
    }

    // Tier (c): best content similarity against the entire upstream set.
    if (upstreamAll.length === 0) {
        return { upstreamRelPath: null, similarity: 0, tier: "none", classification: "ORIGINAL" };
    }
    let best = upstreamAll[0]!;
    let bestSim = jaccard(our.shingleSet, best.shingleSet);
    for (const cand of upstreamAll.slice(1)) {
        const sim = jaccard(our.shingleSet, cand.shingleSet);
        if (sim > bestSim) {
            best = cand;
            bestSim = sim;
        }
    }
    return {
        upstreamRelPath: `${best.rootLabel}/${best.relFromRoot}`,
        similarity: bestSim,
        tier: "content",
        classification: classify(bestSim, true),
    };
}

// ---------------------------------------------------------------------------
// Flags: untitledui mentions/imports outside the icon deps; docs/spec/reference refs
// ---------------------------------------------------------------------------

const ICON_PACKAGE_ALLOWLIST = ["@untitledui/icons", "@smarteraui/icons", "@untitledui/file-icons"];

interface FlagHit {
    file: string;
    line: number;
    text: string;
    kind: string;
}

function scanFlags(): { untitledMentions: FlagHit[]; referenceRefs: FlagHit[]; marketingCopyHits: FlagHit[] } {
    const untitledMentions: FlagHit[] = [];
    const referenceRefs: FlagHit[] = [];
    const marketingCopyHits: FlagHit[] = [];

    const srcRoot = path.join(REPO_ROOT, "packages/ui/src");
    const allSrcFiles = walk(srcRoot);

    const untitledPattern = /untitledui|untitled ui/i;
    const referencePattern = /docs\/spec\/reference/;
    // Literal "Untitled UI" as visible copy (not part of an import/package specifier line).
    const marketingCopyPattern = /Untitled UI/;

    for (const abs of allSrcFiles) {
        const rel = toPosix(path.relative(REPO_ROOT, abs));
        const lines = readFileSync(abs, "utf8").split("\n");
        lines.forEach((line, idx) => {
            if (untitledPattern.test(line)) {
                const isAllowlistedImport = ICON_PACKAGE_ALLOWLIST.some((pkg) => line.includes(pkg));
                if (!isAllowlistedImport) {
                    untitledMentions.push({ file: rel, line: idx + 1, text: line.trim(), kind: "untitledui mention" });
                }
            }
            if (referencePattern.test(line)) {
                referenceRefs.push({ file: rel, line: idx + 1, text: line.trim(), kind: "docs/spec/reference reference" });
            }
            if (marketingCopyPattern.test(line) && !line.includes("@untitledui") && !line.includes("@smarteraui/icons")) {
                marketingCopyHits.push({ file: rel, line: idx + 1, text: line.trim(), kind: "'Untitled UI' literal text" });
            }
        });
    }

    return { untitledMentions, referenceRefs, marketingCopyHits };
}

// ---------------------------------------------------------------------------
// Upstream repo metadata
// ---------------------------------------------------------------------------

function getUpstreamMeta(): { sha: string; date: string; licenseOk: boolean; licenseFirstLine: string } {
    let sha = "unknown";
    let date = "unknown";
    try {
        sha = execSync("git log -1 --format=%H", { cwd: UPSTREAM_ROOT }).toString().trim();
        date = execSync("git log -1 --format=%ad --date=iso-strict", { cwd: UPSTREAM_ROOT }).toString().trim();
    } catch {
        // upstream clone may not be a git repo if fetched another way; leave as unknown
    }
    let licenseOk = false;
    let licenseFirstLine = "";
    const licensePath = path.join(UPSTREAM_ROOT, "LICENSE");
    if (existsSync(licensePath)) {
        const text = readFileSync(licensePath, "utf8");
        licenseFirstLine = text.split("\n").find((l) => l.trim().length > 0) ?? "";
        licenseOk = /MIT License/i.test(text);
    }
    return { sha, date, licenseOk, licenseFirstLine };
}

// ---------------------------------------------------------------------------
// Report generation
// ---------------------------------------------------------------------------

interface Row {
    ourPath: string;
    layer: string;
    classification: Classification;
    upstreamPath: string | null;
    similarity: number;
    tier: string;
}

function fmtSim(n: number): string {
    return n.toFixed(3);
}

function buildReport(rows: Row[], meta: ReturnType<typeof getUpstreamMeta>, flags: ReturnType<typeof scanFlags>): string {
    const now = new Date().toISOString();

    // Summary table by layer
    const layers = Array.from(new Set([...LAYER_ORDER, ...rows.map((r) => r.layer)]));
    const summaryLines: string[] = ["| Layer | DERIVED | ADAPTED | ORIGINAL | Total |", "|---|---:|---:|---:|---:|"];
    let totD = 0,
        totA = 0,
        totO = 0;
    for (const layer of layers) {
        const layerRows = rows.filter((r) => r.layer === layer);
        if (layerRows.length === 0) continue;
        const d = layerRows.filter((r) => r.classification === "DERIVED").length;
        const a = layerRows.filter((r) => r.classification === "ADAPTED").length;
        const o = layerRows.filter((r) => r.classification === "ORIGINAL").length;
        totD += d;
        totA += a;
        totO += o;
        summaryLines.push(`| ${layer} | ${d} | ${a} | ${o} | ${layerRows.length} |`);
    }
    summaryLines.push(`| **Total** | **${totD}** | **${totA}** | **${totO}** | **${rows.length}** |`);

    // Full table
    const fullLines: string[] = ["| Our path | Classification | Upstream path | Similarity |", "|---|---|---|---:|"];
    for (const r of rows.sort((a, b) => a.ourPath.localeCompare(b.ourPath))) {
        fullLines.push(`| ${r.ourPath} | ${r.classification} | ${r.upstreamPath ?? "—"} | ${r.upstreamPath ? fmtSim(r.similarity) : "—"} |`);
    }

    const flagLines: string[] = [];
    flagLines.push(`### \`untitledui\` mentions/imports outside the icon dependencies`);
    flagLines.push("");
    if (flags.untitledMentions.length === 0) {
        flagLines.push("None found under `packages/ui/src`.");
    } else {
        flagLines.push("| File | Line | Text |", "|---|---:|---|");
        for (const h of flags.untitledMentions) flagLines.push(`| ${h.file} | ${h.line} | \`${h.text.replace(/\|/g, "\\|")}\` |`);
    }
    flagLines.push("");
    flagLines.push(`### References to \`docs/spec/reference/\` from \`packages/ui/src\``);
    flagLines.push("");
    if (flags.referenceRefs.length === 0) {
        flagLines.push(
            "None found under `packages/ui/src`. Note: `docs/spec/reference/` itself exists at the repo root as a local, gitignored mirror " +
                "(see its own README) containing `source/` (a copy of this same MIT `untitledui/react` repo) plus screenshots, rendered HTML, " +
                'and variant JSON captured from untitledui.com on 2026-09-09 "for study while building an equivalent system", including ' +
                "content marked PRO. Nothing under `packages/ui/src` imports or path-references that mirror, but its README documents that " +
                "the non-MIT portions (screenshots/html/examples/variants, which cover marketing- and app-example-style pages not present in " +
                "the public MIT repo) were consulted visually/structurally during development. That consultation cannot be detected from " +
                "source text alone — see the closing section below.",
        );
    } else {
        flagLines.push("| File | Line | Text |", "|---|---:|---|");
        for (const h of flags.referenceRefs) flagLines.push(`| ${h.file} | ${h.line} | \`${h.text.replace(/\|/g, "\\|")}\` |`);
    }
    flagLines.push("");
    flagLines.push(`### Literal "Untitled UI" copy (possible marketing-page text)`);
    flagLines.push("");
    if (flags.marketingCopyHits.length === 0) {
        flagLines.push("None found under `packages/ui/src`.");
    } else {
        flagLines.push("| File | Line | Text |", "|---|---:|---|");
        for (const h of flags.marketingCopyHits) flagLines.push(`| ${h.file} | ${h.line} | \`${h.text.replace(/\|/g, "\\|")}\` |`);
    }

    return `# File-level provenance map: packages/ui/src/components vs. Untitled UI React

- **Generated:** ${now}
- **Upstream repo:** https://github.com/untitleduico/react
- **Upstream commit:** \`${meta.sha}\` (${meta.date})
- **Upstream licence:** ${meta.licenseOk ? "MIT (confirmed — see upstream LICENSE, first line below)" : "COULD NOT CONFIRM — check manually"}
  > ${meta.licenseFirstLine}
- **Local vendored copy:** \`LICENSES/untitledui-react-MIT.txt\` (matches upstream LICENSE)
- **Method:** For each of our files (excluding \`*.test.tsx\`, \`*.story.tsx\`, \`*.demo.tsx\`, and any file whose first 10 lines carry a GENERATED/DO-NOT-EDIT marker), find the best-matching upstream file by (a) identical relative path, then (b) same basename anywhere upstream, then (c) best content similarity against the whole upstream set. Similarity = Jaccard index over token 3-gram shingles (whitespace-normalised, tokenised on \`[A-Za-z0-9_$]+\`, case-sensitive, comments included as tokens).
- **Thresholds:** DERIVED ≥ 0.5 · ADAPTED 0.2–0.499… · ORIGINAL < 0.2 or no candidate. Not rounded upward across a boundary.
- **Scan roots (ours):** \`packages/ui/src/components\`, \`packages/ui/src/hooks\`, \`packages/ui/src/utils\`
- **Scan roots (upstream clone):** \`components\`, \`hooks\`, \`utils\`

## Summary by layer

${summaryLines.join("\n")}

_Distribution note: thresholds above are a starting point. If you want to see the effect of moving the DERIVED cutoff, look at the similarity column in the full table below — the boundary between 0.4 and 0.6 is where most judgement calls live._

## Full file table

${fullLines.join("\n")}

## Flags

${flagLines.join("\n")}

## What this does and does not establish

This report maps our source files to a public, MIT-licensed upstream repository by structural path, filename, and textual similarity, which is mechanical evidence that specific files in \`packages/ui/src/components\` share component structure, class names, and/or prop shapes with specific files at a specific upstream commit — supporting the NOTICE's attribution claim for the files classified DERIVED or ADAPTED above. It does **not** and cannot establish whether any additional, non-MIT material (Untitled UI's paid/PRO component variants, Figma files, or untitledui.com marketing-site pages) was consulted, viewed, or used as a visual/structural reference during development of files classified ORIGINAL or of the "extra" layers (\`marketing\`, \`marketing-examples\`, \`app-examples\`) that have no counterpart in the public MIT repo at all — that question turns on how those files were actually produced, not on anything recoverable from the text of the files themselves. The \`docs/spec/reference/\` flag above is relevant context for that separate question but is not resolved by this script.
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
    if (!existsSync(UPSTREAM_ROOT)) {
        console.error(`Upstream clone not found at ${UPSTREAM_ROOT}.`);
        console.error(`Clone it first: git clone --depth 1 https://github.com/untitleduico/react.git ${UPSTREAM_ROOT}`);
        process.exit(1);
    }

    console.error(`Loading our files under: ${ROOT_PAIRS.map((r) => r.ours).join(", ")}`);
    const ourFiles = loadOurFiles();
    console.error(`  -> ${ourFiles.length} files (after excluding test/story/demo/generated)`);

    console.error(`Loading upstream files under: ${UPSTREAM_ROOT}`);
    const upstreamFiles = loadUpstreamFiles();
    console.error(`  -> ${upstreamFiles.length} upstream files`);

    const upstreamByRoot = new Map<string, UpstreamFile[]>();
    for (const u of upstreamFiles) {
        const arr = upstreamByRoot.get(u.rootLabel) ?? [];
        arr.push(u);
        upstreamByRoot.set(u.rootLabel, arr);
    }

    console.error("Matching...");
    const rows: Row[] = ourFiles.map((our) => {
        const m = findMatch(our, upstreamByRoot, upstreamFiles);
        return {
            ourPath: our.relFromRepo,
            layer: our.layer,
            classification: m.classification,
            upstreamPath: m.upstreamRelPath,
            similarity: m.similarity,
            tier: m.tier,
        };
    });

    console.error("Scanning flags...");
    const flags = scanFlags();

    console.error("Reading upstream metadata...");
    const meta = getUpstreamMeta();

    const report = buildReport(rows, meta, flags);

    mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, report, "utf8");
    console.error(`\nWrote ${OUT_PATH}`);

    const totD = rows.filter((r) => r.classification === "DERIVED").length;
    const totA = rows.filter((r) => r.classification === "ADAPTED").length;
    const totO = rows.filter((r) => r.classification === "ORIGINAL").length;
    console.error(`DERIVED=${totD} ADAPTED=${totA} ORIGINAL=${totO} TOTAL=${rows.length}`);
    console.error(`Upstream commit: ${meta.sha} (${meta.date})`);
}

main();
