import { ContactFormAndImage02 } from "../../marketing/contact-sections/contact-form-and-image-02";
import { ContactMap02 } from "../../marketing/contact-sections/contact-map-02";
import { ContactSimpleIcons04Brand } from "../../marketing/contact-sections/contact-simple-icons-04-brand";
import { FooterLarge01 } from "../../marketing/footers/footer-large-01";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";

/**
 * Contact page: worldwide contact channels over a dot map, the branded store list, a services
 * enquiry form beside a cover photo, and a newsletter capture above the six-column footer.
 */
export const ContactPage05 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <ContactMap02 />

        <ContactSimpleIcons04Brand />

        <ContactFormAndImage02 />

        <NewsletterSimpleCentered />

        <FooterLarge01 />
    </div>
);
