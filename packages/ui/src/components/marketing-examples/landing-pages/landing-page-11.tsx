import { CtaScreenMockup02 } from "../../marketing/cta-sections/cta-screen-mockup-02";
import { FeaturesSimpleIcons02 } from "../../marketing/features-sections/features-simple-icons-02";
import { FooterLarge11 } from "../../marketing/footers/footer-large-11";
import { HeroCardMockup11 } from "../../marketing/hero-header-sections/hero-card-mockup-11";
import { PricingSectionSimpleCards03 } from "../../marketing/pricing-sections/pricing-section-simple-cards-03";
import { SocialProofCards } from "../../marketing/social-proof-sections/social-proof-cards";
import { TestimonialGlassmorphicCards02 } from "../../marketing/testimonial-sections/testimonial-glassmorphic-cards-02";

/** Fintech landing page: a rotated card-wall hero, a six-up feature grid, the plan comparison, a draggable testimonial rail, customer logos and a screenshot call to action. */
export const LandingPage11 = () => (
    <div className="bg-primary">
        <HeroCardMockup11 />

        <FeaturesSimpleIcons02 />

        <PricingSectionSimpleCards03 />

        <TestimonialGlassmorphicCards02 />

        <SocialProofCards />

        <CtaScreenMockup02 />

        {/* The reference renders this footer permanently dark, so the section carries its own theme scope. */}
        <div className="dark-mode">
            <FooterLarge11 />
        </div>
    </div>
);
