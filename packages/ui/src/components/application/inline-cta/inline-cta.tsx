"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";
import { CheckCircle } from "@properui/icons";
import { cx, sortCx } from "@/utils/cx";

export const styles = sortCx({
    root: {
        /** Plain card — copy plus whatever the consumer nests underneath it. */
        plain: "bg-primary ring-secondary w-full flex-1 rounded-xl px-4 py-5 shadow-xs ring-1 ring-inset sm:p-6",
        /** Card with a leading image: the border moves onto the content column so the image bleeds to the edge. */
        media: "bg-primary flex w-full flex-col overflow-hidden rounded-xl shadow-xs sm:flex-row",
    },
    media: {
        figure: "relative h-50 w-full sm:h-auto sm:w-60",
        image: "absolute inset-0 size-full object-cover",
        // Hairline drawn over the photo so it lines up with the content column's border.
        overlay: "border-secondary_alt absolute inset-0 size-full rounded-t-xl border sm:rounded-s-xl sm:rounded-se-none",
        content: "border-secondary flex-1 rounded-b-xl border border-t-0 px-4 py-5 sm:rounded-e-xl sm:rounded-es-none sm:border-t sm:border-s-0 sm:p-6",
    },
    common: {
        content: "flex flex-col",
        title: "text-md text-primary font-semibold",
        description: "text-tertiary mt-0.5 text-sm",
        actions: "mt-5 flex flex-col-reverse gap-3 sm:flex-row",
        panel: "bg-primary ring-secondary mt-5 rounded-lg p-4 ring-1 ring-inset",
        featureList: "mt-5 flex flex-col gap-4",
        feature: "flex gap-3",
        featureIcon: "text-fg-success-primary size-6 shrink-0",
        featureTitle: "text-md text-secondary font-medium",
        featureDescription: "text-md text-tertiary",
    },
});

export interface InlineCTAProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Heading rendered at the top of the card. */
    title: ReactNode;
    /** Supporting copy rendered under the title. */
    description?: ReactNode;
    /** Optional photo shown beside the copy (above it below the `sm` breakpoint). */
    image?: { src: string; alt: string };
    /** Everything below the copy — actions, a form, a nested panel, a feature list. */
    children?: ReactNode;
    className?: string;
}

/**
 * A card that promotes one next step inside an application surface — announce a release,
 * collect an email, upgrade a plan, hand over a receipt.
 */
export const InlineCTA = ({ title, description, image, children, className, ...props }: InlineCTAProps) => {
    const body = (
        <div className={styles.common.content}>
            <h3 className={styles.common.title}>{title}</h3>
            {description && <p className={styles.common.description}>{description}</p>}
            {children}
        </div>
    );

    if (image) {
        return (
            <div {...props} className={cx(styles.root.media, className)}>
                <div className={styles.media.figure}>
                    <img src={image.src} alt={image.alt} className={styles.media.image} />
                    <div aria-hidden="true" className={styles.media.overlay} />
                </div>

                <div className={styles.media.content}>{body}</div>
            </div>
        );
    }

    return (
        <div {...props} className={cx(styles.root.plain, className)}>
            {body}
        </div>
    );
};

interface InlineCTAActionsProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

/** Row of action buttons. Stacks below `sm` with the primary action on top. */
const InlineCTAActions = ({ className, children, ...props }: InlineCTAActionsProps) => (
    <div {...props} className={cx(styles.common.actions, className)}>
        {children}
    </div>
);

interface InlineCTAPanelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

/** Inset panel for the secondary content of a CTA — a plan, a card on file, a file to download. */
const InlineCTAPanel = ({ className, children, ...props }: InlineCTAPanelProps) => (
    <div {...props} className={cx(styles.common.panel, className)}>
        {children}
    </div>
);

interface InlineCTAFeatureListProps extends HTMLAttributes<HTMLUListElement> {
    children?: ReactNode;
}

/** Vertical list of `InlineCTA.Feature` items. */
const InlineCTAFeatureList = ({ className, children, ...props }: InlineCTAFeatureListProps) => (
    <ul {...props} className={cx(styles.common.featureList, className)}>
        {children}
    </ul>
);

interface InlineCTAFeatureProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
    /** Name of the feature. */
    title: ReactNode;
    /** One-line explanation of the feature. */
    description?: ReactNode;
    /** Icon shown before the copy. Defaults to a success check. */
    icon?: FC<{ className?: string }>;
}

/** One check-marked benefit inside an `InlineCTA.FeatureList`. */
const InlineCTAFeature = ({ title, description, icon: Icon = CheckCircle, className, ...props }: InlineCTAFeatureProps) => (
    <li {...props} className={cx(styles.common.feature, className)}>
        <Icon aria-hidden="true" className={styles.common.featureIcon} />
        <div className="flex flex-col">
            <p className={styles.common.featureTitle}>{title}</p>
            {description && <p className={styles.common.featureDescription}>{description}</p>}
        </div>
    </li>
);

InlineCTA.Actions = InlineCTAActions;
InlineCTA.Panel = InlineCTAPanel;
InlineCTA.FeatureList = InlineCTAFeatureList;
InlineCTA.Feature = InlineCTAFeature;

InlineCTA.displayName = "InlineCTA";
