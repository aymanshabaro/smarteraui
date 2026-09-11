"use client";

// TODO(orchestrator): candidate for components/internal — the chrome shared by every
// `settings-pages-02` variant (header navigation, page container, form scaffolding).
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { Bell01, HelpCircle, Settings01, Zap } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { NavButton } from "../../application/app-navigation/base-components/nav-button";
import { HeaderNavigationBase } from "../../application/app-navigation/header-navigation";
import { Button } from "../../base/buttons/button";
import { DropdownAvatar } from "../../base/dropdown/dropdown-avatar";
import { Tooltip, TooltipTrigger } from "../../base/tooltip/tooltip";

/** Primary product navigation shown in the header of every settings page. */
export const productNavItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

/** Secondary navigation rendered under the product nav on the variants that use a header sub-nav. */
export const settingsNavItems = [
    { label: "My details", href: "/settings/my-details" },
    { label: "Profile", href: "/settings/profile" },
    { label: "Password", href: "/settings/password" },
    { label: "Team", href: "/settings/team" },
    { label: "Billing", href: "/settings/billing" },
    { label: "Notifications", href: "/settings/notifications" },
];

/** The in-page settings sections, used by the vertical tab rails and the mobile page-tab select. */
export const settingsSections = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

/** `settingsSections` shaped for `NativeSelect`. */
export const settingsSectionOptions = settingsSections.map((section) => ({ label: section.label, value: section.id }));

const HeaderActions = ({ showUpgrade }: { showUpgrade: boolean }) => (
    <>
        {showUpgrade && (
            <Button size="sm" color="secondary" iconLeading={Zap}>
                Upgrade now
            </Button>
        )}

        <div className="flex gap-0.5">
            <NavButton current icon={Settings01} label="Settings" href="/settings" tooltipPlacement="bottom" />

            <div className="relative">
                <NavButton icon={Bell01} label="Notifications" href="/notifications" tooltipPlacement="bottom" />

                <div className="bg-fg-error-primary absolute -end-0.25 -top-0.25 flex size-3.5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    2
                </div>
            </div>
        </div>

        <DropdownAvatar />
    </>
);

export interface SettingsHeaderNavProps {
    /** URL of the active secondary nav item. */
    activeUrl?: string;
    /**
     * How the settings sub-navigation renders under the product nav.
     * `"none"` drops the secondary row entirely — those pages navigate from inside the page body.
     * @default "none"
     */
    subNav?: "buttons" | "tabs" | "none";
    /**
     * Whether the "Upgrade now" call to action sits in the header actions.
     * @default true
     */
    showUpgrade?: boolean;
}

/** The application header every settings page sits under. */
export const SettingsHeaderNav = ({ activeUrl, subNav = "none", showUpgrade = true }: SettingsHeaderNavProps) => (
    <HeaderNavigationBase
        activeUrl={activeUrl}
        items={productNavItems}
        subItems={subNav === "none" ? undefined : settingsNavItems}
        secondaryType={subNav === "tabs" ? "tabs" : "buttons"}
        actions={<HeaderActions showUpgrade={showUpgrade} />}
    />
);

/** The `max-w-container` gutter every settings section lines up against. */
export const PageContainer = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
    <div {...props} className={cx("max-w-container mx-auto w-full px-4 lg:px-8", className)} />
);

/** The hairline used between form sections. */
export const Divider = ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className={cx("bg-border-secondary h-px w-full border-none", className)} />
);

export const styles = sortCx({
    /** Page title block: `h1` plus supporting copy. */
    pageTitle: "text-primary text-xl font-semibold",
    pageDescription: "text-md text-tertiary",
    /** The label column of a settings row. */
    fieldLabel: "text-secondary flex items-center gap-0.5 text-sm font-semibold",
    fieldDescription: "text-tertiary text-sm",
    /** Two-column settings row: description on the start side, controls on the end side. */
    row: "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8",
    rowWide: "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8",
    /** Footer holding the Cancel/Save pair. */
    footer: "border-secondary flex items-center gap-5 border-t pt-4 md:pt-5",
});

export interface PageTitleProps {
    /** The page heading. */
    title: string;
    /** Supporting copy under the heading. */
    description?: ReactNode;
    /** Controls pinned to the end of the title row. */
    actions?: ReactNode;
    className?: string;
}

/** `h1` page heading with optional supporting copy and trailing controls. */
export const PageTitle = ({ title, description, actions, className }: PageTitleProps) => (
    <div className={cx("flex flex-col gap-4 lg:flex-row", className)}>
        <div className="flex flex-1 flex-col gap-0.5">
            <h1 className={styles.pageTitle}>{title}</h1>
            {description && <p className={styles.pageDescription}>{description}</p>}
        </div>

        {actions && <div className="flex items-start gap-3">{actions}</div>}
    </div>
);

export interface FieldLabelProps {
    /** The row label. */
    title: string;
    /** Supporting copy under the label. */
    description?: ReactNode;
    /** Renders the brand asterisk after the label. */
    isRequired?: boolean;
    /** Attaches a help tooltip to the label. */
    tooltip?: string;
    /** Extra content under the description (a link, a button). */
    children?: ReactNode;
    className?: string;
}

/**
 * The description column of a settings row. Renders an `h2` (one level under the page's `h1`,
 * since a row can appear with or without an intervening `SectionHeader`) so the row reads as a
 * labelled group; the controls beside it carry their own accessible names.
 */
export const FieldLabel = ({ title, description, isRequired, tooltip, children, className }: FieldLabelProps) => (
    <div className={className}>
        <h2 className={styles.fieldLabel}>
            {title}
            {isRequired && <span className="text-brand-tertiary block">*</span>}

            {tooltip && (
                <Tooltip title={tooltip} placement="top">
                    <TooltipTrigger
                        aria-label="More information"
                        className="text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover cursor-pointer transition duration-200"
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}
        </h2>
        {description && <p className={styles.fieldDescription}>{description}</p>}
        {children}
    </div>
);

export interface FormFooterProps {
    /** Content pinned to the start of the row — usually a tertiary link button. */
    leading?: ReactNode;
    /** The submit label. */
    submitLabel?: string;
    /** Renders the submit button as `type="submit"`. */
    isSubmit?: boolean;
    className?: string;
}

/** The Cancel/Save footer that closes a settings form. */
export const FormFooter = ({ leading, submitLabel = "Save", isSubmit = true, className }: FormFooterProps) => (
    <div className={cx(styles.footer, className)}>
        {leading}

        <div className="flex flex-1 justify-end gap-3">
            <Button size="sm" color="secondary">
                Cancel
            </Button>
            <Button size="sm" type={isSubmit ? "submit" : "button"}>
                {submitLabel}
            </Button>
        </div>
    </div>
);

export interface IntegrationLogoProps {
    /**
     * The product mark. Only Figma and GitHub ship as brand marks in `foundations/integration-icons`;
     * the rest fall back to a line icon from `@properui/icons`.
     */
    icon: FC<{ className?: string }>;
    /** Product name, used as the accessible label of the plate. */
    name: string;
    className?: string;
}

/** The white plate an integration's logo sits on in the connected-apps lists. */
export const IntegrationLogo = ({ icon: Icon, name, className }: IntegrationLogoProps) => (
    <div
        role="img"
        aria-label={`${name} logo`}
        className={cx(
            "bg-primary ring-secondary flex size-13 w-max shrink-0 items-center justify-center rounded-lg p-0.5 shadow-xs ring-1 ring-inset",
            className,
        )}
    >
        <Icon className="text-fg-secondary size-7" />
    </div>
);
