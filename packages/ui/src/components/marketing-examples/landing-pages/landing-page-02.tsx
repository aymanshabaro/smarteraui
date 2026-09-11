import { CtaScreenMockup01 } from "../../marketing/cta-sections/cta-screen-mockup-01";
import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { FeaturesAlternatingLayout01 } from "../../marketing/features-sections/features-alternating-layout-01";
import { FeaturesIntegrationsIcons01 } from "../../marketing/features-sections/features-integrations-icons-01";
import { FooterLarge02 } from "../../marketing/footers/footer-large-02";
import { HeroScreenMockup01 } from "../../marketing/hero-header-sections/hero-screen-mockup-01";
import { MetricsSimpleCenteredText } from "../../marketing/metrics-sections/metrics-simple-centered-text";
import { SocialProofFullWidthMasked } from "../../marketing/social-proof-sections/social-proof-full-width-masked";
import { TestimonialSimpleCentered03 } from "../../marketing/testimonial-sections/testimonial-simple-centered-03";

/** SaaS analytics landing page: a screenshot hero, a logo marquee, three alternating feature rows, the integrations grid, headline metrics and two closing calls to action over a dark footer. */
export const LandingPage02 = () => (
    <div className="bg-primary">
        <HeroScreenMockup01 />

        <SocialProofFullWidthMasked />

        <FeaturesAlternatingLayout01 />

        <FeaturesIntegrationsIcons01 />

        <MetricsSimpleCenteredText />

        <CtaSimpleCentered />

        <TestimonialSimpleCentered03 />

        <CtaScreenMockup01 />

        {/* The reference renders this footer permanently dark, so the section carries its own theme scope. */}
        <div className="dark-mode">
            <FooterLarge02 />
        </div>
    </div>
);
