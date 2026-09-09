import type { FC, ReactNode } from "react";

/**
 * Shape of an option consumed by `Select`, `ComboBox`, `MultiSelect` and the option lists in
 * `@/utils/countries` and `@/utils/timezones`. Lives in utils so data modules do not depend on
 * the select component; `base/select/select-shared` re-exports it.
 */
export type SelectItemType = {
    /** Unique identifier for the item. */
    id: string | number;
    /** The primary display text. */
    label?: string;
    /** Avatar image URL. */
    avatarUrl?: string;
    /** Whether the item is disabled. */
    isDisabled?: boolean;
    /** Secondary text displayed alongside the label. */
    supportingText?: string;
    /** Leading icon component or element. */
    icon?: FC | ReactNode;
};
