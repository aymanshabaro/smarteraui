import { sortCx } from "../../../utils/cx";
import { CtaCardHorizontal } from "../../marketing/cta-sections/cta-card-horizontal";
import { CtaSimpleLeft } from "../../marketing/cta-sections/cta-simple-left";
import { FaqSimple03 } from "../../marketing/faq-sections/faq-simple-03";
import { FeaturesSimpleIcons03 } from "../../marketing/features-sections/features-simple-icons-03";
import { FooterLarge05 } from "../../marketing/footers/footer-large-05";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { PricingAbstractAngles } from "../../marketing/pricing-sections/pricing-abstract-angles";
import { SocialProofCard } from "../../marketing/social-proof-sections/social-proof-card";

const styles = sortCx({
    // The angled hero already tints the top of the page, so the header picks up the same wash.
    tintedHeader: [
        "[&>header]:bg-utility-brand-50_alt",
        "[&_nav>ul>li>a]:text-brand-primary [&_nav>ul>li>a]:hover:text-brand-primary",
        "[&_nav>ul>li>button]:text-brand-primary [&_nav>ul>li>button]:hover:text-brand-primary",
        "[&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt",
    ].join(" "),
    // Consecutive sections share one rhythm: only the last one in a run keeps its bottom padding.
    tightTop: "[&>section]:pt-0",
    // The page alternates surfaces, so this section sits on the secondary background.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Pricing page 02 — an angled plan hero under a tinted header, followed by a trial card, the
 * feature grid, a customer proof card, the FAQ list and a closing CTA band.
 */
export const PricingPage02 = () => (
    <div className="bg-primary">
        <div className={styles.tintedHeader}>
            <HeaderDropdownSimple />
        </div>

        <PricingAbstractAngles />

        <div className={styles.tightTop}>
            <CtaCardHorizontal />
        </div>

        <div className={styles.tightTop}>
            <FeaturesSimpleIcons03 />
        </div>

        <div className={styles.tightTop}>
            <SocialProofCard />
        </div>

        <div className={styles.tightTop}>
            <FaqSimple03 />
        </div>

        <div className={styles.onSecondary}>
            <CtaSimpleLeft />
        </div>

        <FooterLarge05 />
    </div>
);
