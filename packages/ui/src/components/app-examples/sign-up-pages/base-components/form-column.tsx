import type { ReactNode } from "react";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { cx } from "@/utils/cx";
import { LogInPrompt, SupportFooter } from "./page-parts";
import { SignUpForm } from "./sign-up-form";

export interface SignUpFormColumnProps {
    /**
     * The page heading.
     *
     * @default "Sign up"
     */
    title?: string;
    /** The supporting copy under the heading, already wrapped in its own element. Pass `null` to omit it. */
    description?: ReactNode;
    /** The class name of the desktop-only logo header. Pass `undefined` to omit the header. */
    headerClassName?: string;
    /** The class name of the desktop-only support footer. Pass `undefined` to omit the footer. */
    footerClassName?: string;
    /** Extra classes for the scrolling body that centres the form. */
    bodyClassName?: string;
    /** Extra classes for the stack that holds the heading, form and log in prompt. */
    innerClassName?: string;
    /** The password field's placeholder. */
    passwordPlaceholder?: string;
    /** Rendered after the footer, e.g. the decorative arrow of the split arrow page. */
    children?: ReactNode;
    /** The class name applied to the column. */
    className?: string;
}

/**
 * The form half of every split sign up page: an optional logo header, the centred credential
 * form, and an optional support footer.
 */
export const SignUpFormColumn = ({
    title = "Sign up",
    description = <p className="text-tertiary text-md">Start your 30-day free trial.</p>,
    headerClassName,
    footerClassName,
    bodyClassName,
    innerClassName,
    passwordPlaceholder,
    children,
    className,
}: SignUpFormColumnProps) => (
    <div className={cx("bg-primary flex flex-col", className)}>
        {headerClassName && (
            <header className={headerClassName}>
                <SmarteraLogo />
            </header>
        )}

        <div className={cx("flex flex-1 justify-center px-4 py-12 md:items-center md:px-8", bodyClassName)}>
            <div className={cx("flex w-full flex-col gap-8 sm:max-w-90", innerClassName)}>
                <div className="flex flex-col gap-6">
                    <SmarteraLogoMinimal className="size-8 lg:hidden" />

                    <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="text-primary md:text-display-xs text-xl font-semibold">{title}</h1>
                        {description}
                    </div>
                </div>

                <SignUpForm passwordPlaceholder={passwordPlaceholder} />

                <LogInPrompt />
            </div>
        </div>

        {footerClassName && <SupportFooter className={footerClassName} />}

        {children}
    </div>
);
