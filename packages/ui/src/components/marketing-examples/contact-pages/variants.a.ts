import { ContactPage01 } from "./contact-page-01";
import { ContactPage02 } from "./contact-page-02";
import { ContactPage03 } from "./contact-page-03";
import { ContactPage04 } from "./contact-page-04";
import { ContactPage05 } from "./contact-page-05";
import { ContactPage06 } from "./contact-page-06";
import { ContactPage07 } from "./contact-page-07";
import { ContactPage08 } from "./contact-page-08";
import { ContactPage09 } from "./contact-page-09";
import { ContactPage10 } from "./contact-page-10";

/** Part A of the contact page variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "contact-page-01": ContactPage01,
    "contact-page-04": ContactPage04,
    "contact-page-07": ContactPage07,
    "contact-page-10": ContactPage10,
    "contact-page-02": ContactPage02,
    "contact-page-05": ContactPage05,
    "contact-page-08": ContactPage08,
    "contact-page-03": ContactPage03,
    "contact-page-06": ContactPage06,
    "contact-page-09": ContactPage09,
} as const;
