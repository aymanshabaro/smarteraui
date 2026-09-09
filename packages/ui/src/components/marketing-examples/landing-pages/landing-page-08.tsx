import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FeaturesIconsAndMockup01 } from "@/components/marketing/features-sections/features-icons-and-mockup-01";
import { FeaturesIconsAndMockup06 } from "@/components/marketing/features-sections/features-icons-and-mockup-06";
import { FeaturesIntegrationsIcons03 } from "@/components/marketing/features-sections/features-integrations-icons-03";
import { FeaturesSimpleIcons01 } from "@/components/marketing/features-sections/features-simple-icons-01";
import { FooterLarge08 } from "@/components/marketing/footers/footer-large-08";
import { HeroCardMockup05 } from "@/components/marketing/hero-header-sections/hero-card-mockup-05";
import { PricingSectionSimpleCards02 } from "@/components/marketing/pricing-sections/pricing-section-simple-cards-02";
import { SocialProofCard } from "@/components/marketing/social-proof-sections/social-proof-card";

/** Fintech landing page: a floating-card hero, the card feature list, price-first plan cards, a plain feature grid, a device feature block, integrations and customer logos. */
export const LandingPage08 = () => (
    <div className="bg-primary">
        <HeroCardMockup05 />

        <FeaturesIconsAndMockup06 />

        <PricingSectionSimpleCards02 />

        <FeaturesSimpleIcons01 />

        <FeaturesIconsAndMockup01 />

        <FeaturesIntegrationsIcons03 />

        <SocialProofCard />

        <CtaSimpleCentered />

        <FooterLarge08 />
    </div>
);
