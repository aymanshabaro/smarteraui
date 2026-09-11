import { CtaIphoneMockup01 } from "../../marketing/cta-sections/cta-iphone-mockup-01";
import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { FaqSimple01 } from "../../marketing/faq-sections/faq-simple-01";
import { FeaturesIconsAndMockup01 } from "../../marketing/features-sections/features-icons-and-mockup-01";
import { FooterLarge03 } from "../../marketing/footers/footer-large-03";
import { HeroIphoneMockup03 } from "../../marketing/hero-header-sections/hero-iphone-mockup-03";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";

/** Fintech landing page for creators: an iPhone hero with an SMS capture, a device feature list, a trial call to action, the FAQ grid, an app-store prompt and a newsletter. */
export const LandingPage12 = () => (
    <div className="bg-primary">
        <HeroIphoneMockup03 />

        <FeaturesIconsAndMockup01 />

        <CtaSimpleCentered />

        <FaqSimple01 />

        <CtaIphoneMockup01 />

        <NewsletterSimpleCentered />

        <FooterLarge03 />
    </div>
);
