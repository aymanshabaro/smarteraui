import { CtaScreenMockup03 } from "@/components/marketing/cta-sections/cta-screen-mockup-03";
import { FeaturesSimpleIcons02 } from "@/components/marketing/features-sections/features-simple-icons-02";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { HeroCardMockup03 } from "@/components/marketing/hero-header-sections/hero-card-mockup-03";
import { PricingSectionSimpleCards03 } from "@/components/marketing/pricing-sections/pricing-section-simple-cards-03";
import { SocialProofFullWidth } from "@/components/marketing/social-proof-sections/social-proof-full-width";
import { TestimonialGlassmorphicCards01 } from "@/components/marketing/testimonial-sections/testimonial-glassmorphic-cards-01";

/** Fintech landing page: a fanned credit-card hero, customer logos, a six-up feature grid, the plan comparison, a draggable testimonial rail and a screenshot call to action. */
export const LandingPage04 = () => (
    <div className="bg-primary">
        <HeroCardMockup03 />

        <SocialProofFullWidth />

        <FeaturesSimpleIcons02 />

        <PricingSectionSimpleCards03 />

        <TestimonialGlassmorphicCards01 />

        <CtaScreenMockup03 />

        <FooterLarge04 />
    </div>
);
