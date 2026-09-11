import { CareersCard01 } from "../../marketing/careers-sections/careers-card-01";
import { ContactSimpleIcons02 } from "../../marketing/contact-sections/contact-simple-icons-02";
import { FaqAccordion01 } from "../../marketing/faq-sections/faq-accordion-01";
import { FooterLarge09 } from "../../marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { HeaderSpaceBetweenBrand } from "../../marketing/header-sections/header-space-between-brand";
import { SectionDivider } from "../../shared-assets/section-divider";

/**
 * About company page led by a brand-coloured introduction: the hiring contact channels, the
 * filtered open roles, the billing FAQ and a centred sign-off above the footer link columns.
 */
export const AboutPage07 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <HeaderSpaceBetweenBrand />

            <ContactSimpleIcons02 />

            <SectionDivider />

            <CareersCard01 />

            <FaqAccordion01 />
        </main>

        <FooterLarge09 />
    </div>
);
