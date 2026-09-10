"use client";

import { Button as AriaButton, Disclosure as AriaDisclosure, DisclosurePanel as AriaDisclosurePanel } from "react-aria-components";
import { ChevronDown } from "@properui/icons";

/**
 * `<FAQs items={[{ question, answer }]} />` — the accordion at the bottom of a
 * component page (spec 08-docs-site.md § Component page template).
 */
export type FaqItem = { question: string; answer: string } | { q: string; a: string };

const normalise = (item: FaqItem) => ("question" in item ? item : { question: item.q, answer: item.a });

export const FAQs = ({ items }: { items: FaqItem[] }) => {
    if (!items?.length) return null;

    return (
        <div className="not-typography mx-auto mt-8 flex w-full max-w-180 flex-col gap-6">
            {items.map(normalise).map((item, index) => (
                // Index-keyed: a page may legitimately repeat a question.
                <AriaDisclosure key={`${index}-${item.question}`} className="group/faq border-secondary -mt-px border-t pt-6 last:border-b last:pb-6">
                    <h3>
                        <AriaButton
                            slot="trigger"
                            className="outline-focus-ring flex w-full cursor-pointer items-start justify-between gap-2 rounded-md text-left select-none focus-visible:outline-2 focus-visible:outline-offset-2 md:gap-6"
                        >
                            <span className="text-md text-primary font-semibold">{item.question}</span>
                            <span aria-hidden="true" className="text-fg-quaternary flex size-6 shrink-0 items-center">
                                <ChevronDown className="size-5 transition-transform duration-100 ease-linear group-data-expanded/faq:rotate-180" />
                            </span>
                        </AriaButton>
                    </h3>
                    <AriaDisclosurePanel>
                        <div className="pt-2 pr-8 pb-0.5 md:pr-12">
                            <p className="text-md text-tertiary my-4 first:mt-0 last:mb-0">{item.answer}</p>
                        </div>
                    </AriaDisclosurePanel>
                </AriaDisclosure>
            ))}
        </div>
    );
};
