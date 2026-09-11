import { FaqSimple01 } from "../../marketing/faq-sections/faq-simple-01";
import { FeaturesIconsAndMockup04 } from "../../marketing/features-sections/features-icons-and-mockup-04";
import { FeaturesIntegrationsIcons03 } from "../../marketing/features-sections/features-integrations-icons-03";
import { FooterLarge03 } from "../../marketing/footers/footer-large-03";
import { HeroColorCard02 } from "../../marketing/hero-header-sections/hero-color-card-02";
import { MetricsSimpleCenteredText } from "../../marketing/metrics-sections/metrics-simple-centered-text";
import { PricingSectionSimpleCards04 } from "../../marketing/pricing-sections/pricing-section-simple-cards-04";
import { SocialProofCards } from "../../marketing/social-proof-sections/social-proof-cards";

/** SaaS landing page led by a brand colour card hero with an email capture, then integrations, metrics, a feature list, two plan cards, the FAQs and a customer logo wall. */
export const LandingPage03 = () => (
    <div className="bg-primary">
        <HeroColorCard02 />

        <FeaturesIntegrationsIcons03 />

        <MetricsSimpleCenteredText />

        <FeaturesIconsAndMockup04 />

        <PricingSectionSimpleCards04 />

        <FaqSimple01 />

        <SocialProofCards />

        <FooterLarge03 />
    </div>
);
