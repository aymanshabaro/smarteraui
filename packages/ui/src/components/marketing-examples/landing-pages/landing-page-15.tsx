import { ContactFormAndImage01 } from "@/components/marketing/contact-sections/contact-form-and-image-01";
import { FeaturesIconsAndImage04 } from "@/components/marketing/features-sections/features-icons-and-image-04";
import { FooterLarge08 } from "@/components/marketing/footers/footer-large-08";
import { HeroSimpleText02 } from "@/components/marketing/hero-header-sections/hero-simple-text-02";
import { MetricsMinimalCenteredText } from "@/components/marketing/metrics-sections/metrics-minimal-centered-text";
import { SocialProofFullWidthBrand } from "@/components/marketing/social-proof-sections/social-proof-full-width-brand";
import { TestimonialSimpleCentered01 } from "@/components/marketing/testimonial-sections/testimonial-simple-centered-01";

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
