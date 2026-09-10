import { File02, Heart, SlashCircle01, SwitchHorizontal01 } from "@properui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    /** The featured icon is rendered twice so it can step up a size from `md` upwards. It sits in the
     * gutter reserved by the item's inline padding so it never adds height to the term. */
    iconMobile: "absolute start-0 top-0 md:hidden",
    iconDesktop: "absolute start-0 top-0 hidden md:flex",
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
] as const;

/** The photo-backed FAQ layout on the permanently branded section background. */
export const FaqSimple03Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full flex-col lg:w-192">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Support</span>
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Frequently asked questions</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">
                    Everything you need to know about the product and billing. Can't find the answer you're looking for? Please{" "}
                    <a href="/contact" className={styles.link}>
                        chat to our friendly team
                    </a>
                    .
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-24 lg:grid-cols-2 lg:items-center">
                <dl className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="relative flex flex-col ps-14 md:ps-16">
                            <dt className="text-primary_on-brand pt-1.5 text-lg font-semibold md:pt-2.5">
                                <FeaturedIcon icon={faq.icon} size="md" theme="dark" color="brand" className={styles.iconMobile} />
                                <FeaturedIcon icon={faq.icon} size="lg" theme="dark" color="brand" className={styles.iconDesktop} />
                                {faq.question}
                            </dt>
                            <dd className="text-md text-tertiary_on-brand mt-1">{faq.answer}</dd>
                        </div>
                    ))}
                </dl>

                <div className="h-60 md:-ms-8 md:h-140">
                    <img src={IMAGES.landscape[0].src} alt={IMAGES.landscape[0].alt} className="size-full object-cover" />
                </div>
            </div>
        </div>
    </section>
);
