"use client";

import { ProgressSteps } from "@/components/application/progress-steps/progress-steps";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { SetPasswordForm } from "./base-components/sign-up-form";

/** Set password step whose progress is reduced to a row of connected dots at the page foot. */
export const SignupProgress01 = () => (
    <section className="bg-primary flex min-h-screen flex-1 flex-col items-center justify-between gap-12 overflow-hidden px-4 py-12 md:px-8 md:pt-24 md:pb-16">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-6 text-center md:gap-8">
                <SmarteraLogoMinimal className="relative size-8" />

                <div className="z-10 flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Choose a password</h1>
                    <p className="text-tertiary text-md">Must be at least 8 characters.</p>
                </div>
            </div>

            <SetPasswordForm className="z-10" />
        </div>

        <div className="z-10 mt-auto w-full">
            <ProgressSteps.Minimal
                connector="solid"
                aria-label="Sign up progress"
                items={["complete", "complete", "current", "incomplete"]}
                className="justify-center"
            />
        </div>
    </section>
);
