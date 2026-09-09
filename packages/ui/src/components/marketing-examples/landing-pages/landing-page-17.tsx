import { BlogSectionCarouselLayout02 } from "@/components/marketing/blog-sections/blog-section-carousel-layout-02";
import { CtaScreenMockup03 } from "@/components/marketing/cta-sections/cta-screen-mockup-03";
import { CtaSimpleLogos02 } from "@/components/marketing/cta-sections/cta-simple-logos-02";
import { FeaturesIconsAndMockup06 } from "@/components/marketing/features-sections/features-icons-and-mockup-06";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeroAbstractAngles02 } from "@/components/marketing/hero-header-sections/hero-abstract-angles-02";
import { SocialProofFullWidth } from "@/components/marketing/social-proof-sections/social-proof-full-width";
import { TestimonialCaseStudyCards } from "@/components/marketing/testimonial-sections/testimonial-case-study-cards";

/** Remote-team SaaS landing page: a video hero on skewed brand stripes, customer logos, a feature block, case studies, a screenshot call to action, the latest writings and a logo-backed prompt. */
export const LandingPage17 = () => (
    <div className="bg-primary">
        <HeroAbstractAngles02 />

        <SocialProofFullWidth />

        <FeaturesIconsAndMockup06 />

        <TestimonialCaseStudyCards />

        <CtaScreenMockup03 />

        <BlogSectionCarouselLayout02 />

        <CtaSimpleLogos02 />

        {/* The reference renders this footer permanently dark, so the section carries its own theme scope. */}
        <div className="dark-mode">
            <FooterLarge09 />
        </div>
    </div>
);
