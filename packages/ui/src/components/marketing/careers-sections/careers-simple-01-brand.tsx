import { Clock, MarkerPin01 } from "@properui/icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // `-mt-px` collapses the row border into the gap so the rules stay 1px apart.
    link: "border-brand_alt outline-focus-ring -mt-px flex flex-col rounded-xs border-t pt-6 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-4",
    meta: "text-tertiary_on-brand text-sm font-medium",
    metaIcon: "text-icon-fg-brand_on-brand size-5",
});

const jobs = [
    { title: "Product Designer", summary: "We're looking for a mid-level product designer to join our team." },
    { title: "Engineering Manager", summary: "We're looking for an experienced engineering manager to join our team." },
    { title: "Customer Success Manager", summary: "We're looking for a customer success manager to join our team." },
    { title: "Account Executive", summary: "We're looking for an account executive to join our team." },
    { title: "SEO Marketing Manager", summary: "We're looking for an experienced SEO marketing manager to join our team." },
] as const;

/** The centered open-positions list on the permanently branded section background. */
export const CareersSimple01Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">Open positions</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">We&apos;re a 100% remote team spread all across the world. Join us!</p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl md:mt-16">
                <ul className="flex flex-col gap-8">
                    {jobs.map((job) => (
                        <li key={job.title}>
                            <a href={`/careers/${job.title.toLowerCase().replaceAll(" ", "-")}`} className={styles.link}>
                                <h3 className="text-md text-primary_on-brand font-semibold">{job.title}</h3>
                                <p className="text-md text-tertiary_on-brand mt-2">{job.summary}</p>

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
    </section>
);
