"use client";

import type { ReactNode, Ref } from "react";
import type { LabelProps as AriaLabelProps } from "react-aria-components";
import { Label as AriaLabel } from "react-aria-components";
import { HelpCircle } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { Tooltip, TooltipTrigger } from "../tooltip/tooltip";

export interface LabelProps extends AriaLabelProps {
    children: ReactNode;
    isInvalid?: boolean;
    isRequired?: boolean;
    tooltip?: string;
    tooltipDescription?: string;
    ref?: Ref<HTMLLabelElement>;
}

export const Label = ({ isInvalid, isRequired, tooltip, tooltipDescription, className, ...props }: LabelProps) => {
    return (
        <AriaLabel
            // Used for conditionally hiding/showing the label element via CSS:
            // <Input label="Visible only on mobile" className="lg:**:data-label:hidden" />
            // or
            // <Input label="Visible only on mobile" className="lg:label:hidden" />
            data-label="true"
            {...props}
            className={cx("text-secondary flex cursor-default items-center gap-0.5 text-sm font-medium", className)}
        >
            {props.children}

            {/*
             * Only rendered when required (or when `isRequired` is left unset, so the ancestor
             * `group-required:` CSS variant can still show it). When a caller explicitly passes
             * `isRequired={false}`, the element is omitted entirely — not just visually hidden —
             * so it never joins the label's accessible name (e.g. `getByLabelText("Email")` stays
             * an exact match instead of matching "Email *").
             */}
            {(isRequired || typeof isRequired === "undefined") && (
                <span
                    className={cx(
                        "text-brand-tertiary hidden",
                        isRequired && "block",
                        typeof isRequired === "undefined" && "group-required:block",

                        isInvalid && "text-error-primary",
                        typeof isInvalid === "undefined" && "group-invalid:text-error-primary",
                    )}
                >
                    *
                </span>
            )}

            {tooltip && (
                <Tooltip title={tooltip} description={tooltipDescription} placement="top">
                    <TooltipTrigger
                        // `TooltipTrigger` inherits the disabled state from the parent form field
                        // but we don't that. We want the tooltip be enabled even if the parent
                        // field is disabled.
                        isDisabled={false}
                        // Opt this button out of the ambient `ButtonContext` that `Select`/`ComboBox`
                        // provide to any unslotted `Button` in their subtree — without this, the help
                        // icon silently becomes a second copy of the field's own trigger (duplicate id,
                        // `aria-haspopup`, `aria-expanded`) and corrupts the trigger's accessible name.
                        slot={null}
                        aria-label="More information"
                        className="text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover cursor-pointer transition duration-200"
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}
        </AriaLabel>
    );
};

Label.displayName = "Label";
