import { CloseButton } from "@/components/base/buttons/close-button";

/** A slim announcement banner: a headline and an inline link, centred from the `md` breakpoint up. Brand palette, full-bleed layout. */
export const BannerSlimBrandFullWidth = () => (
    <section className="border-brand_alt bg-brand-section_subtle md:border-brand relative border-b">
        <div className="p-4 md:py-3.5">
            <div className="flex flex-col gap-0.5 md:flex-row md:justify-center md:gap-1.5 md:text-center">
                <p className="text-primary_on-brand pe-8 text-sm font-semibold md:truncate md:pe-0">We&apos;ve just launched a new feature!</p>
                <p className="text-tertiary_on-brand text-sm md:truncate">
                    Check out the{" "}
                    <a
                        href="/dashboard"
                        className="decoration-utility-brand-500_alt outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        new dashboard
                    </a>
                    .
                </p>
            </div>
        </div>

        <div className="absolute end-2 top-2 md:top-1.5">
            <CloseButton slot={null} size="sm" theme="dark" label="Dismiss" />
        </div>
    </section>
);
