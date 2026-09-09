import { Clock, MarkerPin01 } from "@smarteraui/icons";
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
    { title: "UX Researcher", summary: "We're looking for a senior user researcher to join our team." },
] as const;

/** The two-column grid of open positions on the permanently branded section background. */
export const CareersSimple03Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col lg:mx-0">
                <span className="text-tertiary_on-brand md:text-md text-sm font-semibold">Open positions</span>
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">We&apos;re looking for talented people</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">We&apos;re a 100% remote team spread all across the world. Join us!</p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-x-16 gap-y-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-12">
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
