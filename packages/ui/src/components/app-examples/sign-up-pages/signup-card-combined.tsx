import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";
import { LogInPrompt } from "./base-components/page-parts";
import { SignUpForm } from "./base-components/sign-up-form";

/** Free trial signup where heading, form and log in prompt share one elevated card. */
export const SignupCardCombined = () => (
    <section className="bg-primary sm:bg-secondary min-h-screen px-4 py-12 md:px-8 md:pt-24 md:pb-[270px]">
        <div className="bg-primary flex w-full flex-col gap-6 sm:mx-auto sm:max-w-110 sm:rounded-2xl sm:px-10 sm:py-8 sm:shadow-sm">
            <div className="flex flex-col items-center gap-6 text-center">
                <ProperLogoMinimal className="size-8" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Start your free trial</h1>
                    <p className="text-tertiary text-md">Sign up in less than 2 minutes.</p>
                </div>
            </div>

            <SignUpForm hasLabels={false} />

            <LogInPrompt />
        </div>
    </section>
);
