import { ContentDivider } from "../../application/content-divider/content-divider";
import { Button } from "../../base/buttons/button";
import { SocialButton } from "../../base/buttons/social-button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";

/** Passwordless log in page: an email capture, an "OR" divider and a stack of social providers. */
export const LoginSimpleSocialLogins = () => (
    <section className="bg-primary relative min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="relative mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-6 text-center">
                <ProperLogoMinimal className="size-8 origin-center scale-[1.2]" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in to your account</h1>
                    <p className="text-tertiary text-md">Welcome back! Please enter your details.</p>
                </div>
            </div>

            <Form className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <Input isRequired size="lg" name="email" type="email" aria-label="Enter your email" placeholder="Enter your email" />
                    <Button type="submit" size="lg">
                        Continue with email
                    </Button>
                </div>

                <ContentDivider>
                    <span className="text-tertiary text-sm font-medium">OR</span>
                </ContentDivider>

                <div className="flex flex-col gap-3">
                    <SocialButton social="google" theme="color" size="lg">
                        Continue with Google
                    </SocialButton>
                    <SocialButton social="facebook" theme="color" size="lg">
                        Continue with Facebook
                    </SocialButton>
                    <SocialButton social="apple" theme="color" size="lg">
                        Continue with Apple
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
