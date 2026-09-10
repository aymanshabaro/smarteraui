"use client";

import { Tab, TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";

/** Log in page topped by a slim marketing header that carries the logo and the sign up prompt. */
export const LoginSimpleHeaderNavigation = () => (
    <>
        <header className="bg-primary hidden md:block">
            <div className="max-w-container mx-auto flex h-18 items-center justify-between px-8">
                <ProperLogo />

                <div className="flex items-center gap-1">
                    <span className="text-tertiary text-md">Don&apos;t have an account?</span>
                    <Button href="/signup" color="link-color" size="md">
                        Sign up
                    </Button>
                </div>
            </div>
        </header>

        <section className="bg-primary min-h-screen px-4 py-12 md:px-8 md:pt-24">
            <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
                <div className="flex flex-col items-center gap-6 text-center">
                    <ProperLogoMinimal className="size-8 origin-center scale-[1.2] md:hidden" />

                    <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in to your account</h1>
                        <p className="text-tertiary text-md">Welcome back! Please enter your details.</p>
                    </div>

                    <Tabs defaultSelectedKey="login">
                        <TabList fullWidth type="button-border" aria-label="Authentication mode">
                            <Tab id="signup" label="Sign up" />
                            <Tab id="login" label="Log in" />
                        </TabList>
                        <Tabs.Panel id="signup" />
                        <Tabs.Panel id="login" />
                    </Tabs>
                </div>

                <Form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5">
                        <Input isRequired size="lg" name="email" type="email" label="Email" placeholder="Enter your email" />
                        <Input
                            isRequired
                            size="lg"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••••••"
                            inputClassName="placeholder:text-placeholder/50"
                        />
                    </div>

                    <div className="flex items-center">
                        <Checkbox name="remember" label="Remember for 30 days" />
                        <Button href="/forgot-password" color="link-color" size="md" className="ms-auto">
                            Forgot password
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button type="submit" size="lg">
                            Sign in
                        </Button>
                        <SocialButton social="google" size="lg">
                            Sign in with Google
                        </SocialButton>
                    </div>
                </Form>

                <div className="flex justify-center text-center">
                    <Button href="/sso" color="link-color" size="md" className="hidden md:flex">
                        Continue with SAML SSO
                    </Button>

                    <div className="flex gap-1 md:hidden">
                        <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                        <Button href="/signup" color="link-color" size="md">
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </>
);
