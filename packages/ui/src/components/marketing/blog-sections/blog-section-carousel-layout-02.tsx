"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "@smarteraui/icons";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { sortCx } from "@/utils/cx";
import { IMAGES, avatar } from "@/utils/demo-assets";

const categoryHref = (label: string) => `/blog/categories/${label.toLowerCase().replace(/\s+/g, "-")}`;

const styles = sortCx({
    trigger:
        "group outline-focus-ring bg-primary ring-secondary hover:bg-secondary flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-inset backdrop-blur transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:size-14",
    triggerIcon: "text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover size-5 md:size-6",
});

const posts = [
    {
        href: "/blog/ux-review-presentations",
        title: "UX review presentations",
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        author: avatar(0),
        date: "20 Jan 2027",
        image: IMAGES.landscape[0],
        tags: [
            { label: "Design", color: "brand" },
            { label: "Research", color: "indigo" },
            { label: "Presentation", color: "pink" },
        ],
    },
    {
        href: "/blog/migrating-to-linear-101",
        title: "Migrating to Linear 101",
        summary: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
        tags: [
            { label: "Product", color: "sky" },
            { label: "Tools", color: "pink" },
            { label: "SaaS", color: "pink" },
        ],
    },
    {
        href: "/blog/building-your-api-stack",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        author: avatar(2),
        date: "18 Jan 2027",
        image: IMAGES.landscape[2],
        tags: [
            { label: "Software Development", color: "success" },
            { label: "Tools", color: "pink" },
        ],
    },
    {
        href: "/blog/pm-mental-models",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        author: avatar(3),
        date: "17 Jan 2027",
        image: IMAGES.landscape[3],
        tags: [
            { label: "Leadership", color: "brand" },
            { label: "Management", color: "slate" },
        ],
    },
] as const;

/** A horizontally scrollable row of tagged blog cards with round previous and next controls. */
export const BlogSectionCarouselLayout02 = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-start justify-between lg:flex-row">
                <div className="max-w-3xl">
                    <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Latest writings</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">The latest news, technologies, and resources from our team.</p>
                </div>

                <div className="hidden gap-3 lg:flex">
                    <Button size="xl">View all posts</Button>
                </div>
            </div>

            <Carousel.Root className="mt-12 md:mt-16">
                <Carousel.Content overflowHidden={false} className="gap-6 pr-4 md:gap-8 md:pr-8">
                    {posts.map((post) => (
                        <Carousel.Item key={post.title} className="max-w-xs md:max-w-96">
                            <article className="flex flex-col gap-4">
                                <a
                                    href={post.href}
                                    tabIndex={-1}
                                    className="before:ring-alpha-black/10 relative overflow-hidden rounded-2xl before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-[0.5px] before:ring-inset"
                                >
                                    <img
                                        src={post.image.src}
                                        alt={post.title}
                                        className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105"
                                    />
                                </a>

                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-start gap-2">
                                        <p className="text-brand-secondary text-sm font-semibold">
                                            {post.author.name} • <time>{post.date}</time>
                                        </p>

                                        <div className="flex w-full flex-col gap-1">
                                            <a
                                                href={post.href}
                                                className="text-primary outline-focus-ring flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                {post.title}
                                                <ArrowUpRight aria-hidden="true" className="text-fg-quaternary mt-0.5 size-5 shrink-0" />
                                            </a>
                                            <p className="text-md text-tertiary line-clamp-2">{post.summary}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {post.tags.map((tag) => (
                                            <a
                                                key={tag.label}
                                                href={categoryHref(tag.label)}
                                                className="outline-focus-ring rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                <Badge type="pill-color" color={tag.color}>
                                                    {tag.label}
                                                </Badge>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </Carousel.Item>
                    ))}
                </Carousel.Content>

                <div className="mt-8 flex gap-4 md:gap-8">
                    <Carousel.PrevTrigger className={styles.trigger}>
                        <ArrowLeft aria-hidden="true" className={styles.triggerIcon} />
                    </Carousel.PrevTrigger>
                    <Carousel.NextTrigger className={styles.trigger}>
                        <ArrowRight aria-hidden="true" className={styles.triggerIcon} />
                    </Carousel.NextTrigger>
                </div>
            </Carousel.Root>

            <div className="mt-12 flex flex-col gap-3 lg:hidden">
                <Button size="xl">View all posts</Button>
            </div>
        </div>
    </section>
);
