import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demos } from "~/lib/demos";
import { variants } from "~/lib/variants";

/**
 * Bare, chrome-less render of one example. Two shapes:
 *   /preview/<demoFile>/<Export>
 *   /preview/variant/<section>/<slug>/<variant>
 * Used by "Open in new tab", the screenshot scripts and `pnpm shots:thumbs`.
 */

type Params = { params: Promise<{ path: string[] }> };

export const metadata: Metadata = { robots: { index: false, follow: false } };

const resolve = (path: string[]) => {
    if (path[0] === "variant") {
        const [, section, slug, variant] = path;
        if (!section || !slug || !variant) return undefined;
        return (variants[slug] ?? []).find((entry) => entry.section === section && entry.variant === variant);
    }

    const [demoFile, exportName] = path;
    const component = demoFile && exportName ? demos[`${demoFile}:${exportName}`] : undefined;
    return component ? { component } : undefined;
};

export default async function PreviewPage({ params }: Params) {
    const { path } = await params;
    const match = resolve(path);
    if (!match) notFound();

    const Component = match.component;

    return (
        <div className="bg-primary flex min-h-screen w-full flex-col items-center justify-center">
            <Component />
        </div>
    );
}
