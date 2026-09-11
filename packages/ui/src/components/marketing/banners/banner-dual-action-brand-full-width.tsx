import { CheckVerified03 } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { CloseButton } from "../../base/buttons/close-button";

/** A consent banner with a verified icon, a policy link and a decline / allow action pair. Brand palette, full-bleed layout. */
export const BannerDualActionBrandFullWidth = () => (
    <section className="border-brand_alt bg-brand-section_subtle md:border-brand relative border-t md:border-t-0 md:border-b">
        <div className="max-w-container mx-auto flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-3 md:px-8 md:py-3">
            <div className="flex flex-1 flex-col gap-3 md:w-0 md:flex-row md:items-center md:gap-2">
                <CheckVerified03 aria-hidden="true" className="text-icon-fg-brand_on-brand size-5" />

                <div className="flex flex-col gap-2 overflow-hidden lg:flex-row lg:gap-1.5">
                    <p className="text-primary_on-brand pe-8 text-sm font-semibold md:truncate md:pe-0">
                        We use third-party cookies in order to personalise your experience
                    </p>
                    <p className="text-tertiary_on-brand text-sm md:truncate">
                        Read our{" "}
                        <a
                            href="/cookie-policy"
                            className="decoration-utility-brand-500_alt outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Cookie Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex w-full flex-col-reverse gap-2 md:flex-row md:gap-3">
                    <Button size="sm" color="secondary" className="shadow-xs! ring-0">
                        Decline
                    </Button>
                    <Button size="sm">Allow</Button>
                </div>

                <div className="absolute end-2 top-2 flex shrink-0 items-center justify-center md:static">
                    <CloseButton slot={null} size="sm" theme="dark" label="Dismiss" />
                </div>
            </div>
        </div>
    </section>
);
