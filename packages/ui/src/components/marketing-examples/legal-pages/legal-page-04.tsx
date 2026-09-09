import { ContentSectionRichText02 } from "@/components/marketing/content-rich-text-sections/content-section-rich-text-02";
import { CtaScreenMockup02 } from "@/components/marketing/cta-sections/cta-screen-mockup-02";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeaderDropdownSimpleTwoColumns } from "@/components/marketing/header-navigations/header-dropdown-simple-two-columns";
import { HeaderCenteredEmail } from "@/components/marketing/header-sections/header-centered-email";

/**
 * Terms and conditions page opening on a permanently dark header with an email capture, then
 * the terms body, a product call to action and the sign-off footer.
 */
export const LegalPage04 = () => (
    <div className="bg-primary">
        {/* Section-scoped theme override: the page opens dark in both themes. */}
        <div className="dark-mode bg-primary">
            <HeaderDropdownSimpleTwoColumns />

            <HeaderCenteredEmail />
        </div>

        <ContentSectionRichText02 />

        <CtaScreenMockup02 />

        <FooterLarge09 />
    </div>
);
