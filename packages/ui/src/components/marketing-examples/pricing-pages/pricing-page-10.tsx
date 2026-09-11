import { sortCx } from "../../../utils/cx";
import { CtaScreenMockup04 } from "../../marketing/cta-sections/cta-screen-mockup-04";
import { FaqSimple02 } from "../../marketing/faq-sections/faq-simple-02";
import { FooterLarge03 } from "../../marketing/footers/footer-large-03";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";
import { PricingSimpleIconOffset } from "../../marketing/pricing-sections/pricing-simple-icon-offset";

const styles = sortCx({
    // Hairline rule that separates two sections sharing the same surface.
    rule: "max-w-container mx-auto px-4 md:px-8",
    // Consecutive sections share one rhythm: only the last one in a run keeps its bottom padding.
    tightTop: "[&>section]:pt-0",
});

/**
 * Pricing page 10 — a SaaS layout: floating header, offset-icon plan cards, a two-column FAQ
 * and a screen-mockup CTA, each separated by a hairline rule above the large footer.
 */
export const PricingPage10 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <PricingSimpleIconOffset />

        <div className={styles.rule}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>

        <FaqSimple02 />

        <div className={styles.tightTop}>
            <CtaScreenMockup04 />
        </div>

        <div className={styles.rule}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>

        <FooterLarge03 />
    </div>
);
