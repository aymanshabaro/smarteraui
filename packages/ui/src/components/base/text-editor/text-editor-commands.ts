/**
 * Low-level `contenteditable` helpers for the text editor.
 *
 * The editor is deliberately dependency-free: rich-text formatting runs through
 * `document.execCommand`, which every evergreen browser still implements for
 * `contenteditable` regions. Every entry point is guarded so this module is safe
 * to import on the server and inside test environments (jsdom implements neither
 * `execCommand` nor `queryCommandState`).
 */

/** Editing commands the toolbar can issue. */
export type TextEditorCommand =
    | "bold"
    | "italic"
    | "underline"
    | "justifyLeft"
    | "justifyCenter"
    | "justifyRight"
    | "insertUnorderedList"
    | "insertOrderedList"
    | "foreColor"
    | "createLink"
    | "unlink"
    | "insertImage";

/** Commands whose on/off state is reflected by the toolbar toggle buttons. */
export const trackedCommands = [
    "bold",
    "italic",
    "underline",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "insertUnorderedList",
    "insertOrderedList",
] as const;

export type TrackedTextEditorCommand = (typeof trackedCommands)[number];

const canUseDocument = () => typeof document !== "undefined";

/**
 * Runs an editing command against the current document selection.
 * Returns `false` when the environment cannot execute commands.
 */
export const execEditorCommand = (command: TextEditorCommand, value?: string): boolean => {
    if (!canUseDocument() || typeof document.execCommand !== "function") return false;

    try {
        return document.execCommand(command, false, value);
    } catch {
        return false;
    }
};

/** Reads whether a command is currently applied to the selection. */
export const queryEditorCommandState = (command: TrackedTextEditorCommand): boolean => {
    if (!canUseDocument() || typeof document.queryCommandState !== "function") return false;

    try {
        return document.queryCommandState(command);
    } catch {
        return false;
    }
};

/** Reads the state of every tracked command in one pass. */
export const readCommandStates = (): Record<TrackedTextEditorCommand, boolean> => {
    const states = {} as Record<TrackedTextEditorCommand, boolean>;

    for (const command of trackedCommands) {
        states[command] = queryEditorCommandState(command);
    }

    return states;
};

/**
 * Approximates the plain-text length of an HTML string without touching the DOM,
 * so the character counter renders identically on the server and the client.
 */
export const getPlainTextLength = (html: string): number => stripHtml(html).length;

/** Strips tags and decodes the handful of entities a rich-text value can contain. */
export const stripHtml = (html: string): string =>
    html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&");

/** Swatches offered by the text colour picker. Raw hex is required by `execCommand("foreColor")`. */
export const textColors = [
    { id: "default", name: "Default", value: "#181D27" },
    { id: "gray", name: "Gray", value: "#535862" },
    { id: "brand", name: "Brand", value: "#7F56D9" },
    { id: "blue", name: "Blue", value: "#175CD3" },
    { id: "green", name: "Green", value: "#079455" },
    { id: "yellow", name: "Yellow", value: "#DC6803" },
    { id: "red", name: "Red", value: "#D92D20" },
    { id: "pink", name: "Pink", value: "#DD2590" },
] as const;

/** Default swatch — matches the resting state of the toolbar colour button. */
export const defaultTextColor = textColors[0].value;

/** Options for the font family select. */
export const fontFamilies = [
    { id: "Inter", label: "Inter" },
    { id: "Comic Sans MS, Comic Sans", label: "Comic Sans" },
    { id: "serif", label: "serif" },
    { id: "monospace", label: "monospace" },
    { id: "cursive", label: "cursive" },
] as const;

/** Options for the font size select. */
export const fontSizes = ["12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px", "32px"] as const;

/** Default font family / size shown by the selects. */
export const defaultFontFamily = fontFamilies[0].id;
export const defaultFontSize = "16px";
