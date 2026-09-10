"use client";

import {
    Button as AriaButton,
    Menu as AriaMenu,
    MenuItem as AriaMenuItem,
    MenuTrigger as AriaMenuTrigger,
    Popover as AriaPopover,
} from "react-aria-components";
import { cx } from "~/lib/cx";
import { chatGptUrl, claudeUrl } from "~/lib/external";
import { absoluteUrl, markdownUrl } from "~/lib/site";
import { Check, ChevronDown, Copy01 } from "@properui/icons";
import { useClipboard } from "@properui/ui/hooks/use-clipboard";
import { menuItemClasses, popoverClasses, utilityButtonClasses } from "./primitives";

/**
 * The `Copy` dropdown from the page header and every preview toolbar:
 * Copy page as Markdown / Copy page URL / Open in ChatGPT / Open in Claude.
 */
export const CopyMenu = ({ pathname, title, variant = "label" }: { pathname: string; title: string; variant?: "label" | "icon" }) => {
    const { copied, copy } = useClipboard();

    const copyMarkdown = async () => {
        try {
            const response = await fetch(markdownUrl(pathname));
            await copy(await response.text(), "markdown");
        } catch {
            await copy(absoluteUrl(markdownUrl(pathname)), "markdown");
        }
    };

    const onAction = (key: React.Key) => {
        if (key === "markdown") void copyMarkdown();
        if (key === "url") void copy(absoluteUrl(pathname), "url");
    };

    return (
        <AriaMenuTrigger>
            {variant === "icon" ? (
                <AriaButton aria-label="Copy" className={utilityButtonClasses()}>
                    {copied ? <Check className="size-4" data-icon="true" /> : <Copy01 className="size-4" data-icon="true" />}
                </AriaButton>
            ) : (
                <AriaButton className="text-tertiary hover:bg-primary_hover pressed:bg-primary_hover flex cursor-pointer items-center gap-1 rounded-md py-1 pr-1.5 pl-2 text-sm font-semibold outline-hidden transition duration-100 ease-linear">
                    {copied ? "Copied" : "Copy"}
                    <ChevronDown className="text-fg-quaternary size-4" />
                </AriaButton>
            )}

            <AriaPopover placement="bottom end" className={popoverClasses}>
                <AriaMenu aria-label="Copy options" onAction={onAction} className="outline-hidden">
                    <AriaMenuItem id="markdown" className={menuItemClasses}>
                        Copy page as Markdown
                    </AriaMenuItem>
                    <AriaMenuItem id="url" className={menuItemClasses}>
                        Copy page URL
                    </AriaMenuItem>
                    <AriaMenuItem id="chatgpt" href={chatGptUrl(pathname, title)} target="_blank" className={cx(menuItemClasses, "no-underline")}>
                        Open in ChatGPT
                    </AriaMenuItem>
                    <AriaMenuItem id="claude" href={claudeUrl(pathname, title)} target="_blank" className={cx(menuItemClasses, "no-underline")}>
                        Open in Claude
                    </AriaMenuItem>
                </AriaMenu>
            </AriaPopover>
        </AriaMenuTrigger>
    );
};
