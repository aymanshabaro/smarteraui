"use client";

import type { FC } from "react";
import { BarChartSquare02, Heart, HomeLine, LayoutAlt01, Map01, MarkerPin01, Rows01, SearchLg, Settings01, Stars01, Users01, Wifi } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import type { NavItemType } from "../../application/app-navigation/config";
import { SidebarNavigationSlim } from "../../application/app-navigation/sidebar-navigation/sidebar-slim";
import { DateRangePicker } from "../../application/date-picker/date-range-picker";
import { PaginationPageMinimalCenter } from "../../application/pagination/pagination";
import { BadgeWithIcon } from "../../base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "../../base/button-group/button-group";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { Select } from "../../base/select/select";
import type { SelectItemType } from "../../base/select/select-shared";
import { RatingStars } from "../../foundations/rating/rating-stars";

const navItems: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
    { label: "Stays", href: "/stays", icon: Rows01 },
    { label: "Saved", href: "/saved", icon: Heart },
    { label: "Trips", href: "/trips", icon: Map01 },
    { label: "Guests", href: "/guests", icon: Users01 },
];

const footerItems: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    { label: "Reporting", href: "/reporting", icon: LayoutAlt01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

const cityOptions: SelectItemType[] = [
    { id: "melbourne", label: "Melbourne, AU" },
    { id: "canberra", label: "Canberra, AU" },
    { id: "brisbane", label: "Brisbane, AU" },
    { id: "sydney", label: "Sydney, AU" },
];

const priceOptions: SelectItemType[] = [
    { id: "100", label: "< $100" },
    { id: "250", label: "< $250" },
    { id: "500", label: "< $500" },
    { id: "1000", label: "< $1000" },
];

interface Stay {
    id: string;
    category: string;
    title: string;
    rating: number;
    reviews: number;
    suburb: string;
    beds: string;
    price: string;
    image: (typeof IMAGES.landscape)[number];
    isRareFind?: boolean;
}

const stays: Stay[] = [
    {
        id: "stay-01",
        category: "Entire apartment rental in Collingwood",
        title: "A Stylish Apt, 5 min walk to Queen Victoria Market",
        rating: 4.9,
        reviews: 202,
        suburb: "Collingwood VIC",
        beds: "1 bed",
        price: "$540",
        image: IMAGES.landscape[0]!,
        isRareFind: true,
    },
    {
        id: "stay-02",
        category: "Entire loft in central business district",
        title: "Designer NY style loft",
        rating: 4.8,
        reviews: 44,
        suburb: "Melbourne VIC",
        beds: "1 bed",
        price: "$620",
        image: IMAGES.landscape[1]!,
    },
    {
        id: "stay-03",
        category: "Entire rental unit in Carlton",
        title: "5 minute walk from University of Melbourne",
        rating: 4.7,
        reviews: 82,
        suburb: "Carlton VIC",
        beds: "1 bed",
        price: "$490",
        image: IMAGES.landscape[2]!,
    },
    {
        id: "stay-04",
        category: "Entire apartment rental in Collingwood",
        title: "Magnificent apartment next to public transport",
        rating: 4.8,
        reviews: 12,
        suburb: "Collingwood VIC",
        beds: "1 bed",
        price: "$600",
        image: IMAGES.landscape[3]!,
    },
];

const PageHeading = () => (
    <div>
        <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
            <div className="flex flex-1 flex-col gap-0.5">
                <h1 className="text-primary text-xl font-semibold">232 stays in Melbourne</h1>
                <p className="text-tertiary text-md">Book your next stay at one of our properties.</p>
            </div>

            <div className="flex flex-row gap-3">
                <Button color="secondary" size="md">
                    Share
                </Button>
                <Button color="primary" size="md" iconLeading={Stars01}>
                    Save search
                </Button>
            </div>
        </div>
    </div>
);

const StayCard = ({ stay }: { stay: Stay }) => (
    <article className="bg-primary ring-secondary flex flex-col overflow-hidden rounded-2xl shadow-xs ring-1 ring-inset xl:flex-row xl:gap-5 xl:p-4">
        <div className="relative h-44 w-full overflow-hidden xl:h-36 xl:w-50 xl:rounded-lg">
            <img
                src={stay.image.src}
                alt={stay.title}
                className="outline-secondary_alt h-full w-full object-cover outline-1 -outline-offset-1 max-xl:rounded-t-2xl"
            />

            {stay.isRareFind && (
                <div className="absolute start-2 bottom-2">
                    <BadgeWithIcon size="sm" color="brand" type="pill-color" iconLeading={Stars01}>
                        Rare find
                    </BadgeWithIcon>
                </div>
            )}

            <div className="absolute end-2 bottom-2 lg:hidden">
                <Button color="secondary" size="sm" iconLeading={Heart} aria-label={`Save ${stay.title}`} />
            </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-5 xl:p-0 xl:pt-0">
            <div className="flex items-end gap-2 xl:hidden">
                <span className="text-primary text-xl font-semibold">{stay.price}</span>
                <span className="text-tertiary text-md pb-0.5">AUD total</span>
            </div>

            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <a href={`/stays/${stay.id}`} className="text-brand-secondary text-sm font-semibold">
                        {stay.category}
                    </a>
                    <p className="text-primary text-lg font-semibold">{stay.title}</p>
                </div>

                <div className="hidden xl:block">
                    <Button color="secondary" size="sm" iconLeading={Heart} aria-label={`Save ${stay.title}`} />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <RatingStars rating={stay.rating} className="flex gap-1" />
                <div className="flex items-center gap-2">
                    <span className="text-primary text-md font-medium">{stay.rating}</span>
                    <span className="text-tertiary text-md">{stay.reviews} reviews</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <MarkerPin01 aria-hidden="true" className="text-fg-quaternary size-5" />
                        <span className="text-tertiary text-md font-medium">{stay.suburb}</span>
                    </div>
                    <div className="hidden items-center gap-2 xl:flex">
                        <HomeLine aria-hidden="true" className="text-fg-quaternary size-5" />
                        <span className="text-tertiary text-md font-medium">{stay.beds}</span>
                    </div>
                    <div className="hidden items-center gap-2 xl:flex">
                        <Wifi aria-hidden="true" className="text-fg-quaternary size-5" />
                        <span className="text-tertiary text-md font-medium">Wi-Fi</span>
                    </div>
                </div>

                <div className="hidden items-end gap-2 xl:flex">
                    <span className="text-primary text-xl font-semibold">{stay.price}</span>
                    <span className="text-tertiary text-md">AUD total</span>
                </div>
            </div>
        </div>
    </article>
);

/** Informational page 16 — property search results beside a sticky map panel. */
export const Informational16 = () => (
    <div className="bg-primary flex flex-col lg:flex-row">
        <SidebarNavigationSlim activeUrl="/stays" items={navItems} footerItems={footerItems} />

        <main className="flex min-w-0 flex-1 flex-col gap-y-8 lg:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-8 pt-5 pb-12 lg:order-1 lg:pt-8">
                <div className="flex flex-col gap-5 px-4 lg:px-8">
                    <PageHeading />

                    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-start">
                        <Select
                            size="md"
                            aria-label="City"
                            placeholder="Melbourne, AU"
                            defaultSelectedKey="melbourne"
                            items={cityOptions}
                            className="w-full lg:max-w-50"
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <DateRangePicker />

                        <Select size="md" aria-label="Price" placeholder="Any price" items={priceOptions} className="w-full lg:max-w-40">
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>

                        <Button color="secondary" size="md" className="max-h-9 w-full lg:ms-auto lg:w-auto">
                            More filters
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row">
                        <Input shortcut size="md" aria-label="Search stays" placeholder="Search" icon={SearchLg} className="min-w-0 flex-1" />

                        <div className="flex gap-3">
                            <Button color="link-gray" size="md">
                                Clear
                            </Button>
                            <Button color="primary" size="md" className="hidden lg:inline-flex">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 px-4 lg:px-8">
                    <div className="flex justify-between">
                        <ButtonGroup size="md" defaultSelectedKeys={["date"]} aria-label="Sort stays">
                            <ButtonGroupItem id="date">Sort by date</ButtonGroupItem>
                            <ButtonGroupItem id="price">Sort by price</ButtonGroupItem>
                        </ButtonGroup>

                        <ButtonGroup size="md" defaultSelectedKeys={["list"]} aria-label="Result layout">
                            <ButtonGroupItem id="list" iconLeading={Rows01} aria-label="List view" />
                            <ButtonGroupItem id="map" iconLeading={MarkerPin01} aria-label="Map view" />
                        </ButtonGroup>
                    </div>

                    <div className="flex flex-col gap-4">
                        {stays.map((stay) => (
                            <StayCard key={stay.id} stay={stay} />
                        ))}
                    </div>

                    <PaginationPageMinimalCenter page={1} total={10} />
                </div>
            </div>

            <div className="top-0 hidden w-full max-w-lg p-3 lg:sticky lg:order-0 lg:block lg:h-svh">
                <img src={IMAGES.landscape[4]!.src} alt="Map of stays in Melbourne" className="ring-secondary h-full w-full rounded-lg object-cover ring-1" />
            </div>
        </main>
    </div>
);
