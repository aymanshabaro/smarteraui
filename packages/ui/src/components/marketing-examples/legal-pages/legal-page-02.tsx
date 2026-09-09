import { ContentSectionRichText02 } from "@/components/marketing/content-rich-text-sections/content-section-rich-text-02";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FooterLarge10 } from "@/components/marketing/footers/footer-large-10";
import { FloatingSimpleWithFooter } from "@/components/marketing/header-navigations/floating-simple-with-footer";
import { HeaderCenteredTabs } from "@/components/marketing/header-sections/header-centered-tabs";

/**
 * Privacy policy page under a floating header: a document header whose tab list switches
 * between the legal and plain-English versions, the policy body, a trial call to action and a
 * permanently dark footer.
 */
export const LegalPage02 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <HeaderCenteredTabs />

        <ContentSectionRichText02 />

        <CtaSimpleCentered />

        {/* Section-scoped theme override: this footer stays dark in both themes. */}
        <div className="dark-mode">
            <FooterLarge10 />
        </div>
    </div>
);
