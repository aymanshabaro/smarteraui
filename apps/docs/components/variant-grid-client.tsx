"use client";

import { useState } from "react";
import Link from "next/link";
import { ToggleButton as AriaToggleButton, ToggleButtonGroup as AriaToggleButtonGroup } from "react-aria-components";
import { cx } from "~/lib/cx";
import { Grid01, Rows01 } from "@smarteraui/icons";

/** One card in the gallery, resolved on the server (thumbnails may not exist yet). */
export type VariantCard = {
    variant: string;
    title: string;
    section: string;
    label: string;
    href: string;
    light?: string;
    dark?: string;
};

const toggleClasses =
    "flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-semibold text-quaternary outline-focus-ring transition duration-100 ease-linear selected:bg-primary_alt selected:text-secondary selected:shadow-xs selected:ring-1 selected:ring-primary selected:ring-inset focus-visible:outline-2";

const Thumb = ({ card }: { card: VariantCard }) =>
    card.light ? (
        <>
            <img
                src={card.light}
                alt={card.title}
                loading="lazy"
                className="bg-primary outline-secondary_alt w-full rounded-lg object-cover outline-1 dark:hidden"
            />
            <img
                src={card.dark ?? card.light}
                alt={card.title}
                loading="lazy"
                className="bg-primary outline-secondary_alt w-full rounded-lg object-cover outline-1 not-dark:hidden"
            />
        </>
    ) : (
        <div className="bg-secondary text-quaternary flex aspect-[16/10] w-full items-center justify-center rounded-lg text-sm font-medium">{card.title}</div>
    );

export const VariantGridClient = ({ cards, showViewToggle = false }: { cards: VariantCard[]; showViewToggle?: boolean }) => {
    const [view, setView] = useState<"grid" | "list">("grid");

    if (!cards.length) {
        return (
            <p className="not-typography border-secondary text-tertiary rounded-xl border border-dashed px-6 py-10 text-center text-sm">
                No variants generated yet.
            </p>
        );
    }

    return (
        <div className="not-typography w-full">
            {showViewToggle && (
                <div className="mb-4 flex justify-end">
                    <AriaToggleButtonGroup
                        aria-label="Gallery layout"
                        selectionMode="single"
                        disallowEmptySelection
                        selectedKeys={[view]}
                        onSelectionChange={(keys) => setView([...keys][0] === "list" ? "list" : "grid")}
                        className="bg-secondary_alt ring-secondary flex gap-0 rounded-lg p-0.5 ring-1 ring-inset"
                    >
                        <AriaToggleButton id="grid" className={toggleClasses}>
                            <Grid01 className="size-4" /> Grid view
                        </AriaToggleButton>
                        <AriaToggleButton id="list" className={toggleClasses}>
                            <Rows01 className="size-4" /> List view
                        </AriaToggleButton>
                    </AriaToggleButtonGroup>
                </div>
            )}

            <div className={cx(view === "grid" ? "columns-1 gap-4 md:columns-2 xl:columns-3" : "flex flex-col gap-4")}>
                {cards.map((card) => (
                    <Link
                        key={`${card.section}-${card.variant}`}
                        href={card.href}
                        aria-label={card.title}
                        className="bg-primary outline-focus-ring ring-secondary not-dark:hover:bg-primary_hover relative mb-4 block cursor-pointer break-inside-avoid rounded-xl ring ring-inset focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <div className="px-1 pt-1">
                            <Thumb card={card} />
                        </div>
                        <div className="px-3 py-2.5 text-sm">
                            <span className="text-secondary font-medium">{card.title}</span> <span className="text-tertiary">· {card.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
