import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";

/** Minimal log in page: a stacked, borderless email/password pair with no labels or checkbox. */
export const LoginSimpleMinimal = () => (
    <section className="bg-primary min-h-screen px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-8 text-center md:gap-16">
                <ProperLogo />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in to your account</h1>
                    <p className="text-tertiary text-md">Welcome back! Please enter your details.</p>
                </div>
            </div>

            <Form className="flex flex-col gap-6">
                <div className="-space-y-px">
                    <Input
                        isRequired
                        size="lg"
                        name="email"
                        type="email"
                        aria-label="Enter your email"
                        placeholder="Enter your email"
                        wrapperClassName="rounded-b-none focus-within:z-10"
                        inputClassName="autofill:rounded-b-none"
                    />
                    <Input
                        isRequired
                        size="lg"
                        name="password"
                        type="password"
                        aria-label="Enter your password"
                        placeholder="••••••••••••"
                        wrapperClassName="rounded-t-none focus-within:z-10"
                        inputClassName="autofill:rounded-t-none placeholder:text-placeholder/50"
                    />
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

            <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex gap-1">
                    <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                    <Button href="/signup" color="link-color" size="md">
                        Sign up
                    </Button>
                </div>
                <Button href="/forgot-password" color="link-color" size="md">
                    Forgot password
                </Button>
            </div>
        </div>
    </section>
);
