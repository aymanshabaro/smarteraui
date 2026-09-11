import { BlogSectionSimpleLeftAligned01 } from "../../marketing/blog-sections/blog-section-simple-left-aligned-01";
import { FaqSimple01 } from "../../marketing/faq-sections/faq-simple-01";
import { FeaturesSimpleIcons02 } from "../../marketing/features-sections/features-simple-icons-02";
import { FooterLarge01 } from "../../marketing/footers/footer-large-01";
import { HeroScreenMockup05 } from "../../marketing/hero-header-sections/hero-screen-mockup-05";
import { SocialProofFullWidth } from "../../marketing/social-proof-sections/social-proof-full-width";
import { TestimonialSimpleCentered01 } from "../../marketing/testimonial-sections/testimonial-simple-centered-01";

/** Analytics SaaS landing page: a centred product hero under a floating header, followed by social proof, a six-up feature grid, a customer quote, the FAQ grid and the latest blog posts. */
export const LandingPage01 = () => (
    <div className="bg-primary">
        <HeroScreenMockup05 />

        <SocialProofFullWidth />

        <FeaturesSimpleIcons02 />

        <TestimonialSimpleCentered01 />

        <FaqSimple01 />

        <BlogSectionSimpleLeftAligned01 />

        <FooterLarge01 />
    </div>
);
