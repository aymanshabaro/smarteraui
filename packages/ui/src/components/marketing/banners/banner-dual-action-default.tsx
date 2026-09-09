import { CheckVerified03 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";

/** A consent banner with a verified icon, a policy link and a decline / allow action pair. Default palette, floating card layout. */
export const BannerDualActionDefault = () => (
    <section className="bg-secondary ring-secondary_alt relative mx-2 mb-4 flex flex-col gap-4 rounded-xl p-4 shadow-lg ring-1 md:m-0 md:flex-row md:items-center md:gap-3 md:py-3 md:ps-5 md:pe-3">
        <div className="flex flex-1 flex-col gap-3 md:w-0 md:flex-row md:items-center md:gap-2">
            <CheckVerified03 aria-hidden="true" className="text-fg-brand-primary_alt size-5" />

            <div className="flex flex-col gap-2 overflow-hidden lg:flex-row lg:gap-1.5">
                <p className="text-secondary pe-8 text-sm font-semibold md:truncate md:pe-0">
                    We use third-party cookies in order to personalise your experience
                </p>
                <p className="text-tertiary text-sm md:truncate">
                    Read our{" "}
                    <a
                        href="/cookie-policy"
                        className="decoration-utility-neutral-300 outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Cookie Policy
                    </a>
                    .
                </p>
            </div>
        </div>

        <div className="flex gap-2">
            <div className="flex w-full flex-col-reverse gap-2 md:flex-row md:gap-3">
                <Button size="sm" color="secondary">
                    Decline
                </Button>
                <Button size="sm">Allow</Button>
            </div>

            <div className="absolute end-2 top-2 flex shrink-0 items-center justify-center md:static">
                <CloseButton slot={null} size="sm" label="Dismiss" />
            </div>
        </div>
    </section>
);
