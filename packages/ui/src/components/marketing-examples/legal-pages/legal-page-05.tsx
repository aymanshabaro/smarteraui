import { ContentSectionRichText02 } from "@/components/marketing/content-rich-text-sections/content-section-rich-text-02";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FooterLarge11 } from "@/components/marketing/footers/footer-large-11";
import { HeaderDropdownFeatureCard } from "@/components/marketing/header-navigations/header-dropdown-feature-card";
import { HeaderCenteredTabsBrand } from "@/components/marketing/header-sections/header-centered-tabs-brand";

/**
 * Cookie policy page: a brand-coloured document header whose tab list switches between the
 * legal and plain-English versions, the policy body, a trial call to action and the app footer.
 */
export const LegalPage05 = () => (
    <div className="bg-primary">
        <HeaderDropdownFeatureCard />

        <HeaderCenteredTabsBrand />

        <ContentSectionRichText02 />

        <CtaSimpleCentered />

        <FooterLarge11 />
    </div>
);
