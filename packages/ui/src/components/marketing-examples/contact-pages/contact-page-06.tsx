import { ContactSimpleForm01 } from "@/components/marketing/contact-sections/contact-simple-form-01";
import { ContactSimpleIcons02 } from "@/components/marketing/contact-sections/contact-simple-icons-02";
import { FooterLarge07 } from "@/components/marketing/footers/footer-large-07";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterCardHorizontal } from "@/components/marketing/newsletter-cta-sections/newsletter-card-horizontal";

/**
 * Contact us page: three centered contact channels, a centered enquiry form, a newsletter card
 * and a permanently dark app-store footer.
 */
export const ContactPage06 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <ContactSimpleIcons02 />

        <ContactSimpleForm01 />

        {/* The section above already closes with a full band of padding, so the seam is collapsed here. */}
        <div className="[&>section]:pt-0">
            <NewsletterCardHorizontal />
        </div>

        {/* Section-scoped theme override: this footer stays dark in both themes. */}
        <div className="dark-mode">
            <FooterLarge07 />
        </div>
    </div>
);
