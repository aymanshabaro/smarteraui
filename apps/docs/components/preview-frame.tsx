"use client";

import { type CSSProperties, type ReactNode, useState } from "react";
import {
    Button as AriaButton,
    Link as AriaLink,
    Tab as AriaTab,
    TabList as AriaTabList,
    TabPanel as AriaTabPanel,
    Tabs as AriaTabs,
} from "react-aria-components";
import { cx } from "~/lib/cx";
import { boltUrl, stackBlitzUrl, v0Url } from "~/lib/external";
import { CLI_PACKAGE } from "~/lib/site";
import { Check, Expand01, Moon01, Terminal } from "@smarteraui/icons";
import { useClipboard } from "@smarteraui/ui/hooks/use-clipboard";
import { BoltMark, StackBlitzMark, V0Mark } from "./brand-icons";
import { CodeBlock } from "./code-block";
import { CopyMenu } from "./copy-menu";
import { useDocsPage } from "./page-context";
import { utilityButtonClasses } from "./primitives";

/**
 * Interactive shell of a `[data-preview]` block.
 * Spec: docs/spec/00-foundation/08-docs-site.md § "Preview block".
 */

const tabListClasses = "group order-first flex gap-0 rounded-lg bg-secondary_alt ring-1 ring-secondary ring-inset md:order-last";
const tabClasses =
    "z-10 flex h-max cursor-pointer items-center justify-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold whitespace-nowrap text-quaternary outline-focus-ring transition duration-100 ease-linear selected:bg-primary_alt selected:text-secondary selected:shadow-xs selected:ring-1 selected:ring-primary selected:ring-inset focus-visible:outline-2 focus-visible:outline-offset-2";

export type PreviewFrameProps = {
    id: string;
    title: string;
    height: number;
    demoKey: string;
    previewPath: string;
    /** Repo-relative path of the demo file, used by the StackBlitz link. */
    sourcePath?: string;
    code?: string;
    codeHtml?: string;
    children?: ReactNode;
};

export const PreviewFrame = ({ id, title, height, demoKey, previewPath, sourcePath, code, codeHtml, children }: PreviewFrameProps) => {
    const [isDark, setIsDark] = useState(false);
    const { pathname, title: pageTitle, install, source } = useDocsPage();
    const { copied, copy } = useClipboard();

    const cliCommand = `npx ${CLI_PACKAGE}@latest add ${install ?? demoKey.split(":")[0]}`;
    const stackBlitzHref = stackBlitzUrl(sourcePath ?? source ?? "packages/ui/src/components");

    return (
        <div
            id={id}
            data-preview="true"
            className="group not-typography flex w-full scroll-mt-20 flex-col gap-3 in-data-docs:my-8"
            style={{ "--preview-height": `${height}px` } as CSSProperties}
        >
            <AriaTabs>
                <header className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                        <h3 className="text-md text-primary font-semibold">
                            <a href={`#${id}`} className="outline-focus-ring rounded-xs focus:outline-2 focus:outline-offset-2">
                                {title}
                            </a>
                        </h3>
                    </div>

                    <div className="flex items-center justify-between gap-3 md:h-9">
                        <div className="flex">
                            <AriaButton
                                aria-label="Dark mode"
                                aria-pressed={isDark}
                                onPress={() => setIsDark((current) => !current)}
                                className={utilityButtonClasses()}
                            >
                                <Moon01 className="size-4" data-icon="true" />
                            </AriaButton>
                            <AriaLink aria-label="Open in Bolt" href={boltUrl(pathname, title)} target="_blank" className={utilityButtonClasses()}>
                                <BoltMark className="size-4" data-icon="true" />
                            </AriaLink>
                            <AriaLink aria-label="Open in StackBlitz" href={stackBlitzHref} target="_blank" className={utilityButtonClasses()}>
                                <StackBlitzMark className="size-4" data-icon="true" />
                            </AriaLink>
                            <AriaLink aria-label="Open in v0" href={v0Url(pathname)} target="_blank" className={utilityButtonClasses()}>
                                <V0Mark className="size-4" data-icon="true" />
                            </AriaLink>
                            <AriaLink aria-label="Open in new tab" href={previewPath} target="_blank" className={utilityButtonClasses()}>
                                <Expand01 className="size-4" data-icon="true" />
                            </AriaLink>
                            <AriaButton aria-label="Copy CLI command" onPress={() => void copy(cliCommand, "cli")} className={utilityButtonClasses()}>
                                {copied === "cli" ? <Check className="size-4" data-icon="true" /> : <Terminal className="size-4" data-icon="true" />}
                            </AriaButton>
                            <CopyMenu pathname={pathname} title={pageTitle} variant="icon" />
                        </div>

                        <AriaTabList aria-label={`${title} view`} className={tabListClasses}>
                            <AriaTab id="preview" className={tabClasses}>
                                <span className="flex items-center gap-1.5 px-0.5">Preview</span>
                            </AriaTab>
                            <AriaTab id="code" className={tabClasses} isDisabled={!codeHtml}>
                                <span className="flex items-center gap-1.5 px-0.5">Code</span>
                            </AriaTab>
                        </AriaTabList>
                    </div>
                </header>

                <div className={cx(isDark && "dark-mode")}>
                    <AriaTabPanel
                        id="preview"
                        className="bg-primary ring-secondary outline-focus-ring relative flex min-h-[var(--preview-height)] max-w-full items-center justify-center gap-3 rounded-[20px] py-32 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:min-w-[520px]"
                    >
                        {children ? (
                            children
                        ) : (
                            <p className="border-secondary text-tertiary rounded-xl border border-dashed px-6 py-8 text-center text-sm">
                                Demo not generated yet: <code className="text-tertiary ml-1 font-mono">{demoKey}</code>
                            </p>
                        )}
                    </AriaTabPanel>

                    <AriaTabPanel id="code" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        {codeHtml && code ? (
                            <CodeBlock html={codeHtml} code={code} />
                        ) : (
                            <p className="border-secondary text-tertiary rounded-[20px] border border-dashed px-6 py-10 text-center text-sm">
                                Source not available yet: <code className="text-tertiary ml-1 font-mono">{demoKey}</code>
                            </p>
                        )}
                    </AriaTabPanel>
                </div>
            </AriaTabs>
        </div>
    );
};
