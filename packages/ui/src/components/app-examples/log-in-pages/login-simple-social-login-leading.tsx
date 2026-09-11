import { Button } from "../../base/buttons/button";
import { SocialButton } from "../../base/buttons/social-button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";

/** Compact log in page that leads with the social provider and offers email as the fallback. */
export const LoginSimpleSocialLoginLeading = () => (
    <section className="bg-primary relative min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col items-center gap-6 text-center md:gap-3">
                <ProperLogoMinimal className="size-8 origin-center scale-[1.2]" />
                <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in to your account</h1>
            </div>

            <Form className="flex flex-col gap-6">
                <SocialButton social="google" size="lg">
                    Continue with Google
                </SocialButton>

                <div aria-hidden="true" className="border-secondary h-px w-full border-t" />

                <div className="flex flex-col gap-4">
                    <Input isRequired size="lg" name="email" type="email" aria-label="Enter your email" placeholder="Enter your email" />
                    <Button type="submit" size="lg">
                        Continue with email
                    </Button>
                </div>
            </Form>

            <div className="flex justify-center text-center">
                <Button href="/sso" color="link-color" size="md">
                    Continue with SAML SSO
                </Button>
            </div>
        </div>
    </section>
);
