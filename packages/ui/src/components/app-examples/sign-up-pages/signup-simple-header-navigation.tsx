"use client";

import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { LogInPrompt } from "./base-components/page-parts";
import { SignUpForm } from "./base-components/sign-up-form";

/** Create account page whose desktop layout moves the log in link into a slim page header. */
export const SignupSimpleHeaderNavigation = () => (
    <div className="bg-primary">
        <header className="bg-primary hidden md:block">
            <div className="max-w-container mx-auto flex h-18 items-center justify-between px-8">
                <SmarteraLogo />

                <div className="flex items-center gap-1">
                    <span className="text-tertiary text-sm">Already have an account?</span>
                    <Button href="/login" color="link-color" size="md">
                        Log in
                    </Button>
                </div>
            </div>
        </header>

        <section className="bg-primary min-h-screen px-4 py-12 md:px-8 md:pt-24">
            <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
                <div className="flex flex-col items-center gap-6 text-center">
                    <SmarteraLogoMinimal className="size-8 md:hidden" />

                    <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="text-primary md:text-display-xs text-xl font-semibold">Create an account</h1>
                        <p className="text-tertiary text-md">Start your 30-day free trial.</p>
                    </div>

                    <Tabs defaultSelectedKey="signup" className="z-10">
                        <Tabs.List fullWidth type="button-border" aria-label="Authentication mode">
                            <Tabs.Item id="signup" label="Sign up" />
                            <Tabs.Item id="login" label="Log in" />
                        </Tabs.List>
                        <Tabs.Panel id="signup" />
                        <Tabs.Panel id="login" />
                    </Tabs>
                </div>

                <SignUpForm className="gap-5 md:gap-6" />

                <div className="flex justify-center text-center">
                    <Button href="/sso" color="link-color" size="md">
                        Continue with SAML SSO
                    </Button>
                </div>

                <LogInPrompt className="z-10 md:hidden" />
            </div>
        </section>
    </div>
);
