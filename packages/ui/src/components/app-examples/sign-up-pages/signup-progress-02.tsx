"use client";

import { ProgressSteps } from "@/components/application/progress-steps/progress-steps";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { SetPasswordForm } from "./base-components/sign-up-form";
import { signUpSteps } from "./base-components/steps";

/** Choose password step with a featured-icon step tracker that stacks below the tablet breakpoint. */
export const SignupProgress02 = () => {
    const isDesktop = useBreakpoint("md");

    return (
        <section className="bg-primary flex min-h-screen flex-col items-center justify-between gap-12 overflow-hidden px-4 py-12 md:px-8 md:pt-24 md:pb-16">
            <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
                <div className="flex flex-col items-center gap-6 text-center md:gap-8">
                    <ProperLogoMinimal className="relative size-8" />

                    <div className="z-10 flex flex-col gap-2 md:gap-3">
                        <h1 className="text-primary md:text-display-xs text-xl font-semibold">Choose a password</h1>
                        <p className="text-tertiary text-md">Must be at least 8 characters.</p>
                    </div>
                </div>

                <SetPasswordForm className="z-10" />
            </div>

            <div className="mx-auto w-full max-w-5xl md:px-8">
                <ProgressSteps items={signUpSteps} type="featured-icon" aria-label="Sign up progress" orientation={isDesktop ? "horizontal" : "vertical"} />
            </div>
        </section>
    );
};
