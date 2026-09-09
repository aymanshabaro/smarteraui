"use client";

import { Edit01 } from "@smarteraui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { avatar } from "@/utils/demo-assets";
import { TrendChart } from "./charts.a";
import type { FanRow } from "./data.a";
import { biggestFans, dailySeries, favoriteDesigners } from "./data.a";
import { DashboardHeader, DashboardMain, DashboardSection } from "./shell.a";
import { PanelMenu, SegmentTabs } from "./widgets.a";

const owner = avatar(0);

const lists: { title: string; rows: FanRow[] }[] = [
    { title: "Biggest fans", rows: biggestFans },
    { title: "Favorite designers", rows: favoriteDesigners },
];

/** User stats profile: a profile-views chart above the biggest-fans and favorite-designers lists. */
export const Dashboard19 = () => (
    <div className="bg-primary">
        <DashboardHeader account="button" search />

        <DashboardMain>
            <DashboardSection>
                <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
                    <h1 className="text-primary flex-1 text-xl font-semibold">Stats for {owner.name}</h1>

                    <div className="flex gap-3">
                        <Button color="secondary" size="md">
                            Messages
                        </Button>
                        <Button color="primary" size="md">
                            Edit
                        </Button>
                    </div>
                </div>
            </DashboardSection>

            <DashboardSection className="gap-6">
                <div className="border-secondary flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row lg:items-center">
                    <h2 className="text-md text-primary font-semibold">Profile views</h2>
                    <SegmentTabs label="Profile views period" type="button-border" selectedKey="30 days" items={["12 months", "30 days", "7 days"]} />
                </div>

                <TrendChart
                    className="h-60"
                    data={dailySeries}
                    xKey="day"
                    yAxisLabel="Profile views"
                    series={[
                        { key: "A", name: "This period" },
                        { key: "B", name: "Previous period" },
                    ]}
                />
            </DashboardSection>

            <DashboardSection className="gap-8 md:flex-row md:flex-wrap">
                {lists.map((list) => (
                    <section key={list.title} className="flex flex-1 flex-col gap-2 md:min-w-80">
                        <div className="border-secondary flex items-start justify-between border-b pb-5">
                            <h2 className="text-md text-primary font-semibold">{list.title}</h2>
                            <PanelMenu />
                        </div>

                        <ul aria-label={list.title} className="flex flex-col">
                            {list.rows.map((row) => (
                                <li key={row.name} className="border-secondary flex items-center gap-3 border-b py-4">
                                    <Avatar size="lg" src={row.src} alt="" />

                                    <div className="min-w-0 flex-1">
                                        <p className="text-secondary truncate text-sm font-medium">{row.name}</p>
                                        <p className="text-tertiary truncate text-sm">{row.username}</p>
                                    </div>

                                    <span className="text-tertiary text-sm whitespace-nowrap">{row.likes} likes</span>
                                    <ButtonUtility size="xs" color="tertiary" tooltip={`Edit ${row.name}`} icon={Edit01} />
                                </li>
                            ))}
                        </ul>

                        <Button color="link-gray" size="md" href="#" className="self-end">
                            View all
                        </Button>
                    </section>
                ))}
            </DashboardSection>
        </DashboardMain>
    </div>
);
