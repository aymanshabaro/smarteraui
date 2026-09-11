import { CtaIphoneMockup04 } from "../../marketing/cta-sections/cta-iphone-mockup-04";
import { FeaturesIconsAndMockup03 } from "../../marketing/features-sections/features-icons-and-mockup-03";
import { FooterLarge11Brand } from "../../marketing/footers/footer-large-11-brand";
import { HeroIphoneMockup01 } from "../../marketing/hero-header-sections/hero-iphone-mockup-01";
import { NewsletterIphoneMockup01 } from "../../marketing/newsletter-cta-sections/newsletter-iphone-mockup-01";
import { PricingSectionFeaturedCards02 } from "../../marketing/pricing-sections/pricing-section-featured-cards-02";
import { SocialProofFullWidthDual } from "../../marketing/social-proof-sections/social-proof-full-width-dual";

/** SaaS landing page: an iPhone hero, partner logos, a device feature list, an app-store call to action, the plan cards and a pre-launch newsletter capture. */
export const LandingPage13 = () => (
    <div className="bg-primary">
        <HeroIphoneMockup01 />

        <SocialProofFullWidthDual />

        <FeaturesIconsAndMockup03 />

        <CtaIphoneMockup04 />

        <PricingSectionFeaturedCards02 />

        <NewsletterIphoneMockup01 />

        <FooterLarge11Brand />
    </div>
);
