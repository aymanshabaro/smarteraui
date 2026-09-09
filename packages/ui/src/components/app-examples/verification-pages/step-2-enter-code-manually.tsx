"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Mail01 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { PinInput, type PinInputSize } from "@/components/base/input/pin-input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { AVATARS } from "@/utils/demo-assets";

/**
 * The verification code field. Rendered twice so the slots can shrink on mobile —
 * `PinInput` takes a fixed `size`, so the breakpoint switch happens here.
 */
const CodeField = ({ size, className }: { size: PinInputSize; className?: string }) => (
    <div className={className}>
        <PinInput size={size}>
            <PinInput.Label className="sr-only">Verification code</PinInput.Label>
            <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
            </PinInput.Group>
            <PinInput.Description className="sr-only">Enter the 4-digit code from the email we sent you.</PinInput.Description>
        </PinInput>
    </div>
);

/** Step 2 of the email verification flow: type the 4-digit code by hand. */
export const Step2EnterCodeManually = () => (
    <section className="bg-primary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
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

            <div className="flex flex-col items-center gap-6 md:gap-8">
                <CodeField size="sm" className="md:hidden" />
                <CodeField size="md" className="max-md:hidden" />

                <div className="w-full">
                    <Button href="#" size="lg" className="w-full">
                        Verify email
                    </Button>
                </div>
            </div>

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
