"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { Alert, type AlertProps } from "./alerts";

/** Copy + actions shared by the floating and full-width demos of each color. Demo-only, not exported. */
const content: Record<NonNullable<AlertProps["color"]>, { title: string; description: string; confirmLabel: string }> = {
    default: {
        title: "We've just released a new update!",
        description: "Check out the all new dashboard view. Pages and exports now load faster.",
        confirmLabel: "Changelog",
    },
    brand: {
        title: "Introducing the new dashboard",
        description: "Track usage, exports and members from a single place.",
        confirmLabel: "Take a tour",
    },
    gray: {
        title: "Your trial ends in 7 days",
        description: "Upgrade before 12 January to keep access to every feature.",
        confirmLabel: "Upgrade plan",
    },
    error: {
        title: "We couldn't process your payment",
        description: "The card ending in 1234 was declined. Update your billing details to try again.",
        confirmLabel: "Update details",
    },
    warning: {
        title: "You're approaching your data limit",
        description: "You've used 18 GB of the 20 GB on your plan. Add storage to keep syncing.",
        confirmLabel: "Add storage",
    },
    success: {
        title: "Your changes were published",
        description: "The new dashboard layout is now live for everyone on your team.",
        confirmLabel: "View dashboard",
    },
};

/** Renders one alert of the given layout/color with the shared demo copy. Demo-only, not exported. */
const AlertDemo = ({ layout, color }: Pick<AlertProps, "layout" | "color">) => {
    const { title, description, confirmLabel } = content[color ?? "default"];

    return (
        <Alert
            isDismissable
            layout={layout}
            color={color}
            title={title}
            description={description}
            actions={
                <>
                    <Button color="link-gray" size="sm">
                        Dismiss
                    </Button>
                    <Button color="link-color" size="sm">
                        {confirmLabel}
                    </Button>
                </>
            }
        />
    );
};

/** Centers a floating alert the way the docs preview does. Demo-only, not exported. */
const FloatingWrapper = ({ children }: { children: ReactNode }) => <div className="flex w-full max-w-lg flex-col">{children}</div>;

/** Lets a full-width alert stretch edge to edge. Demo-only, not exported. */
const FullWidthWrapper = ({ children }: { children: ReactNode }) => <div className="flex w-full flex-col">{children}</div>;

export const AlertExample = () => (
    <FloatingWrapper>
        <AlertDemo layout="floating" color="gray" />
    </FloatingWrapper>
);

export const FloatingDefault = () => (
    <FloatingWrapper>
        <AlertDemo layout="floating" color="default" />
    </FloatingWrapper>
);

export const FloatingBrand = () => (
    <FloatingWrapper>
        <AlertDemo layout="floating" color="brand" />
    </FloatingWrapper>
);

export const FloatingGray = () => (
    <FloatingWrapper>
        <AlertDemo layout="floating" color="gray" />
    </FloatingWrapper>
);

export const FloatingError = () => (
    <FloatingWrapper>
        <AlertDemo layout="floating" color="error" />
    </FloatingWrapper>
);

export const FloatingWarning = () => (
    <FloatingWrapper>
        <AlertDemo layout="floating" color="warning" />
    </FloatingWrapper>
);

export const FloatingSuccess = () => (
    <FloatingWrapper>
        <AlertDemo layout="floating" color="success" />
    </FloatingWrapper>
);

export const FullWidthDefault = () => (
    <FullWidthWrapper>
        <AlertDemo layout="full-width" color="default" />
    </FullWidthWrapper>
);

export const FullWidthBrand = () => (
    <FullWidthWrapper>
        <AlertDemo layout="full-width" color="brand" />
    </FullWidthWrapper>
);

export const FullWidthGray = () => (
    <FullWidthWrapper>
        <AlertDemo layout="full-width" color="gray" />
    </FullWidthWrapper>
);

export const FullWidthError = () => (
    <FullWidthWrapper>
        <AlertDemo layout="full-width" color="error" />
    </FullWidthWrapper>
);

export const FullWidthWarning = () => (
    <FullWidthWrapper>
        <AlertDemo layout="full-width" color="warning" />
    </FullWidthWrapper>
);

export const FullWidthSuccess = () => (
    <FullWidthWrapper>
        <AlertDemo layout="full-width" color="success" />
    </FullWidthWrapper>
);
