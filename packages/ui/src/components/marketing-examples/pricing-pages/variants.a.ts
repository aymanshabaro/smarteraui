import { PricingPage01 } from "./pricing-page-01";
import { PricingPage02 } from "./pricing-page-02";
import { PricingPage03 } from "./pricing-page-03";
import { PricingPage04 } from "./pricing-page-04";
import { PricingPage05 } from "./pricing-page-05";
import { PricingPage06 } from "./pricing-page-06";
import { PricingPage07 } from "./pricing-page-07";
import { PricingPage08 } from "./pricing-page-08";
import { PricingPage09 } from "./pricing-page-09";
import { PricingPage10 } from "./pricing-page-10";

/** Part A of the pricing page variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "pricing-page-01": PricingPage01,
    "pricing-page-04": PricingPage04,
    "pricing-page-07": PricingPage07,
    "pricing-page-10": PricingPage10,
    "pricing-page-02": PricingPage02,
    "pricing-page-05": PricingPage05,
    "pricing-page-08": PricingPage08,
    "pricing-page-03": PricingPage03,
    "pricing-page-06": PricingPage06,
    "pricing-page-09": PricingPage09,
} as const;
