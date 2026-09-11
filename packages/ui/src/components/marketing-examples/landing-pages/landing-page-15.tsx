import { ContactFormAndImage01 } from "../../marketing/contact-sections/contact-form-and-image-01";
import { FeaturesIconsAndImage04 } from "../../marketing/features-sections/features-icons-and-image-04";
import { FooterLarge08 } from "../../marketing/footers/footer-large-08";
import { HeroSimpleText02 } from "../../marketing/hero-header-sections/hero-simple-text-02";
import { MetricsMinimalCenteredText } from "../../marketing/metrics-sections/metrics-minimal-centered-text";
import { SocialProofFullWidthBrand } from "../../marketing/social-proof-sections/social-proof-full-width-brand";
import { TestimonialSimpleCentered01 } from "../../marketing/testimonial-sections/testimonial-simple-centered-01";

/** Agency landing page on a branded hero: client logos, a studio introduction, a customer quote, the minimal metric row and an enquiry form beside a photo. */
export const LandingPage15 = () => (
    <div className="bg-primary">
        <HeroSimpleText02 />

        <SocialProofFullWidthBrand />

        <FeaturesIconsAndImage04 />

        <TestimonialSimpleCentered01 />

        <MetricsMinimalCenteredText />

        <ContactFormAndImage01 />

        <FooterLarge08 />
    </div>
);
