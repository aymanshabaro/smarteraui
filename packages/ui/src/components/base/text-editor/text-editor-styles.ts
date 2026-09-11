import type { CSSProperties } from "react";
import { sortCx } from "../../../utils/cx";

/**
 * The native `::-webkit-resizer` grip is unstyleable, so it is replaced with an
 * inline SVG grip. Base64 keeps the markup free of raw `http(s)` asset URLs.
 * These are the one documented `dark:` swaps in this component — a background
 * image cannot be expressed with a semantic colour token.
 */
const resizeHandleLight =
    "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMkwyIDEwIiBzdHJva2U9IiNENUQ3REEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMSA3TDcgMTEiIHN0cm9rZT0iI0Q1RDdEQSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+)";
const resizeHandleDark =
    "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMkwyIDEwIiBzdHJva2U9IiMzNzNBNDEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMSA3TDcgMTEiIHN0cm9rZT0iIzM3M0E0MSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+)";

/** CSS variables consumed by the `[&::-webkit-resizer]` utilities on the editable area. */
export const resizeHandleVars = {
    "--resize-handle-bg": resizeHandleLight,
    "--resize-handle-bg-dark": resizeHandleDark,
} as CSSProperties;

export const styles = sortCx({
    common: {
        // The root is a positioning context for the selection toolbar.
        root: "relative flex w-full flex-col gap-2",

        toolbar: "flex w-max flex-col items-start justify-center gap-2 md:flex-row md:items-center md:justify-start md:gap-3",
        toolbarFloating: "bg-primary shadow-lg ring-1 ring-secondary_alt",
        selectionToolbar: "absolute z-10 -mt-2 -translate-x-1/2 -translate-y-full",

        group: "flex flex-wrap gap-0.5 md:flex-nowrap",

        separator: "flex self-stretch p-1.5",
        separatorLine: "h-full w-px shrink-0 rounded-full border-0 bg-border-primary",

        button: [
            // Layout.
            "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-0",
            // Colour + motion.
            "text-fg-quaternary transition duration-100 ease-linear",
            // Focus.
            "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
            // Interaction states.
            "hover:bg-primary_hover hover:text-fg-quaternary_hover",
            "pressed:bg-primary_hover pressed:outline-hidden",
            "selected:bg-primary_hover selected:text-editor-icon-fg_active",
            // Disabled.
            "disabled:cursor-not-allowed disabled:opacity-50",
        ].join(" "),
        buttonIcon: "pointer-events-none size-5 shrink-0 transition-inherit-all",
        swatch: "size-4 rounded-full ring-1 ring-secondary_alt ring-inset in-pressed:outline-[1.5px] in-pressed:outline-offset-2",

        content: [
            // Box.
            "w-full resize-y scroll-py-3 overflow-auto rounded-lg bg-primary text-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset",
            // Caret + selection.
            "caret-fg-brand-primary selection:bg-fg-brand-primary/10",
            // Focus.
            "focus:ring-2 focus:ring-brand focus:outline-hidden",
            // Placeholder — absolutely positioned at its static position so it never affects layout.
            "data-empty:before:pointer-events-none data-empty:before:absolute data-empty:before:text-placeholder data-empty:before:content-[attr(data-placeholder)]",
            // Rich-text content produced by the editing commands.
            "[&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ps-5 [&_ul]:ps-5",
            "[&_a]:text-brand-secondary [&_a]:underline",
            "[&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-lg",
            // Custom resize grip (documented dark-mode asset swap).
            "[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:bg-contain dark:[&::-webkit-resizer]:bg-(image:--resize-handle-bg-dark)",
        ].join(" "),

        hint: "text-sm text-tertiary tabular-nums",

        popover: "rounded-lg bg-primary shadow-lg ring-1 ring-secondary_alt outline-hidden",

        selectRoot: "flex w-full flex-col gap-1.5",
        selectButton: [
            "relative flex w-full cursor-pointer items-center gap-2 rounded-lg bg-primary py-2 pe-2.5 ps-3 shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset",
            "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        ].join(" "),
        selectIcon: "size-4 shrink-0 stroke-[2.25px] text-fg-quaternary",
        selectValue: "flex w-full gap-x-1.5 truncate text-start text-sm font-medium text-primary",
        selectList: "max-h-60 w-(--trigger-width) overflow-auto p-1 outline-hidden",
        selectItem: [
            "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-primary outline-hidden select-none",
            "hover:bg-primary_hover focused:bg-primary_hover",
        ].join(" "),

        colorGrid: "grid grid-cols-4 gap-1 p-1.5",
        colorOption: [
            "flex size-8 cursor-pointer items-center justify-center rounded-md transition duration-100 ease-linear",
            "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
            "hover:bg-primary_hover pressed:bg-primary_hover",
        ].join(" "),
        colorOptionSwatch: "size-4 rounded-full ring-1 ring-secondary_alt ring-inset",

        linkForm: "flex w-70 max-w-full items-center gap-2 p-2",
        linkInput: [
            "w-full rounded-lg bg-primary px-3 py-2 text-sm text-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset",
            "placeholder:text-placeholder focus:ring-2 focus:ring-brand focus:outline-hidden",
        ].join(" "),
        linkSubmit: [
            "shrink-0 cursor-pointer rounded-lg bg-brand-solid px-3 py-2 text-sm font-semibold text-primary_on-brand shadow-xs transition duration-100 ease-linear",
            "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-brand-solid_hover",
        ].join(" "),
    },

    sizes: {
        sm: {
            // Toolbar-to-field spacing is `gap-2` at this size, which the root already provides.
            toolbar: "",
            toolbarFloating: "rounded-lg p-1",
            content: "p-4 text-sm",
        },
        md: {
            // The root gap is 8px; the extra 4px brings toolbar-to-field spacing to 12px.
            toolbar: "mb-1",
            toolbarFloating: "rounded-xl p-2",
            content: "p-5 text-md leading-[1.5]",
        },
    },
});

export type TextEditorSize = keyof typeof styles.sizes;
