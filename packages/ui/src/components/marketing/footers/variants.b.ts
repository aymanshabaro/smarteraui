import type { ComponentType } from "react";
import { FooterLarge01Brand } from "./footer-large-01-brand";
import { FooterLarge03 } from "./footer-large-03";
import { FooterLarge03Brand } from "./footer-large-03-brand";
import { FooterLarge04Brand } from "./footer-large-04-brand";
import { FooterLarge06 } from "./footer-large-06";
import { FooterLarge06Brand } from "./footer-large-06-brand";
import { FooterLarge07Brand } from "./footer-large-07-brand";
import { FooterLarge09 } from "./footer-large-09";
import { FooterLarge09Brand } from "./footer-large-09-brand";
import { FooterLarge10Brand } from "./footer-large-10-brand";
import { FooterLarge12 } from "./footer-large-12";
import { FooterLarge12Brand } from "./footer-large-12-brand";
import { FooterLarge13Brand } from "./footer-large-13-brand";
import { FooterLarge15 } from "./footer-large-15";
import { FooterLarge15Brand } from "./footer-large-15-brand";
import { FooterLarge16Brand } from "./footer-large-16-brand";
import { FooterSmall02 } from "./footer-small-02";
import { FooterSmall02Brand } from "./footer-small-02-brand";
import { FooterSmall03Brand } from "./footer-small-03-brand";
import { FooterSmall04 } from "./footer-small-04";

/** Part B of the footer variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsB = {
    "footer-small-04": FooterSmall04,
    "footer-large-03-brand": FooterLarge03Brand,
    "footer-large-06-brand": FooterLarge06Brand,
    "footer-large-09-brand": FooterLarge09Brand,
    "footer-large-12-brand": FooterLarge12Brand,
    "footer-large-15-brand": FooterLarge15Brand,
    "footer-small-02-brand": FooterSmall02Brand,
    "footer-large-03": FooterLarge03,
    "footer-large-06": FooterLarge06,
    "footer-large-09": FooterLarge09,
    "footer-large-12": FooterLarge12,
    "footer-large-15": FooterLarge15,
    "footer-small-02": FooterSmall02,
    "footer-large-01-brand": FooterLarge01Brand,
    "footer-large-04-brand": FooterLarge04Brand,
    "footer-large-07-brand": FooterLarge07Brand,
    "footer-large-10-brand": FooterLarge10Brand,
    "footer-large-13-brand": FooterLarge13Brand,
    "footer-large-16-brand": FooterLarge16Brand,
    "footer-small-03-brand": FooterSmall03Brand,
} as const satisfies Record<string, ComponentType>;
