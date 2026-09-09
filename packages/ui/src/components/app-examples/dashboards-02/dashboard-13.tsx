"use client";

import { CurrencyDollar, Send01 } from "@smarteraui/icons";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics-base";
import { Button } from "@/components/base/buttons/button";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { ApplePayIcon, MastercardIcon, PayPalIcon, StripeIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { avatar } from "@/utils/demo-assets";
import { GaugeChart, TrendChart } from "./charts.a";
import { trendSeries } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { FiltersButton, PanelMenu, PeriodTabs, styles } from "./widgets.a";

const owner = avatar(0);

const accounts = [
    { title: "Primary account", balance: "$40,206.20", change: "3.4%", ring: 720 },
    { title: "Secondary account", balance: "$6,421.10", change: "2.0%", ring: 480 },
];

const cards = [
    { type: "gray-dark" as const, spending: "$2,840.40", value: 72 },
    { type: "brand-dark" as const, spending: "$1,260.20", value: 34 },
];

const deposits = [
    { icon: VisaIcon, label: "Visa ending in 1234", detail: "Expiry 06/2028", amount: "$244.00" },
    { icon: MastercardIcon, label: "Mastercard ending in 5678", detail: "Expiry 06/2028", amount: "$326.00" },
    { icon: StripeIcon, label: "Stripe deposit", detail: "billing@smartera.com", amount: "$408.00" },
    { icon: VisaIcon, label: "Visa ending in 1234", detail: "Expiry 06/2028", amount: "$628.00" },
    { icon: PayPalIcon, label: "PayPal deposit", detail: avatar(8).email, amount: "$166.00" },
    { icon: ApplePayIcon, label: "Apple Pay", detail: avatar(5).email, amount: "$250.00" },
    { icon: VisaIcon, label: "Visa ending in 1234", detail: "Expiry 06/2028", amount: "$144.00" },
    { icon: StripeIcon, label: "Stripe deposit", detail: "billing@smartera.com", amount: "$408.00" },
];

/** Banking dashboard: account gauges, a balance trend, the card wallet and the deposit ledger. */
export const Dashboard13 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <DashboardMain>
            <DashboardSection className="gap-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h1 className="text-primary text-xl font-semibold">Banking Dashboard</h1>
                        <p className="text-tertiary text-md">Here&apos;s your account details and deposits.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md" iconLeading={CurrencyDollar}>
                            Deposit
                        </Button>
                        <Button color="primary" size="md" iconLeading={Send01}>
                            Send funds
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <PeriodTabs selectedKey="12-months" />

                    <div className="flex gap-3">
                        <DateRangePicker size="md" />
                        <FiltersButton count={3} />
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-5 lg:flex-row lg:gap-6">
                {accounts.map((account) => (
                    <section key={account.title} className={`${styles.panel.root} relative flex flex-1 items-center gap-5 p-4 lg:p-6`}>
                        <GaugeChart
                            className="size-22 shrink-0"
                            max={1000}
                            data={[{ name: account.title, value: account.ring, className: "text-utility-brand-600" }]}
                        />

                        <div className="flex flex-col gap-1">
                            <h2 className="text-md text-primary font-semibold">{account.title}</h2>
                            <p className="text-tertiary text-sm">Current balance</p>
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="text-display-sm text-primary font-semibold">{account.balance}</p>
                                <MetricChangeIndicator type="simple" icon="arrow">
                                    {account.change}
                                </MetricChangeIndicator>
                            </div>
                        </div>

                        <div className="absolute end-4 top-4 lg:end-6 lg:top-6">
                            <PanelMenu />
                        </div>
                    </section>
                ))}
            </DashboardSection>

            <DashboardSection className="gap-6 lg:flex-row">
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <section className={`${styles.panel.root} flex flex-col gap-5 px-4 py-5 lg:p-6`}>
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-md text-primary font-semibold">Balance over time</h2>
                            <PanelMenu />
                        </div>

                        <TrendChart
                            className="h-60"
                            data={trendSeries}
                            xKey="month"
                            series={[
                                { key: "A", name: "This year" },
                                { key: "B", name: "Last year" },
                            ]}
                        />
                    </section>

                    <section className={`${styles.panel.root} flex flex-col`}>
                        <div className="flex flex-col gap-5 px-4 py-5 lg:p-6">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-md text-primary font-semibold">Your cards</h2>
                                <PanelMenu />
                            </div>

                            <ul className="flex flex-col gap-5 md:flex-row">
                                {cards.map((card) => (
                                    <li key={card.type} className="flex flex-1 flex-col gap-4">
                                        <CreditCard type={card.type} width={260} company="Smartera." cardHolder={owner.name.toUpperCase()} />

                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between gap-4">
                                                <span className="text-secondary text-sm font-medium">Spending this month</span>
                                                <span className="text-tertiary text-sm">{card.spending}</span>
                                            </div>
                                            <ProgressBarBase value={card.value} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-secondary flex justify-end border-t px-4 py-3 lg:px-6 lg:py-4">
                            <Button color="secondary" size="md">
                                Manage cards
                            </Button>
                        </div>
                    </section>
                </div>

                <section className={`${styles.panel.root} flex flex-col lg:w-90`}>
                    <div className="flex items-start justify-between gap-4 px-4 py-5 lg:px-6">
                        <h2 className="text-md text-primary font-semibold">Recent deposits</h2>
                        <PanelMenu />
                    </div>

                    <ul aria-label="Recent deposits" className="flex flex-col">
                        {deposits.map((deposit, index) => (
                            <li key={`${deposit.label}-${index}`} className="border-secondary flex items-center gap-3 border-t px-4 py-4 lg:px-6">
                                <deposit.icon className="h-6 w-8.5 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-primary truncate text-sm font-medium">{deposit.label}</p>
                                    <p className="text-tertiary truncate text-sm">{deposit.detail}</p>
                                </div>
                                <span className="text-success-primary text-sm font-medium whitespace-nowrap">+ {deposit.amount}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="border-secondary mt-auto flex justify-end border-t px-4 py-3 lg:px-6 lg:py-4">
                        <Button color="link-gray" size="md" href="#">
                            Show more
                        </Button>
                    </div>
                </section>
            </DashboardSection>
        </DashboardMain>
    </div>
);
