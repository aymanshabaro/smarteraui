"use client";

import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { CodeBlock } from "./code-block";

/** CLI / Manual tabs for the Installation section. */
export const InstallTabs = ({
    cliCode,
    cliHtml,
    files,
    dependencies,
    slug,
}: {
    cliCode: string;
    cliHtml: string;
    files: string[];
    dependencies: string[];
    slug: string;
}) => (
    <AriaTabs className="mt-8 flex w-full flex-col">
        <AriaTabList
            aria-label="Installation method"
            className="group before:bg-border-secondary relative flex gap-3 before:absolute before:inset-x-0 before:bottom-0 before:h-px"
        >
            <AriaTab id="cli" className={tabClasses}>
                <span className="flex items-center gap-1.5 px-0.5">CLI</span>
            </AriaTab>
            <AriaTab id="manual" className={tabClasses}>
                <span className="flex items-center gap-1.5 px-0.5">Manual</span>
            </AriaTab>
        </AriaTabList>

        <AriaTabPanel id="cli" className="mt-8 outline-hidden">
            <CodeBlock html={cliHtml} code={cliCode} maxHeight={200} />
        </AriaTabPanel>

        <AriaTabPanel id="manual" className="mt-8 outline-hidden">
            {files.length ? (
                <>
                    <p className="text-md text-tertiary">Copy the following files into your project:</p>
                    <ul className="mt-4 flex flex-col gap-1">
                        {files.map((file) => (
                            <li key={file} className="text-tertiary font-mono text-sm">
                                {file}
                            </li>
                        ))}
                    </ul>
                    {dependencies.length > 0 && (
                        <p className="text-md text-tertiary mt-6">
                            Then install the dependencies: <span className="font-mono text-sm">{dependencies.join(", ")}</span>.
                        </p>
                    )}
                </>
            ) : (
                <p className="text-md text-tertiary">
                    Copy the source files for <span className="font-mono text-sm">{slug}</span> from the repository into your project and install the
                    dependencies they import.
                </p>
            )}
        </AriaTabPanel>
    </AriaTabs>
);

const tabClasses =
    "z-10 flex h-max cursor-pointer items-center justify-center gap-1 rounded-none border-b-2 border-transparent px-0.5 pt-0 pb-2.5 text-sm font-semibold whitespace-nowrap text-quaternary outline-focus-ring transition duration-100 ease-linear selected:border-fg-brand-primary_alt selected:text-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-2";
