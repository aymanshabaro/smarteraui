"use client";

import { DownloadCloud01, LayoutAlt01, Plus, SearchLg, UploadCloud02, Zap } from "@properui/icons";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics-base";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles";
import { LOGOS, avatar } from "@/utils/demo-assets";
import { TrendChart } from "./charts.a";
import { trendSeries, vendors } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { FiltersButton, PanelMenu, SegmentTabs, VendorTable, styles } from "./widgets.a";

/** Vendor dashboard: a rating trend panel, a monitored-vendors gauge and the vendor movements table. */
export const Dashboard09 = () => (
    <div className="bg-primary">
        <DashboardHeader account="card" search settings={false} />

        <DashboardMain className="pb-16 lg:pb-24">
            <DashboardSection className="justify-between gap-4 lg:flex-row">
                <h1 className="text-primary text-xl font-semibold">Welcome back, {avatar(0).name.split(" ")[0]}</h1>

                <div className="flex gap-3">
                    <Button color="tertiary" size="md" iconLeading={SearchLg} aria-label="Search" className="max-lg:order-last" />
                    <Button color="secondary" size="md" iconLeading={LayoutAlt01}>
                        Customize
                    </Button>
                    <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                        Export
                    </Button>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-6 lg:flex-row">
                <section className={`${styles.panel.root} flex flex-1 flex-col`}>
                    <div className="border-secondary flex justify-between gap-4 border-b px-4 py-5 lg:px-6">
                        <div className="flex gap-2">
                            <Avatar size="lg" src={LOGOS[0].src} alt="" />
                            <div className="flex flex-col">
                                <h2 className="text-primary text-md font-semibold">Vendor breakdown</h2>
                                <p className="text-tertiary text-sm">Keep track of vendors and their security ratings.</p>
                            </div>
                        </div>
                        <PanelMenu />
                    </div>

                    <div className="px-4 py-5 lg:p-6">
                        <TrendChart
                            className="h-60 lg:h-74"
                            data={trendSeries}
                            xKey="month"
                            yAxisLabel="Security rating"
                            series={[
                                { key: "A", name: "Your rating" },
                                { key: "B", name: "Industry average" },
                            ]}
                        />
                    </div>

                    <div className="border-secondary mt-auto flex justify-end border-t px-4 py-3 lg:px-6 lg:py-4">
                        <Button color="secondary" size="md">
                            View full report
                        </Button>
                    </div>
                </section>

                <section className={`${styles.panel.root} flex flex-col lg:w-90`}>
                    <div className="border-secondary flex justify-between gap-4 border-b px-4 py-5 lg:px-6">
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-primary text-md font-semibold">Vendors monitored</h2>
                            <p className="text-tertiary text-sm">You&apos;re using 80% of available spots.</p>
                        </div>
                        <PanelMenu />
                    </div>

                    <div className="flex flex-col gap-6 p-6 lg:gap-8">
                        <div className="flex items-start justify-between">
                            <ProgressBarCircle size="xs" value={80} valueFormatter={() => "240"} />
                            <MetricChangeIndicator>10%</MetricChangeIndicator>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-primary text-md font-medium">You&apos;ve almost reached your limit</p>
                            <p className="text-tertiary text-sm">You have used 80% of your available spots. Upgrade plan to monitor more vendors.</p>
                        </div>
                    </div>

                    <div className="border-secondary flex justify-end border-t px-4 py-3 lg:px-6 lg:py-4">
                        <Button color="secondary" size="md" iconLeading={Zap}>
                            Upgrade plan
                        </Button>
                    </div>
                </section>
            </DashboardSection>

            <DashboardSection>
                <TableCard.Root className="-mx-4 rounded-none ring-0 lg:mx-0 lg:rounded-xl lg:ring-1">
                    <TableCard.Header
                        className="border-b-0 py-0 lg:border-b lg:py-5"
                        title="Vendor movements"
                        badge={
                            <span className="bg-primary text-secondary ring-primary hidden rounded-md px-1.5 py-0.5 text-xs font-medium shadow-xs ring-1 ring-inset lg:inline-flex">
                                240 vendors
                            </span>
                        }
                        description="Keep track of vendor and their security ratings."
                        contentTrailing={
                            <div className="flex gap-3">
                                <Button color="secondary" size="md" iconLeading={UploadCloud02}>
                                    Import
                                </Button>
                                <Button color="primary" size="md" iconLeading={Plus}>
                                    Add vendor
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-secondary bg-primary border-b px-4 py-3 lg:px-6">
                        <div className="flex flex-wrap gap-3 max-md:flex-col">
                            <SegmentTabs label="Vendor status" items={["View all", "Active", "Archived"]} />

                            <div className="flex shrink-0 items-center gap-3 max-md:w-full md:ms-auto">
                                <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="min-w-0 max-md:flex-1 md:w-70" />
                                <FiltersButton />
                            </div>
                        </div>
                    </div>

                    <VendorTable rows={vendors} />
                    <PaginationCardMinimal align="right" page={1} total={10} />
                </TableCard.Root>
            </DashboardSection>
        </DashboardMain>
    </div>
);
