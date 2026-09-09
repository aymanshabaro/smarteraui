import { CtaCardHorizontal } from "@/components/marketing/cta-sections/cta-card-horizontal";
import { FaqAccordion01 } from "@/components/marketing/faq-sections/faq-accordion-01";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { FloatingSimpleWithFooter } from "@/components/marketing/header-navigations/floating-simple-with-footer";
import { PricingDualAction } from "@/components/marketing/pricing-sections/pricing-dual-action";
import { TestimonialSocialCards02 } from "@/components/marketing/testimonial-sections/testimonial-social-cards-02";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // Consecutive sections share one rhythm: only the last one in a run keeps its bottom padding.
    tightTop: "[&>section]:pt-0",
});

/**
 * Pricing page 04 — a floating header over plan cards with dual actions, an accordion FAQ,
 * a wall-of-love testimonial grid, a trial card and a permanently dark footer.
 */
export const PricingPage04 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <PricingDualAction />

        <div className={styles.tightTop}>
            <FaqAccordion01 />
        </div>

        <div className={styles.tightTop}>
            <TestimonialSocialCards02 />
        </div>

        <div className={styles.tightTop}>
            <CtaCardHorizontal />
        </div>

        <div className="dark-mode">
            <FooterLarge04 />
        </div>
    </div>
);
