"use client";

import { ArrowLeft, Lock01 } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

/** The rules the new password has to satisfy, shown under the fields. */
const requirements = ["Must be at least 8 characters", "Must contain one special character"];

/** The 10×8 tick used inside the requirement bullets — smaller than any icon in the set. */
const RequirementCheck = () => (
    <svg aria-hidden="true" width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M8.333 1.5 3.75 6.083 1.667 4" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Step 3 of the password reset flow: choose and confirm the new password. */
export const Step3SetNewPassword = () => (
    <section className="bg-primary min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
        <div className="mx-auto flex w-full max-w-90 flex-col gap-8">
            <div className="flex flex-col items-center gap-6 text-center">
                <FeaturedIcon icon={Lock01} size="lg" theme="modern" color="gray" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <h1 className="text-primary md:text-display-xs text-xl font-semibold">Set new password</h1>
                    <p className="text-tertiary text-md">Your new password must be different to previously used passwords.</p>
                </div>
            </div>

            <Form className="flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                    <Input
                        isRequired
                        hideRequiredIndicator
                        size="lg"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="••••••••••••"
                        minLength={8}
                        pattern={String.raw`.*[!@#$%^&*(),.?":{}|<>].*`}
                        inputClassName="placeholder:text-placeholder/50"
                    />
                    <Input
                        isRequired
                        hideRequiredIndicator
                        size="lg"
                        type="password"
                        name="password_confirm"
                        label="Confirm password"
                        placeholder="••••••••••••"
                        inputClassName="placeholder:text-placeholder/50"
                    />

                    <ul className="flex flex-col gap-3">
                        {requirements.map((requirement) => (
                            <li key={requirement} className="flex gap-2">
                                <span className="bg-utility-neutral-300 text-fg-white flex size-5 items-center justify-center rounded-full transition duration-150 ease-in-out">
                                    <RequirementCheck />
                                </span>
                                <p className="text-tertiary text-sm">{requirement}</p>
                            </li>
                        ))}
                    </ul>
                </div>

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
