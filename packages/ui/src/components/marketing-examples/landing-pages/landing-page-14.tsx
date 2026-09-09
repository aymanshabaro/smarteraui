import { ContactIconsAndImage } from "@/components/marketing/contact-sections/contact-icons-and-image";
import { ContentSectionSplitImage03 } from "@/components/marketing/content-rich-text-sections/content-section-split-image-03";
import { FooterLarge15 } from "@/components/marketing/footers/footer-large-15";
import { HeroGeometricShapes01 } from "@/components/marketing/hero-header-sections/hero-geometric-shapes-01";
import { MetricsSplitImage01 } from "@/components/marketing/metrics-sections/metrics-split-image-01";
import { NewsletterCardVertical } from "@/components/marketing/newsletter-cta-sections/newsletter-card-vertical";
import { SocialProofFullWidth } from "@/components/marketing/social-proof-sections/social-proof-full-width";
import { TestimonialAbstractImage } from "@/components/marketing/testimonial-sections/testimonial-abstract-image";

/** Agency landing page: a geometric-shape hero, client logos, a studio write-up, an image-collage quote, the studio metrics, the contact band and a newsletter card. */
export const LandingPage14 = () => (
    <div className="bg-primary">
        <HeroGeometricShapes01 />

        <SocialProofFullWidth />

        <ContentSectionSplitImage03 />

        <TestimonialAbstractImage />

        <MetricsSplitImage01 />

        <ContactIconsAndImage />

        <NewsletterCardVertical />

        {/* The reference renders this footer permanently dark, so the section carries its own theme scope. */}
        <div className="dark-mode">
            <FooterLarge15 />
        </div>
    </div>
);
