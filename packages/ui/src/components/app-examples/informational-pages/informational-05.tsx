"use client";

import {
    BarChartSquare02,
    CheckDone01,
    DownloadCloud01,
    Grid03,
    HomeLine,
    LifeBuoy01,
    LineChartUp03,
    NotificationBox,
    PieChart03,
    Plus,
    Rows01,
    SearchLg,
    Settings01,
    Star01,
    User01,
    Users01,
    UsersPlus,
} from "@properui/icons";
import type { DemoAvatar } from "../../../utils/demo-assets";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { FeaturedCardImage } from "../../application/app-navigation/base-components/featured-cards";
import type { NavItemType } from "../../application/app-navigation/config";
import { SidebarNavigationDualTier } from "../../application/app-navigation/sidebar-navigation/sidebar-dual-tier";
import { Table, TableCard } from "../../application/table/table";
import { TablePaginationMinimal } from "../../application/table/table-pagination";
import { Avatar } from "../../base/avatar/avatar";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Input } from "../../base/input/input";

const noop = () => {};

const navItems: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/overview", icon: Grid03 },
            { label: "Customers", href: "/customers", icon: Users01 },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
            { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
            { label: "Orders", href: "/dashboard/orders", icon: Rows01 },
            { label: "User reports", href: "/dashboard/user-reports", icon: User01 },
            { label: "Notifications", href: "/dashboard/manage-notifications", icon: Settings01 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
        ],
    },
    { label: "Tasks", href: "/tasks", icon: CheckDone01, badge: 8 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
];

const footerItems: NavItemType[] = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

interface Order {
    id: string;
    date: string;
    person: DemoAvatar;
}

const orders: Order[] = [
    { id: "#3066", date: "Jan 6, 2027", person: avatar(0) },
    { id: "#3065", date: "Jan 6, 2027", person: avatar(1) },
    { id: "#3064", date: "Jan 6, 2027", person: avatar(2) },
    { id: "#3063", date: "Jan 5, 2027", person: avatar(3) },
    { id: "#3062", date: "Jan 5, 2027", person: avatar(4) },
    { id: "#3061", date: "Jan 5, 2027", person: avatar(5) },
    { id: "#3060", date: "Jan 4, 2027", person: avatar(6) },
    { id: "#3059", date: "Jan 3, 2027", person: avatar(7) },
    { id: "#3058", date: "Jan 3, 2027", person: avatar(8) },
    { id: "#3057", date: "Jan 3, 2027", person: avatar(9) },
];

type InvoiceStatus = "paid" | "refunded" | "cancelled";

interface Invoice {
    id: string;
    date: string;
    status: InvoiceStatus;
}

const invoices: Invoice[] = [
    { id: "INV-3066", date: "Jan 6, 2027", status: "paid" },
    { id: "INV-3065", date: "Jan 6, 2027", status: "paid" },
    { id: "INV-3064", date: "Jan 6, 2027", status: "paid" },
    { id: "INV-3063", date: "Jan 5, 2027", status: "paid" },
    { id: "INV-3062", date: "Jan 5, 2027", status: "refunded" },
    { id: "INV-3061", date: "Jan 5, 2027", status: "paid" },
    { id: "INV-3060", date: "Jan 4, 2027", status: "cancelled" },
];

const invoiceStatusColor: Record<InvoiceStatus, "success" | "gray" | "error"> = {
    paid: "success",
    refunded: "gray",
    cancelled: "error",
};

/** Informational page 05 — orders and billing history with a dual-tier sidebar and split section layout. */
export const Informational05 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationDualTier
            activeUrl="/dashboard/orders"
            items={navItems}
            footerItems={footerItems}
            featureCard={
                <FeaturedCardImage
                    title="New features available!"
                    description="Check out the new dashboard view. Pages now load faster."
                    confirmLabel="What's new?"
                    imageSrc={IMAGES.landscape[0]!.src}
                    imageAlt=""
                    className="hidden md:flex"
                    onDismiss={noop}
                    onConfirm={noop}
                />
            }
        />

        <main className="flex min-w-0 flex-1 flex-col gap-8 pt-8 pb-12">
            <div className="px-4 lg:px-8">
                <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <p className="text-primary text-xl font-semibold">Orders</p>
                        <p className="text-tertiary text-md">Manage your recent orders and invoices.</p>
                    </div>

                    <div>
                        <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                            Download all
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 lg:px-8">
                <div className="border-secondary flex flex-col justify-between gap-4 lg:flex-row lg:border-b lg:pb-5">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-primary text-md font-semibold">Subscription orders</p>
                        <p className="text-tertiary text-sm">Below are your recent orders.</p>
                    </div>

                    <Input shortcut size="sm" aria-label="Search orders" placeholder="Search" icon={SearchLg} className="w-full max-md:hidden lg:max-w-xs" />
                    <Input size="md" aria-label="Search orders" placeholder="Search" icon={SearchLg} className="w-full md:hidden" />
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                        <div className="flex max-w-70 min-w-70 flex-col">
                            <p className="text-secondary text-sm font-semibold">Order details</p>
                            <p className="text-tertiary text-sm">Review and manage recent orders.</p>
                        </div>

                        <TableCard.Root size="sm" className="-mx-4 rounded-none lg:mx-0 lg:w-full lg:rounded-xl">
                            <Table size="sm" aria-label="Subscription orders" selectionMode="multiple">
                                <Table.Header className="bg-primary">
                                    <Table.Head id="order" label="Order" isRowHeader allowsSorting className="w-full lg:pe-0" />
                                    <Table.Head id="date" label="Date" />
                                    <Table.Head id="customer" label="Customer" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={orders}>
                                    {(order) => (
                                        <Table.Row id={order.id}>
                                            <Table.Cell className="text-primary text-sm font-medium lg:pe-0">{order.id}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{order.date}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={order.person.src} alt="" size="md" initials={order.person.initials} />
                                                    <p className="text-tertiary text-sm">{order.person.name}</p>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="flex gap-3">
                                                    <Button color="link-color" size="md">
                                                        Edit
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>

                            <TablePaginationMinimal align="center" />
                        </TableCard.Root>
                    </div>

                    <div className="max-lg:hidden">
                        <div className="flex w-full shrink-0 items-center gap-x-2">
                            <div className="bg-border-secondary h-px flex-1" />
                            <Button color="secondary" size="md" iconLeading={Plus}>
                                Add
                            </Button>
                            <div className="bg-border-secondary h-px flex-1" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 lg:px-8">
                <div className="border-secondary flex flex-col justify-between gap-4 border-b lg:flex-row lg:pb-5">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-primary text-md font-semibold">Billing and invoicing</p>
                        <p className="text-tertiary text-sm">Pick an account plan that fits your workflow.</p>
                    </div>

                    <Input shortcut size="sm" aria-label="Search invoices" placeholder="Search" icon={SearchLg} className="w-full max-md:hidden lg:max-w-xs" />
                    <Input size="md" aria-label="Search invoices" placeholder="Search" icon={SearchLg} className="w-full md:hidden" />
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                        <div className="flex min-w-70 flex-col lg:max-w-70">
                            <p className="text-secondary text-sm font-semibold">Billing history</p>
                            <p className="text-tertiary text-sm">
                                Please reach out to our friendly team via{" "}
                                <a
                                    href="mailto:billing@proper.example"
                                    className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    billing@proper.example
                                </a>{" "}
                                with questions.
                            </p>
                        </div>

                        <TableCard.Root size="sm" className="-mx-4 rounded-none lg:mx-0 lg:w-full lg:rounded-xl">
                            <Table size="sm" aria-label="Billing history" selectionMode="multiple">
                                <Table.Header className="bg-primary">
                                    <Table.Head id="invoice" label="Invoice" isRowHeader allowsSorting className="w-full" />
                                    <Table.Head id="date" label="Date" />
                                    <Table.Head id="status" label="Status" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={invoices}>
                                    {(invoice) => (
                                        <Table.Row id={invoice.id}>
                                            <Table.Cell className="text-primary text-sm font-medium whitespace-nowrap">{invoice.id}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">{invoice.date}</Table.Cell>
                                            <Table.Cell>
                                                <Badge size="sm" type="pill-color" color={invoiceStatusColor[invoice.status]} className="capitalize">
                                                    {invoice.status}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell className="px-4">
                                                <div className="flex gap-0.5">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Download invoice" icon={DownloadCloud01} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </TableCard.Root>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
