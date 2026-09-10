"use client";

import { Fragment, useMemo, useState } from "react";
import type { Key } from "react-aria";
import type { TabsProps as AriaTabsProps } from "react-aria-components";
import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { Check, Copy01 } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useClipboard } from "@/hooks/use-clipboard";
import { cx, sortCx } from "@/utils/cx";
import type { CodeLanguage, CodeLine } from "./highlight";
import { highlight } from "./highlight";

export type { CodeLanguage, CodeLine, CodeToken, CodeTokenType } from "./highlight";
export { highlight } from "./highlight";

export const styles = sortCx({
    /** The padded surface the raised card sits on. */
    frame: "rounded-[20px] bg-secondary_alt p-2 ring-1 ring-secondary ring-inset",
    card: {
        common: "group/code-snippet relative max-w-full overflow-clip rounded-xl bg-primary ring-1",
        plain: "ring-secondary",
        raised: "shadow-lg ring-secondary_alt",
    },
    /** The horizontally scrollable code region. */
    scroller:
        "outline-focus-ring overflow-x-auto font-mono text-sm leading-[22px] whitespace-pre text-primary focus-visible:outline-2 focus-visible:-outline-offset-2",
    /** The line-number gutter. Sticks to the inline start so it survives horizontal scrolling. */
    gutter: "border-secondary bg-secondary text-quaternary sticky start-0 z-10 w-12 shrink-0 border-e py-5 pe-4 text-end select-none",
    code: {
        withLineNumbers: "block px-5 py-5",
        plain: "block p-4",
    },
    /** Semantic colour per token category. Plain tokens inherit the code colour. */
    token: {
        plain: "",
        // The reference theme renders string literals in the default code colour.
        string: "text-primary",
        comment: "text-quaternary",
        keyword: "text-utility-pink-600",
        constant: "text-utility-blue-600",
        function: "text-utility-brand-600",
    },
    /** Copy control, revealed on hover or when it takes focus. */
    copySlot:
        "absolute end-2 top-2 z-10 flex items-center gap-1 opacity-0 transition duration-100 ease-linear group-hover/code-snippet:opacity-100 has-[:focus-visible]:opacity-100",
    tabs: {
        root: "group/code-tabs bg-secondary_alt ring-secondary rounded-t-xl rounded-b-[20px] shadow-xs ring-1 ring-inset",
        header: "relative flex items-start",
        list: "flex flex-1 items-center overflow-auto px-3 py-2",
        tab: "outline-focus-ring z-10 flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-semibold whitespace-nowrap transition duration-100 ease-linear",
        panel: "px-2 pb-2",
    },
});

const CopyCodeButton = ({ code, className }: { code: string; className?: string }) => {
    const { copied, copy } = useClipboard();

    return <ButtonUtility size="xs" color="tertiary" aria-label="Copy" icon={copied ? Check : Copy01} className={className} onPress={() => copy(code)} />;
};

const CodeLines = ({ lines }: { lines: CodeLine[] }) => (
    <>
        {lines.map((tokens, lineIndex) => (
            // A block per line so the gutter numbers line up and blank lines keep their height.
            <span key={lineIndex} className="block min-h-[22px]">
                {tokens.map((token, tokenIndex) =>
                    token.type === "plain" ? (
                        <Fragment key={tokenIndex}>{token.content}</Fragment>
                    ) : (
                        <span key={tokenIndex} className={styles.token[token.type]}>
                            {token.content}
                        </span>
                    ),
                )}
            </span>
        ))}
    </>
);

interface CodeSnippetBaseProps {
    /** The source code to render. Copied verbatim by the copy control. */
    code: string;
    /** Grammar used by the built-in tokeniser. @default "javascript" */
    language?: CodeLanguage;
    /** Pre-tokenised lines. Supply these to bypass the built-in tokeniser entirely. */
    lines?: CodeLine[];
    /** Whether to render the line-number gutter. @default false */
    showLineNumbers?: boolean;
    /** Whether to render the copy-to-clipboard control. @default true */
    showCopyButton?: boolean;
    /** Collapses the snippet to this many pixels and reveals a "Show more" control. */
    collapsedHeight?: number;
    /** Accessible name for the scrollable code region. @default "Code snippet" */
    "aria-label"?: string;

    className?: string;
}

interface CodeSnippetCardProps extends CodeSnippetBaseProps {
    /** `raised` is the card used inside a frame or a tab panel; `plain` stands on its own. */
    theme: keyof typeof styles.card;
}

const CodeSnippetCard = ({
    code,
    language = "javascript",
    lines: linesProp,
    showLineNumbers = false,
    showCopyButton = true,
    collapsedHeight,
    theme,
    className,
    "aria-label": ariaLabel = "Code snippet",
}: CodeSnippetCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const lines = useMemo(() => linesProp ?? highlight(code, language), [linesProp, code, language]);

    const isCollapsible = typeof collapsedHeight === "number";
    const isCollapsed = isCollapsible && !isExpanded;

    return (
        <div className={cx(styles.card.common, styles.card[theme], className)}>
            <div
                role="region"
                aria-label={ariaLabel}
                // A scrollable region must be reachable by keyboard (WCAG 2.1.1); `region`
                // is not in jsx-a11y's allow-list for tabIndex, but it is the correct role here.
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                className={cx(styles.scroller, isCollapsed && "overflow-y-hidden pb-12")}
                style={isCollapsed ? { maxHeight: collapsedHeight } : undefined}
            >
                <pre className="flex w-max min-w-full">
                    {showLineNumbers && (
                        <div aria-hidden="true" className={styles.gutter}>
                            {lines.map((_, index) => (
                                <span key={index} className="block min-h-[22px]">
                                    {index + 1}
                                </span>
                            ))}
                        </div>
                    )}

                    <code className={showLineNumbers ? styles.code.withLineNumbers : styles.code.plain}>
                        <CodeLines lines={lines} />
                    </code>
                </pre>
            </div>

            {isCollapsible && (
                <div
                    className={cx(
                        "flex items-end justify-center pb-6",
                        // Collapsed: an overlay that fades the code out into the card background.
                        // Expanded: a plain footer that keeps the toggle reachable.
                        isCollapsed ? "bg-primary absolute inset-x-0 bottom-0 h-47 mask-t-from-0% mask-t-to-100%" : "pt-2",
                    )}
                >
                    <Button size="sm" color="secondary" onPress={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? "Show less" : "Show more"}
                    </Button>
                </div>
            )}

            {showCopyButton && (
                <div className={styles.copySlot}>
                    <CopyCodeButton code={code} />
                </div>
            )}
        </div>
    );
};

export interface CodeSnippetProps extends CodeSnippetBaseProps {
    /** Whether to sit the snippet on a padded, raised surface. @default false */
    isFramed?: boolean;
}

/**
 * A read-only code block with optional line numbers, a copy control and a
 * collapsible "Show more" state.
 */
export const CodeSnippet = ({ isFramed = false, className, ...props }: CodeSnippetProps) => {
    if (!isFramed) {
        return <CodeSnippetCard {...props} theme="plain" className={className} />;
    }

    return (
        <div className={cx(styles.frame, className)}>
            <CodeSnippetCard {...props} theme="raised" />
        </div>
    );
};

export interface CodeSnippetTabItem {
    /** Unique key for the tab. */
    id: string;
    /** Visible tab label. */
    label: string;
    /** The source code shown when this tab is selected. */
    code: string;
    /** Grammar used by the built-in tokeniser for this tab. */
    language?: CodeLanguage;
    /** Pre-tokenised lines for this tab, bypassing the built-in tokeniser. */
    lines?: CodeLine[];
}

export interface CodeSnippetTabsProps extends Omit<AriaTabsProps, "children" | "className"> {
    /** The tabs to render, in order. */
    items: CodeSnippetTabItem[];
    /** Whether to render the line-number gutter inside each panel. @default false */
    showLineNumbers?: boolean;
    /** Accessible name for the tab list. @default "Code snippet" */
    "aria-label"?: string;

    className?: string;
}

/**
 * Several snippets behind a tab strip — one per package manager, runtime or language.
 */
export const CodeSnippetTabs = ({
    items,
    showLineNumbers = false,
    className,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onSelectionChange,
    "aria-label": ariaLabel = "Code snippet",
    ...props
}: CodeSnippetTabsProps) => {
    const [selectedKeyState, setSelectedKeyState] = useState<Key | undefined>(defaultSelectedKey ?? items[0]?.id);

    const selectedKey = selectedKeyProp ?? selectedKeyState;
    const activeItem = items.find((item) => item.id === selectedKey) ?? items[0];

    return (
        <AriaTabs
            {...props}
            selectedKey={selectedKey}
            onSelectionChange={(key) => {
                setSelectedKeyState(key);
                onSelectionChange?.(key);
            }}
            className={cx(styles.tabs.root, className)}
        >
            <div className={styles.tabs.header}>
                <AriaTabList aria-label={ariaLabel} items={items} className={styles.tabs.list}>
                    {(item: CodeSnippetTabItem) => (
                        <AriaTab
                            id={item.id}
                            className={({ isSelected, isHovered, isFocusVisible }) =>
                                cx(
                                    styles.tabs.tab,
                                    isSelected ? "text-primary" : "text-quaternary",
                                    !isSelected && isHovered && "text-secondary",
                                    isFocusVisible && "outline-2 outline-offset-2",
                                )
                            }
                        >
                            {item.label}
                        </AriaTab>
                    )}
                </AriaTabList>

                <div className="flex shrink-0 items-center pe-2 pt-2">{activeItem && <CopyCodeButton code={activeItem.code} />}</div>
            </div>

            {items.map((item) => (
                <AriaTabPanel key={item.id} id={item.id} className={styles.tabs.panel}>
                    <CodeSnippetCard
                        theme="raised"
                        code={item.code}
                        language={item.language}
                        lines={item.lines}
                        showLineNumbers={showLineNumbers}
                        showCopyButton={false}
                        aria-label={`${item.label} snippet`}
                    />
                </AriaTabPanel>
            ))}
        </AriaTabs>
    );
};

CodeSnippet.Tabs = CodeSnippetTabs;
