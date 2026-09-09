"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog as AriaDialog,
    Input as AriaInput,
    Label as AriaLabel,
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    ListBoxSection as AriaListBoxSection,
    Header as AriaListHeader,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    SearchField as AriaSearchField,
} from "react-aria-components";
import type { SearchEntry } from "~/lib/search-index";
import { SearchLg } from "@smarteraui/icons";

/**
 * ⌘K command menu over the build-time search index (spec 08-docs-site.md § Search).
 * Fuzzy subsequence match, results grouped by sidebar section, fully keyboard driven.
 */

type SearchContextValue = { open: () => void };

const SearchContext = createContext<SearchContextValue>({ open: () => {} });

export const useSearch = () => useContext(SearchContext);

/** Subsequence match; lower score is a better match, `undefined` means no match. */
const score = (haystack: string, needle: string): number | undefined => {
    if (!needle) return 0;
    const text = haystack.toLowerCase();
    let cursor = 0;
    let total = 0;
    for (const char of needle.toLowerCase()) {
        const found = text.indexOf(char, cursor);
        if (found === -1) return undefined;
        total += found - cursor;
        cursor = found + 1;
    }
    return total;
};

export const SearchProvider = ({ index, children }: { index: SearchEntry[]; children: React.ReactNode }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const open = useCallback(() => setIsOpen(true), []);
    const value = useMemo(() => ({ open }), [open]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setIsOpen((current) => !current);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const groups = useMemo(() => {
        const matched = index
            .map((entry) => ({ entry, rank: score(`${entry.title} ${entry.group}`, query.trim()) }))
            .filter((row): row is { entry: SearchEntry; rank: number } => row.rank !== undefined)
            .sort((a, b) => a.rank - b.rank)
            .slice(0, 40);

        const byGroup = new Map<string, SearchEntry[]>();
        for (const { entry } of matched) byGroup.set(entry.group, [...(byGroup.get(entry.group) ?? []), entry]);
        return [...byGroup.entries()];
    }, [index, query]);

    const onAction = (key: React.Key) => {
        const entry = index.find((candidate) => candidate.id === key);
        if (!entry) return;
        setIsOpen(false);
        setQuery("");
        router.push(entry.href);
    };

    return (
        <SearchContext.Provider value={value}>
            {children}

            <AriaModalOverlay
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                isDismissable
                className="bg-overlay/70 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out fixed inset-0 z-70 flex items-start justify-center px-4 pt-24 backdrop-blur-sm"
            >
                <AriaModal className="entering:animate-in entering:zoom-in-95 exiting:animate-out exiting:zoom-out-95 w-full max-w-xl">
                    <AriaDialog
                        aria-label="Search the documentation"
                        className="bg-primary ring-secondary_alt flex max-h-[60vh] flex-col overflow-hidden rounded-xl shadow-xl ring-1 outline-hidden"
                    >
                        {/* eslint-disable-next-line jsx-a11y/no-autofocus -- a command palette must focus its input when it opens */}
                        <AriaSearchField aria-label="Search" value={query} onChange={setQuery} autoFocus className="flex items-center gap-2 px-4">
                            <AriaLabel className="sr-only">Search</AriaLabel>
                            <SearchLg className="text-fg-quaternary size-4 shrink-0" />
                            <AriaInput
                                placeholder="Search components and docs…"
                                // The search field swallows Escape to clear itself; a command palette should close.
                                onKeyDown={(event) => {
                                    if (event.key === "Escape") setIsOpen(false);
                                }}
                                className="text-md text-primary placeholder:text-placeholder w-full bg-transparent py-3.5 outline-hidden"
                            />
                            <kbd className="bg-secondary text-quaternary ring-secondary rounded-sm px-1.5 py-0.5 text-xs font-semibold ring-1 ring-inset">
                                esc
                            </kbd>
                        </AriaSearchField>

                        <div className="border-secondary border-t" />

                        <AriaListBox
                            aria-label="Search results"
                            selectionMode="none"
                            onAction={onAction}
                            items={groups.map(([title, entries]) => ({ id: title, title, entries }))}
                            renderEmptyState={() => <p className="text-tertiary px-4 py-8 text-center text-sm">No results found.</p>}
                            className="flex-1 overflow-y-auto p-2 outline-hidden"
                        >
                            {(group) => (
                                <AriaListBoxSection id={group.id} className="mb-2 last:mb-0">
                                    <AriaListHeader className="text-quaternary px-2.5 py-1.5 text-xs font-semibold">{group.title}</AriaListHeader>
                                    {group.entries.map((entry) => (
                                        <AriaListBoxItem
                                            key={entry.id}
                                            id={entry.id}
                                            textValue={entry.title}
                                            className="focus:bg-primary_hover hover:bg-primary_hover flex cursor-pointer flex-col rounded-md px-2.5 py-2 outline-hidden select-none"
                                        >
                                            <span className="text-secondary text-sm font-semibold">{entry.title}</span>
                                            {entry.description ? <span className="text-tertiary line-clamp-1 text-xs">{entry.description}</span> : null}
                                        </AriaListBoxItem>
                                    ))}
                                </AriaListBoxSection>
                            )}
                        </AriaListBox>
                    </AriaDialog>
                </AriaModal>
            </AriaModalOverlay>
        </SearchContext.Provider>
    );
};

/** The magnifier button in the sidebar header. */
export const SearchTrigger = ({ className }: { className?: string }) => {
    const { open } = useSearch();
    return (
        <button
            type="button"
            aria-label="Search"
            onClick={open}
            className={`group text-fg-quaternary outline-focus-ring hover:bg-primary_hover hover:text-fg-quaternary_hover relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 ${className ?? ""}`}
        >
            <SearchLg className="size-4" />
        </button>
    );
};
