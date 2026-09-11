import { Clock, MarkerPin01 } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";

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
] as const;

/** The open-positions-with-photo layout on the permanently branded section background. */
export const CareersSimple04Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col lg:mx-0">
                <span className="text-tertiary_on-brand md:text-md text-sm font-semibold">We&apos;re hiring!</span>
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Start doing work that matters</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">
                    Our philosophy is simple—hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-2 lg:gap-16">
                <ul className="flex w-full max-w-3xl flex-col gap-8 justify-self-center lg:max-w-none lg:py-6">
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

                <div className="h-60 md:h-110 md:flex-1 lg:relative lg:h-full">
                    <img src={IMAGES.landscape[4].src} alt="A team member smiling at their desk" className="size-full object-cover lg:absolute lg:inset-0" />
                </div>
            </div>
        </div>
    </section>
);
