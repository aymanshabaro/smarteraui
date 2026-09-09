import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";

/** Log in page whose form sits on its own raised card, separated from the heading and footer. */
export const LoginCardSeparated = () => (
    <section className="bg-secondary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-110">
            <div className="flex flex-col items-center gap-6 text-center">
                <SmarteraLogoMinimal className="size-8 origin-center scale-[1.2]" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in to your account</h1>
                    <p className="text-tertiary text-md">Welcome back! Please enter your details.</p>
                </div>
            </div>

            <div className="flex justify-center gap-1 text-center md:hidden">
                <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                <Button href="/signup" color="link-color" size="md">
                    Sign up
                </Button>
            </div>

            <Form className="bg-primary -mx-4 flex flex-col gap-6 px-4 py-8 sm:mx-0 sm:rounded-2xl sm:px-8 sm:shadow-sm">
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

            <div className="hidden justify-center gap-1 text-center md:flex">
                <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                <Button href="/signup" color="link-color" size="md">
                    Sign up
                </Button>
            </div>
        </div>
    </section>
);
