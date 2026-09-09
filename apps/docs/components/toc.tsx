"use client";

import { cx } from "~/lib/cx";
import type { TocEntry } from "~/lib/toc";
import { List } from "@smarteraui/icons";
import { useActiveItem } from "@smarteraui/ui/hooks/use-active-item";

/** Right-hand "On this page" rail with scroll spy. Hidden below 2xl, as in the reference. */
export const TableOfContents = ({ entries }: { entries: TocEntry[] }) => {
    const ids = entries.map((entry) => entry.id);
    const activeId = useActiveItem(ids);

    if (!entries.length) return null;

    return (
        <div className="sticky top-24 ml-8 hidden w-54 shrink-0 overflow-y-auto pb-10 text-sm 2xl:block">
            <div className="flex max-h-[calc(100vh-calc(var(--spacing)*19))] flex-col pb-8">
                <div className="flex items-center gap-1.5">
                    <List className="text-fg-quaternary size-4" />
                    <p className="text-primary text-xs font-semibold">On this page</p>
                </div>

                <div className="relative flex overflow-auto pt-4 pb-8">
                    <div className="bg-border-secondary w-0.5 shrink-0" aria-hidden="true" />
                    <ul className="relative flex h-full flex-col gap-2 pl-3">
                        {entries.map((entry) => {
                            const isActive = entry.id === activeId;
                            return (
                                <li key={entry.id} className="relative flex">
                                    {isActive && <span aria-hidden="true" className="bg-fg-brand-primary_alt absolute -left-3 h-full w-0.5" />}
                                    <a
                                        href={`#${entry.id}`}
                                        data-id={entry.id}
                                        className={cx(
                                            "outline-focus-ring rounded-xs text-sm font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
                                            entry.depth === 3 && "pl-0",
                                            isActive ? "text-brand-secondary" : "text-quaternary hover:text-secondary",
                                        )}
                                    >
                                        {entry.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
