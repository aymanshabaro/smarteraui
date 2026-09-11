import { ContactFormAndImage02 } from "../../marketing/contact-sections/contact-form-and-image-02";
import { FooterLarge02 } from "../../marketing/footers/footer-large-02";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

/** Contact us form page: a cover photo beside a services enquiry form, over the rating-badge footer. */
export const ContactPage02 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <ContactFormAndImage02 />

        <FooterLarge02 />
    </div>
);
