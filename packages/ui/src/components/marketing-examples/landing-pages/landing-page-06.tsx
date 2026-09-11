import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { CtaSimpleLeft } from "../../marketing/cta-sections/cta-simple-left";
import { FeaturesIconsAndMockup07 } from "../../marketing/features-sections/features-icons-and-mockup-07";
import { FeaturesLargeScreenMockup01 } from "../../marketing/features-sections/features-large-screen-mockup-01";
import { FooterLarge06 } from "../../marketing/footers/footer-large-06";
import { HeroCardMockup10 } from "../../marketing/hero-header-sections/hero-card-mockup-10";
import { PricingSectionFeaturedCards04 } from "../../marketing/pricing-sections/pricing-section-featured-cards-04";
import { SocialProofCards } from "../../marketing/social-proof-sections/social-proof-cards";

/** Fintech landing page: a wall-of-cards hero, customer logos, two feature blocks, a centred trial call to action, the plan panel and a closing prompt. */
export const LandingPage06 = () => (
    <div className="bg-primary">
        <HeroCardMockup10 />

        <SocialProofCards />

        <FeaturesIconsAndMockup07 />

        <FeaturesLargeScreenMockup01 />

        <CtaSimpleCentered />

        <PricingSectionFeaturedCards04 />

        <CtaSimpleLeft />

        <FooterLarge06 />
    </div>
);
