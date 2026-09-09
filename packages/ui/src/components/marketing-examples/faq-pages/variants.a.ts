import { FaqPage01 } from "./faq-page-01";
import { FaqPage02 } from "./faq-page-02";
import { FaqPage03 } from "./faq-page-03";
import { FaqPage04 } from "./faq-page-04";
import { FaqPage05 } from "./faq-page-05";
import { FaqPage06 } from "./faq-page-06";
import { FaqPage07 } from "./faq-page-07";
import { FaqPage08 } from "./faq-page-08";
import { FaqPage09 } from "./faq-page-09";
import { FaqPage10 } from "./faq-page-10";

/** Part A of the FAQ page variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "faq-page-01": FaqPage01,
    "faq-page-04": FaqPage04,
    "faq-page-07": FaqPage07,
    "faq-page-10": FaqPage10,
    "faq-page-02": FaqPage02,
    "faq-page-05": FaqPage05,
    "faq-page-08": FaqPage08,
    "faq-page-03": FaqPage03,
    "faq-page-06": FaqPage06,
    "faq-page-09": FaqPage09,
} as const;
