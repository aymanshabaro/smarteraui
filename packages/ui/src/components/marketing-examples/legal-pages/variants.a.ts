import { LegalPage01 } from "./legal-page-01";
import { LegalPage02 } from "./legal-page-02";
import { LegalPage03 } from "./legal-page-03";
import { LegalPage04 } from "./legal-page-04";
import { LegalPage05 } from "./legal-page-05";

/** Part A of the legal page variants, keyed by their docs route slug. */
export const variantsA = {
    "legal-page-01": LegalPage01,
    "legal-page-04": LegalPage04,
    "legal-page-02": LegalPage02,
    "legal-page-05": LegalPage05,
    "legal-page-03": LegalPage03,
} as const;
