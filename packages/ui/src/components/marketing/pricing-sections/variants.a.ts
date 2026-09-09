import { PricingAbstractAngles } from "./pricing-abstract-angles";
import { PricingDualAction } from "./pricing-dual-action";
import { PricingGrayBadge } from "./pricing-gray-badge";
import { PricingLargeTable01 } from "./pricing-large-table-01";
import { PricingLargeTable02 } from "./pricing-large-table-02";
import { PricingPrimaryCardIcon } from "./pricing-primary-card-icon";
import { PricingPrimaryCardSimple } from "./pricing-primary-card-simple";
import { PricingPrimaryDarkBadge } from "./pricing-primary-dark-badge";
import { PricingSectionFeaturedCards01 } from "./pricing-section-featured-cards-01";
import { PricingSectionFeaturedCards02 } from "./pricing-section-featured-cards-02";
import { PricingSectionFeaturedCards03 } from "./pricing-section-featured-cards-03";
import { PricingSectionFeaturedCards04 } from "./pricing-section-featured-cards-04";
import { PricingSectionSimpleCards01 } from "./pricing-section-simple-cards-01";
import { PricingSectionSimpleCards02 } from "./pricing-section-simple-cards-02";
import { PricingSectionSimpleCards03 } from "./pricing-section-simple-cards-03";
import { PricingSectionSimpleCards04 } from "./pricing-section-simple-cards-04";
import { PricingSimpleAccentLine } from "./pricing-simple-accent-line";
import { PricingSimpleBanner } from "./pricing-simple-banner";
import { PricingSimpleCallOut } from "./pricing-simple-call-out";
import { PricingSimpleDualCheckItem } from "./pricing-simple-dual-check-item";
import { PricingSimpleIcon } from "./pricing-simple-icon";
import { PricingSimpleIconOffset } from "./pricing-simple-icon-offset";

/** Part A of the pricing section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "pricing-simple-icon": PricingSimpleIcon,
    "pricing-simple-dual-check-item": PricingSimpleDualCheckItem,
    "pricing-abstract-angles": PricingAbstractAngles,
    "pricing-simple-banner": PricingSimpleBanner,
    "pricing-large-table-01": PricingLargeTable01,
    "pricing-section-simple-cards-02": PricingSectionSimpleCards02,
    "pricing-section-featured-cards-01": PricingSectionFeaturedCards01,
    "pricing-section-featured-cards-04": PricingSectionFeaturedCards04,
    "pricing-simple-call-out": PricingSimpleCallOut,
    "pricing-gray-badge": PricingGrayBadge,
    "pricing-simple-accent-line": PricingSimpleAccentLine,
    "pricing-primary-card-simple": PricingPrimaryCardSimple,
    "pricing-large-table-02": PricingLargeTable02,
    "pricing-section-simple-cards-03": PricingSectionSimpleCards03,
    "pricing-section-featured-cards-02": PricingSectionFeaturedCards02,
    "pricing-simple-icon-offset": PricingSimpleIconOffset,
    "pricing-primary-dark-badge": PricingPrimaryDarkBadge,
    "pricing-dual-action": PricingDualAction,
    "pricing-primary-card-icon": PricingPrimaryCardIcon,
    "pricing-section-simple-cards-01": PricingSectionSimpleCards01,
    "pricing-section-simple-cards-04": PricingSectionSimpleCards04,
    "pricing-section-featured-cards-03": PricingSectionFeaturedCards03,
} as const;
