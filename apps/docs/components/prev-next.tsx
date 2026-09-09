import Link from "next/link";
import { cx } from "~/lib/cx";
import type { NavSiblings } from "~/lib/site-nav";
import { ArrowLeft, ArrowRight } from "@smarteraui/icons";
import { buttonClasses } from "./primitives";

/** Prev / next footer, derived from the sidebar order by lib/site-nav.ts. */
export const PrevNext = ({ siblings }: { siblings: NavSiblings }) => {
    if (!siblings.prev && !siblings.next) return null;

    return (
        <nav aria-label="Pagination" className="mt-24 flex w-full items-center">
            {siblings.prev && (
                <Link href={siblings.prev.href} className={cx(buttonClasses("secondary"), "px-3.5 py-2.5")}>
                    <ArrowLeft className="size-5" data-icon="true" />
                    <span className="px-0.5">{siblings.prev.title}</span>
                </Link>
            )}
            {siblings.next && (
                <Link href={siblings.next.href} className={cx(buttonClasses("secondary"), "ml-auto px-3.5 py-2.5")}>
                    <span className="px-0.5">{siblings.next.title}</span>
                    <ArrowRight className="size-5" data-icon="true" />
                </Link>
            )}
        </nav>
    );
};
