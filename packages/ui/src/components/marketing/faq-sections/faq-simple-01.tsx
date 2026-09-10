import { CreditCard02, File02, Heart, Mail01, SlashCircle01, SwitchHorizontal01 } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { sortCx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";

const styles = sortCx({
    /** The featured icon is rendered twice so it can step up a size from `md` upwards. */
    iconMobile: "md:hidden",
    iconDesktop: "hidden md:flex",
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
        answer: "You can change the email address associated with your account by going to proper.example/account from a laptop or desktop.",
    },
] as const;

/** Six centered icon-led questions in a three-column grid, closed by a "still have questions" card. */
export const FaqSimple01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Frequently asked questions</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to know about the product and billing.</p>
            </div>

            <div className="mt-12 md:mt-16">
                <dl className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="flex max-w-sm flex-col items-center text-center">
                            <dt className="text-primary flex flex-col items-center text-lg font-semibold">
                                <FeaturedIcon icon={faq.icon} size="md" theme="modern" color="gray" className={styles.iconMobile} />
                                <FeaturedIcon icon={faq.icon} size="lg" theme="modern" color="gray" className={styles.iconDesktop} />
                                <span className="mt-4">{faq.question}</span>
                            </dt>
                            <dd className="text-md text-tertiary mt-1">{faq.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="bg-secondary mt-12 flex flex-col items-center gap-6 rounded-2xl px-6 py-8 text-center md:mt-16 md:gap-8 md:px-8 md:py-8 md:pb-10">
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
