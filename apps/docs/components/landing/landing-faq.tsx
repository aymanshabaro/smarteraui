"use client";

import {
    Button as AriaButton,
    Disclosure as AriaDisclosure,
    DisclosureGroup as AriaDisclosureGroup,
    DisclosurePanel as AriaDisclosurePanel,
    Heading as AriaHeading,
} from "react-aria-components";
import { GithubMark } from "~/components/brand-icons";
import { MinusCircle, PlusCircle } from "@smarteraui/icons";
import { Button } from "@smarteraui/ui/components/base/buttons/button";
import { FeaturedIcon } from "@smarteraui/ui/components/foundations/featured-icon/featured-icon";
import { sortCx } from "@smarteraui/ui/utils/cx";
import { REPO_URL } from "./content";

/**
 * FAQ.
 *
 * Copied from `marketing/faq-sections/faq-accordion-01` — the React Aria disclosure group, its
 * dividers and the closing card are that section's. The card's demo avatar stack is replaced by
 * the repository link, since the honest answer to "still have questions" here is the issue
 * tracker rather than a sales team.
 */

const styles = sortCx({
    item: "not-first:-mt-px not-first:border-t not-first:border-secondary not-first:pt-6",
    trigger:
        "flex w-full cursor-pointer items-start justify-between gap-2 rounded-md text-start outline-focus-ring select-none focus-visible:outline-2 focus-visible:outline-offset-2 md:gap-6",
    question: "text-md font-semibold text-primary",
    indicator: "flex size-6 items-center text-fg-quaternary",
    panel: "pt-1 pe-8 md:pe-12",
    answer: "text-md text-tertiary",
});

const faqs = [
    {
        id: "which-tools",
        question: "Which AI coding tools does it work with?",
        answer: "Any of them. There is nothing tool-specific here — the surfaces are a public JSON registry at /r, a markdown index at /llms.txt and a CLI. Claude Code, Codex, Cursor, Copilot, v0, Bolt and Lovable can all either fetch a URL or run a shell command, which is all that is required.",
    },
    {
        id: "mcp",
        question: "Is there an MCP server?",
        answer: "Not yet — it is on the roadmap, and the page describing it says so plainly rather than pretending otherwise. Today an assistant drives the CLI in its shell tool and reads the registry JSON directly, which covers the same ground: search, inspect, install.",
    },
    {
        id: "generated-accessible",
        question: "So AI-generated screens are automatically accessible?",
        answer: "The primitives are: behaviour comes from React Aria and every component group ships an axe smoke test that runs in CI. Composition is still yours to review — a model can nest landmarks badly or skip a heading level with perfectly accessible building blocks. This removes a whole class of mistakes, not the need to look.",
    },
    {
        id: "licence",
        question: "What licence is it under?",
        answer: "MIT, copyright 2026 Ayman Shabaro. Use it in commercial products, fork it, redistribute it — the only obligation is keeping the licence notice. Parts of the component library are derived from Untitled UI React, which is MIT too; that notice ships in the repository's LICENSES folder.",
    },
    {
        id: "really-free",
        question: "Is it really free?",
        answer: "Yes. Everything in the repository is included: the base primitives, the application UI, the marketing sections and every full page example. The registry the CLI reads is public and anonymous, so adding a component needs no account and no token.",
    },
    {
        id: "react-next",
        question: "Does it work with React and Next.js?",
        answer: "It targets React 19, and Next.js 15 with the App Router is a first-class — but optional — peer dependency; this documentation site is itself a Next.js app built from the library. Vite, Remix and plain React work the same way, and the CLI detects which one you have during init. Tailwind CSS v4 is required.",
    },
    {
        id: "vs-css-framework",
        question: "How is this different from a CSS framework?",
        answer: "A CSS framework hands you class names; you still write the keyboard handling, the focus traps and the ARIA. Smartera UI hands you behaviour — every interactive component is a React Aria Component, so those come with it. Tailwind is how the components are painted, not what they are.",
    },
] as const;

export const LandingFaq = () => (
    <section aria-labelledby="faq" className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 id="faq" className="text-display-sm text-primary md:text-display-md font-semibold">
                    Frequently asked questions
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Assistant support, licensing, framework support and what you are actually getting.
                </p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl md:mt-16">
                <AriaDisclosureGroup defaultExpandedKeys={[faqs[0].id]} className="flex flex-col gap-8">
                    {faqs.map((faq) => (
                        <AriaDisclosure key={faq.id} id={faq.id} className={styles.item}>
                            {({ isExpanded }) => (
                                <>
                                    <AriaHeading level={3}>
                                        <AriaButton slot="trigger" className={styles.trigger}>
                                            <span className={styles.question}>{faq.question}</span>
                                            <span aria-hidden="true" className={styles.indicator}>
                                                {isExpanded ? <MinusCircle className="size-6" /> : <PlusCircle className="size-6" />}
                                            </span>
                                        </AriaButton>
                                    </AriaHeading>

                                    <AriaDisclosurePanel className={styles.panel}>
                                        <p className={styles.answer}>{faq.answer}</p>
                                    </AriaDisclosurePanel>
                                </>
                            )}
                        </AriaDisclosure>
                    ))}
                </AriaDisclosureGroup>
            </div>

            <div className="bg-secondary mt-12 flex flex-col items-center gap-6 rounded-2xl px-6 py-8 text-center md:mt-16 md:gap-8 md:pt-8 md:pb-10">
                <FeaturedIcon icon={<GithubMark className="size-6" data-icon="true" />} size="xl" theme="modern" color="gray" />

                <div>
                    <h3 className="text-primary text-xl font-semibold">Still have questions?</h3>
                    <p className="text-md text-tertiary mt-2 md:text-lg">
                        Open an issue on GitHub. Bug reports, missing variants and documentation gaps all belong in the same place.
                    </p>
                </div>

                <Button size="xl" href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
                    Open an issue
                </Button>
            </div>
        </div>
    </section>
);
