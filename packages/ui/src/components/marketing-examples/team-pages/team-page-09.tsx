import { CareersCard01 } from "@/components/marketing/careers-sections/careers-card-01";
import { FeaturesSimpleIcons04 } from "@/components/marketing/features-sections/features-simple-icons-04";
import { FooterLarge16 } from "@/components/marketing/footers/footer-large-16";
import { HeaderBlogPostsWithFooter } from "@/components/marketing/header-navigations/header-blog-posts-with-footer";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionSimple02 } from "@/components/marketing/team-sections/team-section-simple-02";

/**
 * Team page: a centered introduction, the whole team with their social links, the core values
 * on the secondary background, the department-filtered careers board and the newsletter.
 */
export const TeamPage09 = () => (
    <div className="bg-primary">
        <HeaderBlogPostsWithFooter />

        <HeaderCentered />

        <TeamSectionSimple02 />

        <FeaturesSimpleIcons04 />

        <CareersCard01 />

        <NewsletterSimpleCentered />

        <FooterLarge16 />
    </div>
);
