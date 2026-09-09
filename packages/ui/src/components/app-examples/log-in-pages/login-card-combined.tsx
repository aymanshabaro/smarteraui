import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";

/** Welcome-back card that keeps the heading, unlabelled fields and footer inside one raised panel. */
export const LoginCardCombined = () => (
    <section className="bg-primary sm:bg-secondary min-h-screen px-4 py-12 md:px-8 md:pt-24">
        <div className="bg-primary flex w-full flex-col gap-6 sm:mx-auto sm:max-w-110 sm:rounded-2xl sm:px-10 sm:py-8 sm:shadow-sm">
            <div className="flex flex-col items-center gap-6 text-center">
                <SmarteraLogoMinimal className="size-8 origin-center scale-[1.2]" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Welcome back</h1>
                    <p className="text-tertiary text-md">Please enter your details.</p>
                </div>
            </div>

            <Form className="flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                    <Input isRequired size="lg" name="email" type="email" aria-label="Enter your email" placeholder="Enter your email" />
                    <Input
                        isRequired
                        size="lg"
                        name="password"
                        type="password"
                        aria-label="Enter your password"
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
