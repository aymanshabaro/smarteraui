"use client";

import { DownloadCloud01, FilterLines, LayoutAlt01, SearchLg } from "@properui/icons";
import { PaginationCardMinimal } from "../../application/pagination/pagination";
import { TableCard } from "../../application/table/table";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { RadarChart, StackedBarChart } from "./charts.a";
import { stackedSeries, vendorRadar, vendors } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { PanelMenu, VendorTable, styles } from "./widgets.a";

/** Organization overview: a vendor radar and rating comparison chart above the vendor movements table. */
export const Dashboard08 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <DashboardMain className="pb-16 lg:pb-24">
            <DashboardSection className="justify-between gap-4 lg:flex-row">
                <h1 className="text-primary text-xl font-semibold">Organization overview</h1>

                <div className="flex gap-3">
                    <Button color="secondary" size="md" iconLeading={FilterLines}>
                        Filters
                    </Button>
                    <Button color="secondary" size="md" iconLeading={LayoutAlt01}>
                        Customize
                    </Button>
                    <Button color="secondary" size="md" iconLeading={DownloadCloud01}>
                        Export
                    </Button>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-6 lg:flex-row">
                <section className={`${styles.panel.root} flex flex-col lg:w-110`}>
                    <div className="flex flex-col gap-1 px-4 py-5 lg:p-6">
                        <div className="flex items-start justify-between pb-5">
                            <h2 className="text-primary text-md font-semibold">Vendor breakdown</h2>
                            <PanelMenu />
                        </div>

                        <RadarChart className="h-74 lg:h-93" data={vendorRadar} />
                    </div>

                    <div className="border-secondary flex justify-end border-t px-4 py-3 lg:px-6 lg:py-4">
                        <Button color="secondary" size="md">
                            View full report
                        </Button>
                    </div>
                </section>

                <section className={`${styles.panel.root} flex flex-1 flex-col gap-1 px-4 py-5 lg:p-6`}>
                    <div className="flex items-start justify-between pb-5">
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-primary text-md font-semibold">Average vendor rating</h2>
                            <p className="text-tertiary text-sm">Track how your rating compares to your industry average.</p>
                        </div>
                        <PanelMenu />
                    </div>

                    <StackedBarChart
                        legend
                        className="h-70"
                        data={stackedSeries}
                        xKey="month"
                        yAxisLabel="Security rating"
                        series={[
                            { key: "A", name: "Your rating" },
                            { key: "B", name: "Industry average" },
                            { key: "C", name: "Peer group" },
                        ]}
                    />
                </section>
            </DashboardSection>

            <DashboardSection className="gap-4 lg:gap-6">
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-primary text-md font-semibold">Vendor movements</h2>
                        <p className="text-tertiary text-sm">Keep track of vendors and their security ratings.</p>
                    </div>

                    <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" className="hidden max-w-70 lg:flex" />
                </div>

                <div className="flex flex-col gap-3 lg:hidden">
                    <Input shortcut aria-label="Search vendors" placeholder="Search" icon={SearchLg} size="md" />
                    <Button color="secondary" size="lg" iconLeading={FilterLines}>
                        More filters
                    </Button>
                </div>

                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                    <VendorTable rows={vendors} />
                    <PaginationCardMinimal align="center" page={1} total={10} />
                </TableCard.Root>
            </DashboardSection>
        </DashboardMain>
    </div>
);
