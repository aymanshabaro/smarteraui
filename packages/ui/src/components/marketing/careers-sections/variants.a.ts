import { CareersCard01 } from "./careers-card-01";
import { CareersCard02 } from "./careers-card-02";
import { CareersCard03 } from "./careers-card-03";
import { CareersCard04 } from "./careers-card-04";
import { CareersSimple01 } from "./careers-simple-01";
import { CareersSimple01Brand } from "./careers-simple-01-brand";
import { CareersSimple02 } from "./careers-simple-02";
import { CareersSimple02Brand } from "./careers-simple-02-brand";
import { CareersSimple03 } from "./careers-simple-03";
import { CareersSimple03Brand } from "./careers-simple-03-brand";
import { CareersSimple04 } from "./careers-simple-04";
import { CareersSimple04Brand } from "./careers-simple-04-brand";

/** Part A of the careers section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "careers-simple-01": CareersSimple01,
    "careers-simple-04": CareersSimple04,
    "careers-card-03": CareersCard03,
    "careers-simple-02-brand": CareersSimple02Brand,
    "careers-simple-02": CareersSimple02,
    "careers-card-01": CareersCard01,
    "careers-card-04": CareersCard04,
    "careers-simple-03-brand": CareersSimple03Brand,
    "careers-simple-03": CareersSimple03,
    "careers-card-02": CareersCard02,
    "careers-simple-01-brand": CareersSimple01Brand,
    "careers-simple-04-brand": CareersSimple04Brand,
} as const;
