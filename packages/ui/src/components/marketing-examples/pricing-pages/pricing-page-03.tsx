import { sortCx } from "../../../utils/cx";
import { CtaSimpleLogos01 } from "../../marketing/cta-sections/cta-simple-logos-01";
import { FaqAccordion04 } from "../../marketing/faq-sections/faq-accordion-04";
import { FeaturesSimpleIcons01 } from "../../marketing/features-sections/features-simple-icons-01";
import { FooterLarge05 } from "../../marketing/footers/footer-large-05";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { PricingPrimaryDarkBadge } from "../../marketing/pricing-sections/pricing-primary-dark-badge";

const styles = sortCx({
    // The plan hero opens on the brand section, so the header is painted to match it.
    brandHeader: [
        "[&>header]:bg-brand-section",
        "[&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button]:text-secondary_on-brand [&_nav>ul>li>button]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt",
        "[&_svg_path.fill-fg-primary]:fill-fg-white",
    ].join(" "),
    // The page alternates surfaces, so this section sits on the secondary background.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Pricing page 03 — a brand-coloured header and plan hero with a dark "most popular" badge,
 * a compact feature grid, an accordion FAQ and a logo CTA on the secondary surface.
 */
export const PricingPage03 = () => (
    <div className="bg-primary">
        <div className={styles.brandHeader}>
            <HeaderDropdownSimple />
        </div>

        <PricingPrimaryDarkBadge />

        <div className={styles.onSecondary}>
            <FeaturesSimpleIcons01 />
        </div>

        <FaqAccordion04 />

        <div className={styles.onSecondary}>
            <CtaSimpleLogos01 />
        </div>

        <FooterLarge05 />
    </div>
);
