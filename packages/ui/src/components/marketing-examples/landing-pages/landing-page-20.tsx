import { CtaAbstractImages } from "@/components/marketing/cta-sections/cta-abstract-images";
import { CtaSimpleLeft } from "@/components/marketing/cta-sections/cta-simple-left";
import { FeaturesIconsAndMockup02 } from "@/components/marketing/features-sections/features-icons-and-mockup-02";
import { FooterLarge12 } from "@/components/marketing/footers/footer-large-12";
import { HeroSplitImage02 } from "@/components/marketing/hero-header-sections/hero-split-image-02";
import { MetricsSimpleCenteredText } from "@/components/marketing/metrics-sections/metrics-simple-centered-text";
import { PricingSectionSimpleCards02 } from "@/components/marketing/pricing-sections/pricing-section-simple-cards-02";
import { SocialProofCards } from "@/components/marketing/social-proof-sections/social-proof-cards";
import { TestimonialSimpleCentered02 } from "@/components/marketing/testimonial-sections/testimonial-simple-centered-02";

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
