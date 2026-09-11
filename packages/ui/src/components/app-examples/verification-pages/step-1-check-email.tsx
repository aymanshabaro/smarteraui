"use client";

import { ArrowLeft, Mail01 } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

/** Step 1 of the email verification flow: confirm the link was sent and offer the manual-code fallback. */
export const Step1CheckEmail = () => (
    <section className="bg-primary flex min-h-screen flex-1 overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full max-w-90 flex-col gap-8">
            <div className="flex flex-col items-center gap-6 text-center">
                <FeaturedIcon icon={Mail01} size="lg" theme="modern" color="gray" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Check your email</h1>
                    <p className="text-tertiary text-md">
                        We sent a verification link to <span className="font-medium">{AVATARS[0].email}</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col">
                <Button size="lg">Enter code manually</Button>
            </div>

            <div className="flex justify-center gap-1 text-center">
                <Button href="#" size="md" color="link-gray" iconLeading={ArrowLeft} className="mx-auto">
                    Back to log in
                </Button>
            </div>
        </div>
    </section>
);
