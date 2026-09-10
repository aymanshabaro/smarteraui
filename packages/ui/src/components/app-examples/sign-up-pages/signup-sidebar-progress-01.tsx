"use client";

import { useState } from "react";
import { Building07, Passcode, Stars02, User01 } from "@properui/icons";
import { PaginationDot } from "@/components/application/pagination/pagination-dot";
import type { ProgressStepItem } from "@/components/application/progress-steps/progress-steps";
import { ProgressSteps } from "@/components/application/progress-steps/progress-steps";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { SupportFooter } from "./base-components/page-parts";
import { SetPasswordForm } from "./base-components/sign-up-form";

const steps: ProgressStepItem[] = [
    { id: "details", title: "Your details", description: "Please provide your name and email", icon: User01 },
    { id: "company", title: "Company details", description: "A few details about your company", icon: Building07 },
    { id: "password", title: "Choose a password", description: "Choose a secure password", icon: Passcode, status: "current" },
    { id: "socials", title: "Add your socials", description: "Share posts to your social accounts", icon: Stars02 },
];

/** Set password step with a persistent step sidebar on the left of the desktop layout. */
export const SignupSidebarProgress01 = () => {
    const [page, setPage] = useState(3);

    return (
        <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-[384px_1fr]">
            <div className="bg-secondary hidden max-w-96 flex-1 flex-col justify-between gap-20 lg:flex">
                <div className="flex flex-col gap-16 px-8 pt-8">
                    <ProperLogo />

                    <ProgressSteps items={steps} type="featured-icon" orientation="vertical" aria-label="Sign up progress" />
                </div>

                <SupportFooter className="mt-auto px-8 pt-11 pb-8" />
            </div>

            <div className="flex h-full w-full flex-1 overflow-hidden py-12 md:pt-40 md:pb-24">
                <div className="flex h-full w-full flex-col items-center gap-8 px-4 md:grow-0 md:gap-20 md:px-8">
                    <div className="flex w-full flex-col gap-8 sm:max-w-90">
                        <div className="flex flex-col items-center gap-6 text-center md:gap-8">
                            <FeaturedIcon size="xl" theme="modern" color="gray" icon={Passcode} />

                            <div className="z-10 flex flex-col gap-2 md:gap-3">
                                <h1 className="text-primary md:text-display-xs text-xl font-semibold">Choose a password</h1>
                                <p className="text-tertiary text-md">Must be at least 8 characters.</p>
                            </div>
                        </div>

                        <SetPasswordForm hasHint className="z-10" />
                    </div>

                    <div className="mt-auto md:mt-0">
                        <PaginationDot page={page} total={4} onPageChange={setPage} />
                    </div>
                </div>
            </div>
        </section>
    );
};
