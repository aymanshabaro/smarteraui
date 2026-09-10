"use client";

import { BookmarkAdd, CurrencyDollar, FilterLines, Home02, List, Map01, MarkerPin02, SearchLg, Wifi, Zap } from "@properui/icons";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { TablePaginationNumbered } from "@/components/application/table/table-pagination";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import type { SelectItemType } from "@/components/base/select/select-shared";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { IMAGES } from "@/utils/demo-assets";
import { AppHeader, productNavItems } from "./shell.a";

const navItems = [...productNavItems.slice(0, 5), { label: "Bookings", href: "/bookings" }];

const cityOptions: SelectItemType[] = [
    { id: "melbourne", label: "Melbourne, AU", icon: <img src="/flags/AU.svg" alt="" className="size-5 rounded-full object-cover" /> },
    { id: "canberra", label: "Canberra, AU", icon: <img src="/flags/AU.svg" alt="" className="size-5 rounded-full object-cover" /> },
    { id: "brisbane", label: "Brisbane, AU", icon: <img src="/flags/AU.svg" alt="" className="size-5 rounded-full object-cover" /> },
    { id: "sydney", label: "Sydney, AU", icon: <img src="/flags/AU.svg" alt="" className="size-5 rounded-full object-cover" /> },
];

const priceOptions: SelectItemType[] = [
    { id: "100", label: "< $100", icon: CurrencyDollar },
    { id: "250", label: "< $250", icon: CurrencyDollar },
    { id: "500", label: "< $500", icon: CurrencyDollar },
    { id: "1000", label: "< $1000", icon: CurrencyDollar },
];

interface Listing {
    id: string;
    kind: string;
    title: string;
    rating: number;
    reviews: number;
    location: string;
    price: string;
    image: (typeof IMAGES.landscape)[number];
    isRareFind?: boolean;
}

const listings: Listing[] = [
    {
        id: "listing-01",
        kind: "Entire apartment rental in Collingwood",
        title: "A Stylish Apt, 5 min walk to Queen Victoria Market",
        rating: 4.9,
        reviews: 202,
        location: "Collingwood VIC",
        price: "$540",
        image: IMAGES.landscape[0]!,
        isRareFind: true,
    },
    {
        id: "listing-02",
        kind: "Entire loft in central business district",
        title: "Designer NY style loft",
        rating: 4.8,
        reviews: 44,
        location: "Melbourne VIC",
        price: "$620",
        image: IMAGES.landscape[1]!,
    },
    {
        id: "listing-03",
        kind: "Entire rental unit in Carlton",
        title: "5 minute walk from University of Melbourne",
        rating: 4.7,
        reviews: 82,
        location: "Carlton VIC",
        price: "$490",
        image: IMAGES.landscape[2]!,
    },
    {
        id: "listing-04",
        kind: "Entire apartment rental in Collingwood",
        title: "Magnificent apartment next to public transport",
        rating: 4.8,
        reviews: 12,
        location: "Collingwood VIC",
        price: "$600",
        image: IMAGES.landscape[3]!,
    },
];

/** Informational page 16 — a property search results page with a filter bar, a map panel and stacked listing cards. */
export const Informational16 = () => (
    <div className="bg-primary flex flex-col">
        <AppHeader activeUrl="/bookings" items={navItems} />

        <main className="max-w-container mx-auto flex w-full flex-1 flex-col gap-y-8">
            <div className="relative flex flex-1 flex-col gap-y-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="px-4 lg:px-8">
                    <div className="border-secondary flex flex-col gap-4 border-b pb-4 lg:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <h1 className="text-primary text-xl font-semibold">232 stays in Melbourne</h1>
                            <p className="text-tertiary text-md">Book your next stay at one of our properties.</p>
                        </div>

                        <div className="flex flex-row gap-3">
                            <Button color="secondary" size="md">
                                Share
                            </Button>
                            <Button color="primary" size="md" iconLeading={BookmarkAdd}>
                                Save search
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 px-4 lg:gap-6 lg:px-8">
                    <div className="flex flex-col gap-y-3 lg:gap-y-4">
                        <div className="flex flex-wrap justify-between gap-3">
                            <div className="hidden gap-3 lg:flex">
                                <Select size="sm" aria-label="Cities" defaultSelectedKey="melbourne" items={cityOptions} className="w-50">
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>

                                <DateRangePicker />

                                <Select size="sm" aria-label="Prices" defaultSelectedKey="100" items={priceOptions} className="w-42.5">
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>

                            <Button color="secondary" size="md" className="max-h-9 w-full lg:w-auto" iconLeading={FilterLines}>
                                <span className="hidden lg:inline">More filters</span>
                                <span className="inline lg:hidden">2 filters applied</span>
                            </Button>
                        </div>

                        <div className="order-first flex gap-3 lg:order-none">
                            <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} className="w-full" />

                            <Button color="secondary" size="md" className="hidden lg:inline-flex">
                                Clear
                            </Button>
                            <Button color="primary" size="md" className="hidden lg:inline-flex">
                                Search
                            </Button>
                        </div>
                    </div>

                    <div className="order-first h-90 w-full lg:order-none">
                        <img src={IMAGES.landscape[4]!.src} alt="Map of Melbourne" className="ring-secondary h-full w-full rounded-lg object-cover ring-1" />
                    </div>
                </div>

                <div className="flex flex-col gap-6 px-4 lg:px-8">
                    <div className="flex justify-between">
                        <ButtonGroup size="md" defaultSelectedKeys={["date"]} aria-label="Sort listings">
                            <ButtonGroupItem id="date">Sort by date</ButtonGroupItem>
                            <ButtonGroupItem id="price">Sort by price</ButtonGroupItem>
                        </ButtonGroup>

                        <ButtonGroup size="md" defaultSelectedKeys={["list"]} aria-label="Results layout">
                            <ButtonGroupItem id="list" aria-label="List view" iconLeading={List} />
                            <ButtonGroupItem id="map" aria-label="Map view" iconLeading={Map01} />
                        </ButtonGroup>
                    </div>

                    <div className="flex flex-col gap-4">
                        {listings.map((listing) => (
                            <article
                                key={listing.id}
                                className="bg-primary ring-secondary flex flex-col overflow-hidden rounded-2xl shadow-xs ring-1 ring-inset xl:flex-row xl:gap-5 xl:p-4"
                            >
                                <div className="relative h-44 w-full overflow-hidden xl:h-36 xl:w-50 xl:rounded-lg">
                                    <img src={listing.image.src} alt="" className="h-full w-full object-cover" />

                                    {listing.isRareFind && (
                                        <BadgeWithIcon size="sm" type="pill-color" color="brand" iconLeading={Zap} className="absolute start-2 bottom-2">
                                            Rare find
                                        </BadgeWithIcon>
                                    )}

                                    <Button
                                        color="secondary"
                                        size="sm"
                                        aria-label="Save listing"
                                        iconLeading={BookmarkAdd}
                                        className="absolute end-2 bottom-2 block lg:hidden"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col gap-4 p-4 pt-5 xl:p-0 xl:pt-0">
                                    <div className="flex items-end gap-2 xl:hidden">
                                        <span className="text-primary text-xl font-semibold">{listing.price}</span>
                                        <span className="text-tertiary text-md pb-0.5">AUD total</span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <div className="flex flex-col gap-1">
                                            <a href={`/bookings/${listing.id}`} className="text-brand-secondary text-sm font-semibold">
                                                {listing.kind}
                                            </a>
                                            <h2 className="text-primary text-lg font-semibold">{listing.title}</h2>
                                        </div>

                                        <Button
                                            color="secondary"
                                            size="sm"
                                            aria-label="Save listing"
                                            iconLeading={BookmarkAdd}
                                            className="hidden xl:inline-flex"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <RatingStars rating={listing.rating} />
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary text-md font-medium">{listing.rating}</span>
                                            <span className="text-tertiary text-md">{listing.reviews} reviews</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <MarkerPin02 className="text-fg-quaternary size-5" aria-hidden="true" />
                                                <span className="text-tertiary text-md font-medium">{listing.location}</span>
                                            </div>
                                            <div className="hidden items-center gap-2 xl:flex">
                                                <Home02 className="text-fg-quaternary size-5" aria-hidden="true" />
                                                <span className="text-tertiary text-md font-medium">1 bed</span>
                                            </div>
                                            <div className="hidden items-center gap-2 xl:flex">
                                                <Wifi className="text-fg-quaternary size-5" aria-hidden="true" />
                                                <span className="text-tertiary text-md font-medium">Wi-Fi</span>
                                            </div>
                                        </div>

                                        <div className="hidden items-end gap-2 xl:flex">
                                            <span className="text-primary text-xl font-semibold">{listing.price}</span>
                                            <span className="text-tertiary text-md">AUD total</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <TablePaginationNumbered className="pt-4 md:pt-5" page={1} total={10} />
                </div>
            </div>
        </main>
    </div>
);
