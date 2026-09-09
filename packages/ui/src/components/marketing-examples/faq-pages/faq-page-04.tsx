import { Button } from "@/components/base/buttons/button";
import { ContentSectionSplitImage03 } from "@/components/marketing/content-rich-text-sections/content-section-split-image-03";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { TestimonialSimpleCentered03 } from "@/components/marketing/testimonial-sections/testimonial-simple-centered-03";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    link: "rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
});

const faqs = [
    {
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
        question: "Can I change my plan later?",
        answer: "Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.",
    },
    {
        question: "What is your cancellation policy?",
        answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
    },
    {
        question: "Can other info be added to an invoice?",
        answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name.",
    },
    {
        question: "How does billing work?",
        answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.",
    },
    {
        question: "How do I change my account email?",
        answer: "You can change the email address associated with your account by going to smartera.com/account from a laptop or desktop.",
    },
] as const;

/**
 * FAQ page 04 — a centered support hero above a plain three-column answer grid, followed by an
 * editorial studio section, a logo-tabbed testimonial and a permanently dark newsletter footer.
 */
export const FaqPage04 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Support</span>
                    <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">FAQs</h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                        Everything you need to know about the product and billing. Can't find the answer you're looking for? Please{" "}
                        <a href="/contact" className={styles.link}>
                            chat to our friendly team
                        </a>
                        .
                    </p>
                </div>
            </div>
        </section>

        <section className="bg-primary pb-16 md:pb-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <dl className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="flex max-w-sm flex-col">
                            <dt className="text-primary text-lg font-medium">{faq.question}</dt>
                            <dd className="text-md text-tertiary mt-2">{faq.answer}</dd>
                        </div>
                    ))}
                </dl>

                <div className="bg-secondary mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl px-5 py-8 md:mt-16 md:flex-row md:items-center md:gap-8 md:p-8">
                    <div className="w-full max-w-3xl">
                        <h2 className="text-primary text-xl font-semibold">Still have questions?</h2>
                        <p className="text-md text-tertiary mt-2 md:text-lg">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    </div>

                    <Button size="xl">Get in touch</Button>
                </div>
            </div>
        </section>

        <ContentSectionSplitImage03 />

        <TestimonialSimpleCentered03 />

        <div className="dark-mode">
            <FooterLarge04 />
        </div>
    </div>
);
