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

/** The centered icon-led FAQ grid on the permanently branded section background. */
export const FaqSimple01Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">Frequently asked questions</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Everything you need to know about the product and billing.</p>
            </div>

            <div className="mt-12 md:mt-16">
                <dl className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="flex max-w-sm flex-col items-center text-center">
                            <dt className="text-primary_on-brand flex flex-col items-center text-lg font-semibold">
                                <FeaturedIcon icon={faq.icon} size="md" theme="dark" color="brand" className={styles.iconMobile} />
                                <FeaturedIcon icon={faq.icon} size="lg" theme="dark" color="brand" className={styles.iconDesktop} />
                                <span className="mt-4">{faq.question}</span>
                            </dt>
                            <dd className="text-md text-tertiary_on-brand mt-1">{faq.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="bg-brand-section_subtle mt-12 flex flex-col items-center gap-6 rounded-2xl px-6 py-8 text-center md:mt-16 md:gap-8 md:px-8 md:py-8 md:pb-10">
                <div className="flex items-end -space-x-4">
                    <Avatar size="lg" src={AVATARS[0].src} alt={AVATARS[0].name} className="ring-[1.5px] ring-white" />
                    <Avatar size="xl" src={AVATARS[1].src} alt={AVATARS[1].name} className="z-10 ring-[1.5px] ring-white" />
                    <Avatar size="lg" src={AVATARS[2].src} alt={AVATARS[2].name} className="ring-[1.5px] ring-white" />
                </div>

                <div>
                    <h3 className="text-primary_on-brand text-xl font-semibold">Still have questions?</h3>
                    <p className="text-md text-tertiary_on-brand mt-2 md:text-lg">
                        Can't find the answer you're looking for? Please chat to our friendly team.
                    </p>
                </div>

                <Button size="xl">Get in touch</Button>
            </div>
        </div>
    </section>
);
