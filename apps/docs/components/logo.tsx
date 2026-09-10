import { cx } from "~/lib/cx";

/**
 * Placeholder wordmark for the docs chrome. Swapped for
 * `foundations/logo/proper-logo` once that component lands.
 */
export const Logo = ({ className }: { className?: string }) => (
    <span className={cx("flex items-center gap-2", className)}>
        <span
            aria-hidden="true"
            className="bg-brand-solid shadow-xs-skeuomorphic flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ring-1 ring-transparent ring-inset"
        >
            S
        </span>
        <span className="text-md text-primary font-semibold">Proper UI</span>
    </span>
);
