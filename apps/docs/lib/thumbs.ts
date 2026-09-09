import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Gallery thumbnails produced by `pnpm shots:thumbs`. WebP is preferred; PNG is the
 * fallback the script writes when no WebP encoder is available. Missing files return
 * undefined so the card can render a neutral placeholder instead.
 */
const publicDir = () => path.join(process.cwd().endsWith(path.join("apps", "docs")) ? process.cwd() : path.join(process.cwd(), "apps", "docs"), "public");

export const thumbUrl = (section: string, slug: string, variant: string, dark = false): string | undefined => {
    const base = `thumbs/${section}/${slug}/${variant}${dark ? "-dark" : ""}`;
    for (const extension of ["webp", "png"]) {
        if (existsSync(path.join(publicDir(), `${base}.${extension}`))) return `/${base}.${extension}`;
    }
    return undefined;
};
