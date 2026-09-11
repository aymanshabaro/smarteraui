"use client";

import { Tabs } from "../../application/tabs/tabs";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";
import { LogInPrompt } from "./base-components/page-parts";
import { SignUpForm } from "./base-components/sign-up-form";

/** Centred account sign up with a sign up / log in switch and a live password checklist. */
export const SignupSimple = () => (
    <section className="bg-primary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-6 text-center">
                <ProperLogoMinimal className="relative z-10 size-8 origin-center scale-[1.2]" />

                <div className="z-10 flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Create an account</h1>
                    <p className="text-tertiary text-md">Start your 30-day free trial.</p>
                </div>

                <Tabs defaultSelectedKey="signup" className="z-10">
                    <Tabs.List fullWidth type="button-minimal" aria-label="Authentication mode">
                        <Tabs.Item id="signup" label="Sign up" />
                        <Tabs.Item id="login" label="Log in" />
                    </Tabs.List>
                    <Tabs.Panel id="signup" />
                    <Tabs.Panel id="login" />
                </Tabs>
            </div>

            <SignUpForm passwordHint="checklist" className="z-10" />

            <LogInPrompt />
        </div>
    </section>
);
