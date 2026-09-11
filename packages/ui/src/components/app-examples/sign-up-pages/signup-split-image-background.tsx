import { IMAGES } from "../../../utils/demo-assets";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";
import { LogInPrompt, SocialProofRow } from "./base-components/page-parts";
import { SignUpForm } from "./base-components/sign-up-form";

/** Split signup whose marketing half is a desaturated photo washed with the brand colour. */
export const SignupSplitImageBackground = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[880px_1fr]">
        <div className="bg-primary flex w-full justify-center px-4 py-12 md:items-center">
            <div className="flex max-w-90 flex-1 flex-col gap-8">
                <div className="flex flex-col gap-6 md:gap-8">
                    <ProperLogoMinimal className="size-8" />

                    <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="text-primary md:text-display-xs text-xl font-semibold">Sign up</h1>
                        <p className="text-tertiary text-md hidden md:block">Start your 30-day free trial.</p>
                        <p className="text-tertiary text-md md:hidden">Start turning your ideas into reality.</p>
                    </div>
                </div>

                <SignUpForm />

                <LogInPrompt />
            </div>
        </div>

        <div className="relative order-first hidden flex-1 justify-center px-8 pt-[170px] lg:flex">
            <img src={IMAGES.landscape[4].src} alt={IMAGES.landscape[4].alt} className="absolute inset-0 size-full object-cover saturate-0" />
            <div aria-hidden="true" className="bg-brand-section absolute inset-0 opacity-80" />

            <div className="z-10 flex h-max max-w-160 flex-col gap-12">
                <div className="dark-mode">
                    <ProperLogoMinimal className="size-20" />
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-display-xl text-primary_on-brand xl:text-display-2xl font-semibold! -tracking-[1.44px]">
                        Start turning your ideas into reality.
                    </h2>
                    <p className="text-tertiary_on-brand text-lg font-medium xl:text-xl">
                        Create a free account and get full access to all features for 30-days. No credit card needed. Trusted by over 4,000 professionals.
                    </p>
                </div>

                <SocialProofRow textClassName="text-primary_on-brand" />
            </div>
        </div>
    </section>
);
