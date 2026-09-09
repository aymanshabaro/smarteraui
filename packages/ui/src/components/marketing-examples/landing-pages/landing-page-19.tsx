import { CtaScreenMockup01 } from "@/components/marketing/cta-sections/cta-screen-mockup-01";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FeaturesIntegrationsIcons04 } from "@/components/marketing/features-sections/features-integrations-icons-04";
import { FeaturesLargeScreenMockup02 } from "@/components/marketing/features-sections/features-large-screen-mockup-02";
import { FooterLarge01 } from "@/components/marketing/footers/footer-large-01";
import { HeroSplitImage06 } from "@/components/marketing/hero-header-sections/hero-split-image-06";
import { MetricsSimpleCenteredText } from "@/components/marketing/metrics-sections/metrics-simple-centered-text";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SocialProofFullWidth } from "@/components/marketing/social-proof-sections/social-proof-full-width";
import { TestimonialSimpleCentered01 } from "@/components/marketing/testimonial-sections/testimonial-simple-centered-01";

/** SaaS landing page: a split hero, customer logos, the integrations grid, a wide screenshot feature block, metrics, a customer quote and two closing calls to action. */
export const LandingPage19 = () => (
    <div className="bg-primary">
        <HeroSplitImage06 />

        <SocialProofFullWidth />

        <FeaturesIntegrationsIcons04 />

        <FeaturesLargeScreenMockup02 />

        <MetricsSimpleCenteredText />

        <CtaSimpleCentered />

        <TestimonialSimpleCentered01 />

        <CtaScreenMockup01 />

        <NewsletterSimpleCentered />

        <FooterLarge01 />
    </div>
);
