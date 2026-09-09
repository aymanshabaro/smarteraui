import type { ComponentType } from "react";
import { FooterLarge01 } from "./footer-large-01";
import { FooterLarge02 } from "./footer-large-02";
import { FooterLarge02Brand } from "./footer-large-02-brand";
import { FooterLarge04 } from "./footer-large-04";
import { FooterLarge05 } from "./footer-large-05";
import { FooterLarge05Brand } from "./footer-large-05-brand";
import { FooterLarge07 } from "./footer-large-07";
import { FooterLarge08 } from "./footer-large-08";
import { FooterLarge08Brand } from "./footer-large-08-brand";
import { FooterLarge10 } from "./footer-large-10";
import { FooterLarge11 } from "./footer-large-11";
import { FooterLarge11Brand } from "./footer-large-11-brand";
import { FooterLarge13 } from "./footer-large-13";
import { FooterLarge14 } from "./footer-large-14";
import { FooterLarge14Brand } from "./footer-large-14-brand";
import { FooterLarge16 } from "./footer-large-16";
import { FooterSmall01 } from "./footer-small-01";
import { FooterSmall01Brand } from "./footer-small-01-brand";
import { FooterSmall03 } from "./footer-small-03";
import { FooterSmall04Brand } from "./footer-small-04-brand";

/** Part A of the footer variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "footer-large-01": FooterLarge01,
    "footer-large-04": FooterLarge04,
    "footer-large-07": FooterLarge07,
    "footer-large-10": FooterLarge10,
    "footer-large-13": FooterLarge13,
    "footer-large-16": FooterLarge16,
    "footer-small-03": FooterSmall03,
    "footer-large-02-brand": FooterLarge02Brand,
    "footer-large-05-brand": FooterLarge05Brand,
    "footer-large-08-brand": FooterLarge08Brand,
    "footer-large-11-brand": FooterLarge11Brand,
    "footer-large-14-brand": FooterLarge14Brand,
    "footer-small-01-brand": FooterSmall01Brand,
    "footer-small-04-brand": FooterSmall04Brand,
    "footer-large-02": FooterLarge02,
    "footer-large-05": FooterLarge05,
    "footer-large-08": FooterLarge08,
    "footer-large-11": FooterLarge11,
    "footer-large-14": FooterLarge14,
    "footer-small-01": FooterSmall01,
} as const satisfies Record<string, ComponentType>;
