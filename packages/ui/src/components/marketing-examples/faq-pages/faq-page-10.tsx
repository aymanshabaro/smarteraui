"use client";

import {
    Button as AriaButton,
    Disclosure as AriaDisclosure,
    DisclosureGroup as AriaDisclosureGroup,
    DisclosurePanel as AriaDisclosurePanel,
    Heading as AriaHeading,
} from "react-aria-components";
import { MinusCircle, PlusCircle, SearchLg } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { Input } from "../../base/input/input";
import { ContentSectionSplitImage02 } from "../../marketing/content-rich-text-sections/content-section-split-image-02";
import { CtaSplitImage03 } from "../../marketing/cta-sections/cta-split-image-03";
import { FooterLarge09 } from "../../marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

const styles = sortCx({
    item: "rounded-2xl p-5 transition duration-300 ease-in-out md:p-8",
    trigger:
        "flex w-full cursor-pointer gap-2 rounded-md text-start outline-focus-ring select-none focus-visible:outline-2 focus-visible:outline-offset-2 md:flex-row-reverse md:gap-6",
    question: "flex-1 text-lg font-medium text-primary",
    indicator: "mt-0.5 flex size-6 items-center text-fg-quaternary",
    panel: "pt-2 pe-8 md:pe-0 md:ps-12",
    answer: "text-md text-tertiary",
    // The page closes on the tinted surface, so the footer is painted to match it.
    onSecondaryFooter: "[&>footer]:bg-secondary",
});

const faqs = [
    {
        id: "free-trial",
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
        id: "change-plan",
        question: "Can I change my plan later?",
        answer: "Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.",
    },
    {
        id: "cancellation",
        question: "What is your cancellation policy?",
        answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
    },
    {
        id: "invoice-info",
        question: "Can other info be added to an invoice?",
        answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name.",
    },
    {
        id: "billing",
        question: "How does billing work?",
        answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.",
    },
    {
        id: "account-email",
        question: "How do I change my account email?",
        answer: "You can change the email address associated with your account by going to proper.example/account from a laptop or desktop.",
    },
] as const;

/** The full-bleed rule the reference page draws between two sections that share a background. */
const SectionDivider = () => (
    <div className="max-w-container mx-auto px-4 md:px-8">
        <hr className="bg-border-secondary h-px w-full border-none" />
    </div>
);

/**
 * FAQ page 10 — a searchable FAQ hero above a headless card accordion, a customer case study,
 * a tinted trial CTA overlapped by a wide photo, and a call-to-action footer.
 */
export const FaqPage10 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Support</span>
                    <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">FAQs</h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Need something cleared up? Here are our most frequently asked questions.</p>

                    <div className="mt-8 w-full sm:mt-12 sm:w-80">
                        <Input size="lg" type="search" icon={SearchLg} aria-label="Search" placeholder="Search" wrapperClassName="sm:py-0.5" />
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                {/* The hero already carries the section heading, so each question is the page's next level down. */}
                <div className="mx-auto max-w-3xl">
                    <AriaDisclosureGroup defaultExpandedKeys={[faqs[0].id]} className="flex flex-col gap-4">
                        {faqs.map((faq) => (
                            <AriaDisclosure
                                key={faq.id}
                                id={faq.id}
                                className={({ isExpanded }) => cx(styles.item, isExpanded ? "bg-secondary" : "bg-transparent")}
                            >
                                {({ isExpanded }) => (
                                    <>
                                        <AriaHeading level={2}>
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
            </div>
        </section>

        <SectionDivider />

        <ContentSectionSplitImage02 />

        <CtaSplitImage03 />

        <div className={styles.onSecondaryFooter}>
            <FooterLarge09 />
        </div>
    </div>
);
