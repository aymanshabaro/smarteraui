import Link from "next/link";
import type { ContentPage } from "~/lib/content";

/** Card grid used by /components, /application-ui and /marketing. */
export type OverviewGroup = { title: string; pages: ContentPage[] };

export const Overview = ({ title, description, groups }: { title: string; description: string; groups: OverviewGroup[] }) => (
    <>
        <div className="mb-10">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold text-balance md:text-wrap">{title}</h1>
            <p className="text-md text-tertiary mt-3 max-w-3xl">{description}</p>
        </div>

        {groups.map((group) => (
            <section key={group.title} className="mb-14 last:mb-0">
                <h2 id={group.title.toLowerCase().replace(/\s+/g, "-")} className="text-primary mb-4 scroll-mt-20 text-lg font-semibold md:text-xl">
                    {group.title}
                </h2>

                {group.pages.length ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {group.pages.map((page) => (
                            <Link
                                key={page.href}
                                href={page.href}
                                className="bg-primary outline-focus-ring ring-secondary hover:bg-primary_hover flex flex-col gap-1 rounded-xl p-5 ring-1 transition duration-100 ease-linear ring-inset focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <span className="text-md text-primary font-semibold">{page.frontmatter.title}</span>
                                {page.frontmatter.description && <span className="text-tertiary line-clamp-2 text-sm">{page.frontmatter.description}</span>}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="border-secondary text-tertiary rounded-xl border border-dashed px-6 py-10 text-center text-sm">
                        No pages published in this group yet.
                    </p>
                )}
            </section>
        ))}
    </>
);
