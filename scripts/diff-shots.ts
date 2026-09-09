/**
 * Pixel-diffs .shots/** against docs/spec/reference/screenshots/** and writes a parity report.
 *   pnpm docs:diff <slug>
 *   pnpm docs:diff --all --report reports/visual-parity.md
 *
 * Expect content differences (copy, photos, brand hue). Flag layout differences:
 * anything above ~8% differing pixels, or a size mismatch, is a real regression.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const REF = "docs/spec/reference/screenshots";
const MINE = ".shots";
const args = process.argv.slice(2);
const reportPath = args[args.indexOf("--report") + 1] ?? "reports/visual-parity.md";

const rows: string[] = ["| Page | Shot | Size match | Diff % | Verdict |", "|---|---|---|---|---|"];
const walkDirs = (root: string) => (existsSync(root) ? readdirSync(root).flatMap((s) => readdirSync(path.join(root, s)).map((g) => `${s}/${g}`)) : []);

for (const key of walkDirs(MINE)) {
    for (const file of readdirSync(path.join(MINE, key))) {
        const a = path.join(MINE, key, file);
        const b = path.join(REF, key, file);
        if (!existsSync(b)) {
            rows.push(`| ${key} | ${file} | — | — | no reference |`);
            continue;
        }
        const img1 = PNG.sync.read(readFileSync(a));
        const img2 = PNG.sync.read(readFileSync(b));
        if (img1.width !== img2.width || img1.height !== img2.height) {
            rows.push(`| ${key} | ${file} | NO (${img1.width}x${img1.height} vs ${img2.width}x${img2.height}) | — | CHECK |`);
            continue;
        }
        const diff = new PNG({ width: img1.width, height: img1.height });
        const n = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.2 });
        const pct = (100 * n) / (img1.width * img1.height);
        rows.push(`| ${key} | ${file} | yes | ${pct.toFixed(1)}% | ${pct > 8 ? "CHECK" : "ok"} |`);
    }
}
mkdirSync(path.dirname(reportPath), { recursive: true });
writeFileSync(reportPath, ["# Visual parity report", "", ...rows, ""].join("\n"));
console.log(`wrote ${reportPath}`);
