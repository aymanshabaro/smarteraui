import { ContentSectionRichText02 } from "@/components/marketing/content-rich-text-sections/content-section-rich-text-02";
import { FooterLarge16 } from "@/components/marketing/footers/footer-large-16";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";

/**
 * Privacy policy page: a centered document header above the policy body, closed by the
 * centred logo, inline navigation and newsletter footer.
 */
export const LegalPage01 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <HeaderCentered />

        <ContentSectionRichText02 />

        <FooterLarge16 />
    </div>
);
