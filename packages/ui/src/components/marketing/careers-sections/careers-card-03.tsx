import { Clock, CurrencyDollarCircle } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { Badge, BadgeWithDot, BadgeWithFlag } from "../../base/badges/badges";

const styles = sortCx({
    card: "bg-primary ring-secondary outline-focus-ring flex flex-col rounded-2xl p-6 ring-1 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
    meta: "text-tertiary text-sm font-medium",
    metaIcon: "text-fg-quaternary size-5",
});

const departments = [
    {
        name: "Design",
        jobs: [
            {
                title: "Product Designer",
                badge: "Design",
                color: "blue",
                summary: "We're looking for a mid-level product designer to join our team.",
            },
            { title: "UX Designer", badge: "Design", color: "blue", summary: "We're looking for a mid-level UX designer to join our team." },
        ],
    },
    {
        name: "Software Development",
        jobs: [
            {
                title: "Engineering Manager",
                badge: "Software",
                color: "pink",
                summary: "We're looking for an experienced engineering manager to join our team.",
            },
            {
                title: "Frontend Developer",
                badge: "Software",
                color: "pink",
                summary: "We're looking for an experienced frontend developer to join our team.",
            },
            {
                title: "Backend Developer",
                badge: "Software",
                color: "pink",
                summary: "We're looking for an experienced backend developer to join our team.",
            },
        ],
    },
    {
        name: "Customer Success",
        jobs: [
            {
                title: "Customer Success Manager",
                badge: "Customer Success",
                color: "success",
                summary: "We're looking for a customer success manager to join our team.",
            },
        ],
    },
] as const;

/** A centered heading with a hero photo above job cards grouped by department. */
export const CareersCard03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <Badge type="pill-color" size="lg" color="brand" className="hidden md:flex">
                    Careers
                </Badge>
                <Badge type="pill-color" size="md" color="brand" className="md:hidden">
                    Careers
                </Badge>

                <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">We&apos;re looking for talented people</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">We&apos;re a 100% remote team spread all across the world. Join us!</p>
            </div>

            <div className="mt-12 h-60 w-full md:mt-16 md:h-140">
                <img src={IMAGES.landscape[5].src} alt="A designer at work in a studio" className="size-full object-cover" />
            </div>

            <div className="mx-auto mt-12 max-w-3xl md:mt-16">
                <ul className="flex flex-col gap-8 md:gap-16">
                    {departments.map((department) => (
                        <li key={department.name}>
                            <h2 className="text-primary text-lg font-semibold md:text-xl">{department.name}</h2>

                            <ul className="mt-5 flex flex-col gap-4 md:gap-6">
                                {department.jobs.map((job) => (
                                    <li key={job.title}>
                                        <a href={`/careers/${job.title.toLowerCase().replaceAll(" ", "-")}`} className={styles.card}>
                                            <div className="flex flex-col items-start gap-2 md:flex-row">
                                                <h3 className="text-md text-primary font-semibold">{job.title}</h3>

                                                <div className="flex flex-1 gap-2 md:flex-row-reverse md:justify-between">
                                                    <BadgeWithFlag type="modern" size="md" flag="AU">
                                                        <span>
                                                            Melbourne, <span className="hidden md:inline-flex">Australia</span>
                                                            <span className="inline-flex md:hidden">AU</span>
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
        </div>
    </section>
);
