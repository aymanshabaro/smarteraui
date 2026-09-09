"use client";

import { createContext, useContext } from "react";
import type { RefObject } from "react";
import type { TextEditorCommand, TrackedTextEditorCommand } from "./text-editor-commands";
import type { TextEditorSize } from "./text-editor-styles";

/** Offset of the current selection relative to the editor root, in pixels. */
export interface TextEditorSelectionRect {
    top: number;
    left: number;
}

export interface TextEditorContextValue {
    size: TextEditorSize;
    contentId: string;
    hintId: string;
    contentLabel: string;
    placeholder?: string;
    editorRef: RefObject<HTMLDivElement | null>;
    /** HTML the editable area is seeded with; frozen after the first render. */
    initialHtml: string;

    isEmpty: boolean;
    maxLength?: number;
    charactersLeft?: number;

    activeCommands: Record<TrackedTextEditorCommand, boolean>;
    selectionRect: TextEditorSelectionRect | null;

    textColor: string;
    fontFamily: string;
    fontSize: string;

    hasHint: boolean;
    setHasHint: (hasHint: boolean) => void;

    runCommand: (command: TextEditorCommand, value?: string) => void;
    setTextColor: (color: string) => void;
    setFontFamily: (fontFamily: string) => void;
    setFontSize: (fontSize: string) => void;
    saveSelection: () => void;
    handleInput: () => void;
}

export const TextEditorContext = createContext<TextEditorContextValue | null>(null);

/** Reads the surrounding `TextEditor` state. Throws when used outside the root. */
export const useTextEditorContext = (): TextEditorContextValue => {
    const context = useContext(TextEditorContext);

    if (!context) {
        throw new Error("TextEditor sub-components must be rendered inside a <TextEditor>.");
    }

    return context;
};
