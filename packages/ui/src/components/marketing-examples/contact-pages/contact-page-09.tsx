import { ContactFormAndImage02 } from "@/components/marketing/contact-sections/contact-form-and-image-02";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";

/**
 * Split contact form page: a header over a single full-height section that stretches the cover
 * photo and the enquiry form to the bottom of the viewport.
 */
export const ContactPage09 = () => (
    <div className="bg-primary flex min-h-dvh flex-col [&>section]:flex-1">
        <HeaderDropdownSimple />

        <ContactFormAndImage02 />
    </div>
);
