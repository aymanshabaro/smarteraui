"use client";

import { ArrowLeft, Flag05, Key01, Mail01, Passcode, Stars02, User01 } from "@properui/icons";
import { PaginationDot } from "@/components/application/pagination/pagination-dot";
import { type ProgressStepItem, ProgressSteps } from "@/components/application/progress-steps/progress-steps";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";

/** The onboarding checklist shown beside the reset form; the password step is the one in progress. */
const steps: ProgressStepItem[] = [
    { id: "details", title: "Your details", description: "Please provide your name and email", icon: User01 },
    { id: "company", title: "Company details", description: "A few details about your company", icon: Flag05 },
    { id: "password", title: "Choose a password", description: "Choose a secure password", icon: Passcode, status: "current" },
    { id: "socials", title: "Add your socials", description: "Share posts to your social accounts", icon: Stars02 },
];

/** The password reset form on a two-column layout with a progress sidebar. */
export const StepSidebarVersion = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-[384px_1fr]">
        <div className="bg-secondary hidden flex-1 flex-col md:flex">
            <div className="flex flex-col gap-16 px-8 pt-8">
                <ProperLogo />

                <ProgressSteps items={steps} type="featured-icon" orientation="vertical" connector="solid" aria-label="Account setup progress" />
            </div>

            <footer className="mt-auto flex items-center justify-between p-8">
                <p className="text-tertiary text-sm">© Proper UI 2077</p>
                <span className="flex items-center justify-center gap-2">
                    <Mail01 aria-hidden="true" className="text-fg-quaternary size-4" />
                    <p className="text-tertiary text-sm">help@proper.example</p>
                </span>
            </footer>
        </div>

        <div className="flex flex-1 px-4 py-12 md:px-8 md:pt-40">
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

                <div className="mx-auto">
                    <PaginationDot size="lg" page={3} total={4} />
                </div>
            </div>
        </div>
    </section>
);
