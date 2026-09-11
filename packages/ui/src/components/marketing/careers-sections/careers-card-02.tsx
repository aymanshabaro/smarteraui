"use client";

import { useState } from "react";
import { ArrowUpRight, Clock, MarkerPin01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { BadgeWithDot } from "../../base/badges/badges";
import { Select } from "../../base/select/select";

const styles = sortCx({
    card: "bg-primary ring-secondary outline-focus-ring group flex flex-col rounded-2xl p-6 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:pb-7",
    // Decorative affordance — the whole card is already the link, so it must not be focusable itself.
    viewJob: "text-brand-secondary group-hover:text-brand-secondary_hover hidden items-center gap-1 rounded text-sm font-semibold md:flex",
    viewJobIcon: "text-fg-brand-secondary_alt group-hover:text-fg-brand-secondary_hover size-5 shrink-0",
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

const jobs = [
    {
        title: "Product Designer",
        team: "Design",
        badge: "Design",
        color: "blue",
        location: "oceania",
        summary: "We're looking for a mid-level product designer to join our team.",
    },
    {
        title: "Engineering Manager",
        team: "Software Development",
        badge: "Software",
        color: "pink",
        location: "europe",
        summary: "We're looking for an experienced engineering manager to join our team.",
    },
    {
        title: "Customer Success Manager",
        team: "Customer Success",
        badge: "CX",
        color: "success",
        location: "north-america",
        summary: "We're looking for a customer success manager to join our team.",
    },
    {
        title: "Account Executive",
        team: "Sales",
        badge: "Sales",
        color: "indigo",
        location: "north-america",
        summary: "We're looking for an account executive to join our team.",
    },
    {
        title: "SEO Marketing Manager",
        team: "Marketing",
        badge: "Marketing",
        color: "orange",
        location: "asia",
        summary: "We're looking for an experienced SEO marketing manager to join our team.",
    },
] as const;

/** A left-aligned intro beside a location-filtered stack of job cards. */
export const CareersCard02 = () => {
    const [location, setLocation] = useState<string>("worldwide");

    const visibleJobs = location === "worldwide" ? jobs : jobs.filter((job) => job.location === location);

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2">
                    <div className="flex max-w-3xl flex-col">
                        <span className="text-brand-secondary md:text-md text-sm font-semibold">We&apos;re hiring!</span>
                        <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Join our team</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                            Our philosophy is simple—hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 md:gap-6">
                        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_240px] md:self-end">
                            <p className="text-md text-tertiary hidden text-end font-medium whitespace-nowrap md:block">Filter by location</p>

                            <Select
                                aria-label="Filter by location"
                                icon={MarkerPin01}
                                items={locations}
                                selectedKey={location}
                                onSelectionChange={(key) => setLocation(String(key))}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>

                        <ul className="flex flex-col gap-4 md:gap-6">
                            {visibleJobs.map((job) => (
                                <li key={job.title}>
                                    <a href={`/careers/${job.title.toLowerCase().replaceAll(" ", "-")}`} className={styles.card}>
                                        <div className="flex items-center justify-between py-0.5 md:py-0">
                                            <span className="text-brand-secondary text-sm font-semibold">{job.team}</span>

                                            <span aria-hidden="true" className={styles.viewJob}>
                                                View job
                                                <ArrowUpRight className={styles.viewJobIcon} />
                                            </span>

                                            <div className="flex md:hidden">
                                                <BadgeWithDot type="pill-color" size="md" color={job.color}>
                                                    {job.badge}
                                                </BadgeWithDot>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 md:mt-0.5">
                                            <h3 className="text-md text-primary font-semibold">{job.title}</h3>
                                            <div className="hidden md:flex">
                                                <BadgeWithDot type="pill-color" size="md" color={job.color}>
                                                    {job.badge}
                                                </BadgeWithDot>
                                            </div>
                                        </div>

                                        <p className="text-md text-tertiary mt-2">{job.summary}</p>

                                        <div className="mt-5 flex gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <MarkerPin01 aria-hidden="true" className={styles.metaIcon} />
                                                <span className={styles.meta}>Remote</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock aria-hidden="true" className={styles.metaIcon} />
                                                <span className={styles.meta}>Full-time</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
