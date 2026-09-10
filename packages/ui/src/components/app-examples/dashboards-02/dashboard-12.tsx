"use client";

import { Monitor01, Plus, ShoppingCart01, Umbrella03, Wallet02 } from "@properui/icons";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { Table } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { countries } from "@/utils/countries";
import { cx } from "@/utils/cx";
import { avatar } from "@/utils/demo-assets";
import { TrendChart } from "./charts.a";
import { transactions, trendSeries } from "./data.a";
import { DashboardHeader } from "./shell.a";
import { PanelMenu, RowActions } from "./widgets.a";

const owner = avatar(0);

const flagFor = (code: string) => countries.find((country) => country.code === code)?.flag ?? "";

const accounts = [
    { id: "personal", label: "Personal" },
    { id: "business", label: "Business" },
    { id: "credit", label: "Credit" },
];

const cardTypes = ["gray-dark", "brand-dark", "transparent-gradient"] as const;

const categoryColors: Record<string, "blue" | "pink" | "success" | "indigo"> = {
    Subscriptions: "blue",
    "Food and dining": "pink",
    Income: "success",
    Groceries: "indigo",
};

const budgets = [
    {
        name: "Subscriptions",
        left: "$25 left",
        value: 76,
        icon: Monitor01,
        plate: "bg-utility-blue-50",
        chip: "bg-utility-blue-100 text-utility-blue-700",
        track: "bg-utility-blue-100",
        fill: "bg-utility-blue-500",
        label: "text-utility-blue-700",
    },
    {
        name: "Food and booze",
        left: "$120 left",
        value: 58,
        icon: Umbrella03,
        plate: "bg-utility-pink-50",
        chip: "bg-utility-pink-100 text-utility-pink-700",
        track: "bg-utility-pink-100",
        fill: "bg-utility-pink-500",
        label: "text-utility-pink-700",
    },
    {
        name: "Groceries",
        left: "$200 left",
        value: 64,
        icon: ShoppingCart01,
        plate: "bg-utility-indigo-50",
        chip: "bg-utility-indigo-100 text-utility-indigo-700",
        track: "bg-utility-indigo-100",
        fill: "bg-utility-indigo-500",
        label: "text-utility-indigo-700",
    },
    {
        name: "Savings",
        left: "$50 left",
        value: 88,
        icon: Wallet02,
        plate: "bg-utility-green-50",
        chip: "bg-utility-green-100 text-utility-green-700",
        track: "bg-utility-green-100",
        fill: "bg-utility-green-500",
        label: "text-utility-green-700",
    },
];

/**
 * The carousel's own dot indicators. The library `PaginationDot` would render a second
 * "Pagination Navigation" landmark next to the table's pagination, so the carousel's
 * labelled indicator group is used instead.
 */
const CardDots = () => (
    <Carousel.IndicatorGroup aria-label="Card slides" className="flex h-max w-max gap-4">
        {({ index }: { index: number }) => (
            <Carousel.Indicator
                key={index}
                index={index}
                className={({ isSelected }) =>
                    cx(
                        "outline-focus-ring size-2.5 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "bg-fg-brand-primary" : "bg-fg-quaternary",
                    )
                }
            />
        )}
    </Carousel.IndicatorGroup>
);

/** Financial dashboard: a balance panel with the transaction ledger beside a profile, cards and budgets rail. */
export const Dashboard12 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <div className="max-w-container mx-auto flex flex-col gap-8 pt-8 pb-12 lg:flex-row lg:px-8 lg:pt-12 lg:pb-24">
            <main className="lg:bg-primary lg:ring-secondary flex min-w-0 flex-1 flex-col gap-8 lg:rounded-xl lg:py-8 lg:shadow-sm lg:ring-1 lg:ring-inset">
                <div className="flex flex-col flex-wrap justify-between gap-x-4 gap-y-5 px-4 lg:flex-row lg:px-8">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-md text-tertiary font-semibold">Your balance</h1>
                        <div className="flex items-center gap-3">
                            <img src={flagFor("US")} alt="United States" className="size-7 rounded-full" />
                            <p className="text-display-md text-primary font-semibold">$40,206.20</p>
                        </div>
                    </div>

                    <ButtonGroup size="md" defaultSelectedKeys={["personal"]} aria-label="Account">
                        {accounts.map((account) => (
                            <ButtonGroupItem key={account.id} id={account.id}>
                                {account.label}
                            </ButtonGroupItem>
                        ))}
                    </ButtonGroup>
                </div>

                <div className="w-full px-4 lg:px-8">
                    <TrendChart
                        className="h-54"
                        verticalGrid
                        data={trendSeries}
                        xKey="month"
                        series={[
                            { key: "A", name: "This year" },
                            { key: "B", name: "Last year" },
                        ]}
                    />
                </div>

                <div className="flex w-full flex-col gap-6 px-4 lg:px-8">
                    <div className="flex flex-col flex-wrap justify-between gap-x-4 gap-y-6 lg:flex-row lg:items-center">
                        <h2 className="text-md text-primary font-semibold">Transaction history</h2>

                        <div className="flex gap-3">
                            <DateRangePicker size="md" />
                            <Button color="secondary" size="md">
                                Apply filter
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <Table aria-label="Transaction history">
                                <Table.Header>
                                    <Table.Head id="merchant" label="Transaction" isRowHeader allowsSorting className="w-full" />
                                    <Table.Head id="amount" label="Amount" allowsSorting />
                                    <Table.Head id="category" label="Category" />
                                    <Table.Head id="account" label="Account" />
                                    <Table.Head id="actions">
                                        <span className="sr-only">Actions</span>
                                    </Table.Head>
                                </Table.Header>

                                <Table.Body items={transactions}>
                                    {(item) => (
                                        <Table.Row id={item.merchant + item.time}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3 whitespace-nowrap">
                                                    <Avatar size="md" initials={item.initials} alt="" />
                                                    <span className="text-primary text-sm font-medium">{item.merchant}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap">
                                                {item.incoming ? "+" : "−"} ${item.amount}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <BadgeWithDot size="sm" type="pill-color" color={categoryColors[item.category]}>
                                                    {item.category}
                                                </BadgeWithDot>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3 whitespace-nowrap">
                                                    {item.card === "Visa" ? <VisaIcon className="h-6 w-8.5" /> : <MastercardIcon className="h-6 w-8.5" />}
                                                    <div>
                                                        <p className="text-primary text-sm font-medium">{item.card} 1234</p>
                                                        <p className="text-tertiary text-sm">Expiry 06/2028</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="px-4">
                                                <RowActions />
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </div>

                        <PaginationPageDefault page={1} total={10} className="border-secondary border-t pt-4 md:pt-5" />
                    </div>
                </div>
            </main>

            <aside className="bg-primary ring-secondary flex w-full flex-col gap-8 pb-12 ring-inset lg:w-98 lg:rounded-xl lg:shadow-sm lg:ring-1">
                <div className="flex flex-col">
                    <div className="p-2">
                        <div className="h-30 rounded bg-linear-to-bl from-[#FFEAF6] to-[#A6C0FE]" />
                    </div>

                    <div className="-mt-8 flex flex-col gap-6 px-4 lg:px-6">
                        <Avatar size="2xl" src={owner.src} alt="" border verified />

                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <p className="text-primary text-xl font-semibold">{owner.name}</p>
                                <Badge size="sm" type="modern" color="gray">
                                    Premium
                                </Badge>
                            </div>
                            <p className="text-tertiary text-md">{owner.email}</p>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 flex-col gap-5 overflow-x-clip px-4 lg:px-6">
                    <div className="flex justify-between">
                        <h2 className="text-md text-primary font-semibold">My cards</h2>
                        <Button color="link-color" size="md" iconLeading={Plus}>
                            Add card
                        </Button>
                    </div>

                    <Carousel.Root className="relative flex flex-col gap-5">
                        <Carousel.Content className="gap-5">
                            {cardTypes.map((type) => (
                                <Carousel.Item key={type} className="basis-auto">
                                    <CreditCard type={type} width={280} company="Proper." cardHolder={owner.name.toUpperCase()} />
                                </Carousel.Item>
                            ))}
                        </Carousel.Content>

                        <CardDots />
                    </Carousel.Root>
                </div>

                <div className="border-secondary flex flex-col gap-5 border-t px-4 pt-6 lg:px-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-md text-primary font-semibold">My budgets</h2>
                        <PanelMenu />
                    </div>

                    <ul className="flex flex-col gap-3">
                        {budgets.map((budget) => (
                            <li key={budget.name} className={cx("flex gap-3 rounded-xl p-4", budget.plate)}>
                                <span className={cx("flex size-10 shrink-0 items-center justify-center rounded-full", budget.chip)}>
                                    <budget.icon className="size-5" />
                                </span>

                                <div className="flex flex-1 flex-col gap-2">
                                    <div className={cx("flex justify-between gap-4 text-sm font-semibold", budget.label)}>
                                        <span>{budget.name}</span>
                                        <span>{budget.left}</span>
                                    </div>
                                    <div
                                        role="progressbar"
                                        aria-label={`${budget.name} budget used`}
                                        aria-valuenow={budget.value}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        className={cx("h-2 w-full overflow-hidden rounded-md", budget.track)}
                                    >
                                        <div className={cx("h-full rounded-md", budget.fill)} style={{ width: `${budget.value}%` }} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    </div>
);
