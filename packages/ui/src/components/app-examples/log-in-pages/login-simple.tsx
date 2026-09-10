"use client";

import { Tab, TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";

/** Centred log in page with a sign up / log in segmented switch above the credential form. */
export const LoginSimple = () => (
    <section className="bg-primary relative min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-6 text-center">
                <ProperLogoMinimal className="size-8 origin-center scale-[1.2]" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in to your account</h1>
                    <p className="text-tertiary text-md self-stretch p-0">Welcome back! Please enter your details.</p>
                </div>

                <Tabs defaultSelectedKey="login">
                    <TabList fullWidth type="button-minimal" aria-label="Authentication mode">
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

            <div className="flex justify-center gap-1 text-center">
                <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                <Button href="/signup" color="link-color" size="md">
                    Sign up
                </Button>
            </div>
        </div>
    </section>
);
