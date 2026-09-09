import { CtaCardVertical } from "@/components/marketing/cta-sections/cta-card-vertical";
import { FaqAccordion01 } from "@/components/marketing/faq-sections/faq-accordion-01";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { PricingLargeTable01 } from "@/components/marketing/pricing-sections/pricing-large-table-01";
import { SocialProofFullWidth } from "@/components/marketing/social-proof-sections/social-proof-full-width";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The page alternates surfaces, so this section sits on the secondary background.
    onSecondary: "[&>section]:bg-secondary",
    // Consecutive sections share one rhythm: only the last one in a run keeps its bottom padding.
    tightTop: "[&>section]:pt-0",
});

/**
 * Pricing page 05 — a full plan comparison table, an accordion FAQ on the secondary surface,
 * a full-width logo strip, a centred trial card and a branded footer.
 */
export const PricingPage05 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <PricingLargeTable01 />

        <div className={styles.onSecondary}>
            <FaqAccordion01 />
        </div>

        <SocialProofFullWidth />

        <div className={styles.tightTop}>
            <CtaCardVertical />
        </div>

        <FooterLarge01Brand />
    </div>
);
