import { ContactIconCards01 } from "../../marketing/contact-sections/contact-icon-cards-01";
import { ContactMap01 } from "../../marketing/contact-sections/contact-map-01";
import { FooterLarge04 } from "../../marketing/footers/footer-large-04";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";

/** Contact locations page: a floating header, the store map, contact cards and a newsletter footer. */
export const ContactPage04 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <ContactMap01 />

        <ContactIconCards01 />

        <FooterLarge04 />
    </div>
);
