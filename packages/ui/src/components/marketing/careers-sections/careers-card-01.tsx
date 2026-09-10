"use client";

import { useState } from "react";
import { ArrowUpRight, Clock, MarkerPin01 } from "@properui/icons";
import { Tabs } from "@/components/application/tabs/tabs";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { NativeSelect } from "@/components/base/select/select-native";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    card: "bg-primary ring-secondary outline-focus-ring group flex flex-col rounded-2xl p-6 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 md:pb-7",
    // Decorative affordance — the whole card is already the link, so it must not be focusable itself.
    viewJob: "text-brand-secondary group-hover:text-brand-secondary_hover hidden items-center gap-1 rounded text-sm font-semibold md:flex",
    viewJobIcon: "text-fg-brand-secondary_alt group-hover:text-fg-brand-secondary_hover size-5 shrink-0",
    meta: "text-tertiary text-sm font-medium",
    metaIcon: "text-fg-quaternary size-5",
});

const departments = [
    { value: "all", label: "View all" },
    { value: "design", label: "Design" },
    { value: "softwareEngineering", label: "Software Engineering" },
    { value: "customerSuccess", label: "Customer Success" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
] as const;

const jobs = [
    {
        title: "Product Designer",
        department: "design",
        team: "Design",
        badge: "Design",
        color: "blue",
        summary: "We're looking for a mid-level product designer to join our team.",
    },
    {
        title: "Engineering Manager",
        department: "softwareEngineering",
        team: "Software Development",
        badge: "Software",
        color: "pink",
        summary: "We're looking for an experienced engineering manager to join our team.",
    },
    {
        title: "Customer Success Manager",
        department: "customerSuccess",
        team: "Customer Success",
        badge: "CX",
        color: "success",
        summary: "We're looking for a customer success manager to join our team.",
    },
    {
        title: "Account Executive",
        department: "sales",
        team: "Sales",
        badge: "Sales",
        color: "indigo",
        summary: "We're looking for an account executive to join our team.",
    },
    {
        title: "SEO Marketing Manager",
        department: "marketing",
        team: "Marketing",
        badge: "Marketing",
        color: "orange",
        summary: "We're looking for an experienced SEO marketing manager to join our team.",
    },
] as const;

/** A centered heading, a department filter (tabs on desktop, a native select on mobile) and a stack of job cards. */
export const CareersCard01 = () => {
    const [department, setDepartment] = useState<string>("all");

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Open positions</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">We&apos;re a 100% remote team spread all across the world. Join us!</p>
                </div>

                <Tabs selectedKey={department} onSelectionChange={(key) => setDepartment(String(key))} aria-label="Departments">
                    <div className="mt-12 w-full md:mx-auto md:mt-16 md:w-max">
                        <NativeSelect
                            aria-label="Departments"
                            className="md:hidden"
                            value={department}
                            onChange={(event) => setDepartment(event.target.value)}
                            options={departments.map((item) => ({ label: item.label, value: item.value }))}
                        />

                        <Tabs.List
                            className="max-md:hidden"
                            type="button-border"
                            size="md"
                            items={departments.map((item) => ({ id: item.value, label: item.label }))}
                        >
                            {(item) => <Tabs.Item id={item.id} label={item.label} />}
                        </Tabs.List>
                    </div>

                    {departments.map((item) => (
                        <Tabs.Panel key={item.value} id={item.value} className="mx-auto mt-8 w-full max-w-3xl md:mt-16">
                            <ul className="flex flex-col gap-4 md:gap-6">
                                {(item.value === "all" ? jobs : jobs.filter((job) => job.department === item.value)).map((job) => (
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
                        </Tabs.Panel>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};
