import { cx } from "~/lib/cx";
import { SmarteraLogoMinimal } from "@smarteraui/ui/components/foundations/logo/smartera-logo-minimal";

/**
 * The landing-page lockup.
 *
 * Copied from `foundations/logo/smartera-logo` and adapted for the product name — the library
 * ships the "Smartera" company wordmark, while this site is "Smartera UI". Markup and classes
 * are otherwise identical to the foundations component.
 */
export const LandingLogo = ({ className }: { className?: string }) => (
    <div className={cx("flex h-8 w-max items-center justify-start gap-2 overflow-visible", className)}>
        <SmarteraLogoMinimal className="aspect-square h-full w-auto shrink-0" />
        <span className="text-fg-primary text-lg font-semibold whitespace-nowrap select-none">Smartera UI</span>
    </div>
);
