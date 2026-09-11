"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { Carousel } from "../../application/carousel/carousel-base";
import { Button } from "../../base/buttons/button";

const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;
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
        category: "Design",
        author: avatar(0),
        date: "20 Jan 2027",
        image: IMAGES.landscape[0],
    },
    {
        href: "/blog/migrating-to-linear-101",
        title: "Migrating to Linear 101",
        summary: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        category: "Product",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
    },
    {
        href: "/blog/building-your-api-stack",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        category: "Software Engineering",
        author: avatar(2),
        date: "18 Jan 2027",
        image: IMAGES.landscape[2],
    },
    {
        href: "/blog/bill-walsh-leadership-lessons",
        title: "Bill Walsh leadership lessons",
        summary: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        category: "Product",
        author: avatar(8),
        date: "17 Jan 2027",
        image: IMAGES.landscape[3],
    },
    {
        href: "/blog/pm-mental-models",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        category: "Product",
        author: avatar(3),
        date: "16 Jan 2027",
        image: IMAGES.landscape[4],
    },
    {
        href: "/blog/what-is-wireframing",
        title: "What is wireframing?",
        summary: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        category: "Design",
        author: avatar(4),
        date: "15 Jan 2027",
        image: IMAGES.landscape[5],
    },
    {
        href: "/blog/how-collaboration-makes-us-better-designers",
        title: "How collaboration makes us better designers",
        summary: "Collaboration can make our teams stronger, and our individual designs better.",
        category: "Design",
        author: avatar(5),
        date: "14 Jan 2027",
        image: IMAGES.landscape[6],
    },
    {
        href: "/blog/our-top-10-javascript-frameworks-to-use",
        title: "Our top 10 Javascript frameworks to use",
        summary: "JavaScript frameworks make development easy with extensive features and functionalities.",
        category: "Product",
        author: avatar(6),
        date: "13 Jan 2027",
        image: IMAGES.landscape[7],
    },
    {
        href: "/blog/podcast-creating-a-better-cx-community",
        title: "Podcast: Creating a better CX Community",
        summary: "Starting a community doesn't need to be complicated, but how do you get started?",
        category: "Customer Success",
        author: avatar(7),
        date: "12 Jan 2027",
        image: IMAGES.landscape[0],
    },
] as const;

/** A scrollable row of blog cards with a frosted meta bar over each image and a read-post link. */
export const BlogSectionCarouselLayout01 = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-start justify-between lg:flex-row">
                <div className="max-w-3xl">
                    <p className="text-brand-secondary md:text-md text-sm font-semibold">Latest posts</p>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Proper UI blog</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Interviews, tips, guides, industry best practices, and news.</p>
                </div>

                <div className="hidden gap-3 lg:flex">
                    <Button size="xl">View all posts</Button>
                </div>
            </div>

            <Carousel.Root className="mt-12 md:mt-16">
                <Carousel.Content overflowHidden={false} className="gap-6 pe-4 md:gap-8 md:pe-8">
                    {posts.map((post) => (
                        <Carousel.Item key={post.title} className="max-w-xs md:max-w-96">
                            <article className="flex flex-col gap-4">
                                <div className="relative overflow-hidden">
                                    <a
                                        href={post.href}
                                        tabIndex={-1}
                                        className="before:ring-alpha-black/10 relative w-full overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-10 before:ring-[0.5px] before:ring-inset"
                                    >
                                        <img
                                            src={post.image.src}
                                            alt={post.title}
                                            className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105"
                                        />
                                    </a>

                                    <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-linear-to-b from-transparent to-black/40">
                                        <div className="bg-alpha-white/30 before:bg-alpha-white/30 relative flex items-start justify-between p-4 backdrop-blur-md before:absolute before:inset-x-0 before:top-0 before:h-px md:p-5">
                                            <div>
                                                <a
                                                    href={authorHref(post.author.username)}
                                                    className="outline-focus-ring block rounded-xs text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                                                >
                                                    {post.author.name}
                                                </a>
                                                <time className="block text-sm text-white">{post.date}</time>
                                            </div>

                                            <a
                                                href={categoryHref(post.category)}
                                                className="outline-focus-ring rounded-xs text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                {post.category}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-5">
                                    <div className="flex flex-col gap-1">
                                        <a
                                            href={post.href}
                                            className="text-primary outline-focus-ring flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            {post.title}
                                        </a>
                                        <p className="text-md text-tertiary line-clamp-2">{post.summary}</p>
                                    </div>

                                    <Button href={post.href} size="lg" color="link-color" iconTrailing={ArrowUpRight}>
                                        Read post
                                    </Button>
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
