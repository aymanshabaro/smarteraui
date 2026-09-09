"use client";

import { Edit01, Plus, RefreshCcw01 } from "@smarteraui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx } from "@/utils/cx";
import {
    DonutChart,
    RangeTabs,
    StackedBarChart,
    TrendAreaChart,
    currentUser,
    navFooterItemsWithIcons,
    navItemsDualTier,
    styles,
    transactions,
} from "./dashboards-shared";

const spendPresets = [
    { id: "12-months", long: "12 months" },
    { id: "30-days", long: "30 days" },
    { id: "7-days", long: "7 days" },
];

const monthPresets = [
    { id: "this-month", long: "This month" },
    { id: "last-month", long: "Last month" },
    { id: "custom", long: "Custom" },
];

const spending = [
    { name: "Subscriptions", value: 148.4, className: "fill-utility-blue-500", amount: "$148.40", dot: "bg-utility-blue-500" },
    { name: "Groceries", value: 642.48, className: "fill-utility-brand-600", amount: "$642.48", dot: "bg-utility-brand-600" },
    { name: "Food and dining", value: 614.16, className: "fill-utility-pink-500", amount: "$614.16", dot: "bg-utility-pink-500" },
    { name: "Investing", value: 290, className: "fill-utility-green-500", amount: "$290.00", dot: "bg-utility-green-500" },
    { name: "Mortgage", value: 824.28, className: "fill-utility-orange-500", amount: "$824.28", dot: "bg-utility-orange-500" },
    { name: "Other", value: 48.44, className: "fill-utility-neutral-400", amount: "$48.44", dot: "bg-utility-neutral-400" },
];

/** Dashboard 14 — a cards dashboard: a stacked card graphic, a spending donut and two trend charts. */
export const Dashboard14 = () => (
    <div className={styles.page}>
        <SidebarNavigationSlim activeUrl="/dashboard" items={navItemsDualTier} footerItems={navFooterItemsWithIcons} />

        <main className={styles.main}>
            <div className={cx("flex flex-col gap-6", styles.gutter)}>
                <div className="border-secondary flex flex-col gap-4 border-b pb-5 md:flex-row md:items-start">
                    <div className="flex flex-1 flex-col gap-1">
                        <h1 className={styles.pageTitle}>Your cards</h1>
                        <p className={styles.pageSubtitle}>Welcome back, {currentUser.name.split(" ")[0]}!</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button color="secondary" size="md" iconLeading={RefreshCcw01}>
                            Sync accounts
                        </Button>
                        <Button color="primary" size="md" iconLeading={Plus}>
                            Add card
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
                    <div className="flex w-full shrink-0 flex-col gap-6 lg:w-72">
                        <div className="relative h-44">
                            <CreditCard
                                type="brand-dark"
                                width={260}
                                cardHolder={currentUser.name.toUpperCase()}
                                company="Smartera."
                                className="absolute start-0 top-2 -rotate-6"
                            />
                            <CreditCard
                                type="transparent-gradient"
                                width={260}
                                cardHolder={currentUser.name.toUpperCase()}
                                company="Smartera."
                                className="absolute start-8 top-6"
                            />
                        </div>

                        <section className="flex flex-col gap-4">
                            <div className="border-secondary flex items-center gap-4 border-b pb-3">
                                <h2 className={cx(styles.cardTitle, "flex-1")}>Recent transactions</h2>
                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover className="w-40">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Export</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            </div>

                            <ul className="flex flex-col">
                                {transactions.map((transaction) => (
                                    <li key={transaction.id} className="border-secondary flex items-center gap-3 border-b py-3 last:border-b-0">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-primary truncate text-sm font-medium">{transaction.merchant}</p>
                                            <p className={cx("text-sm", transaction.isIncome ? "text-success-primary font-medium" : "text-tertiary")}>
                                                {transaction.isIncome ? "+" : "−"} ${transaction.amount}
                                            </p>
                                        </div>
                                        <span className="text-tertiary text-sm whitespace-nowrap">{transaction.longDate}</span>
                                        <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                    </li>
                                ))}
                            </ul>

                            <Button color="link-color" size="md" href="/transactions" className="self-start">
                                View all transactions
                            </Button>
                        </section>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-8">
                        <section className="flex flex-col gap-5">
                            <div className="border-secondary flex flex-col gap-4 border-b pb-4 md:flex-row md:items-center">
                                <h2 className={cx(styles.cardTitle, "flex-1")}>Monthly spending</h2>
                                <RangeTabs label="Spending month" presets={monthPresets} />
                            </div>

                            <div className="flex flex-col items-center gap-8 md:flex-row">
                                <DonutChart
                                    label="Spending by category"
                                    data={spending}
                                    centerLabel="Total"
                                    centerValue="$2,280"
                                    className="size-56 shrink-0"
                                />

                                <dl className="grid flex-1 grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {spending.map((category) => (
                                        <div key={category.name} className="flex flex-col gap-1">
                                            <dt className="text-tertiary flex items-center gap-1.5 text-sm font-medium">
                                                <span aria-hidden="true" className={cx("size-2 rounded-full", category.dot)} />
                                                {category.name}
                                            </dt>
                                            <dd className="text-primary text-xl font-semibold">{category.amount}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </section>

                        <section className="flex flex-col gap-5">
                            <div className="border-secondary flex flex-col gap-4 border-b pb-4 md:flex-row md:items-center">
                                <h2 className={cx(styles.cardTitle, "flex-1")}>Balance over time</h2>
                                <RangeTabs label="Balance period" presets={spendPresets} />
                            </div>

                            <TrendAreaChart label="Balance over the last 12 months" className="h-56" />
                        </section>

                        <section className="flex flex-col gap-5">
                            <div className="border-secondary flex flex-col gap-4 border-b pb-4 md:flex-row md:items-center">
                                <h2 className={cx(styles.cardTitle, "flex-1")}>Spending over time</h2>
                                <RangeTabs label="Spending period" presets={spendPresets} />
                            </div>

                            <StackedBarChart label="Spending by month" className="h-56" />
                        </section>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
