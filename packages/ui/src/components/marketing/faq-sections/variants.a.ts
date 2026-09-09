import { FaqAccordion01 } from "./faq-accordion-01";
import { FaqAccordion01Brand } from "./faq-accordion-01-brand";
import { FaqAccordion02 } from "./faq-accordion-02";
import { FaqAccordion02Brand } from "./faq-accordion-02-brand";
import { FaqAccordion03 } from "./faq-accordion-03";
import { FaqAccordion03Brand } from "./faq-accordion-03-brand";
import { FaqAccordion04 } from "./faq-accordion-04";
import { FaqAccordion04Brand } from "./faq-accordion-04-brand";
import { FaqSimple01 } from "./faq-simple-01";
import { FaqSimple01Brand } from "./faq-simple-01-brand";
import { FaqSimple02 } from "./faq-simple-02";
import { FaqSimple02Brand } from "./faq-simple-02-brand";
import { FaqSimple03 } from "./faq-simple-03";
import { FaqSimple03Brand } from "./faq-simple-03-brand";
import { FaqSimple04 } from "./faq-simple-04";
import { FaqSimple04Brand } from "./faq-simple-04-brand";

/** Part A of the FAQ section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "faq-simple-01": FaqSimple01,
    "faq-simple-04": FaqSimple04,
    "faq-accordion-03": FaqAccordion03,
    "faq-simple-02-brand": FaqSimple02Brand,
    "faq-accordion-01-brand": FaqAccordion01Brand,
    "faq-accordion-04-brand": FaqAccordion04Brand,
    "faq-simple-02": FaqSimple02,
    "faq-accordion-01": FaqAccordion01,
    "faq-accordion-04": FaqAccordion04,
    "faq-simple-03-brand": FaqSimple03Brand,
    "faq-accordion-02-brand": FaqAccordion02Brand,
    "faq-simple-03": FaqSimple03,
    "faq-accordion-02": FaqAccordion02,
    "faq-simple-01-brand": FaqSimple01Brand,
    "faq-simple-04-brand": FaqSimple04Brand,
    "faq-accordion-03-brand": FaqAccordion03Brand,
} as const;
