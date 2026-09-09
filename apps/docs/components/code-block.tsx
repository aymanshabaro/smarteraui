"use client";

import { Button as AriaButton } from "react-aria-components";
import { cx } from "~/lib/cx";
import { Check, Copy01 } from "@smarteraui/icons";
import { useClipboard } from "@smarteraui/ui/hooks/use-clipboard";
import { utilityButtonClasses } from "./primitives";

/**
 * Shiki output in the framed surface used by the Preview "Code" tab and the
 * Installation CLI tab, with a copy button in the top-right corner.
 */
export const CodeBlock = ({ html, code, className, maxHeight = 504 }: { html: string; code: string; className?: string; maxHeight?: number }) => {
    const { copied, copy } = useClipboard();

    return (
        <section className={cx("group/pre bg-secondary_alt ring-secondary relative w-full rounded-[20px] p-2 ring-1 ring-inset", className)}>
            <div
                className="docs-code bg-primary ring-secondary_alt relative flex w-full flex-col overflow-auto rounded-xl shadow-lg ring-1"
                style={{ maxHeight: `${maxHeight}px` }}
                // Shiki output is generated at build time from files in this repository.
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <AriaButton
                aria-label={copied ? "Copied" : "Copy"}
                onPress={() => void copy(code)}
                className={cx(utilityButtonClasses(), "absolute top-4 right-4 z-10 opacity-0 group-hover/pre:opacity-100 focus:opacity-100")}
            >
                {copied ? <Check className="size-4" data-icon="true" /> : <Copy01 className="size-4" data-icon="true" />}
            </AriaButton>
        </section>
    );
};
