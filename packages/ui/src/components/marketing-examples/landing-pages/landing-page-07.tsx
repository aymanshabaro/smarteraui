import { CtaAbstractImages } from "../../marketing/cta-sections/cta-abstract-images";
import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { FeaturesIconsAndMockup08 } from "../../marketing/features-sections/features-icons-and-mockup-08";
import { FeaturesSimpleIcons03 } from "../../marketing/features-sections/features-simple-icons-03";
import { FooterLarge07 } from "../../marketing/footers/footer-large-07";
import { HeroCardMockup09 } from "../../marketing/hero-header-sections/hero-card-mockup-09";
import { NewsletterCardVertical } from "../../marketing/newsletter-cta-sections/newsletter-card-vertical";
import { PricingSectionFeaturedCards01 } from "../../marketing/pricing-sections/pricing-section-featured-cards-01";
import { SocialProofFullWidth } from "../../marketing/social-proof-sections/social-proof-full-width";

/** Fintech landing page: a split card-stack hero with email capture, customer logos, two feature blocks either side of a photo call to action, plans, a newsletter card and a dark footer. */
export const LandingPage07 = () => (
    <div className="bg-primary">
        <HeroCardMockup09 />

        <SocialProofFullWidth />

        <FeaturesIconsAndMockup08 />

        <CtaAbstractImages />

        <FeaturesSimpleIcons03 />

        <PricingSectionFeaturedCards01 />

        <NewsletterCardVertical />

        <CtaSimpleCentered />

        {/* The reference renders this footer permanently dark, so the section carries its own theme scope. */}
        <div className="dark-mode">
            <FooterLarge07 />
        </div>
    </div>
);
