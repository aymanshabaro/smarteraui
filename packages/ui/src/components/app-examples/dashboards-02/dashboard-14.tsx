"use client";

import { Edit01, Plus, RefreshCcw01 } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx } from "@/utils/cx";
import { avatar } from "@/utils/demo-assets";
import { DonutChart, StackedBarChart, TrendChart } from "./charts.a";
import { spendCategories, stackedSeries, trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { PanelMenu, SegmentTabs } from "./widgets.a";

const owner = avatar(0);

/** Legend swatches for `spendCategories`, kept as literal classes so Tailwind can see them. */
const categoryLegend = [
    { name: "Subscriptions", amount: "$148.40", dot: "bg-utility-brand-600" },
    { name: "Groceries", amount: "$642.48", dot: "bg-utility-brand-400" },
    { name: "Food and dining", amount: "$614.16", dot: "bg-utility-pink-500" },
    { name: "Investing", amount: "$290.00", dot: "bg-utility-green-500" },
    { name: "Mortgage", amount: "$824.28", dot: "bg-utility-orange-500" },
    { name: "Other", amount: "$48.44", dot: "bg-utility-neutral-300" },
];

const recentTransactions = [
    { merchant: "Spotify", amount: "18.99", incoming: false, when: "Thursday 1:00 PM" },
    { merchant: "A Coffee", amount: "4.50", incoming: false, when: "Thursday 7:20 AM" },
    { merchant: "Stripe", amount: "88.00", incoming: true, when: "Thursday 2:45 AM" },
    { merchant: "Figma", amount: "15.00", incoming: false, when: "Thursday 6:10 PM" },
    { merchant: "TBF Bakery", amount: "12.50", incoming: false, when: "Wednesday 7:52 AM" },
    { merchant: "Fresh F&V", amount: "40.20", incoming: false, when: "Wednesday 12:15 PM" },
    { merchant: "Stripe", amount: "88.00", incoming: true, when: "Wednesday 5:40 AM" },
    { merchant: "Rosso Antico", amount: "80.00", incoming: false, when: "Monday 8:10 AM" },
    { merchant: "P&Vs Wine", amount: "32.00", incoming: false, when: "Monday 7:05 AM" },
    { merchant: "Cherry Moon", amount: "16.50", incoming: false, when: "Monday 12:52 PM" },
];

const rangeTabs = ["12 months", "30 days", "7 days"];

/** Cards dashboard: the card wallet and transaction ledger beside spending and balance charts. */
export const Dashboard14 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h1 className="text-primary text-xl font-semibold">Your cards</h1>
                        <p className="text-tertiary text-md">Welcome back, {owner.name.split(" ")[0]}!</p>
                    </div>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md" iconLeading={RefreshCcw01}>
                            Sync accounts
                        </Button>
                        <Button color="primary" size="md" iconLeading={Plus}>
                            Add card
                        </Button>
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-8 lg:flex-row lg:gap-10">
                <div className="flex w-full shrink-0 flex-col gap-6 lg:w-72">
                    {/* The wallet graphic: a tilted card peeking out from behind the active one. */}
                    <div className="relative h-46">
                        <CreditCard
                            type="transparent-gradient"
                            width={260}
                            company="Proper."
                            cardHolder={owner.name.toUpperCase()}
                            className="absolute start-0 top-2 -rotate-6"
                        />
                        <CreditCard type="gray-dark" width={260} company="Proper." cardHolder={owner.name.toUpperCase()} className="absolute start-8 top-6" />
                    </div>

                    <section className="flex flex-col gap-4">
                        <div className="border-secondary flex items-center gap-4 border-b pb-3">
                            <h2 className="text-md text-primary flex-1 font-semibold">Recent transactions</h2>
                            <PanelMenu />
                        </div>

                        <ul aria-label="Recent transactions" className="flex flex-col">
                            {recentTransactions.map((transaction) => (
                                <li
                                    key={`${transaction.merchant}-${transaction.when}`}
                                    className="border-secondary flex items-center gap-3 border-b py-3 last:border-b-0"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-primary truncate text-sm font-medium">{transaction.merchant}</p>
                                        <p className={cx("text-sm", transaction.incoming ? "text-success-primary font-medium" : "text-tertiary")}>
                                            {transaction.incoming ? "+" : "−"} ${transaction.amount}
                                        </p>
                                    </div>
                                    <span className="text-tertiary text-sm whitespace-nowrap">{transaction.when}</span>
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                </li>
                            ))}
                        </ul>

                        <Button color="link-gray" size="md" href="#" className="self-end">
                            View all transactions
                        </Button>
                    </section>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-8">
                    <section className="flex flex-col gap-5">
                        <div className="border-secondary flex flex-col gap-4 border-b pb-4 md:flex-row md:items-center">
                            <h2 className="text-md text-primary flex-1 font-semibold">Monthly spending</h2>
                            <SegmentTabs label="Spending month" type="button-border" items={["This month", "Last month", "Custom"]} />
                        </div>

                        <div className="flex flex-col items-center gap-8 md:flex-row">
                            <div className="relative size-56 shrink-0">
                                <DonutChart className="size-full" innerRadius={72} data={spendCategories} />
                                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-tertiary text-sm font-medium">Total</span>
                                    <span className="text-display-sm text-primary font-semibold">$2,280</span>
                                </div>
                            </div>

                            <dl className="grid flex-1 grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                                {categoryLegend.map((category) => (
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
                            <h2 className="text-md text-primary flex-1 font-semibold">Balance over time</h2>
                            <SegmentTabs label="Balance period" type="button-border" items={rangeTabs} />
                        </div>

                        <TrendChart
                            className="h-56"
                            verticalGrid
                            data={trendSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "This year" },
                                { key: "B", name: "Last year" },
                            ]}
                        />
                    </section>

                    <section className="flex flex-col gap-5">
                        <div className="border-secondary flex flex-col gap-4 border-b pb-4 md:flex-row md:items-center">
                            <h2 className="text-md text-primary flex-1 font-semibold">Spending over time</h2>
                            <SegmentTabs label="Spending period" type="button-border" items={rangeTabs} />
                        </div>

                        <StackedBarChart
                            className="h-56"
                            data={stackedSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "Essentials" },
                                { key: "B", name: "Lifestyle" },
                                { key: "C", name: "Other" },
                            ]}
                        />
                    </section>
                </div>
            </DashboardSection>
        </DashboardMain>
    </div>
);
