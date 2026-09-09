import { BannerSlimDefaultFullWidth } from "@/components/marketing/banners/banner-slim-default-full-width";
import { CtaAbstractImages } from "@/components/marketing/cta-sections/cta-abstract-images";
import { CtaCardHorizontal } from "@/components/marketing/cta-sections/cta-card-horizontal";
import { FaqAccordion03 } from "@/components/marketing/faq-sections/faq-accordion-03";
import { FooterLarge05 } from "@/components/marketing/footers/footer-large-05";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { PricingPrimaryCardSimple } from "@/components/marketing/pricing-sections/pricing-primary-card-simple";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The page alternates surfaces, so this section sits on the secondary background.
    onSecondary: "[&>section]:bg-secondary",
    // Consecutive sections share one rhythm: only the last one in a run keeps its bottom padding.
    tightTop: "[&>section]:pt-0",
});

/**
 * Pricing page 09 — an announcement banner, a single highlighted plan card, an accordion FAQ
 * on the secondary surface, an abstract-image "no catches" CTA and a trial card.
 */
export const PricingPage09 = () => (
    <div className="bg-primary">
        <BannerSlimDefaultFullWidth />

        <HeaderDropdownSimple />

        <PricingPrimaryCardSimple />

        <div className={styles.onSecondary}>
            <FaqAccordion03 />
        </div>

        <CtaAbstractImages />

        <div className={styles.tightTop}>
            <CtaCardHorizontal />
        </div>

        <div className="dark-mode">
            <FooterLarge05 />
        </div>
    </div>
);
