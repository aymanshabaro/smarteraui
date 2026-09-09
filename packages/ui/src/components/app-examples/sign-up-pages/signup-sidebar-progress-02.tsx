"use client";

import { useState } from "react";
import { PaginationLine } from "@/components/application/pagination/pagination-line";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { cx } from "@/utils/cx";
import { SupportFooter } from "./base-components/page-parts";
import { SetPasswordForm } from "./base-components/sign-up-form";

// TODO(orchestrator): candidate for an `on-brand` colour scheme on `ProgressSteps` — the shared
// component only ships neutral/success indicators, which are invisible on `bg-brand-section`.
type BrandStep = { id: string; title: string; description: string; status: "complete" | "current" | "incomplete" };

const steps: BrandStep[] = [
    { id: "details", title: "Your details", description: "Please provide your name and email", status: "complete" },
    { id: "password", title: "Choose a password", description: "Choose a secure password", status: "current" },
    { id: "team", title: "Invite your team", description: "Start collaborating with your team", status: "incomplete" },
    { id: "socials", title: "Add your socials", description: "Share posts to your social accounts", status: "incomplete" },
];

/** The dotted rule drawn between two steps of the on-brand tracker. */
const DashedConnector = () => (
    <div className="relative my-1 flex h-full w-full justify-center self-center overflow-hidden">
        <svg aria-hidden="true" width="3" className="absolute">
            <line x1="1.2" y1="1.2" x2="1.2" y2="100%" strokeWidth="2.4" strokeDasharray="0,6" strokeLinecap="round" className="stroke-border-brand_alt" />
        </svg>
    </div>
);

/** A vertical step tracker coloured for the permanently brand-tinted sidebar. */
const BrandStepList = () => (
    <nav aria-label="Sign up progress" className="w-full">
        <ol className="grid w-full grid-cols-1 items-start justify-start">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                    <li
                        key={step.id}
                        aria-current={step.status === "current" ? "step" : undefined}
                        className={cx("flex h-max flex-row items-start justify-start gap-3", step.status === "incomplete" && "opacity-60")}
                    >
                        <div className="flex flex-col items-center self-stretch">
                            <span
                                className={cx(
                                    "z-10 flex size-6 shrink-0 items-center justify-center rounded-full",
                                    step.status === "incomplete"
                                        ? "text-primary_on-brand ring-brand_alt ring-[1.5px] ring-inset"
                                        : "bg-brand-solid text-fg-white",
                                )}
                            >
                                {step.status === "complete" ? (
                                    <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="size-3">
                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <span className="text-xs font-semibold">{index + 1}</span>
                                )}
                            </span>

                            {!isLast && <DashedConnector />}
                        </div>

                        <div className={cx("flex flex-col items-start pt-0.5", !isLast && "pb-6")}>
                            <p className="text-primary_on-brand text-sm font-semibold">{step.title}</p>
                            <p className="text-tertiary_on-brand text-sm">{step.description}</p>
                        </div>
                    </li>
                );
            })}
        </ol>
    </nav>
);

/** Choose password step whose sidebar is a permanently brand-tinted step tracker. */
export const SignupSidebarProgress02 = () => {
    const [page, setPage] = useState(2);

    return (
        <section className="bg-primary grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-[384px_1fr]">
            <div className="bg-brand-section hidden max-w-96 flex-col justify-between lg:flex">
                <div className="flex flex-col gap-16 px-8 pt-8">
                    <div className="dark-mode">
                        <SmarteraLogo />
                    </div>

                    <BrandStepList />
                </div>

                <SupportFooter onBrand className="hidden p-8 lg:flex" />
            </div>

            <div className="relative flex w-full flex-col items-center gap-8 px-4 py-12 md:px-8 lg:pt-40 lg:pb-24">
                <div className="flex w-full flex-col gap-8 sm:max-w-90">
                    <div className="flex flex-col items-center gap-6 text-center md:gap-8">
                        <SmarteraLogoMinimal className="relative size-8" />

                        <div className="z-10 flex flex-col gap-2 md:gap-3">
                            <h1 className="text-primary md:text-display-xs text-xl font-semibold">Choose a password</h1>
                            <p className="text-tertiary text-md">Must be at least 8 characters.</p>
                        </div>
                    </div>

                    <SetPasswordForm hasHint className="z-10" />
                </div>

                <div className="start-1/2 bottom-16 flex w-full justify-center sm:max-w-90 md:absolute md:mt-auto md:-translate-x-1/2">
                    <PaginationLine size="lg" page={page} total={4} onPageChange={setPage} className="w-full" />
                </div>
            </div>
        </section>
    );
};
