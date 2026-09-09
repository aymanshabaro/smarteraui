"use client";

import { useState } from "react";
import { Clock, CurrencyDollarCircle, MarkerPin01 } from "@smarteraui/icons";
import { BadgeWithDot, BadgeWithFlag } from "@/components/base/badges/badges";
import { Select } from "@/components/base/select/select";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    card: "bg-primary ring-secondary outline-focus-ring flex flex-col rounded-2xl p-6 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
    meta: "text-tertiary text-sm font-medium",
    metaIcon: "text-fg-quaternary size-5",
});

const locations = [
    { id: "worldwide", label: "Worldwide" },
    { id: "europe", label: "Europe" },
    { id: "north-america", label: "North America" },
    { id: "asia", label: "Asia" },
    { id: "oceania", label: "Oceania" },
];

const departments = [
    {
        name: "Design",
        description: "Open positions in our design team.",
        jobs: [
            {
                title: "Product Designer",
                badge: "Design",
                color: "blue",
                city: "Melbourne",
                country: "Australia",
                flag: "AU",
                region: "oceania",
                summary: "We're looking for a mid-level product designer to join our team.",
            },
            {
                title: "UX Designer",
                badge: "Design",
                color: "blue",
                city: "Melbourne",
                country: "Australia",
                flag: "AU",
                region: "oceania",
                summary: "We're looking for a mid-level UX designer to join our team.",
            },
        ],
    },
    {
        name: "Software Development",
        description: "Open positions in our software team.",
        jobs: [
            {
                title: "Engineering Manager",
                badge: "Software",
                color: "pink",
                city: "Berlin",
                country: "Germany",
                flag: "DE",
                region: "europe",
                summary: "We're looking for an experienced engineering manager to join our team.",
            },
            {
                title: "Frontend Developer",
                badge: "Software",
                color: "pink",
                city: "Lisbon",
                country: "Portugal",
                flag: "PT",
                region: "europe",
                summary: "We're looking for an experienced frontend developer to join our team.",
            },
            {
                title: "Backend Developer",
                badge: "Software",
                color: "pink",
                city: "Toronto",
                country: "Canada",
                flag: "CA",
                region: "north-america",
                summary: "We're looking for an experienced backend developer to join our team.",
            },
        ],
    },
    {
        name: "Customer Success",
        description: "Open positions in our CX team.",
        jobs: [
            {
                title: "Customer Success Manager",
                badge: "Customer Success",
                color: "success",
                city: "Singapore",
                country: "Singapore",
                flag: "SG",
                region: "asia",
                summary: "We're looking for a customer success manager to join our team.",
            },
        ],
    },
] as const;

/** A location-filtered careers board with department blurbs beside each group and a closing photo. */
export const CareersCard04 = () => {
    const [location, setLocation] = useState<string>("worldwide");

    const visibleDepartments = departments
        .map((department) => ({
            ...department,
            jobs: location === "worldwide" ? department.jobs : department.jobs.filter((job) => job.region === location),
        }))
        .filter((department) => department.jobs.length > 0);

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start lg:gap-8">
                    <div className="flex w-full max-w-3xl flex-col">
                        <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Start doing work that matters</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                            Our philosophy is simple—hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                        </p>
                    </div>

                    <div>
                        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_240px]">
                            <p className="text-md text-tertiary hidden text-right font-medium whitespace-nowrap md:block">Location:</p>

                            <Select
                                aria-label="Location"
                                icon={MarkerPin01}
                                items={locations}
                                selectedKey={location}
                                onSelectionChange={(key) => setLocation(String(key))}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="mt-8 md:mt-16">
                    <ul className="flex flex-col gap-8 md:gap-16">
                        {visibleDepartments.map((department) => (
                            <li
                                key={department.name}
                                className="border-secondary flex flex-col justify-between gap-5 md:gap-8 lg:flex-row lg:items-start lg:gap-8 lg:border-t lg:pt-12"
                            >
                                <div>
                                    <h2 className="text-primary text-lg font-semibold lg:text-xl">{department.name}</h2>
                                    <p className="text-md text-tertiary mt-1 lg:mt-2">{department.description}</p>
                                </div>

                                <ul className="flex flex-1 flex-col gap-4 md:gap-6 lg:max-w-3xl">
                                    {department.jobs.map((job) => (
                                        <li key={job.title}>
                                            <a href={`/careers/${job.title.toLowerCase().replaceAll(" ", "-")}`} className={styles.card}>
                                                <div className="flex flex-col items-start gap-2 md:flex-row">
                                                    <h3 className="text-md text-primary font-semibold">{job.title}</h3>

                                                    <div className="flex flex-1 gap-2 md:flex-row-reverse md:justify-between">
                                                        <BadgeWithFlag type="modern" size="md" flag={job.flag}>
                                                            <span>
                                                                {job.city}, <span className="hidden md:inline-flex">{job.country}</span>
                                                                <span className="inline-flex md:hidden">{job.flag}</span>
                                                            </span>
                                                        </BadgeWithFlag>

                                                        <BadgeWithDot type="modern" size="md" color={job.color}>
                                                            {job.badge}
                                                        </BadgeWithDot>
                                                    </div>
                                                </div>

                                                <p className="text-md text-tertiary mt-2">{job.summary}</p>

                                                <div className="mt-5 flex gap-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock aria-hidden="true" className={styles.metaIcon} />
                                                        <span className={styles.meta}>Full-time</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <CurrencyDollarCircle aria-hidden="true" className={styles.metaIcon} />
                                                        <span className={styles.meta}>80k - 100k</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-12 h-60 w-full md:mt-16 md:h-120 lg:h-180">
                    <img src={IMAGES.landscape[6].src} alt="Colleagues collaborating around a table" className="size-full object-cover" />
                </div>
            </div>
        </section>
    );
};
