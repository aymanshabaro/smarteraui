import { BannerSlimBrandFullWidth } from "@/components/marketing/banners/banner-slim-brand-full-width";
import { CtaScreenMockup02 } from "@/components/marketing/cta-sections/cta-screen-mockup-02";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { PricingLargeTable02 } from "@/components/marketing/pricing-sections/pricing-large-table-02";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The page alternates surfaces, so this section sits on the secondary background.
    onSecondary: "[&>section]:bg-secondary",
    // Hairline rule that separates two sections sharing the same surface.
    rule: "max-w-container mx-auto px-4 md:px-8",
});

/**
 * Pricing page 06 — an announcement banner, a slider-driven plan comparison table, a screen
 * mockup CTA, a centred trial CTA on the secondary surface and a permanently dark footer.
 */
export const PricingPage06 = () => (
    <div className="bg-primary">
        <BannerSlimBrandFullWidth />

        <HeaderDropdownSimple />

        <PricingLargeTable02 />

        <div className={styles.rule}>
            <hr className="bg-border-secondary h-px w-full border-none" />
        </div>

        <CtaScreenMockup02 />

        <div className={styles.onSecondary}>
            <CtaSimpleCentered />
        </div>

        <div className="dark-mode">
            <FooterLarge09 />
        </div>
    </div>
);
