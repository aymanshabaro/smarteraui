"use client";

import { type ImgHTMLAttributes, type PropsWithChildren, type RefAttributes, createContext, useContext, useState } from "react";
import {
    Tag as AriaTag,
    TagGroup as AriaTagGroup,
    type TagGroupProps as AriaTagGroupProps,
    TagList as AriaTagList,
    type TagProps as AriaTagProps,
} from "react-aria-components";
import { User01 } from "@properui/icons";
import { cx, sortCx } from "@/utils/cx";
import { TagCheckbox } from "./base-components/tag-checkbox";
import { TagCloseX } from "./base-components/tag-close-x";

// TODO(orchestrator): candidate for components/foundations/dot-icon — that file does not exist
// yet in this repo, so the status dot is duplicated locally here. Once foundations/dot-icon.tsx
// is ported, replace this with `import { Dot } from "@/components/foundations/dot-icon"`.
const Dot = ({ size = "md", className }: { size?: "sm" | "md"; className?: string }) => {
    const wh = size === "sm" ? 8 : 10;
    const c = size === "sm" ? 4 : 5;
    const r = size === "sm" ? 2.5 : 4;

    return (
        <svg aria-hidden="true" width={wh} height={wh} viewBox={`0 0 ${wh} ${wh}`} fill="none" className={className}>
            <circle cx={c} cy={c} r={r} fill="currentColor" stroke="currentColor" />
        </svg>
    );
};

export const TagAvatar = ({
    src,
    alt,
    contrastBorder = true,
    className,
}: ImgHTMLAttributes<HTMLImageElement> & { /** Whether to render a subtle contrast outline around the avatar. @default true */ contrastBorder?: boolean }) => {
    const [isFailed, setIsFailed] = useState(false);

    return (
        <div
            className={cx(
                "bg-tertiary relative inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full",
                contrastBorder && "outline-[0.5px] -outline-offset-[0.5px] outline-black/16",
                className,
            )}
        >
            {src && !isFailed ? (
                <img data-avatar-img className="size-full object-cover" src={src} alt={alt} onError={() => setIsFailed(true)} />
            ) : (
                <User01 className="text-fg-quaternary size-3 stroke-[2.25px]" />
            )}
        </div>
    );
};

export interface TagItem {
    /** Unique identifier for the tag, used by `TagList`'s `items` prop and selection/removal keys. */
    id: string;
    /** Visible text content of the tag. */
    label: string;
    /** Optional count badge shown at the end of the tag. */
    count?: number;
    /** Optional avatar image shown at the start of the tag. */
    avatarSrc?: string;
    /** Whether the avatar renders a subtle contrast outline. @default true */
    avatarContrastBorder?: boolean;
    /** Whether to show a status dot at the start of the tag. */
    dot?: boolean;
    /** Optional additional CSS class names for the status dot. */
    dotClassName?: string;
    /** Whether the tag is disabled. */
    isDisabled?: boolean;
    /** Called when this tag's remove ("x") button is pressed. */
    onClose?: (id: string) => void;
}

const TagGroupContext = createContext<{
    selectionMode: "none" | "single" | "multiple";
    size: "sm" | "md" | "lg";
}>({
    selectionMode: "none",
    size: "sm",
});

interface TagGroupProps extends AriaTagGroupProps, RefAttributes<HTMLDivElement> {
    /** Accessible label for the tag group. */
    label: string;
    /** Size applied to every tag rendered inside this group. @default "sm" */
    size?: "sm" | "md" | "lg";
}

export const TagGroup = ({ label, selectionMode = "none", size = "sm", children, ...otherProps }: TagGroupProps) => {
    return (
        <TagGroupContext.Provider value={{ selectionMode, size }}>
            <AriaTagGroup aria-label={label} selectionMode={selectionMode} disallowEmptySelection={selectionMode === "single"} {...otherProps}>
                {children}
            </AriaTagGroup>
        </TagGroupContext.Provider>
    );
};

export const TagList = AriaTagList;

const styles = sortCx({
    sm: {
        root: {
            base: "px-2 py-0.75 text-xs font-medium",
            withCheckbox: "ps-1.25",
            withAvatar: "ps-1",
            withDot: "ps-1.5",
            withCount: "pe-1",
            withClose: "pe-1",
        },
        content: "gap-1",
        count: "px-1 text-xs font-medium",
    },
    md: {
        root: {
            base: "px-2.25 py-0.5 text-sm font-medium",
            withCheckbox: "ps-1",
            withAvatar: "ps-1.25",
            withDot: "ps-1.75",
            withCount: "pe-0.75",
            withClose: "pe-1",
        },
        content: "gap-1.25",
        count: "px-1.25 text-xs font-medium",
    },
    lg: {
        root: {
            base: "px-2.5 py-1 text-sm font-medium",
            withCheckbox: "ps-1.25",
            withAvatar: "ps-1.75",
            withDot: "ps-2.25",
            withCount: "pe-1",
            withClose: "pe-1",
        },
        content: "gap-1.5",
        count: "px-1.5 text-sm font-medium",
    },
});

interface TagProps extends AriaTagProps, RefAttributes<object>, Omit<TagItem, "label" | "id"> {}

export const Tag = ({
    id,
    avatarSrc,
    avatarContrastBorder = true,
    dot,
    dotClassName,
    isDisabled,
    count,
    className,
    children,
    onClose,
}: PropsWithChildren<TagProps>) => {
    const context = useContext(TagGroupContext);

    const leadingContent = avatarSrc ? (
        <TagAvatar src={avatarSrc} alt="Avatar" contrastBorder={avatarContrastBorder} />
    ) : dot ? (
        <Dot className={cx("text-fg-success-secondary", dotClassName)} size="sm" />
    ) : null;

    return (
        <AriaTag
            id={id}
            isDisabled={isDisabled}
            textValue={typeof children === "string" ? children : undefined}
            className={(state) =>
                cx(
                    "bg-primary text-secondary ring-primary outline-focus-ring flex cursor-default items-center gap-0.75 rounded-md ring-1 transition duration-50 ease-linear ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                    styles[context.size].root.base,

                    // With avatar
                    avatarSrc && styles[context.size].root.withAvatar,
                    // With X button
                    (onClose || state.allowsRemoving) && styles[context.size].root.withClose,
                    // With dot
                    dot && styles[context.size].root.withDot,
                    // With count
                    typeof count === "number" && styles[context.size].root.withCount,
                    // With checkbox
                    context.selectionMode !== "none" && styles[context.size].root.withCheckbox,
                    // Disabled
                    isDisabled && "cursor-not-allowed",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isDisabled, allowsRemoving }) => (
                <>
                    <div className={cx("flex items-center gap-1", styles[context.size].content)}>
                        {context.selectionMode !== "none" && <TagCheckbox size={context.size} isSelected={isSelected} isDisabled={isDisabled} />}

                        {leadingContent}

                        {children}

                        {typeof count === "number" && (
                            <span className={cx("bg-tertiary flex items-center justify-center rounded-[3px] text-center", styles[context.size].count)}>
                                {count}
                            </span>
                        )}
                    </div>

                    {(onClose || allowsRemoving) && (
                        <TagCloseX size={context.size} excludeFromTabOrder={allowsRemoving} onPress={() => id && onClose?.(id.toString())} />
                    )}
                </>
            )}
        </AriaTag>
    );
};
