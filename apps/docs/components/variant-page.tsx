import Link from "next/link";
import type { VariantEntry } from "~/lib/variants";
import { ArrowLeft, Expand01 } from "@smarteraui/icons";
import { utilityButtonClasses } from "./primitives";
import { ThemeToggle } from "./theme-toggle";

/**
 * Full-page render of one section/page variant behind a slim top bar
 * (spec 08-docs-site.md § Variant gallery).
 */
export const VariantPage = ({ entry, backHref, backTitle }: { entry: VariantEntry; backHref: string; backTitle: string }) => {
    const Component = entry.component;

    return (
        <>
            <header className="border-secondary bg-primary sticky top-0 z-50 flex items-center gap-3 border-b px-4 py-2.5">
                <Link
                    href={backHref}
                    className="text-tertiary outline-focus-ring hover:bg-primary_hover flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <ArrowLeft className="text-fg-quaternary size-4" />
                    {backTitle}
                </Link>
                <span className="text-primary truncate text-sm font-semibold">{entry.title}</span>

                <div className="ml-auto flex items-center gap-0.5">
                    <ThemeToggle />
                    <a
                        href={`/preview/variant/${entry.section}/${entry.slug}/${entry.variant}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open in new tab"
                        className={utilityButtonClasses()}
                    >
                        <Expand01 className="size-4" />
                    </a>
                </div>
            </header>

            <Component />
        </>
    );
};
