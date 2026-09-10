"use client";

import { ArrowLeft, Key01 } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

/** Step 1 of the password reset flow: ask for the account email. */
export const Step1ForgotPassword = () => (
    <section className="bg-primary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full max-w-90 flex-col gap-8">
            <div className="flex flex-col items-center gap-6 text-center">
                <FeaturedIcon icon={Key01} size="lg" theme="modern" color="gray" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Forgot password?</h1>
                    <p className="text-tertiary text-md self-stretch">No worries, we&apos;ll send you reset instructions.</p>
                </div>
            </div>

            <Form className="flex flex-col gap-6">
                <Input isRequired hideRequiredIndicator size="lg" type="email" name="email" label="Email" placeholder="Enter your email" />

                <div className="flex flex-col gap-4">
                    <Button type="submit" size="lg">
                        Reset password
                    </Button>
                </div>
            </Form>

            <div className="flex justify-center gap-1 text-center">
                <Button href="#" size="md" color="link-gray" iconLeading={ArrowLeft} className="mx-auto">
                    Back to log in
                </Button>
            </div>
        </div>
    </section>
);
