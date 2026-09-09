import { ContactIconCards01 } from "@/components/marketing/contact-sections/contact-icon-cards-01";
import { ContactIconsAndMap02 } from "@/components/marketing/contact-sections/contact-icons-and-map-02";
import { ContactSimpleForm01 } from "@/components/marketing/contact-sections/contact-simple-form-01";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";

/**
 * Contact us page: four contact cards, the two-office band with an overlapping map, a centered
 * enquiry form and the call-to-action footer.
 */
export const ContactPage07 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <ContactIconCards01 />

        <ContactIconsAndMap02 />

        <ContactSimpleForm01 />

        <FooterLarge09 />
    </div>
);
