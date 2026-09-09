import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FeaturesIconsAndMockup03 } from "@/components/marketing/features-sections/features-icons-and-mockup-03";
import { FeaturesLargeScreenMockup02 } from "@/components/marketing/features-sections/features-large-screen-mockup-02";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeroCardMockup08 } from "@/components/marketing/hero-header-sections/hero-card-mockup-08";
import { NewsletterSimpleCenteredBrand } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered-brand";
import { PricingSectionFeaturedCards04 } from "@/components/marketing/pricing-sections/pricing-section-featured-cards-04";
import { SocialProofFullWidth } from "@/components/marketing/social-proof-sections/social-proof-full-width";
import { TestimonialSimpleCentered01 } from "@/components/marketing/testimonial-sections/testimonial-simple-centered-01";

/** Fintech landing page: a benefit-checklist card hero, customer logos, a wide screenshot feature block, a customer quote, a device feature list, the upgrade panel and a branded newsletter. */
export const LandingPage09 = () => (
    <div className="bg-primary">
        <HeroCardMockup08 />

        <SocialProofFullWidth />

        <FeaturesLargeScreenMockup02 />

        <TestimonialSimpleCentered01 />

        <CtaSimpleCentered />

        <FeaturesIconsAndMockup03 />

        <PricingSectionFeaturedCards04 />

        <NewsletterSimpleCenteredBrand />

        <FooterLarge09 />
    </div>
);
