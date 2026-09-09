"use client";

import { CreditCard02, File02, Heart, Mail01, SearchLg, SlashCircle01, SwitchHorizontal01 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { FooterLarge05 } from "@/components/marketing/footers/footer-large-05";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionImageCollage01 } from "@/components/marketing/team-sections/team-section-image-collage-01";
import { TestimonialSocialCards02 } from "@/components/marketing/testimonial-sections/testimonial-social-cards-02";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    /** The featured icon steps up a size from `md`, so it is rendered once per breakpoint. */
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
        answer: "You can change the email address associated with your account by going to smartera.com/account from a laptop or desktop.",
    },
] as const;

/**
 * FAQ page 02 — a searchable FAQ hero over a tinted, left-aligned answer grid, then the careers
 * collage, a newsletter sign-up, the customer wall of love and a permanently dark footer.
 */
export const FaqPage02 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">FAQs</span>
                    <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Ask us anything</h1>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Need something cleared up? Here are our most frequently asked questions.</p>

                    <div className="mt-8 w-full sm:mt-12 sm:w-80">
                        <Input size="lg" type="search" icon={SearchLg} aria-label="Search" placeholder="Search" wrapperClassName="sm:py-0.5" />
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <dl className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="flex max-w-sm flex-col">
                            <dt className="text-primary flex flex-col items-start text-lg font-semibold md:text-xl">
                                <FeaturedIcon icon={faq.icon} size="md" theme="modern" color="gray" className={styles.iconMobile} />
                                <FeaturedIcon icon={faq.icon} size="lg" theme="modern" color="gray" className={styles.iconDesktop} />
                                <span className="mt-4 md:mt-5">{faq.question}</span>
                            </dt>
                            <dd className="text-md text-tertiary mt-1 md:mt-2">{faq.answer}</dd>
                        </div>
                    ))}
                </dl>

                <div className="bg-primary mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl px-5 py-8 md:mt-16 md:flex-row md:items-center md:gap-8 md:p-8">
                    <div className="w-full max-w-3xl">
                        <h2 className="text-primary text-xl font-semibold">Still have questions?</h2>
                        <p className="text-md text-tertiary mt-2 md:text-lg">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    </div>

                    <Button size="xl">Get in touch</Button>
                </div>
            </div>
        </section>

        <TeamSectionImageCollage01 />

        <NewsletterSimpleCentered />

        <TestimonialSocialCards02 />

        <div className="dark-mode">
            <FooterLarge05 />
        </div>
    </div>
);
