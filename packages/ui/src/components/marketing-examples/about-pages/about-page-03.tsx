import { BannerSlimBrandFullWidth } from "@/components/marketing/banners/banner-slim-brand-full-width";
import { ContactMap01 } from "@/components/marketing/contact-sections/contact-map-01";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { TeamSectionSimple04 } from "@/components/marketing/team-sections/team-section-simple-04";
import { TestimonialSocialCards03 } from "@/components/marketing/testimonial-sections/testimonial-social-cards-03";

/** The full-bleed rule the reference page draws between two sections that share a background. */
const SectionDivider = () => (
    <div className="max-w-container mx-auto px-4 md:px-8">
        <hr className="bg-border-secondary h-px w-full border-none" />
    </div>
);

/**
 * Company about page led by a hiring announcement banner: the offices on a map, the team,
 * a wall of customer reviews and a closing call to action.
 */
export const AboutPage03 = () => (
    <div className="bg-primary">
        <BannerSlimBrandFullWidth />

        <HeaderDropdownSimple />

        <main>
            <ContactMap01 />

            <SectionDivider />

            <TeamSectionSimple04 />

            <SectionDivider />

            <TestimonialSocialCards03 />

            <SectionDivider />

            <CtaSimpleCentered />
        </main>

        <FooterLarge04 />
    </div>
);
