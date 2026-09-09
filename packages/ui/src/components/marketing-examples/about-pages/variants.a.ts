import { AboutPage01 } from "./about-page-01";
import { AboutPage02 } from "./about-page-02";
import { AboutPage03 } from "./about-page-03";
import { AboutPage04 } from "./about-page-04";
import { AboutPage05 } from "./about-page-05";
import { AboutPage06 } from "./about-page-06";
import { AboutPage07 } from "./about-page-07";
import { AboutPage08 } from "./about-page-08";
import { AboutPage09 } from "./about-page-09";
import { AboutPage10 } from "./about-page-10";

/** Part A of the about page variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "about-page-01": AboutPage01,
    "about-page-04": AboutPage04,
    "about-page-07": AboutPage07,
    "about-page-10": AboutPage10,
    "about-page-02": AboutPage02,
    "about-page-05": AboutPage05,
    "about-page-08": AboutPage08,
    "about-page-03": AboutPage03,
    "about-page-06": AboutPage06,
    "about-page-09": AboutPage09,
} as const;
