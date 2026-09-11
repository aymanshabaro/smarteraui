import { CtaAbstractImages } from "../../marketing/cta-sections/cta-abstract-images";
import { CtaSimpleLeft } from "../../marketing/cta-sections/cta-simple-left";
import { FeaturesIconsAndMockup02 } from "../../marketing/features-sections/features-icons-and-mockup-02";
import { FooterLarge12 } from "../../marketing/footers/footer-large-12";
import { HeroSplitImage02 } from "../../marketing/hero-header-sections/hero-split-image-02";
import { MetricsSimpleCenteredText } from "../../marketing/metrics-sections/metrics-simple-centered-text";
import { PricingSectionSimpleCards02 } from "../../marketing/pricing-sections/pricing-section-simple-cards-02";
import { SocialProofCards } from "../../marketing/social-proof-sections/social-proof-cards";
import { TestimonialSimpleCentered02 } from "../../marketing/testimonial-sections/testimonial-simple-centered-02";

/** SaaS landing page: an angled split hero, customer logos, a device feature list, metrics, a trial prompt, price-first plan cards, a quote and a photo-collage call to action. */
export const LandingPage20 = () => (
    <div className="bg-primary">
        <HeroSplitImage02 />

        <SocialProofCards />

        <FeaturesIconsAndMockup02 />

        <MetricsSimpleCenteredText />

        <CtaSimpleLeft />

        <PricingSectionSimpleCards02 />

        <TestimonialSimpleCentered02 />

        <CtaAbstractImages />

        <FooterLarge12 />
    </div>
);
