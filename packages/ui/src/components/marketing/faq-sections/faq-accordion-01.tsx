"use client";

import {
    Button as AriaButton,
    Disclosure as AriaDisclosure,
    DisclosureGroup as AriaDisclosureGroup,
    DisclosurePanel as AriaDisclosurePanel,
    Heading as AriaHeading,
} from "react-aria-components";
import { MinusCircle, PlusCircle } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { sortCx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";

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

/** A centered, divided accordion with a "still have questions" card underneath. */
export const FaqAccordion01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Frequently asked questions</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to know about the product and billing.</p>
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
                <div className="flex items-end -space-x-4">
                    <Avatar size="lg" src={AVATARS[0].src} alt={AVATARS[0].name} className="ring-fg-white ring-[1.5px]" />
                    <Avatar size="xl" src={AVATARS[1].src} alt={AVATARS[1].name} className="ring-fg-white z-10 ring-[1.5px]" />
                    <Avatar size="lg" src={AVATARS[2].src} alt={AVATARS[2].name} className="ring-fg-white ring-[1.5px]" />
                </div>

                <div>
                    <h3 className="text-primary text-xl font-semibold">Still have questions?</h3>
                    <p className="text-md text-tertiary mt-2 md:text-lg">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                </div>

                <Button size="xl">Get in touch</Button>
            </div>
        </div>
    </section>
);
