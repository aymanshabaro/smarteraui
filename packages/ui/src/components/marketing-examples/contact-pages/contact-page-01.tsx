import { ContactFormAndImage01 } from "../../marketing/contact-sections/contact-form-and-image-01";
import { FooterLarge01 } from "../../marketing/footers/footer-large-01";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

/** Contact split page: header, a contact form beside a full-height photo, six-column footer. */
export const ContactPage01 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <ContactFormAndImage01 />

        <FooterLarge01 />
    </div>
);
