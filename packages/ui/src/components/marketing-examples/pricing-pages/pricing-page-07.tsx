import { sortCx } from "../../../utils/cx";
import { CtaSimpleCenteredBrand } from "../../marketing/cta-sections/cta-simple-centered-brand";
import { FaqAccordion03 } from "../../marketing/faq-sections/faq-accordion-03";
import { FooterLarge05 } from "../../marketing/footers/footer-large-05";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";
import { PricingSimpleDualCheckItem } from "../../marketing/pricing-sections/pricing-simple-dual-check-item";
import { TestimonialSocialCards01 } from "../../marketing/testimonial-sections/testimonial-social-cards-01";

const styles = sortCx({
    // Hairline rule that separates two sections sharing the same surface.
    rule: "max-w-container mx-auto px-4 md:px-8",
});

/**
 * Pricing page 07 — a floating header, monthly/annual plan cards, a rule-separated accordion
 * FAQ, a review grid, a branded trial CTA and a permanently dark footer.
 */
export const PricingPage07 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <PricingSimpleDualCheckItem />

        <div className={styles.rule}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>

        <FaqAccordion03 />

        <div className={styles.rule}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>

        <TestimonialSocialCards01 />

        <CtaSimpleCenteredBrand />

        <div className="dark-mode">
            <FooterLarge05 />
        </div>
    </div>
);
