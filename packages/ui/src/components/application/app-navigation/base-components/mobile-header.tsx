"use client";

import type { PropsWithChildren, ReactNode } from "react";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { X as CloseIcon, Menu02 } from "@properui/icons";
import { cx } from "../../../../utils/cx";
import { ProperLogo } from "../../../foundations/logo/proper-logo";

/** Override English aria-labels used by `MobileNavigationHeader`. */
export interface MobileNavigationHeaderLabels {
    /** Label for the `<nav>` landmark wrapping the mobile header. @default "Mobile navigation" */
    nav?: string;
    /** Label for the button that opens the navigation menu. @default "Expand navigation menu" */
    expand?: string;
    /** Label for the button that closes the navigation menu. @default "Close navigation menu" */
    close?: string;
    /** Label for the menu `Dialog` itself. @default "Navigation menu" */
    dialog?: string;
}

export interface MobileNavigationHeaderProps extends PropsWithChildren {
    /** Logo rendered in the mobile header bar. @default <ProperLogo> */
    logo?: ReactNode;
    /** Override the component's English aria-labels. */
    labels?: MobileNavigationHeaderLabels;
}

export const MobileNavigationHeader = ({ children, logo = <ProperLogo className="h-6" />, labels }: MobileNavigationHeaderProps) => {
    const navLabel = labels?.nav ?? "Mobile navigation";
    const expandLabel = labels?.expand ?? "Expand navigation menu";
    const closeLabel = labels?.close ?? "Close navigation menu";
    const dialogLabel = labels?.dialog ?? "Navigation menu";

    return (
        <AriaDialogTrigger>
            {/*
             * Deviation from the reference: the `<header>` is wrapped in a labelled `<nav>`.
             * The mobile and desktop headers are both in the DOM at once (they are toggled with
             * CSS only), which would otherwise expose two unnamed `banner` landmarks to
             * assistive tech. Nesting inside `<nav>` scopes this one out of `banner`.
             */}
            <nav aria-label={navLabel} className="lg:hidden">
                <header className="border-secondary bg-primary flex h-14 items-center justify-between border-b p-3 ps-4">
                    {logo}

                    <AriaButton
                        aria-label={expandLabel}
                        className="group bg-primary text-fg-secondary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary_hover flex items-center justify-center rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <Menu02 aria-hidden="true" className="size-6 transition duration-200 ease-in-out group-aria-expanded:opacity-0" />
                        <CloseIcon
                            aria-hidden="true"
                            className="absolute size-6 opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100"
                        />
                    </AriaButton>
                </header>
            </nav>

            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    cx(
                        "bg-overlay/70 fixed inset-0 z-50 cursor-pointer pe-16 backdrop-blur-md lg:hidden",
                        isEntering && "animate-in fade-in duration-300 ease-in-out",
                        isExiting && "animate-out fade-out duration-200 ease-in-out",
                    )
                }
            >
                {({ state }) => (
                    <>
                        <AriaButton
                            aria-label={closeLabel}
                            onPress={() => state.close()}
                            className="text-fg-white/70 outline-focus-ring hover:text-fg-white fixed end-3 top-2.5 flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <CloseIcon aria-hidden="true" className="size-6" />
                        </AriaButton>

                        <AriaModal className="w-full max-w-74 cursor-auto will-change-transform">
                            <AriaDialog aria-label={dialogLabel} className="h-dvh outline-hidden focus:outline-hidden">
                                {children}
                            </AriaDialog>
                        </AriaModal>
                    </>
                )}
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
};
