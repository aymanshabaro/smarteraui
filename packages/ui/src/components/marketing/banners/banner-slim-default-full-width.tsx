import { CloseButton } from "../../base/buttons/close-button";

/** A slim announcement banner: a headline and an inline link, centred from the `md` breakpoint up. Default palette, full-bleed layout. */
export const BannerSlimDefaultFullWidth = () => (
    <section className="border-primary bg-secondary relative border-b">
        <div className="p-4 md:py-3.5">
            <div className="flex flex-col gap-0.5 md:flex-row md:justify-center md:gap-1.5 md:text-center">
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
        </div>

        <div className="absolute end-2 top-2 md:top-1.5">
            <CloseButton slot={null} size="sm" label="Dismiss" />
        </div>
    </section>
);
