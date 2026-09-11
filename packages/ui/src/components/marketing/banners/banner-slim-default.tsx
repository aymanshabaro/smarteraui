import { CloseButton } from "../../base/buttons/close-button";

/** A slim announcement banner: a headline and an inline link, centred from the `md` breakpoint up. Default palette, floating card layout. */
export const BannerSlimDefault = () => (
    <section className="bg-secondary ring-secondary_alt relative mx-2 mb-4 flex items-center gap-4 rounded-xl p-4 shadow-lg ring-1 md:m-0 md:gap-3 md:px-12 md:py-4">
        <div className="flex w-0 flex-1 flex-col gap-0.5 md:flex-row md:justify-center md:gap-1.5 md:text-center">
            <p className="text-secondary pe-8 text-sm font-semibold md:truncate md:pe-0">We&apos;ve just launched a new feature!</p>
            <p className="text-tertiary text-sm md:truncate">
                Check out the{" "}
                <a
                    href="/dashboard"
                    className="decoration-utility-neutral-300 outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    new dashboard
                </a>
                .
            </p>
        </div>

        <div className="absolute end-2 top-2 flex shrink-0 items-center justify-center">
            <CloseButton slot={null} size="sm" label="Dismiss" />
        </div>
    </section>
);
