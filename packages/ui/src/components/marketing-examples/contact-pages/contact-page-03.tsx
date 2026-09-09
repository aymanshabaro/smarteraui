import { ContactFormAndMap } from "@/components/marketing/contact-sections/contact-form-and-map";
import { ContactIconCards03 } from "@/components/marketing/contact-sections/contact-icon-cards-03";
import { ContactSimpleIcons04 } from "@/components/marketing/contact-sections/contact-simple-icons-04";
import { CtaCardHorizontal } from "@/components/marketing/cta-sections/cta-card-horizontal";
import { FooterLarge03 } from "@/components/marketing/footers/footer-large-03";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";

/**
 * Contact us page: form beside an office map, the store list, contact cards, a trial call to
 * action and a permanently dark app-store footer.
 */
export const ContactPage03 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <ContactFormAndMap />

        <ContactSimpleIcons04 />

        <ContactIconCards03 />

        {/* The section above already closes with a full band of padding, so the seam is collapsed here. */}
        <div className="[&>section]:pt-0">
            <CtaCardHorizontal />
        </div>

        {/* Section-scoped theme override: this footer stays dark in both themes. */}
        <div className="dark-mode">
            <FooterLarge03 />
        </div>
    </div>
);
