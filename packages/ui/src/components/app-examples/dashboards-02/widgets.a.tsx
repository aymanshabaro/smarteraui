"use client";

// Small composites the `dashboards-02` variants repeat: the period toggle, the toolbar row, the
// panel shell and the avatar lists.
// TODO(orchestrator): candidate for components/internal if other page examples repeat them.
import type { ReactNode } from "react";
import { Edit01, FilterLines, Trash01 } from "@smarteraui/icons";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics-base";
import { Table } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { cx, sortCx } from "@/utils/cx";
import type { VendorRow } from "./data.a";

export const styles = sortCx({
    /** The raised white card every dashboard panel sits in. */
    panel: { root: "bg-primary ring-secondary rounded-xl shadow-xs ring-1 ring-inset" },
    /** Section title + optional trailing controls. */
    panelHeader: { root: "flex flex-wrap items-start justify-between gap-4 px-4 pt-5 pb-4 md:px-5" },
});

/** The four periods every dashboard toolbar offers, with the abbreviations used below `md`. */
const periods = [
    { id: "12-months", long: "12 months", short: "12m" },
    { id: "30-days", long: "30 days", short: "30d" },
    { id: "7-days", long: "7 days", short: "7d" },
    { id: "24-hours", long: "24 hours", short: "24h" },
];

interface PeriodTabsProps {
    /** Which period reads as selected. @default "30-days" */
    selectedKey?: string;
    /** Accessible name for the tab list. */
    label?: string;
    className?: string;
}

/** The "12 months / 30 days / 7 days / 24 hours" segmented control. */
export const PeriodTabs = ({ selectedKey = "30-days", label = "Time period", className }: PeriodTabsProps) => (
    <Tabs defaultSelectedKey={selectedKey} className={cx("w-auto", className)}>
        <TabList type="button-minimal" size="sm" aria-label={label} className="w-max">
            {periods.map((period) => (
                <Tabs.Item key={period.id} id={period.id}>
                    <span className="max-md:hidden">{period.long}</span>
                    <span className="md:hidden">{period.short}</span>
                </Tabs.Item>
            ))}
        </TabList>

        {/* These controls only re-scope the panel they sit above, so the panels stay empty —
            but they have to exist, otherwise every tab's `aria-controls` dangles. */}
        {periods.map((period) => (
            <Tabs.Panel key={period.id} id={period.id} />
        ))}
    </Tabs>
);

interface SegmentTabsProps {
    /** Tab labels, in order. The first one is selected unless `selectedKey` says otherwise. */
    items: string[];
    /** Label of the tab that reads as selected. */
    selectedKey?: string;
    /** Accessible name for the tab list. */
    label: string;
    /** Visual treatment. @default "button-minimal" */
    type?: "button-minimal" | "button-border" | "underline";
    className?: string;
}

/** A generic segmented control — "View all / Public / Private", "All orders / Paid / Refunded"… */
export const SegmentTabs = ({ items, selectedKey, label, type = "button-minimal", className }: SegmentTabsProps) => (
    <Tabs defaultSelectedKey={selectedKey ?? items[0]} className={cx("w-auto", className)}>
        <TabList type={type} size="sm" aria-label={label} className="w-max">
            {items.map((item) => (
                <Tabs.Item key={item} id={item}>
                    {item}
                </Tabs.Item>
            ))}
        </TabList>

        {/* Empty panels, for the same reason as in `PeriodTabs`. */}
        {items.map((item) => (
            <Tabs.Panel key={item} id={item} />
        ))}
    </Tabs>
);

/** The "Filters" button that closes most dashboard toolbars. */
export const FiltersButton = ({ count }: { count?: number }) => (
    <Button size="md" color="secondary" iconLeading={FilterLines}>
        <span className="flex items-center gap-1.5">
            Filters
            {count != null && <span className="text-quaternary ring-secondary rounded px-1 py-px text-xs font-medium ring-1 ring-inset">{count}</span>}
        </span>
    </Button>
);

/** The overflow menu pinned to the top-right corner of a panel. */
export const PanelMenu = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-min">
            <Dropdown.Menu>
                <Dropdown.Item icon={Edit01}>
                    <span className="pe-4">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item icon={Trash01}>
                    <span className="pe-4">Remove</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

/** The delete/edit pair that closes every table row on this page. */
export const RowActions = () => (
    <div className="flex justify-end gap-0.5">
        <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
        <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
    </div>
);

interface PanelProps {
    /** Panel heading. Omit to render a bare card. */
    title?: ReactNode;
    /** Supporting copy under the heading. */
    description?: ReactNode;
    /** Controls pinned to the end of the header row. */
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
    /** Extra classes for the body region. */
    contentClassName?: string;
}

/** A titled card panel — the shell most dashboard widgets sit in. */
export const Panel = ({ title, description, actions, children, className, contentClassName }: PanelProps) => (
    <section className={cx(styles.panel.root, "flex flex-col", className)}>
        {(title || actions) && (
            <div className={styles.panelHeader.root}>
                <div className="flex min-w-0 flex-col gap-0.5">
                    {title && <h2 className="text-md text-primary font-semibold">{title}</h2>}
                    {description && <p className="text-tertiary text-sm">{description}</p>}
                </div>
                {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
            </div>
        )}
        <div className={cx("flex flex-1 flex-col", contentClassName)}>{children}</div>
    </section>
);

interface FramedPanelProps {
    /** Caption printed on the tinted plate behind the raised panel. */
    title: ReactNode;
    children: ReactNode;
    className?: string;
    /** Extra classes for the raised inner panel. */
    contentClassName?: string;
}

/**
 * The two-layer panel the ecommerce dashboard uses: a tinted plate carrying the caption with a
 * raised white panel sitting on top of it.
 */
export const FramedPanel = ({ title, children, className, contentClassName }: FramedPanelProps) => (
    <section className={cx("bg-secondary ring-secondary flex flex-col gap-0.5 overflow-hidden rounded-xl shadow-xs ring-1 ring-inset", className)}>
        <div className="flex gap-4 px-4 pt-3 pb-2 md:px-5">
            <h2 className="text-primary text-sm font-semibold">{title}</h2>
        </div>
        <div className={cx("bg-primary ring-secondary flex flex-col rounded-xl ring-1 ring-inset", contentClassName)}>{children}</div>
    </section>
);

/** The vendor security-rating table shared by the organization and vendor dashboards. */
export const VendorTable = ({ rows }: { rows: VendorRow[] }) => (
    <div className="overflow-x-auto">
        <Table
            aria-label="Vendor movements"
            selectionMode="multiple"
            defaultSelectedKeys={rows.filter((row) => row.rating !== 38 && row.rating !== 42).map((row) => row.name)}
        >
            <Table.Header className="bg-secondary">
                <Table.Head id="name" label="Vendor" isRowHeader allowsSorting className="w-full" />
                <Table.Head id="rating" label="Rating" allowsSorting className="min-w-55" />
                <Table.Head id="change">
                    <span className="sr-only">Change</span>
                </Table.Head>
                <Table.Head id="lastAssessed" label="Last assessed" allowsSorting />
                <Table.Head id="categories" label="Categories" />
                <Table.Head id="actions">
                    <span className="sr-only">Actions</span>
                </Table.Head>
            </Table.Header>

            <Table.Body items={rows}>
                {(item) => (
                    <Table.Row id={item.name}>
                        <Table.Cell>
                            <div className="flex items-center gap-3 whitespace-nowrap">
                                <Avatar src={item.logo} alt="" size="md" />
                                <div>
                                    <p className="text-primary text-sm font-medium">{item.name}</p>
                                    <p className="text-tertiary text-sm">{item.website}</p>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <ProgressBar value={item.rating} labelPosition="right" valueFormatter={() => String(item.rating)} />
                        </Table.Cell>
                        <Table.Cell>
                            <MetricChangeIndicator trend={item.trend}>{item.change}</MetricChangeIndicator>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{item.lastAssessed}</Table.Cell>
                        <Table.Cell>
                            <div className="flex gap-1">
                                <BadgeWithDot size="sm" type="pill-color" color={item.active ? "success" : "gray"}>
                                    {item.active ? "Active" : "Inactive"}
                                </BadgeWithDot>
                                {item.categories.map((category) => (
                                    <Badge key={category} size="sm" type="pill-color" color={category === "Financials" ? "pink" : "blue"}>
                                        {category}
                                    </Badge>
                                ))}
                                {item.extra > 0 && (
                                    <Badge size="sm" type="pill-color" color="gray">
                                        +{item.extra}
                                    </Badge>
                                )}
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
);

export interface PersonRowItem {
    name: string;
    src: string;
    /** Secondary line — a handle, a date, or a "Purchased X" sentence. */
    detail: ReactNode;
    online?: boolean;
    /** Content pinned to the end of the row, e.g. a like count. */
    trailing?: ReactNode;
}

/** The avatar + two-line label list used by "Top members", "Biggest fans" and the activity feeds. */
export const PersonList = ({ items, label, className }: { items: PersonRowItem[]; label: string; className?: string }) => (
    <ul aria-label={label} className={cx("flex flex-col gap-5", className)}>
        {items.map((item, index) => (
            <li key={`${item.name}-${index}`} className="flex items-center gap-3">
                <Avatar size="sm" src={item.src} alt="" status={item.online ? "online" : undefined} />
                <div className="min-w-0 flex-1">
                    <p className="text-secondary truncate text-sm font-medium">{item.name}</p>
                    <p className="text-tertiary truncate text-sm">{item.detail}</p>
                </div>
                {item.trailing}
            </li>
        ))}
    </ul>
);
