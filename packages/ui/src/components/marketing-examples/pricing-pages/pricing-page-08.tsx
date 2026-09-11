import { sortCx } from "../../../utils/cx";
import { CtaCardHorizontalBrand } from "../../marketing/cta-sections/cta-card-horizontal-brand";
import { FaqSimple01 } from "../../marketing/faq-sections/faq-simple-01";
import { FeaturesCenterMockup01 } from "../../marketing/features-sections/features-center-mockup-01";
import { FeaturesIconsAndImage03 } from "../../marketing/features-sections/features-icons-and-image-03";
import { FooterLarge02 } from "../../marketing/footers/footer-large-02";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { PricingSimpleBanner } from "../../marketing/pricing-sections/pricing-simple-banner";

const styles = sortCx({
    // Hairline rule that separates two sections sharing the same surface.
    rule: "max-w-container mx-auto px-4 md:px-8",
    // Consecutive sections share one rhythm: only the last one in a run keeps its bottom padding.
    tightTop: "[&>section]:pt-0",
    // The footer sits on the alternate surface so it reads as a distinct block under the CTA.
    footerOnAlt: "[&_footer>div]:bg-secondary_alt",
});

/**
 * Pricing page 08 — plan cards with a banner call-out, a centred product mockup, an
 * icons-and-image feature block, a three-column FAQ and a branded trial card above the footer.
 */
export const PricingPage08 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <PricingSimpleBanner />

        <div className={styles.rule}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>

        <FeaturesCenterMockup01 />

        <FeaturesIconsAndImage03 />

        <div className={styles.rule}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>

        <FaqSimple01 />

        <div className={styles.tightTop}>
            <CtaCardHorizontalBrand />
        </div>

        <div className={styles.footerOnAlt}>
            <FooterLarge02 />
        </div>
    </div>
);
