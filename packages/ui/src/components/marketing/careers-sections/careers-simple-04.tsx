import { Clock, MarkerPin01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { BadgeWithDot } from "../../base/badges/badges";

const styles = sortCx({
    // The whole row is the link; the divider is absolutely positioned so it is not part of the focus ring.
    link: "outline-focus-ring relative flex flex-col rounded-xs pt-6 focus-visible:outline-2 focus-visible:outline-offset-4",
    divider: "border-secondary absolute top-0 h-px w-full border-t",
    meta: "text-tertiary text-sm font-medium",
    metaIcon: "text-fg-quaternary size-5",
});

const jobs = [
    {
        title: "Product Designer",
        department: "Design",
        color: "blue",
        summary: "We're looking for a mid-level product designer to join our team.",
    },
    {
        title: "Engineering Manager",
        department: "Software Development",
        color: "pink",
        summary: "We're looking for an experienced engineering manager to join our team.",
    },
    {
        title: "Customer Success Manager",
        department: "Careers",
        color: "success",
        summary: "We're looking for a customer success manager to join our team.",
    },
    {
        title: "Account Executive",
        department: "Sales",
        color: "indigo",
        summary: "We're looking for an account executive to join our team.",
    },
] as const;

/** A left-aligned intro, a column of open positions and a full-bleed photo beside them. */
export const CareersSimple04 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col lg:mx-0">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">We&apos;re hiring!</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Start doing work that matters</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Our philosophy is simple: hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-2 lg:gap-16">
                <ul className="flex w-full max-w-3xl flex-col gap-8 justify-self-center lg:max-w-none lg:py-6">
                    {jobs.map((job) => (
                        <li key={job.title}>
                            <a href={`/careers/${job.title.toLowerCase().replaceAll(" ", "-")}`} className={styles.link}>
                                <div aria-hidden="true" className={styles.divider} />

                                <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                                    <h3 className="text-md text-primary font-semibold">{job.title}</h3>
                                    <BadgeWithDot type="pill-color" size="md" color={job.color}>
                                        {job.department}
                                    </BadgeWithDot>
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

                <div className="h-60 md:h-110 md:flex-1 lg:relative lg:h-full">
                    <img src={IMAGES.landscape[3].src} alt="A team member working on a laptop" className="size-full object-cover lg:absolute lg:inset-0" />
                </div>
            </div>
        </div>
    </section>
);
