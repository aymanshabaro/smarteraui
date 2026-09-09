"use client";

import { ArrowLeft, CheckCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

/** Step 3 of the email verification flow: the address is confirmed and the user can continue. */
export const Step3Success = () => (
    <section className="bg-primary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full max-w-90 flex-col gap-8">
            <div className="flex flex-col items-center gap-6 text-center">
                <FeaturedIcon icon={CheckCircle} size="lg" theme="modern" color="gray" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Email verified</h1>
                    <p className="text-tertiary text-md">Your email has been successfully verified. Please click below to log in magically.</p>
                </div>
            </div>

            <Button href="#" size="lg" className="w-full">
                Continue
            </Button>

            <div className="flex flex-col items-center gap-8 text-center">
                <p className="flex gap-1">
                    <span className="text-tertiary text-sm">Didn&apos;t receive the email?</span>
                    <Button href="#" size="md" color="link-color">
                        Click to resend
                    </Button>
                </p>

                <Button href="#" size="md" color="link-gray" iconLeading={ArrowLeft} className="mx-auto">
                    Back to log in
                </Button>
            </div>
        </div>
    </section>
);
