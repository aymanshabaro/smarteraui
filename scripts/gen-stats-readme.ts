/**
 * Rewrites the "The registry currently holds …" sentence in README.md from
 * `packages/registry/dist/stats.json` (written by `pnpm registry:build`), so the published
 * counts can never drift from the numbers the landing page and docs also read from that file.
 *
 * Only the text between the `<!-- stats:start -->` / `<!-- stats:end -->` markers is touched.
 * Run after `pnpm registry:build`; chained into `pnpm gen:all` as `gen:stats`.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const REPO = path.resolve(".");
const STATS_FILE = path.join(REPO, "packages", "registry", "dist", "stats.json");
const README_FILE = path.join(REPO, "README.md");

const START_MARKER = "<!-- stats:start -->";
const END_MARKER = "<!-- stats:end -->";

type Stats = {
    entries: number;
    groups: {
        published: number;
        all: number;
        byLayer: {
            base: number;
            application: number;
            marketing: number;
            appExamples: number;
            marketingExamples: number;
            foundations: number;
            sharedAssets: number;
        };
    };
    variants: number;
    examples: { marketing: number; app: number; total: number };
};

if (!existsSync(STATS_FILE)) {
    console.error(`gen:stats — ${path.relative(REPO, STATS_FILE)} does not exist. Run \`pnpm registry:build\` first.`);
    process.exit(1);
}

const stats = JSON.parse(readFileSync(STATS_FILE, "utf8")) as Stats;
const { byLayer } = stats.groups;
const composable = stats.variants + stats.examples.total;

const sentence =
    `The registry currently holds **${stats.entries} entries**: **${stats.groups.published} published component groups** ` +
    `(**${stats.groups.all}** counting foundations, shared assets and example-page groups) across seven layers ` +
    `(${byLayer.base} base, ${byLayer.application} application, ${byLayer.marketing} marketing sections, ` +
    `${byLayer.appExamples} application page examples, ${byLayer.marketingExamples} marketing page examples, ` +
    `${byLayer.foundations} foundations, ${byLayer.sharedAssets} shared assets), **${stats.variants} section variants** ` +
    `and **${stats.examples.total} full-page examples** (**${composable}** composable variants total), and the shared hooks, ` +
    `utils and styles they depend on.`;

if (!existsSync(README_FILE)) {
    console.error(`gen:stats — ${path.relative(REPO, README_FILE)} does not exist.`);
    process.exit(1);
}

const readme = readFileSync(README_FILE, "utf8");
const startIndex = readme.indexOf(START_MARKER);
const endIndex = readme.indexOf(END_MARKER);

if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    console.error(`gen:stats — could not find both "${START_MARKER}" and "${END_MARKER}" markers in README.md.`);
    process.exit(1);
}

// Prettier reflows a bare `marker / text / marker` block by inserting a blank line after an
// HTML comment that opens a block, so the generated block matches that shape up front.
const before = readme.slice(0, startIndex + START_MARKER.length);
const after = readme.slice(endIndex);
const next = `${before}\n\n${sentence}\n${after}`;

if (next === readme) {
    console.log("gen:stats — README.md already up to date.");
} else {
    writeFileSync(README_FILE, next);
    console.log("gen:stats — README.md count sentence regenerated from packages/registry/dist/stats.json.");
}
