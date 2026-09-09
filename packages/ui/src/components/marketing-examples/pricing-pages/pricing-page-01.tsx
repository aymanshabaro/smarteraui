import { CtaSimpleLogos01Brand } from "@/components/marketing/cta-sections/cta-simple-logos-01-brand";
import { FaqSimple04 } from "@/components/marketing/faq-sections/faq-simple-04";
import { FeaturesSimpleIcons03 } from "@/components/marketing/features-sections/features-simple-icons-03";
import { FooterLarge01 } from "@/components/marketing/footers/footer-large-01";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { PricingSimpleCallOut } from "@/components/marketing/pricing-sections/pricing-simple-call-out";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The page alternates surfaces, so this section sits on the secondary background instead of its own default.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Pricing page 01 — three plan cards with a "most popular" call-out, a feature grid on the
 * secondary surface, a two-column FAQ list and a branded logo CTA above the large footer.
 */
export const PricingPage01 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <PricingSimpleCallOut />

        <div className={styles.onSecondary}>
            <FeaturesSimpleIcons03 />
        </div>

        <FaqSimple04 />

        <CtaSimpleLogos01Brand />

        <FooterLarge01 />
    </div>
);
