import { CreditCard02, File02, Heart, Mail01, SlashCircle01, SwitchHorizontal01 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    /** The featured icon is rendered twice so it can step up a size from `md` upwards. */
    iconMobile: "md:hidden",
    iconDesktop: "hidden md:flex",
    link: "rounded-xs underline underline-offset-4 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
});

const faqs = [
    {
        icon: Heart,
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.",
    },
    {
        icon: SwitchHorizontal01,
        question: "Can I change my plan later?",
        answer: "Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.",
    },
    {
        icon: SlashCircle01,
        question: "What is your cancellation policy?",
        answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
    },
    {
        icon: File02,
        question: "Can other info be added to an invoice?",
        answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name.",
    },
    {
        icon: CreditCard02,
        question: "How does billing work?",
        answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.",
    },
    {
        icon: Mail01,
        question: "How do I change my account email?",
        answer: "You can change the email address associated with your account by going to smartera.com/account from a laptop or desktop.",
    },
] as const;

/** A left-aligned icon-led FAQ grid with a "still have questions" bar underneath. */
export const FaqSimple02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">FAQs</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Everything you need to know about the product and billing. Can't find the answer you're looking for? Please{" "}
                    <a href="/contact" className={styles.link}>
                        chat to our friendly team
                    </a>
                    .
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <dl className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="flex max-w-sm flex-col">
                            <dt className="text-primary flex flex-col items-start text-lg font-semibold">
                                <FeaturedIcon icon={faq.icon} size="md" theme="modern" color="gray" className={styles.iconMobile} />
                                <FeaturedIcon icon={faq.icon} size="lg" theme="modern" color="gray" className={styles.iconDesktop} />
                                <span className="mt-4">{faq.question}</span>
                            </dt>
                            <dd className="text-md text-tertiary mt-1">{faq.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="bg-secondary mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl px-5 py-8 md:mt-16 md:flex-row md:gap-8 md:p-8">
                <div className="w-full max-w-3xl">
                    <h3 className="text-primary text-xl font-semibold">Still have questions?</h3>
                    <p className="text-md text-tertiary mt-2 md:text-lg">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                </div>

                <Button size="xl">Get in touch</Button>
            </div>
        </div>
    </section>
);
