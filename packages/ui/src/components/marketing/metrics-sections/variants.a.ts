import { MetricsCardBrandDark } from "./metrics-card-brand-dark";
import { MetricsCardGrayLight } from "./metrics-card-gray-light";
import { MetricsImageWithCards01 } from "./metrics-image-with-cards-01";
import { MetricsImageWithCards02 } from "./metrics-image-with-cards-02";
import { MetricsMinimalCenteredText } from "./metrics-minimal-centered-text";
import { MetricsMinimalCenteredTextBrand } from "./metrics-minimal-centered-text-brand";
import { MetricsSimpleAccentLine } from "./metrics-simple-accent-line";
import { MetricsSimpleAccentLineBrand } from "./metrics-simple-accent-line-brand";
import { MetricsSimpleCenteredText } from "./metrics-simple-centered-text";
import { MetricsSimpleCenteredTextBrand } from "./metrics-simple-centered-text-brand";
import { MetricsSimpleWithActions01 } from "./metrics-simple-with-actions-01";
import { MetricsSimpleWithActions02 } from "./metrics-simple-with-actions-02";
import { MetricsSplitImage01 } from "./metrics-split-image-01";
import { MetricsSplitImage01Brand } from "./metrics-split-image-01-brand";
import { MetricsSplitImage02 } from "./metrics-split-image-02";
import { MetricsSplitImage02Brand } from "./metrics-split-image-02-brand";

/** Part A of the metrics section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "metrics-card-gray-light": MetricsCardGrayLight,
    "metrics-simple-with-actions-02": MetricsSimpleWithActions02,
    "metrics-simple-accent-line": MetricsSimpleAccentLine,
    "metrics-split-image-02": MetricsSplitImage02,
    "metrics-simple-accent-line-brand": MetricsSimpleAccentLineBrand,
    "metrics-split-image-02-brand": MetricsSplitImage02Brand,
    "metrics-card-brand-dark": MetricsCardBrandDark,
    "metrics-image-with-cards-01": MetricsImageWithCards01,
    "metrics-simple-centered-text": MetricsSimpleCenteredText,
    "metrics-minimal-centered-text": MetricsMinimalCenteredText,
    "metrics-simple-centered-text-brand": MetricsSimpleCenteredTextBrand,
    "metrics-simple-with-actions-01": MetricsSimpleWithActions01,
    "metrics-image-with-cards-02": MetricsImageWithCards02,
    "metrics-split-image-01": MetricsSplitImage01,
    "metrics-minimal-centered-text-brand": MetricsMinimalCenteredTextBrand,
    "metrics-split-image-01-brand": MetricsSplitImage01Brand,
} as const;
