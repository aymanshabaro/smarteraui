import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";
import { LogInPrompt } from "./base-components/page-parts";
import { SignUpForm } from "./base-components/sign-up-form";

/** Account signup whose heading sits on the page ground while the form floats on its own card. */
export const SignupCardSeparated = () => (
    <section className="bg-secondary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-110">
            <div className="flex flex-col items-center gap-6 text-center">
                <ProperLogoMinimal className="relative size-8" />

                <div className="z-10 flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Create an account</h1>
                    <p className="text-tertiary text-md">Start your 30-day free trial.</p>
                </div>
            </div>

            <SignUpForm className="bg-primary relative z-10 -mx-4 px-4 py-8 sm:mx-0 sm:rounded-2xl sm:px-10 sm:shadow-sm" />

            <LogInPrompt className="z-10" />
        </div>
    </section>
);
