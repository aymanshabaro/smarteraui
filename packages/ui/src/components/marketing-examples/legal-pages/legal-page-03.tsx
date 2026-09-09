import { ContentSectionRichText02 } from "@/components/marketing/content-rich-text-sections/content-section-rich-text-02";
import { CtaSimpleLogos02 } from "@/components/marketing/cta-sections/cta-simple-logos-02";
import { FooterLarge15 } from "@/components/marketing/footers/footer-large-15";
import { HeaderDropdownSimpleWithFooter } from "@/components/marketing/header-navigations/header-dropdown-simple-with-footer";
import { HeaderSpaceBetweenSearch } from "@/components/marketing/header-sections/header-space-between-search";

/**
 * Terms and conditions page: a two-column document header with a search field, the terms body,
 * a customer-logo call to action and the centred single-row footer.
 */
export const LegalPage03 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimpleWithFooter />

        <HeaderSpaceBetweenSearch />

        <ContentSectionRichText02 />

        <CtaSimpleLogos02 />

        <FooterLarge15 />
    </div>
);
