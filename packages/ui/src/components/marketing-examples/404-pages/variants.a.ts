import { NotFoundPage01 } from "./not-found-page-01";
import { NotFoundPage02 } from "./not-found-page-02";
import { NotFoundPage03 } from "./not-found-page-03";
import { NotFoundPage04 } from "./not-found-page-04";
import { NotFoundPage05 } from "./not-found-page-05";
import { NotFoundPage06 } from "./not-found-page-06";
import { NotFoundPage07 } from "./not-found-page-07";
import { NotFoundPage08 } from "./not-found-page-08";
import { NotFoundPage09 } from "./not-found-page-09";
import { NotFoundPage10 } from "./not-found-page-10";

/** Part A of the 404 page variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "not-found-page-01": NotFoundPage01,
    "not-found-page-04": NotFoundPage04,
    "not-found-page-07": NotFoundPage07,
    "not-found-page-10": NotFoundPage10,
    "not-found-page-02": NotFoundPage02,
    "not-found-page-05": NotFoundPage05,
    "not-found-page-08": NotFoundPage08,
    "not-found-page-03": NotFoundPage03,
    "not-found-page-06": NotFoundPage06,
    "not-found-page-09": NotFoundPage09,
} as const;
