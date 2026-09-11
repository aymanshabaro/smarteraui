"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import {
    defaultFontFamily,
    defaultFontSize,
    defaultTextColor,
    execEditorCommand,
    getPlainTextLength,
    readCommandStates,
    stripHtml,
} from "./text-editor-commands";
import type { TextEditorCommand } from "./text-editor-commands";
import { TextEditorContext, useTextEditorContext } from "./text-editor-context";
import type { TextEditorContextValue, TextEditorSelectionRect } from "./text-editor-context";
import { resizeHandleVars, styles } from "./text-editor-styles";
import type { TextEditorSize } from "./text-editor-styles";
import {
    TextEditorAlignCenter,
    TextEditorAlignLeft,
    TextEditorAlignRight,
    TextEditorBold,
    TextEditorBulletList,
    TextEditorFontFamily,
    TextEditorFontSize,
    TextEditorGenerate,
    TextEditorGroup,
    TextEditorImage,
    TextEditorItalic,
    TextEditorLink,
    TextEditorSelectionToolbar,
    TextEditorSeparator,
    TextEditorTextColor,
    TextEditorToolbar,
    TextEditorUnderline,
} from "./text-editor-toolbar";

export interface TextEditorProps {
    /** Controls the padding and type scale of the editable area. */
    size?: TextEditorSize;
    /** Initial HTML content. The editor is uncontrolled — later changes to this prop are ignored. */
    defaultValue?: string;
    /** Text shown while the editable area is empty. */
    placeholder?: string;
    /** Character budget. When set, `TextEditor.Hint` counts down the remaining characters. */
    maxLength?: number;
    /** Called with the editor's HTML after every edit. */
    onChange?: (html: string) => void;
    /** Accessible name for the editable area. */
    "aria-label"?: string;
    className?: string;
    children?: ReactNode;
}

const TextEditorRoot = ({
    size = "md",
    defaultValue = "",
    placeholder,
    maxLength,
    onChange,
    className,
    children,
    "aria-label": ariaLabel = "Text editor",
}: TextEditorProps) => {
    const id = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const savedRangeRef = useRef<Range | null>(null);

    // Frozen on the first render so React never rewrites the editable DOM under the user.
    const [initialHtml] = useState(defaultValue);
    const [textLength, setTextLength] = useState(() => getPlainTextLength(defaultValue));
    const [isEmpty, setIsEmpty] = useState(() => stripHtml(defaultValue).trim().length === 0);
    const [activeCommands, setActiveCommands] = useState(() => readCommandStates());
    const [selectionRect, setSelectionRect] = useState<TextEditorSelectionRect | null>(null);
    const [textColor, setTextColorState] = useState<string>(defaultTextColor);
    const [fontFamily, setFontFamilyState] = useState<string>(defaultFontFamily);
    const [fontSize, setFontSizeState] = useState<string>(defaultFontSize);
    const [hasHint, setHasHint] = useState(false);

    const handleInput = useCallback(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const text = editor.textContent ?? "";
        setTextLength(text.length);
        setIsEmpty(text.trim().length === 0 && !editor.querySelector("img"));
        onChange?.(editor.innerHTML);
    }, [onChange]);

    const saveSelection = useCallback(() => {
        const editor = editorRef.current;
        const selection = typeof document === "undefined" ? null : document.getSelection();
        if (!editor || !selection || selection.rangeCount === 0) return;
        if (!editor.contains(selection.getRangeAt(0).commonAncestorContainer)) return;

        savedRangeRef.current = selection.getRangeAt(0).cloneRange();
    }, []);

    const restoreSelection = useCallback(() => {
        const editor = editorRef.current;
        const range = savedRangeRef.current;
        const selection = typeof document === "undefined" ? null : document.getSelection();
        if (!editor || !range || !selection) return;
        if (selection.rangeCount > 0 && editor.contains(selection.getRangeAt(0).commonAncestorContainer)) return;

        selection.removeAllRanges();
        selection.addRange(range);
    }, []);

    const runCommand = useCallback(
        (command: TextEditorCommand, value?: string) => {
            editorRef.current?.focus();
            restoreSelection();
            execEditorCommand(command, value);
            setActiveCommands(readCommandStates());
            handleInput();
        },
        [handleInput, restoreSelection],
    );

    const setTextColor = useCallback(
        (color: string) => {
            setTextColorState(color);
            runCommand("foreColor", color);
        },
        [runCommand],
    );

    useEffect(() => {
        const handleSelectionChange = () => {
            const editor = editorRef.current;
            const root = rootRef.current;
            const selection = document.getSelection();

            if (!editor || !root || !selection || selection.rangeCount === 0 || !editor.contains(selection.getRangeAt(0).commonAncestorContainer)) {
                setSelectionRect(null);
                return;
            }

            const range = selection.getRangeAt(0);
            savedRangeRef.current = range.cloneRange();
            setActiveCommands(readCommandStates());

            if (selection.isCollapsed) {
                setSelectionRect(null);
                return;
            }

            const rect = range.getBoundingClientRect();
            const rootRect = root.getBoundingClientRect();
            setSelectionRect({ top: rect.top - rootRect.top, left: rect.left - rootRect.left + rect.width / 2 });
        };

        document.addEventListener("selectionchange", handleSelectionChange);
        return () => document.removeEventListener("selectionchange", handleSelectionChange);
    }, []);

    const context = useMemo<TextEditorContextValue>(
        () => ({
            size,
            contentId: `text-editor-${id}`,
            hintId: `text-editor-${id}-hint`,
            contentLabel: ariaLabel,
            placeholder,
            editorRef,
            initialHtml,
            isEmpty,
            maxLength,
            charactersLeft: maxLength === undefined ? undefined : maxLength - textLength,
            activeCommands,
            selectionRect,
            textColor,
            fontFamily,
            fontSize,
            hasHint,
            setHasHint,
            runCommand,
            setTextColor,
            setFontFamily: setFontFamilyState,
            setFontSize: setFontSizeState,
            saveSelection,
            handleInput,
        }),
        [
            activeCommands,
            ariaLabel,
            fontFamily,
            fontSize,
            handleInput,
            hasHint,
            id,
            initialHtml,
            isEmpty,
            maxLength,
            placeholder,
            runCommand,
            saveSelection,
            selectionRect,
            setTextColor,
            size,
            textColor,
            textLength,
        ],
    );

    return (
        <TextEditorContext.Provider value={context}>
            <div ref={rootRef} className={cx(styles.common.root, className)} data-editor-size={size}>
                {children}
            </div>
        </TextEditorContext.Provider>
    );
};

export interface TextEditorContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "contentEditable" | "dangerouslySetInnerHTML" | "onInput"> {
    className?: string;
    style?: CSSProperties;
}

/** The editable area. Add a height utility via `className` (e.g. `h-87`). */
const TextEditorContent = ({ className, style, ...props }: TextEditorContentProps) => {
    const { size, contentId, hintId, contentLabel, placeholder, editorRef, initialHtml, isEmpty, hasHint, handleInput, fontFamily, fontSize } =
        useTextEditorContext();

    return (
        <div
            {...props}
            ref={editorRef}
            id={contentId}
            role="textbox"
            tabIndex={0}
            contentEditable
            suppressContentEditableWarning
            translate="no"
            aria-multiline="true"
            aria-label={contentLabel}
            aria-describedby={hasHint ? hintId : undefined}
            data-empty={isEmpty || undefined}
            data-placeholder={placeholder}
            onInput={handleInput}
            style={{
                ...resizeHandleVars,
                ...(fontFamily === defaultFontFamily ? {} : { fontFamily }),
                ...(fontSize === defaultFontSize ? {} : { fontSize }),
                ...style,
            }}
            className={cx(styles.common.content, styles.sizes[size].content, className)}
            // The string is frozen on the root's first render, so React never rewrites the
            // editable subtree and can never clobber what the user typed.
            dangerouslySetInnerHTML={{ __html: initialHtml }}
        />
    );
};

export interface TextEditorHintProps {
    className?: string;
    /** Overrides the default "N characters left" message. */
    children?: ReactNode;
}

/** Helper text below the editable area; counts down to `maxLength` by default. */
const TextEditorHint = ({ className, children }: TextEditorHintProps) => {
    const { hintId, charactersLeft, setHasHint } = useTextEditorContext();

    useEffect(() => {
        setHasHint(true);
        return () => setHasHint(false);
    }, [setHasHint]);

    return (
        <span id={hintId} className={cx(styles.common.hint, className)}>
            {children ?? (charactersLeft === undefined ? null : `${charactersLeft} characters left`)}
        </span>
    );
};

/**
 * Mirrors `ToolbarItemProps` from `./text-editor-toolbar` (intentionally not exported there — it
 * is that module's own private prop shape). Duplicated here only so the assembled `TextEditor.*`
 * members below have a type declaration emit can name (TS4023 otherwise); it carries no runtime
 * behavior of its own.
 */
interface ToolbarButtonProps {
    className?: string;
    isDisabled?: boolean;
}

/**
 * A dependency-free rich text editor built on a `contenteditable` region and
 * React Aria toolbar primitives.
 */
export const TextEditor: typeof TextEditorRoot & {
    Toolbar: typeof TextEditorToolbar;
    SelectionToolbar: typeof TextEditorSelectionToolbar;
    Group: typeof TextEditorGroup;
    Separator: typeof TextEditorSeparator;
    Content: typeof TextEditorContent;
    Hint: typeof TextEditorHint;
    Bold: FC<ToolbarButtonProps>;
    Italic: FC<ToolbarButtonProps>;
    Underline: FC<ToolbarButtonProps>;
    TextColor: FC<ToolbarButtonProps>;
    AlignLeft: FC<ToolbarButtonProps>;
    AlignCenter: FC<ToolbarButtonProps>;
    AlignRight: FC<ToolbarButtonProps>;
    BulletList: FC<ToolbarButtonProps>;
    Link: FC<ToolbarButtonProps>;
    Image: typeof TextEditorImage;
    Generate: typeof TextEditorGenerate;
    FontFamily: FC<ToolbarButtonProps>;
    FontSize: FC<ToolbarButtonProps>;
} = Object.assign(TextEditorRoot, {
    Toolbar: TextEditorToolbar,
    SelectionToolbar: TextEditorSelectionToolbar,
    Group: TextEditorGroup,
    Separator: TextEditorSeparator,
    Content: TextEditorContent,
    Hint: TextEditorHint,
    Bold: TextEditorBold,
    Italic: TextEditorItalic,
    Underline: TextEditorUnderline,
    TextColor: TextEditorTextColor,
    AlignLeft: TextEditorAlignLeft,
    AlignCenter: TextEditorAlignCenter,
    AlignRight: TextEditorAlignRight,
    BulletList: TextEditorBulletList,
    Link: TextEditorLink,
    Image: TextEditorImage,
    Generate: TextEditorGenerate,
    FontFamily: TextEditorFontFamily,
    FontSize: TextEditorFontSize,
});
