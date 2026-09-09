import { BlogSectionSimpleLeftAligned01 } from "@/components/marketing/blog-sections/blog-section-simple-left-aligned-01";
import { CtaSimpleLogos02 } from "@/components/marketing/cta-sections/cta-simple-logos-02";
import { FeaturesIconsAndMockup02 } from "@/components/marketing/features-sections/features-icons-and-mockup-02";
import { FooterLarge10 } from "@/components/marketing/footers/footer-large-10";
import { HeroCardMockup02 } from "@/components/marketing/hero-header-sections/hero-card-mockup-02";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SocialProofFullWidthMasked } from "@/components/marketing/social-proof-sections/social-proof-full-width-masked";
import { SocialProofPressMentions } from "@/components/marketing/social-proof-sections/social-proof-press-mentions";
import { TestimonialCaseStudyCards } from "@/components/marketing/testimonial-sections/testimonial-case-study-cards";

/** Fintech landing page: a frosted card hero, a logo marquee, case-study cards, a feature block, press mentions, the latest posts, a logo-backed call to action and a dark footer. */
export const LandingPage10 = () => (
    <div className="bg-primary">
        <HeroCardMockup02 />

        <SocialProofFullWidthMasked />

        <TestimonialCaseStudyCards />

        <FeaturesIconsAndMockup02 />

        <SocialProofPressMentions />

        <BlogSectionSimpleLeftAligned01 />

        <CtaSimpleLogos02 />

        <NewsletterSimpleCentered />

        {/* The reference renders this footer permanently dark, so the section carries its own theme scope. */}
        <div className="dark-mode">
            <FooterLarge10 />
        </div>
    </div>
);
