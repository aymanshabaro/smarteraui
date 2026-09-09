"use client";

import type { ReactNode } from "react";
import { Plus } from "@smarteraui/icons";
import { CardHeader } from "@/components/application/card-headers/card-headers";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { AVATARS } from "@/utils/demo-assets";

/** Every preview shows the header as the top row of a card. Demo-only, not exported. */
const Card = ({ children }: { children: ReactNode }) => (
    <div className="w-full max-w-3xl">
        <div className="bg-primary ring-secondary overflow-hidden rounded-xl shadow-sm ring-1 ring-inset">
            {children}
            {/* Stand-in for the card body so the header reads as a header. */}
            <div className="h-40" />
        </div>
    </div>
);

/** Overflow menu reused by the examples. Demo-only, not exported. */
const HeaderMenu = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />

        <Dropdown.Popover className="w-50">
            <Dropdown.Menu>
                <Dropdown.Item>Invite people</Dropdown.Item>
                <Dropdown.Item>Export list</Dropdown.Item>
                <Dropdown.Item>Manage permissions</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

export const CardHeaderExample = () => (
    <Card>
        <CardHeader
            divider
            title="Team members"
            badge="40 users"
            description="Manage your team members and their account permissions here."
            actions={
                <>
                    <HeaderMenu />
                    <Button color="secondary" size="md">
                        Import
                    </Button>
                    <Button color="primary" size="md" iconLeading={Plus}>
                        Add member
                    </Button>
                </>
            }
        />
    </Card>
);

export const CardHeaderWithBadge = () => (
    <Card>
        <CardHeader
            divider
            title="Billing history"
            badge="12 invoices"
            description="Download previous invoices or update your payment method."
            actions={
                <Button color="secondary" size="md">
                    Download all
                </Button>
            }
        />
    </Card>
);

export const CardHeaderWithAvatarAndBadge = () => (
    <Card>
        <CardHeader
            divider
            title={AVATARS[0].name}
            badge="Admin"
            description="Owner of the Smartera workspace since March 2024."
            avatar={<Avatar size="lg" src={AVATARS[0].src} alt={AVATARS[0].alt} status="online" />}
            actions={
                <>
                    <Button color="secondary" size="md">
                        Message
                    </Button>
                    <Button color="primary" size="md">
                        View profile
                    </Button>
                </>
            }
        />
    </Card>
);
