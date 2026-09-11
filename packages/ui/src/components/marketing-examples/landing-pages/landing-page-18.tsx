import { CtaScreenMockup04 } from "../../marketing/cta-sections/cta-screen-mockup-04";
import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { FeaturesAlternatingLayout01 } from "../../marketing/features-sections/features-alternating-layout-01";
import { FeaturesIconsAndMockup02 } from "../../marketing/features-sections/features-icons-and-mockup-02";
import { FooterLarge10 } from "../../marketing/footers/footer-large-10";
import { HeroSplitImage05 } from "../../marketing/hero-header-sections/hero-split-image-05";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TestimonialSimpleCentered02 } from "../../marketing/testimonial-sections/testimonial-simple-centered-02";

/** Customer-service SaaS landing page: a split hero with email capture, three alternating feature rows, a trial prompt, a device feature list, a logo-led quote and a newsletter. */
export const LandingPage18 = () => (
    <div className="bg-primary">
        <HeroSplitImage05 />

        <FeaturesAlternatingLayout01 />

        <CtaSimpleCentered />

        <FeaturesIconsAndMockup02 />

        <TestimonialSimpleCentered02 />

        <CtaScreenMockup04 />

        <NewsletterSimpleCentered />

        {/* The reference renders this footer permanently dark, so the section carries its own theme scope. */}
        <div className="dark-mode">
            <FooterLarge10 />
        </div>
    </div>
);
