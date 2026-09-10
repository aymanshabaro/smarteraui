"use client";

import {
    Button as AriaButton,
    Disclosure as AriaDisclosure,
    DisclosureGroup as AriaDisclosureGroup,
    DisclosurePanel as AriaDisclosurePanel,
    Heading as AriaHeading,
} from "react-aria-components";
import { MinusCircle, PlusCircle } from "@properui/icons";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    item: "rounded-2xl p-5 transition duration-300 ease-in-out md:p-6",
    trigger:
        "flex w-full cursor-pointer gap-2 rounded-md text-start outline-focus-ring select-none focus-visible:outline-2 focus-visible:outline-offset-2 md:flex-row-reverse md:gap-4",
    question: "flex-1 text-md font-semibold text-primary",
    indicator: "flex size-6 items-center text-fg-quaternary",
    panel: "pt-1 pe-8 md:pe-0 md:ps-10",
    answer: "text-md text-tertiary",
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

/** A centered accordion whose expanded question sits on a filled card, with the indicator leading on desktop. */
export const FaqAccordion02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Frequently asked questions</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to know about the product and billing.</p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl md:mt-16">
                <AriaDisclosureGroup defaultExpandedKeys={[faqs[0].id]} className="flex flex-col gap-4">
                    {faqs.map((faq) => (
                        <AriaDisclosure
                            key={faq.id}
                            id={faq.id}
                            className={({ isExpanded }) => cx(styles.item, isExpanded ? "bg-secondary" : "bg-transparent")}
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
