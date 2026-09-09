"use client";

import { ArrowUpRight } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { IMAGES, avatar } from "@/utils/demo-assets";

const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;
const categoryHref = (label: string) => `/blog/categories/${label.toLowerCase().replace(/\s+/g, "-")}`;

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
        category: "Design",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
    },
    {
        href: "/blog/building-your-api-stack",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        category: "Design",
        author: avatar(2),
        date: "18 Jan 2027",
        image: IMAGES.landscape[2],
    },
    {
        href: "/blog/bill-walsh-leadership-lessons",
        title: "Bill Walsh leadership lessons",
        summary: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        category: "Design",
        author: avatar(8),
        date: "17 Jan 2027",
        image: IMAGES.landscape[3],
    },
] as const;

/** A left-aligned heading above two columns of blog cards with a frosted meta bar over each image. */
export const BlogSectionSimpleLeftAligned02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">From the blog</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">The latest industry news, interviews, technologies, and resources.</p>
            </div>

            <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-16 md:grid-cols-2">
                {posts.map((post) => (
                    <li key={post.title}>
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
                    </li>
                ))}
            </ul>

            <div className="border-secondary mt-12 flex flex-col gap-3 md:mt-16 md:flex-row md:justify-end md:border-t md:pt-4">
                <Button size="xl">View all posts</Button>
            </div>
        </div>
    </section>
);
