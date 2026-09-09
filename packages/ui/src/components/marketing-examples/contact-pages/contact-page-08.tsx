import { ContactIconsAndImage } from "@/components/marketing/contact-sections/contact-icons-and-image";
import { ContactSimpleForm } from "@/components/marketing/contact-sections/contact-simple-form";
import { CtaCardHorizontal } from "@/components/marketing/cta-sections/cta-card-horizontal";
import { FooterLarge11Brand } from "@/components/marketing/footers/footer-large-11-brand";
import { FloatingSimpleWithFooter } from "@/components/marketing/header-navigations/floating-simple-with-footer";

/**
 * Contact page: a floating header, the centered enquiry form, the office band with an overlapping
 * photo, a trial call to action and the branded footer.
 */
export const ContactPage08 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <ContactSimpleForm />

        <ContactIconsAndImage />

        {/* The section above already closes with a full band of padding, so the seam is collapsed here. */}
        <div className="[&>section]:pt-0">
            <CtaCardHorizontal />
        </div>

        <FooterLarge11Brand />
    </div>
);
