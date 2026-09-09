import { NotFoundIllustration01 } from "./not-found-illustration-01";
import { NotFoundIllustration02 } from "./not-found-illustration-02";
import { NotFoundScreenMockup } from "./not-found-screen-mockup";
import { NotFoundSimple01 } from "./not-found-simple-01";
import { NotFoundSimple02 } from "./not-found-simple-02";
import { NotFoundSimple03 } from "./not-found-simple-03";
import { NotFoundSimple04 } from "./not-found-simple-04";
import { NotFoundSimple05 } from "./not-found-simple-05";
import { NotFoundSimple06 } from "./not-found-simple-06";
import { NotFoundSplitImage01 } from "./not-found-split-image-01";
import { NotFoundSplitImage02 } from "./not-found-split-image-02";
import { NotFoundSplitImage03 } from "./not-found-split-image-03";
import { NotFoundSplitImage04 } from "./not-found-split-image-04";
import { NotFoundSplitImage05 } from "./not-found-split-image-05";

/** Part A of the 404 section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "not-found-simple-01": NotFoundSimple01,
    "not-found-simple-04": NotFoundSimple04,
    "not-found-split-image-01": NotFoundSplitImage01,
    "not-found-split-image-04": NotFoundSplitImage04,
    "not-found-illustration-01": NotFoundIllustration01,
    "not-found-simple-02": NotFoundSimple02,
    "not-found-simple-05": NotFoundSimple05,
    "not-found-split-image-02": NotFoundSplitImage02,
    "not-found-split-image-05": NotFoundSplitImage05,
    "not-found-illustration-02": NotFoundIllustration02,
    "not-found-simple-03": NotFoundSimple03,
    "not-found-simple-06": NotFoundSimple06,
    "not-found-split-image-03": NotFoundSplitImage03,
    "not-found-screen-mockup": NotFoundScreenMockup,
} as const;
