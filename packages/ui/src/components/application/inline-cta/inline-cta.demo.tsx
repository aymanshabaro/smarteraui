"use client";

import type { ReactNode } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { LayersTwo02, Mail01 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { VisaIcon } from "@/components/foundations/payment-icons";
import { IMAGES } from "@/utils/demo-assets";
import { InlineCTA } from "./inline-cta";

/** Matches the width the docs preview gives every inline CTA. Demo-only, not exported. */
const Wrapper = ({ children }: { children: ReactNode }) => <div className="w-full max-w-3xl">{children}</div>;

/** Announcement copy reused by the first three examples. Demo-only, not exported. */
const announcement = {
    title: "We've just released a new update!",
    description: "Check out the all new dashboard view. Pages and now load faster.",
};

export const InlineCTAExample = () => (
    <Wrapper>
        <InlineCTA {...announcement} image={IMAGES.landscape[0]}>
            <InlineCTA.Actions>
                <Button color="secondary" size="sm">
                    Dismiss
                </Button>
                <Button color="primary" size="sm">
                    Changelog
                </Button>
            </InlineCTA.Actions>
        </InlineCTA>
    </Wrapper>
);

export const Actions = () => (
    <Wrapper>
        <InlineCTA {...announcement}>
            <InlineCTA.Actions>
                <Button color="secondary" size="sm">
                    Dismiss
                </Button>
                <Button color="primary" size="sm">
                    Changelog
                </Button>
            </InlineCTA.Actions>
        </InlineCTA>
    </Wrapper>
);

export const EmailField = () => (
    <Wrapper>
        <InlineCTA {...announcement}>
            <Form onSubmit={(event) => event.preventDefault()} className="mt-5 flex flex-col gap-3 sm:w-full sm:max-w-100 sm:flex-row sm:items-end sm:gap-4">
                <div className="flex-1">
                    <Input
                        isRequired
                        hideRequiredIndicator
                        name="email"
                        type="email"
                        size="md"
                        icon={Mail01}
                        label="Subscribe to updates"
                        placeholder="you@smartera.com"
                    />
                </div>
                <Button type="submit" color="primary" size="md">
                    Subscribe
                </Button>
            </Form>
        </InlineCTA>
    </Wrapper>
);

export const ChangePlan = () => (
    <Wrapper>
        <InlineCTA title="Change your plan" description="Flexible pricing that grows with you.">
            <InlineCTA.Panel className="overflow-hidden p-0">
                <div className="border-secondary flex items-center gap-3 border-b py-3 ps-4 pe-5">
                    <FeaturedIcon size="sm" theme="light" color="brand" icon={LayersTwo02} />
                    <span className="text-md text-secondary font-semibold">Basic plan</span>
                </div>

                <div className="flex flex-col p-4">
                    <div className="flex flex-col gap-1">
                        <p className="flex items-baseline gap-1">
                            <span className="text-display-sm text-secondary font-semibold">$10</span>
                            <span className="text-tertiary text-sm">per month</span>
                        </p>
                        <p className="text-tertiary text-sm">Includes up to 10 users, 20 GB individual data and access to all features.</p>
                    </div>

                    <InlineCTA.Actions className="flex-row">
                        <Button color="secondary" size="sm">
                            Learn more
                        </Button>
                        <Button color="primary" size="sm">
                            Upgrade plan
                        </Button>
                    </InlineCTA.Actions>
                </div>
            </InlineCTA.Panel>
        </InlineCTA>
    </Wrapper>
);

export const UpgradePlan = () => (
    <Wrapper>
        <InlineCTA title="Upgrade your plan" description="Need more space? Upgrade your plan today.">
            <InlineCTA.FeatureList>
                <InlineCTA.Feature title="10 users" description="Add up to 10 team members." />
                <InlineCTA.Feature title="20 GB data" description="Up to 20 GB individual data." />
                <InlineCTA.Feature title="All features" description="Access to advanced features and analytics." />
            </InlineCTA.FeatureList>

            <InlineCTA.Actions>
                <Button color="secondary" size="sm">
                    All plans
                </Button>
                <Button color="primary" size="sm">
                    Upgrade plan
                </Button>
            </InlineCTA.Actions>
        </InlineCTA>
    </Wrapper>
);

export const PaymentMethod = () => (
    <Wrapper>
        <InlineCTA title="Payment method" description="Change how you pay for your plan.">
            <InlineCTA.Panel className="flex gap-3">
                <VisaIcon aria-label="Visa" role="img" className="h-8 w-11.5" />

                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex justify-between gap-2">
                        <div>
                            <p className="text-secondary text-sm font-medium">Visa ending in 1234</p>
                            <p className="text-tertiary text-sm">Expiry 06/2028</p>
                        </div>

                        <Button color="secondary" size="sm" className="max-md:hidden">
                            Edit
                        </Button>
                        <Button color="link-gray" size="sm" className="md:hidden">
                            Edit
                        </Button>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Mail01 aria-hidden="true" className="text-fg-quaternary size-4" />
                        <span className="text-tertiary text-sm">billing@smartera.com</span>
                    </div>
                </div>
            </InlineCTA.Panel>
        </InlineCTA>
    </Wrapper>
);

export const Receipt = () => (
    <Wrapper>
        <InlineCTA title="Your latest receipt is available" description="Download receipt for January 2027.">
            <InlineCTA.Panel className="flex flex-col gap-5 sm:flex-row sm:gap-4">
                <div className="flex flex-1 items-start gap-3">
                    {/* Two-tone asset: the file icon ships a light and a dark artwork, so it is swapped rather than tokenized. */}
                    <FileIcon aria-hidden="true" type="pdf" theme="light" className="size-10 dark:hidden" />
                    <FileIcon aria-hidden="true" type="pdf" theme="dark" className="size-10 not-dark:hidden" />

                    <div>
                        <p className="text-secondary text-sm font-medium">Receipt_January_2027.pdf</p>
                        <p className="text-tertiary text-sm">200 KB</p>
                    </div>
                </div>

                <InlineCTA.Actions className="mt-0">
                    <Button color="secondary" size="sm">
                        Download
                    </Button>
                    <Button color="primary" size="sm">
                        View
                    </Button>
                </InlineCTA.Actions>
            </InlineCTA.Panel>
        </InlineCTA>
    </Wrapper>
);
