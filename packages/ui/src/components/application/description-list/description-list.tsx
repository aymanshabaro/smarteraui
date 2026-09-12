"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";
import { cx, sortCx } from "../../../utils/cx";

const styles = sortCx({
    root: "flex flex-col",
    dividers: "divide-y divide-border-secondary",
    item: {
        stacked: "flex flex-col gap-1 py-4 first:pt-0 last:pb-0",
        horizontal: "flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:gap-4",
    },
    term: {
        stacked: "text-secondary text-sm font-medium",
        horizontal: "text-secondary text-sm font-medium sm:w-48 sm:shrink-0",
    },
    details: {
        stacked: "text-primary text-sm",
        horizontal: "text-primary text-sm sm:flex-1",
    },
});

type DescriptionListLayout = keyof typeof styles.item;

interface DescriptionListContextValue {
    layout: DescriptionListLayout;
}

const DescriptionListContext = createContext<DescriptionListContextValue>({ layout: "stacked" });

export interface DescriptionListProps extends Omit<HTMLAttributes<HTMLDListElement>, "className"> {
    /**
     * Places each term beside its details from `sm` up, or stacks them.
     * @default "stacked"
     */
    layout?: DescriptionListLayout;
    /**
     * Renders a divider between items.
     * @default false
     */
    dividers?: boolean;
    className?: string;
    children: ReactNode;
}

const DescriptionListBase = ({ layout = "stacked", dividers = false, className, children, ...props }: DescriptionListProps) => (
    <DescriptionListContext.Provider value={{ layout }}>
        <dl {...props} className={cx(styles.root, dividers && styles.dividers, className)}>
            {children}
        </dl>
    </DescriptionListContext.Provider>
);
DescriptionListBase.displayName = "DescriptionList";

export interface DescriptionListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
    className?: string;
    children: ReactNode;
}

/** Groups one `Term` and its `Details` together. Renders as a `div` inside the `dl`, which is valid HTML5. */
const Item = ({ className, children, ...props }: DescriptionListItemProps) => {
    const { layout } = useContext(DescriptionListContext);
    return (
        <div {...props} className={cx(styles.item[layout], className)}>
            {children}
        </div>
    );
};
Item.displayName = "DescriptionListItem";

export interface DescriptionListTermProps extends Omit<HTMLAttributes<HTMLElement>, "className"> {
    className?: string;
    children: ReactNode;
}

/** The `dt`: the label for the value in the sibling `Details`. */
const Term = ({ className, children, ...props }: DescriptionListTermProps) => {
    const { layout } = useContext(DescriptionListContext);
    return (
        <dt {...props} className={cx(styles.term[layout], className)}>
            {children}
        </dt>
    );
};
Term.displayName = "DescriptionListTerm";

export interface DescriptionListDetailsProps extends Omit<HTMLAttributes<HTMLElement>, "className"> {
    className?: string;
    children: ReactNode;
}

/** The `dd`: the value for the preceding `Term`. */
const Details = ({ className, children, ...props }: DescriptionListDetailsProps) => {
    const { layout } = useContext(DescriptionListContext);
    return (
        <dd {...props} className={cx(styles.details[layout], className)}>
            {children}
        </dd>
    );
};
Details.displayName = "DescriptionListDetails";

/**
 * A list of term/details pairs (`dl`/`dt`/`dd`), for key-value style content such as a
 * profile summary, an order receipt, or a settings review screen.
 *
 * ```tsx
 * <DescriptionList layout="horizontal" dividers>
 *   <DescriptionList.Item>
 *     <DescriptionList.Term>Full name</DescriptionList.Term>
 *     <DescriptionList.Details>Jane Doe</DescriptionList.Details>
 *   </DescriptionList.Item>
 * </DescriptionList>
 * ```
 */
export const DescriptionList = DescriptionListBase as typeof DescriptionListBase & {
    Item: typeof Item;
    Term: typeof Term;
    Details: typeof Details;
};
DescriptionList.Item = Item;
DescriptionList.Term = Term;
DescriptionList.Details = Details;
