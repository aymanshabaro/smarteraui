"use client";

import type { FC, ReactElement, ReactNode } from "react";
import { Children, createContext, isValidElement, useContext } from "react";
import { useControlledState } from "@react-stately/utils";
import type { Key as AriaKey, Selection as AriaSelection } from "react-aria-components";
import {
    Button as AriaButton,
    Checkbox as AriaCheckbox,
    Tree as AriaTree,
    TreeItem as AriaTreeItem,
    TreeItemContent as AriaTreeItemContent,
    // The repo requires an `Aria*` alias on every `react-aria-components` import, hooks included.
    useDragAndDrop as AriaUseDragAndDrop,
} from "react-aria-components";
import { ChevronDown, DotsGrid } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { CheckboxBase } from "../../base/checkbox/checkbox";

const styles = sortCx({
    common: {
        root: "flex flex-col",
        item: "mt-0.5 outline-hidden first:mt-0",
        row: "flex w-full cursor-pointer items-center gap-2 rounded-sm pe-2 outline-focus-ring -outline-offset-2 transition duration-100 ease-linear",
        slot: "flex shrink-0 items-center justify-center outline-hidden",
        chevron: "size-4 shrink-0 text-fg-quaternary transition-inherit-all",
        content: "flex min-w-0 flex-1 items-center",
        label: "min-w-0 flex-1 truncate text-sm font-semibold text-tertiary",
        drag: "shrink-0 cursor-grab outline-hidden",
        // One guide cell per ancestor level — it also provides the indentation.
        guide: "relative size-4 shrink-0",
        guideLine: "absolute top-1/2 left-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-border-secondary",
        guideElbowWrapper: "absolute bottom-2 left-1/2 w-px -translate-x-1/2",
        guideElbow: "border-b border-s border-border-secondary",
    },
    sizes: {
        sm: {
            row: "py-1.5",
            content: "gap-1.5",
            icon: "size-4",
            guideLine: "h-[42px]",
            guideElbowWrapper: "h-[22px]",
            guideElbow: "h-[22px] w-[10px] rounded-es-[5px]",
        },
        md: {
            row: "py-2",
            content: "gap-2",
            icon: "size-5",
            guideLine: "h-[44px]",
            guideElbowWrapper: "h-[24px]",
            guideElbow: "h-[24px] w-[12px] rounded-es-[6px]",
        },
    },
});

/** The vertical density of the tree rows. */
export type TreeViewSize = keyof typeof styles.sizes;

/** The horizontal offset a single nesting level adds when the guides are hidden. */
const INDENT_PER_LEVEL = 24;
/** The inline padding of every row, matching the guide cell inset. */
const ROW_INSET = 8;

interface TreeViewContextValue {
    size: TreeViewSize;
    hasGuides: boolean;
    isKeySelected: (key: AriaKey) => boolean;
}

const TreeViewContext = createContext<TreeViewContextValue>({ size: "sm", hasGuides: false, isKeySelected: () => false });

interface TreeGuide {
    /** Whether a pass-through line is drawn in each ancestor guide cell. */
    lines: boolean[];
    /** Whether the item is the last child of its parent. */
    isLastChild: boolean;
}

/** Passed from an item down to its child items. */
const TreeGuideContext = createContext<TreeGuide>({ lines: [], isLastChild: true });

interface TreeItemInfo extends TreeGuide {
    /** The 1-based nesting level of the item. */
    level: number;
    /** The keys of every item nested below this one, used to derive the indeterminate state. */
    descendantKeys: AriaKey[];
}

/** Passed from an item down to its own content. */
const TreeItemInfoContext = createContext<TreeItemInfo>({ lines: [], isLastChild: true, level: 1, descendantKeys: [] });

const isTreeViewItem = (node: ReactNode): node is ReactElement<TreeViewItemProps> => isValidElement(node) && node.type === TreeViewItem;

/** Walks the declared item tree so a node knows which keys live below it. */
const collectDescendantKeys = (children: ReactNode): AriaKey[] =>
    Children.toArray(children).flatMap((child) => (isTreeViewItem(child) ? [child.props.id, ...collectDescendantKeys(child.props.children)] : []));

/** Wraps every child item in the guide context describing the lines it has to draw. */
const withGuides = (children: ReactNode, lines: boolean[]) => {
    const nodes = Children.toArray(children);
    const items = nodes.filter(isTreeViewItem);

    return nodes.map((node) => {
        if (!isTreeViewItem(node)) return node;

        return (
            <TreeGuideContext.Provider key={node.key} value={{ lines, isLastChild: node === items[items.length - 1] }}>
                {node}
            </TreeGuideContext.Provider>
        );
    });
};

const TreeGuides = ({ lines, isLastChild, size }: TreeGuide & { size: TreeViewSize }) => (
    <>
        {lines.map((hasLine, index) => {
            // The innermost cell terminates the branch: an elbow for the last child, a straight line otherwise.
            const isInnermost = index === lines.length - 1;
            const showElbow = isInnermost && isLastChild;
            const showLine = isInnermost ? !isLastChild : hasLine;

            return (
                <div key={index} aria-hidden="true" data-tree-guide className={styles.common.guide}>
                    {showLine && <div className={cx(styles.common.guideLine, styles.sizes[size].guideLine)} />}
                    {showElbow && (
                        <div className={cx(styles.common.guideElbowWrapper, styles.sizes[size].guideElbowWrapper)}>
                            <div className={cx(styles.common.guideElbow, styles.sizes[size].guideElbow)} />
                        </div>
                    )}
                </div>
            );
        })}
    </>
);

export interface TreeViewItemContentProps {
    /** Icon rendered before the label. */
    icon?: FC<{ className?: string }>;
    /** The class name applied to the row. */
    className?: string;
    /** The visible label of the node. */
    children: ReactNode;
}

const TreeViewItemContent = ({ icon: Icon, className, children }: TreeViewItemContentProps) => {
    const { size, hasGuides, isKeySelected } = useContext(TreeViewContext);
    const { lines, isLastChild, level, descendantKeys } = useContext(TreeItemInfoContext);

    return (
        <AriaTreeItemContent>
            {({ hasChildItems, isExpanded, isSelected, selectionMode, allowsDragging }) => {
                // A node is indeterminate while only part of its subtree is selected.
                const isIndeterminate = !isSelected && descendantKeys.some(isKeySelected);

                return (
                    <div
                        // The guide cells already indent nested rows, so they only need the base inset.
                        style={{ paddingInlineStart: hasGuides ? ROW_INSET : ROW_INSET + (level - 1) * INDENT_PER_LEVEL }}
                        className={cx(
                            styles.common.row,
                            styles.sizes[size].row,
                            isSelected || isIndeterminate ? "bg-secondary hover:bg-secondary_hover" : "hover:bg-primary_hover",
                            className,
                        )}
                    >
                        {hasGuides && <TreeGuides lines={lines} isLastChild={isLastChild} size={size} />}

                        {hasChildItems && (
                            <AriaButton slot="chevron" className={styles.common.slot}>
                                <ChevronDown aria-hidden="true" className={cx(styles.common.chevron, !isExpanded && "-rotate-90 rtl:rotate-90")} />
                            </AriaButton>
                        )}

                        {selectionMode !== "none" && (
                            <AriaCheckbox slot="selection" isIndeterminate={isIndeterminate} className={styles.common.slot}>
                                {({ isSelected: isChecked, isDisabled, isFocusVisible }) => (
                                    <CheckboxBase
                                        isSelected={isChecked}
                                        isIndeterminate={isIndeterminate}
                                        isDisabled={isDisabled}
                                        isFocusVisible={isFocusVisible}
                                    />
                                )}
                            </AriaCheckbox>
                        )}

                        <div className={cx(styles.common.content, styles.sizes[size].content)}>
                            {Icon && <Icon aria-hidden="true" className={cx("text-fg-quaternary shrink-0", styles.sizes[size].icon)} />}

                            <span className={styles.common.label}>{children}</span>

                            {allowsDragging && (
                                <AriaButton slot="drag" className={cx(styles.common.drag, !isSelected && "hidden")}>
                                    <DotsGrid aria-hidden="true" className="text-fg-quaternary size-4" />
                                </AriaButton>
                            )}
                        </div>
                    </div>
                );
            }}
        </AriaTreeItemContent>
    );
};

export interface TreeViewItemProps {
    /** A unique key for the node. */
    id: AriaKey;
    /** A plain text representation of the node, used for typeahead. */
    textValue: string;
    /** Whether the node cannot be selected or expanded. */
    isDisabled?: boolean;
    /** The class name applied to the node wrapper. */
    className?: string;
    /** The node content — a `TreeView.ItemContent` followed by any nested `TreeView.Item`s. */
    children: ReactNode;
}

const TreeViewItem = ({ id, textValue, isDisabled, className, children }: TreeViewItemProps) => {
    const { lines, isLastChild } = useContext(TreeGuideContext);
    const level = lines.length + 1;

    // Child rows inherit this row's ancestor lines; the cell above them continues
    // only while this row still has siblings below it.
    const childLines = [...lines];
    if (level >= 2) childLines[level - 2] = !isLastChild;
    childLines.push(false);

    const nodes = Children.toArray(children);
    const contentNodes = nodes.filter((node) => !isTreeViewItem(node));

    return (
        <AriaTreeItem id={id} textValue={textValue} isDisabled={isDisabled} className={cx(styles.common.item, className)}>
            <TreeItemInfoContext.Provider value={{ lines, isLastChild, level, descendantKeys: collectDescendantKeys(children) }}>
                {contentNodes}
            </TreeItemInfoContext.Provider>

            {withGuides(nodes.filter(isTreeViewItem), childLines)}
        </AriaTreeItem>
    );
};

export interface TreeViewProps {
    /**
     * The vertical density of the rows.
     *
     * @default "sm"
     */
    size?: TreeViewSize;
    /**
     * Whether to draw the guide lines that connect a node to its parent. The guides
     * replace the plain indentation.
     *
     * @default false
     */
    hasGuides?: boolean;
    /**
     * Whether rows can be picked up and dropped somewhere else. Combine it with
     * `onReorder` / `onMove` to persist the new order.
     *
     * @default false
     */
    isDraggable?: boolean;
    /**
     * How many nodes can be selected at once.
     *
     * @default "none"
     */
    selectionMode?: "none" | "single" | "multiple";
    /** The selected keys in a controlled tree. */
    selectedKeys?: AriaSelection;
    /** The selected keys of an uncontrolled tree. */
    defaultSelectedKeys?: AriaSelection;
    /** Handler called when the selection changes. */
    onSelectionChange?: (keys: AriaSelection) => void;
    /** The expanded keys in a controlled tree. */
    expandedKeys?: Iterable<AriaKey>;
    /** The expanded keys of an uncontrolled tree. */
    defaultExpandedKeys?: Iterable<AriaKey>;
    /** Handler called when a node is expanded or collapsed. */
    onExpandedChange?: (keys: Set<AriaKey>) => void;
    /** Handler called when dragged rows are dropped between siblings. */
    onReorder?: Parameters<typeof AriaUseDragAndDrop>[0]["onReorder"];
    /** Handler called when dragged rows are dropped onto another node. */
    onMove?: Parameters<typeof AriaUseDragAndDrop>[0]["onMove"];
    /** The accessible label of the tree. */
    "aria-label": string;
    /** The class name applied to the tree. */
    className?: string;
    /** The root `TreeView.Item`s. */
    children: ReactNode;
}

const TreeViewRoot = ({
    size = "sm",
    hasGuides = false,
    isDraggable = false,
    selectionMode = "none",
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange,
    onReorder,
    onMove,
    "aria-label": ariaLabel,
    className,
    children,
}: TreeViewProps) => {
    // Selection is owned here so a parent row can tell whether part of its subtree is selected.
    const [selection, setSelection] = useControlledState<AriaSelection>(selectedKeys, defaultSelectedKeys ?? new Set<AriaKey>(), onSelectionChange);

    const { dragAndDropHooks } = AriaUseDragAndDrop({
        getItems: (keys) => [...keys].map((key) => ({ "text/plain": String(key) })),
        onReorder,
        onMove,
    });

    const isKeySelected = (key: AriaKey) => selection === "all" || selection.has(key);

    return (
        <TreeViewContext.Provider value={{ size, hasGuides, isKeySelected }}>
            <AriaTree
                aria-label={ariaLabel}
                selectionMode={selectionMode}
                selectedKeys={selection}
                onSelectionChange={setSelection}
                expandedKeys={expandedKeys}
                defaultExpandedKeys={defaultExpandedKeys}
                onExpandedChange={onExpandedChange}
                dragAndDropHooks={isDraggable ? dragAndDropHooks : undefined}
                className={cx(styles.common.root, className)}
            >
                {withGuides(children, [])}
            </AriaTree>
        </TreeViewContext.Provider>
    );
};

export const TreeView = Object.assign(TreeViewRoot, {
    Item: TreeViewItem,
    ItemContent: TreeViewItemContent,
});
