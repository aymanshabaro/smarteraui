import { ContentAlternative01 } from "./content-alternative-01";
import { ContentAlternative02 } from "./content-alternative-02";
import { ContentAlternative03 } from "./content-alternative-03";
import { ContentLargeImage01 } from "./content-large-image-01";
import { ContentLargeImage02 } from "./content-large-image-02";
import { ContentLargeImage03 } from "./content-large-image-03";
import { ContentLargeImage04 } from "./content-large-image-04";
import { ContentSectionRichText01 } from "./content-section-rich-text-01";
import { ContentSectionRichText02 } from "./content-section-rich-text-02";
import { ContentSectionSimple01 } from "./content-section-simple-01";
import { ContentSectionSimple02 } from "./content-section-simple-02";
import { ContentSectionSimple03 } from "./content-section-simple-03";
import { ContentSectionSimple04 } from "./content-section-simple-04";
import { ContentSectionSimple05 } from "./content-section-simple-05";
import { ContentSectionSplitImage01 } from "./content-section-split-image-01";
import { ContentSectionSplitImage02 } from "./content-section-split-image-02";
import { ContentSectionSplitImage03 } from "./content-section-split-image-03";
import { ContentSimple } from "./content-simple";
import { ContentSplitImage01 } from "./content-split-image-01";
import { ContentSplitImage02 } from "./content-split-image-02";
import { ContentSplitImage03 } from "./content-split-image-03";
import { ContentSplitImage04 } from "./content-split-image-04";

/** Part A of the content rich text section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "content-large-image-01": ContentLargeImage01,
    "content-large-image-04": ContentLargeImage04,
    "content-split-image-03": ContentSplitImage03,
    "content-alternative-02": ContentAlternative02,
    "content-section-split-image-01": ContentSectionSplitImage01,
    "content-section-simple-01": ContentSectionSimple01,
    "content-section-simple-04": ContentSectionSimple04,
    "content-section-rich-text-02": ContentSectionRichText02,
    "content-large-image-02": ContentLargeImage02,
    "content-split-image-01": ContentSplitImage01,
    "content-split-image-04": ContentSplitImage04,
    "content-alternative-03": ContentAlternative03,
    "content-section-split-image-02": ContentSectionSplitImage02,
    "content-section-simple-02": ContentSectionSimple02,
    "content-section-simple-05": ContentSectionSimple05,
    "content-large-image-03": ContentLargeImage03,
    "content-split-image-02": ContentSplitImage02,
    "content-alternative-01": ContentAlternative01,
    "content-simple": ContentSimple,
    "content-section-split-image-03": ContentSectionSplitImage03,
    "content-section-simple-03": ContentSectionSimple03,
    "content-section-rich-text-01": ContentSectionRichText01,
} as const;
