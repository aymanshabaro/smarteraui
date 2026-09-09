"use client";

import { ProgressSteps } from "@/components/application/progress-steps/progress-steps";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { SetPasswordForm } from "./base-components/sign-up-form";
import { signUpStepsVerbose } from "./base-components/steps";

/** Choose password step tracked by a full-width row of underline progress bars. */
export const SignupProgress03 = () => {
    const isDesktop = useBreakpoint("md");

    return (
        <section className="bg-primary flex min-h-screen flex-col items-center justify-between gap-12 overflow-hidden px-4 py-12 md:px-8 md:pt-24 md:pb-16">
            <div className="mx-auto flex w-full flex-col gap-8 md:max-w-90">
                <div className="flex flex-col items-center gap-6 text-center md:gap-8">
                    <SmarteraLogoMinimal className="relative size-8" />

                    <div className="z-10 flex flex-col gap-2 md:gap-3">
                        <h1 className="text-primary md:text-display-xs text-xl font-semibold">Choose a password</h1>
                        <p className="text-tertiary text-md">Must be at least 8 characters.</p>
                    </div>
                </div>

                <SetPasswordForm hasHint />
            </div>

            <div className="max-w-container mx-auto w-full md:px-8">
                <ProgressSteps items={signUpStepsVerbose} type="line" aria-label="Sign up progress" orientation={isDesktop ? "horizontal" : "vertical"} />
            </div>
        </section>
    );
};
