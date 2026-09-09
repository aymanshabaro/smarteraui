/** CI guard: no external image/asset URLs anywhere in the library or docs source. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOTS = ["packages/ui/src", "apps/docs/app", "apps/docs/components", "apps/docs/content"];
const BAD = /https?:\/\/[^"'`\s)]+\.(png|jpe?g|webp|gif|svg|avif|mp4)/gi;

const walk = (d: string): string[] =>
    readdirSync(d).flatMap((e) => {
        const f = path.join(d, e);
        return statSync(f).isDirectory() ? walk(f) : /\.(tsx?|mdx|css)$/.test(f) ? [f] : [];
    });

let bad = 0;
for (const root of ROOTS) {
    let files: string[] = [];
    try {
        files = walk(root);
    } catch {
        continue;
    }
    for (const f of files) {
        for (const m of readFileSync(f, "utf8").matchAll(BAD)) {
            console.error(`${f}: external asset ${m[0]}`);
            bad++;
        }
    }
}
if (bad) {
    console.error(`\n${bad} external asset reference(s). Use @smarteraui/ui/utils/demo-assets instead.`);
    process.exit(1);
}
console.log("check:assets — clean");
