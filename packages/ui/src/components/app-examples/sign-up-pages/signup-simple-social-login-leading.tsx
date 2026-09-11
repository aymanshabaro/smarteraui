import { Button } from "../../base/buttons/button";
import { SocialButton } from "../../base/buttons/social-button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";

/** The shortest sign up page: Google first, a rule, then a single email field. */
export const SignupSimpleSocialLoginLeading = () => (
    <section className="bg-primary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-3 text-center">
                <ProperLogoMinimal className="relative z-10 size-8 origin-center scale-[1.2]" />

                <h1 className="text-primary md:text-display-xs z-10 text-xl font-semibold">Create an account</h1>
            </div>

            <Form className="z-10 flex flex-col gap-6">
                <div className="flex flex-col">
                    <SocialButton social="google" size="lg">
                        Sign up with Google
                    </SocialButton>
                </div>

                <div aria-hidden="true" className="border-secondary mb-2 h-px w-full border-t md:mb-0" />

                <div className="flex flex-col gap-4">
                    <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" />
                    <Button type="submit" size="lg">
                        Get started
                    </Button>
                </div>
            </Form>

            <div className="z-10 flex justify-center text-center">
                <Button href="/sso" color="link-color" size="md">
                    Continue with SAML SSO
                </Button>
            </div>
        </div>
    </section>
);
