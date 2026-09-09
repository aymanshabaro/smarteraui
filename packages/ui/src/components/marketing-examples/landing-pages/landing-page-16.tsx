import { ContactIconCards01 } from "@/components/marketing/contact-sections/contact-icon-cards-01";
import { FeaturesIconsAndMockup06 } from "@/components/marketing/features-sections/features-icons-and-mockup-06";
import { FeaturesSimpleIcons03 } from "@/components/marketing/features-sections/features-simple-icons-03";
import { FooterLarge13 } from "@/components/marketing/footers/footer-large-13";
import { HeroSimpleText01 } from "@/components/marketing/hero-header-sections/hero-simple-text-01";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SocialProofFullWidthDual } from "@/components/marketing/social-proof-sections/social-proof-full-width-dual";
import { TestimonialSimpleCentered01 } from "@/components/marketing/testimonial-sections/testimonial-simple-centered-01";

/** Agency landing page: an underlined text hero, a two-row logo wall, the agency story, a customer quote, the capability grid, contact cards and a newsletter. */
export const LandingPage16 = () => (
    <div className="bg-primary">
        <HeroSimpleText01 />

        <SocialProofFullWidthDual />

        <FeaturesIconsAndMockup06 />

        <TestimonialSimpleCentered01 />

        <FeaturesSimpleIcons03 />

        <ContactIconCards01 />

        <NewsletterSimpleCentered />

        <FooterLarge13 />
    </div>
);
