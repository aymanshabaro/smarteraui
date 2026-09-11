"use client";

import { Calendar as CalendarIcon, CurrencyDollarCircle, FilterLines, Send01 } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { FeaturedCardUpgradeCTA } from "../../application/app-navigation/base-components/featured-cards";
import { SidebarNavigationSimple } from "../../application/app-navigation/sidebar-navigation/sidebar-simple";
import { Button } from "../../base/buttons/button";
import { Dropdown } from "../../base/dropdown/dropdown";
import { ProgressBarBase } from "../../base/progress-indicators/progress-indicators";
import { ApplePayIcon, PayPalIcon, StripeIcon, VisaIcon } from "../../foundations/payment-icons";
import { CreditCard } from "../../shared-assets/credit-card/credit-card";
import { ChartCard, DonutChart, RangeTabs, StackedBarChart, currentUser, navFooterItems, navItemsSimple, styles } from "./dashboards-shared";

const noop = () => {};

const accounts = [
    { title: "Primary account", balance: "$40,206.20", change: "3.4%", share: 76 },
    { title: "Secondary account", balance: "$6,421.10", change: "2.0%", share: 24 },
];

const cards = [
    { holder: currentUser.name.toUpperCase(), spend: "$2,840.40", progress: 74 },
    { holder: currentUser.name.toUpperCase(), spend: "$1,260.20", progress: 42 },
];

const deposits = [
    { id: "visa-1", icon: VisaIcon, title: "Visa ending in 1234", subtitle: "Expiry 06/2028", amount: "244.00" },
    { id: "visa-2", icon: VisaIcon, title: "Visa ending in 1234", subtitle: "Expiry 06/2028", amount: "326.00" },
    { id: "stripe-1", icon: StripeIcon, title: "Card deposit", subtitle: "billing@proper.example", amount: "408.00" },
    { id: "visa-3", icon: VisaIcon, title: "Visa ending in 1234", subtitle: "Expiry 06/2028", amount: "628.00" },
    { id: "paypal-1", icon: PayPalIcon, title: "PayPal deposit", subtitle: "alina@proper.example", amount: "166.00" },
    { id: "applepay-1", icon: ApplePayIcon, title: "Apple Pay", subtitle: "molly@proper.example", amount: "250.00" },
    { id: "visa-4", icon: VisaIcon, title: "Visa ending in 1234", subtitle: "Expiry 06/2028", amount: "144.00" },
    { id: "stripe-2", icon: StripeIcon, title: "Card deposit", subtitle: "billing@proper.example", amount: "408.00" },
];

const CardMenu = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-40">
            <Dropdown.Menu>
                <Dropdown.Item>View report</Dropdown.Item>
                <Dropdown.Item>Export</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

/** Dashboard 13 — a banking dashboard: two account rings, a balance chart, cards and deposits. */
export const Dashboard13 = () => (
    <div className={styles.page}>
        <SidebarNavigationSimple
            activeUrl="/dashboard"
            items={navItemsSimple}
            footerItems={navFooterItems}
            featureCard={
                <FeaturedCardUpgradeCTA
                    title="Upgrade your plan"
                    badge="20% OFF"
                    description="Unlock 20+ integrations, 40 GB data, and advanced reporting."
                    confirmLabel="Upgrade now"
                    onDismiss={noop}
                    onConfirm={noop}
                />
            }
        />

        <main className={styles.main}>
            <div className={cx("flex flex-col gap-6", styles.gutter)}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex flex-1 flex-col gap-1">
                        <h1 className={styles.pageTitle}>Banking dashboard</h1>
                        <p className={styles.pageSubtitle}>Welcome back, {currentUser.name.split(" ")[0]}!</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button color="secondary" size="md" iconLeading={CurrencyDollarCircle}>
                            Deposit
                        </Button>
                        <Button color="primary" size="md" iconLeading={Send01}>
                            Send funds
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <RangeTabs label="Reporting period" />

                    <div className="ms-auto flex flex-wrap items-center gap-3">
                        <Button color="secondary" size="md" iconLeading={CalendarIcon}>
                            Select dates
                        </Button>
                        <Button color="secondary" size="md" iconLeading={FilterLines}>
                            Filters
                        </Button>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
                    {accounts.map((account) => (
                        <section key={account.title} className={cx(styles.card, "relative flex items-center gap-5 px-4 py-5 md:px-6")}>
                            <DonutChart
                                label={`${account.title} share of total balance`}
                                className="size-24 shrink-0"
                                data={[
                                    { name: "This account", value: account.share, className: "fill-utility-brand-600" },
                                    { name: "Other accounts", value: 100 - account.share, className: "fill-utility-neutral-300" },
                                ]}
                            />

                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <h2 className={styles.cardTitle}>{account.title}</h2>
                                <p className={styles.caption}>Current balance</p>
                                <div className="flex flex-wrap items-baseline gap-2">
                                    <span className="text-display-sm text-primary font-semibold">{account.balance}</span>
                                    <span className="text-success-primary text-sm font-medium">↑ {account.change}</span>
                                </div>
                            </div>

                            <div className="absolute end-4 top-4 md:end-5 md:top-5">
                                <CardMenu />
                            </div>
                        </section>
                    ))}
                </div>

                <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
                    <div className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
                        <ChartCard title="Balance over time" actions={<CardMenu />}>
                            <StackedBarChart label="Balance by month" className="h-56" />
                        </ChartCard>

                        <ChartCard
                            title="Your cards"
                            actions={<CardMenu />}
                            footer={
                                <Button color="secondary" size="md">
                                    Manage cards
                                </Button>
                            }
                        >
                            <div className="flex flex-wrap gap-6">
                                {cards.map((card, index) => (
                                    <div key={index} className="flex min-w-[240px] flex-1 flex-col gap-3">
                                        <CreditCard type="brand-dark" width={260} cardHolder={card.holder} company="Proper UI." />
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-tertiary text-sm font-medium">Spending this month</span>
                                            <span className="text-primary text-sm font-medium">{card.spend}</span>
                                        </div>
                                        <ProgressBarBase value={card.progress} />
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </div>

                    <ChartCard
                        title="Recent deposits"
                        actions={<CardMenu />}
                        footer={
                            <Button color="secondary" size="md">
                                Show more
                            </Button>
                        }
                        className="lg:w-96 lg:shrink-0"
                    >
                        <ul className="flex flex-col gap-4">
                            {deposits.map((deposit) => (
                                <li key={deposit.id} className="flex items-center gap-3">
                                    <deposit.icon aria-hidden="true" className="h-6 w-auto shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-primary truncate text-sm font-medium">{deposit.title}</p>
                                        <p className="text-tertiary truncate text-sm">{deposit.subtitle}</p>
                                    </div>
                                    <span className="text-success-primary text-sm font-medium whitespace-nowrap">+ ${deposit.amount}</span>
                                </li>
                            ))}
                        </ul>
                    </ChartCard>
                </div>
            </div>
        </main>
    </div>
);
