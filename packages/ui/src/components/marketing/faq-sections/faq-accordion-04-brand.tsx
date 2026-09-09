"use client";

import {
    Button as AriaButton,
    Disclosure as AriaDisclosure,
    DisclosureGroup as AriaDisclosureGroup,
    DisclosurePanel as AriaDisclosurePanel,
    Heading as AriaHeading,
} from "react-aria-components";
import { MinusCircle, PlusCircle } from "@smarteraui/icons";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    link: "rounded-xs underline underline-offset-4 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
    item: "rounded-2xl p-5 transition duration-300 ease-in-out md:p-6",
    trigger:
        "flex w-full cursor-pointer gap-2 rounded-md text-start outline-focus-ring select-none focus-visible:outline-2 focus-visible:outline-offset-2 md:flex-row md:gap-6",
    question: "flex-1 text-md font-semibold text-primary_on-brand",
    indicator: "flex size-6 items-center text-icon-fg-brand_on-brand",
    panel: "pt-1 pe-8 md:pe-12",
    answer: "text-md text-tertiary_on-brand",
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
        answer: "You can change the email address associated with your account by going to smartera.com/account from a laptop or desktop.",
    },
] as const;

/** The two-column filled-card accordion on the permanently branded section background. */
export const FaqAccordion04Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                <div className="flex w-full max-w-3xl flex-col lg:max-w-xl">
                    <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Support</span>
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">FAQs</h2>
                    <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5">
                        Everything you need to know about the product and billing. Can't find the answer you're looking for? Please{" "}
                        <a href="/contact" className={styles.link}>
                            chat to our friendly team
                        </a>
                        .
                    </p>
                </div>

                <AriaDisclosureGroup defaultExpandedKeys={[faqs[0].id]} className="flex w-full flex-col gap-4">
                    {faqs.map((faq) => (
                        <AriaDisclosure
                            key={faq.id}
                            id={faq.id}
                            className={({ isExpanded }) => cx(styles.item, isExpanded ? "bg-brand-section_subtle" : "bg-transparent")}
                        >
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
        </div>
    </section>
);
