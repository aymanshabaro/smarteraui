import { ContentDivider } from "../../application/content-divider/content-divider";
import { Button } from "../../base/buttons/button";
import { SocialButton } from "../../base/buttons/social-button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";
import { LogInPrompt } from "./base-components/page-parts";

/** Centred sign up that captures an email first and offers three social providers below the fold. */
export const SignupSimpleSocialLogins = () => (
    <section className="bg-primary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-6 text-center">
                <ProperLogoMinimal className="relative z-10 size-8 origin-center scale-[1.2]" />

                <div className="z-10 flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Create an account</h1>
                    <p className="text-tertiary text-md">Start your 30-day free trial.</p>
                </div>
            </div>

            <Form className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" />
                    <Button type="submit" size="lg">
                        Get started
                    </Button>
                </div>

                <ContentDivider>
                    <span className="text-tertiary text-sm font-medium">OR</span>
                </ContentDivider>

                <div className="flex flex-col gap-3">
                    <SocialButton social="google" theme="color" size="lg">
                        Sign up with Google
                    </SocialButton>
                    <SocialButton social="facebook" theme="color" size="lg">
                        Sign up with Facebook
                    </SocialButton>
                    <SocialButton social="apple" theme="color" size="lg">
                        Sign up with Apple
                    </SocialButton>
                </div>
            </Form>

            <LogInPrompt />
        </div>
    </section>
);
