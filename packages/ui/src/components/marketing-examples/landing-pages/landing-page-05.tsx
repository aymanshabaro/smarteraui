import { CtaSplitImage04 } from "../../marketing/cta-sections/cta-split-image-04";
import { FeaturesIconsAndMockup06 } from "../../marketing/features-sections/features-icons-and-mockup-06";
import { FeaturesSimpleIcons04 } from "../../marketing/features-sections/features-simple-icons-04";
import { FooterLarge05Brand } from "../../marketing/footers/footer-large-05-brand";
import { HeroCardMockup06 } from "../../marketing/hero-header-sections/hero-card-mockup-06";
import { PricingSectionFeaturedCards01 } from "../../marketing/pricing-sections/pricing-section-featured-cards-01";
import { SocialProofFullWidth } from "../../marketing/social-proof-sections/social-proof-full-width";
import { TestimonialSimpleCentered02 } from "../../marketing/testimonial-sections/testimonial-simple-centered-02";

/** Fintech landing page on a branded hero: customer logos, the card feature grid, a split-image call to action, a device feature list, two plans and a logo-led quote. */
export const LandingPage05 = () => (
    <div className="bg-primary">
        <HeroCardMockup06 />

        <SocialProofFullWidth />

        <FeaturesSimpleIcons04 />

        <CtaSplitImage04 />

        <FeaturesIconsAndMockup06 />

        <PricingSectionFeaturedCards01 />

        <TestimonialSimpleCentered02 />

        <FooterLarge05Brand />
    </div>
);
