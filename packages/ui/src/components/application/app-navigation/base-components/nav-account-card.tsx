"use client";

import type { FC, HTMLAttributes } from "react";
import { useCallback, useEffect, useRef } from "react";
import { useFocusManager } from "react-aria";
import type { DialogProps as AriaDialogProps, PopoverProps as AriaPopoverProps } from "react-aria-components";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { BookOpen01, ChevronSelectorVertical, LogOut01, Plus, Settings01, User01 } from "@smarteraui/icons";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { avatar } from "@/utils/demo-assets";

export type NavAccountType = {
    /** Unique identifier for the nav item. */
    id: string;
    /** Name of the account holder. */
    name: string;
    /** Email address of the account holder. */
    email: string;
    /** Avatar image URL. */
    avatar: string;
    /** Online status of the account holder. This is used to display the online status indicator. */
    status: "online" | "offline";
};

const placeholderAccounts: NavAccountType[] = [
    {
        id: "primary",
        name: avatar(0).name,
        email: avatar(0).email,
        avatar: avatar(0).src,
        status: "online",
    },
    {
        id: "secondary",
        name: avatar(1).name,
        email: avatar(1).email,
        avatar: avatar(1).src,
        status: "online",
    },
];

export const NavAccountMenu = ({
    className,
    selectedAccountId = "primary",
    accounts = placeholderAccounts,
    ...dialogProps
}: AriaDialogProps & { className?: string; accounts?: NavAccountType[]; selectedAccountId?: string }) => {
    const focusManager = useFocusManager();
    const dialogRef = useRef<HTMLDivElement>(null);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown":
                    focusManager?.focusNext({ tabbable: true, wrap: true });
                    break;
                case "ArrowUp":
                    focusManager?.focusPrevious({ tabbable: true, wrap: true });
                    break;
            }
        },
        [focusManager],
    );

    useEffect(() => {
        const element = dialogRef.current;
        element?.addEventListener("keydown", onKeyDown);

        return () => {
            element?.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <AriaDialog
            {...dialogProps}
            ref={dialogRef}
            aria-label="Account menu"
            className={cx("bg-secondary_alt ring-secondary_alt w-66 rounded-xl shadow-lg ring outline-hidden", className)}
        >
            <div className="bg-primary ring-secondary rounded-xl ring-1">
                <div className="flex flex-col gap-0.5 py-1.5">
                    <NavAccountCardMenuItem label="View profile" icon={User01} shortcut="⌘K->P" />
                    <NavAccountCardMenuItem label="Account settings" icon={Settings01} shortcut="⌘S" />
                    <NavAccountCardMenuItem label="Documentation" icon={BookOpen01} />
                </div>
                <div className="border-secondary flex flex-col gap-0.5 border-t py-1.5">
                    <div className="text-tertiary px-3 pt-1.5 pb-1 text-xs font-semibold">Switch account</div>

                    <div className="flex flex-col gap-0.5 px-1.5">
                        {accounts.map((account) => (
                            <button
                                key={account.id}
                                type="button"
                                className={cx(
                                    "outline-focus-ring hover:bg-primary_hover relative w-full cursor-pointer rounded-md px-2 py-1.5 text-start transition duration-100 ease-linear focus:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                                    account.id === selectedAccountId && "bg-primary_hover",
                                )}
                            >
                                <AvatarLabelGroup
                                    status={account.status}
                                    size="md"
                                    src={account.avatar}
                                    alt={account.name}
                                    title={account.name}
                                    subtitle={account.email}
                                />

                                <RadioButtonBase isSelected={account.id === selectedAccountId} className="absolute end-2 top-2" />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 pt-0.5 pb-2">
                    <Button iconLeading={Plus} color="secondary" size="sm">
                        Add account
                    </Button>
                </div>
            </div>

            <div className="pt-1 pb-1.5">
                <NavAccountCardMenuItem label="Sign out" icon={LogOut01} shortcut="⌥⇧Q" />
            </div>
        </AriaDialog>
    );
};

const NavAccountCardMenuItem = ({
    icon: Icon,
    label,
    shortcut,
    ...buttonProps
}: {
    icon?: FC<{ className?: string }>;
    label: string;
    shortcut?: string;
} & HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...buttonProps} type="button" className={cx("group/item w-full cursor-pointer px-1.5 focus:outline-hidden", buttonProps.className)}>
            <div
                className={cx(
                    "group-hover/item:bg-primary_hover flex w-full items-center justify-between gap-3 rounded-md p-2",
                    // Focus styles.
                    "outline-focus-ring group-focus-visible/item:outline-2 group-focus-visible/item:outline-offset-2",
                )}
            >
                <div className="text-secondary group-hover/item:text-secondary_hover flex gap-2 text-sm font-semibold">
                    {Icon && <Icon aria-hidden="true" className="text-fg-quaternary group-hover/item:text-fg-quaternary_hover size-5" />} {label}
                </div>

                {shortcut && (
                    <kbd className="font-body text-tertiary ring-secondary flex rounded px-1 py-px text-xs font-medium ring-1 ring-inset">{shortcut}</kbd>
                )}
            </div>
        </button>
    );
};

export const NavAccountCard = ({
    popoverPlacement,
    selectedAccountId = "primary",
    items = placeholderAccounts,
    avatarRounded,
}: {
    popoverPlacement?: AriaPopoverProps["placement"];
    selectedAccountId?: string;
    items?: NavAccountType[];
    avatarRounded?: boolean;
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useBreakpoint("lg");

    const selectedAccount = items.find((account) => account.id === selectedAccountId);

    if (!selectedAccount) {
        return null;
    }

    return (
        <div ref={triggerRef} className="ring-secondary relative flex items-center gap-3 rounded-xl p-3 ring-1 ring-inset">
            <AvatarLabelGroup
                size="md"
                src={selectedAccount.avatar}
                alt={selectedAccount.name}
                title={selectedAccount.name}
                subtitle={selectedAccount.email}
                status={selectedAccount.status}
                rounded={avatarRounded}
            />

            <AriaDialogTrigger>
                <AriaButton
                    aria-label="Switch account"
                    className="text-fg-quaternary outline-focus-ring hover:bg-primary_hover hover:text-fg-quaternary_hover pressed:bg-primary_hover pressed:text-fg-quaternary_hover absolute end-2 top-2 flex cursor-pointer items-center justify-center rounded-md p-1.5 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <ChevronSelectorVertical aria-hidden="true" className="size-4 shrink-0 stroke-[2.25px]" />
                </AriaButton>
                <AriaPopover
                    placement={popoverPlacement ?? (isDesktop ? "right bottom" : "top right")}
                    triggerRef={triggerRef}
                    offset={8}
                    className={({ isEntering, isExiting }) =>
                        cx(
                            "origin-(--trigger-anchor-point) will-change-transform",
                            isEntering &&
                                "animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5 duration-150 ease-out",
                            isExiting &&
                                "animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5 duration-100 ease-in",
                        )
                    }
                >
                    <NavAccountMenu selectedAccountId={selectedAccountId} accounts={items} />
                </AriaPopover>
            </AriaDialogTrigger>
        </div>
    );
};
